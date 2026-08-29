"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Loader2, Pencil } from "lucide-react";

import { AdminConfirmDialog } from "~/components/admin";
import { Button, Input, Label } from "~/components/ui";
import {
  GYM_REST_DAY_COLOR,
  MAX_SETS_PER_EXERCISE,
  MUSCLE_GROUP_COLORS,
  MUSCLE_GROUP_LABELS,
  MUSCLE_GROUPS,
  WEIGHT_UNIT,
} from "~/constants/gym";
import type { MuscleGroup } from "~/constants/gym";
import { addDays, formatGymDate, parseGymDate, sessionVolume } from "~/lib/gym";
import { cn } from "~/lib/utils";
import type {
  ExerciseHistoryEntry,
  GymExercise,
  WorkoutSession,
} from "~/types/gym";
import { ExerciseEditor } from "./exercise-editor";
import { MuscleGroupPicker } from "./muscle-group-picker";
import { RestDayIcon } from "./rest-day-icon";
import type { ExerciseDraft, WorkoutDraft } from "./types";

const DURATION_PRESETS = [30, 45, 60, 75, 90];

type PendingConfirm =
  | { type: "rest" }
  | { type: "navigate"; date: string }
  | { type: "deselect-group"; group: MuscleGroup };

const createEmptyDraft = (
  date: string,
  defaultDuration = "",
): WorkoutDraft => ({
  date,
  groups: [],
  durationMin: defaultDuration,
  exercises: [],
  isRestDay: false,
});

function toDraft(
  session: WorkoutSession,
  catalogByPair: Map<string, GymExercise>,
  defaultDuration = "",
): WorkoutDraft {
  // Editing a rest day opens a fresh workout form so it can be replaced.
  if (session.isRestDay) {
    return createEmptyDraft(session.date, defaultDuration);
  }

  return {
    date: session.date,
    groups: session.groups ?? [],
    durationMin: session.durationMin ? String(session.durationMin) : "",
    isRestDay: false,
    exercises: (session.exercises ?? []).map((exercise, index) => {
      const linked =
        exercise.exerciseId ||
        catalogByPair.get(`${exercise.group}::${exercise.name}`)?._id ||
        "";
      return {
        key: `${linked || exercise.name}-${index}`,
        exerciseId: linked,
        group: exercise.group,
        name: exercise.name,
        sets: exercise.sets ? String(exercise.sets) : "",
        reps: exercise.reps ? String(exercise.reps) : "",
        weight: exercise.weight ? String(exercise.weight) : "",
        expanded: Boolean(exercise.setDetails?.length),
        setDetails: (exercise.setDetails ?? []).map((set) => ({
          reps: String(set.reps),
          weight: String(set.weight),
        })),
        cardioType: exercise.cardioType ?? "run",
        distanceKm: exercise.distanceKm ? String(exercise.distanceKm) : "",
        durationMin: exercise.durationMin ? String(exercise.durationMin) : "",
      };
    }),
  };
}

function toNumber(value: string): number | undefined {
  if (value.trim() === "") return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function shortDate(iso: string): string {
  return parseGymDate(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

/** Compare drafts without React list keys — used to gate Update Session. */
function serializeDraft(draft: WorkoutDraft): string {
  return JSON.stringify({
    groups: draft.groups,
    durationMin: draft.durationMin,
    isRestDay: draft.isRestDay,
    exercises: draft.exercises.map(({ key: _key, ...exercise }) => exercise),
  });
}

function isDraftEqual(a: WorkoutDraft, b: WorkoutDraft): boolean {
  return serializeDraft(a) === serializeDraft(b);
}

function latestDuration(sessions: WorkoutSession[]): string {
  const recent = sessions.find(
    (session) => !session.isRestDay && session.durationMin,
  );
  return recent?.durationMin ? String(recent.durationMin) : "";
}

function draftHasWork(draft: WorkoutDraft): boolean {
  return (
    draft.groups.length > 0 ||
    draft.exercises.length > 0 ||
    Boolean(draft.durationMin.trim())
  );
}

/** Prefill strength fields from last history — uniform or per-set. */
function strengthFromHistory(previous: ExerciseHistoryEntry | undefined): {
  sets: string;
  reps: string;
  weight: string;
  expanded: boolean;
  setDetails: Array<{ reps: string; weight: string }>;
} {
  if (previous?.setDetails?.length) {
    return {
      sets: String(previous.setDetails.length),
      reps: previous.reps
        ? String(previous.reps)
        : previous.setDetails[0]?.reps
          ? String(previous.setDetails[0].reps)
          : "10",
      weight: previous.weight
        ? String(previous.weight)
        : previous.setDetails[0]?.weight
          ? String(previous.setDetails[0].weight)
          : "",
      expanded: true,
      setDetails: previous.setDetails.map((set) => ({
        reps: String(set.reps),
        weight: String(set.weight),
      })),
    };
  }

  return {
    sets: previous?.sets ? String(previous.sets) : "3",
    reps: previous?.reps ? String(previous.reps) : "10",
    weight: previous?.weight ? String(previous.weight) : "",
    expanded: false,
    setDetails: [],
  };
}

interface WorkoutLoggerProps {
  sessions: WorkoutSession[];
  history: ExerciseHistoryEntry[];
  catalog: GymExercise[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
  onSaved: () => Promise<void> | void;
  /** Bump to force the form open (e.g. Edit from the session list). */
  editToken?: number;
}

export function WorkoutLogger({
  sessions,
  history,
  catalog,
  selectedDate,
  onSelectDate,
  onSaved,
  editToken = 0,
}: WorkoutLoggerProps) {
  const today = formatGymDate(new Date());
  const [savingKind, setSavingKind] = useState<"session" | "rest" | null>(null);
  const isSaving = savingKind !== null;
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [pendingConfirm, setPendingConfirm] = useState<PendingConfirm | null>(
    null,
  );

  const existingSession = useMemo(
    () => sessions.find((session) => session.date === selectedDate) ?? null,
    [sessions, selectedDate],
  );

  // Collapse once a day is logged; reopen for empty days or explicit edits.
  const [formOpen, setFormOpen] = useState(() => !existingSession);

  useEffect(() => {
    setFormOpen(!sessions.some((session) => session.date === selectedDate));
    setSuccessMessage(null);
    setPendingConfirm(null);
    // Only re-evaluate when the day changes — not on every sessions refresh,
    // so an in-progress edit isn't collapsed by a background revalidate.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional
  }, [selectedDate]);

  useEffect(() => {
    if (!successMessage) return;
    const timer = window.setTimeout(() => setSuccessMessage(null), 3200);
    return () => window.clearTimeout(timer);
  }, [successMessage]);

  useEffect(() => {
    if (editToken > 0) setFormOpen(true);
  }, [editToken]);

  const historyByName = useMemo(() => {
    const map = new Map<string, ExerciseHistoryEntry>();
    history.forEach((entry) => map.set(entry.name, entry));
    return map;
  }, [history]);

  const catalogByPair = useMemo(() => {
    const map = new Map<string, GymExercise>();
    catalog.forEach((exercise) => {
      map.set(`${exercise.group}::${exercise.name}`, exercise);
    });
    return map;
  }, [catalog]);

  const defaultDuration = useMemo(() => latestDuration(sessions), [sessions]);

  // Re-hydrating during render (not in an effect) keeps the form in sync with
  // the selected day without an extra paint or a set-state-in-effect lint error.
  const hydrationKey = `${selectedDate}:${existingSession?.updatedAt ?? "new"}`;
  const [hydration, setHydration] = useState(() => {
    const draft = existingSession
      ? toDraft(existingSession, catalogByPair, defaultDuration)
      : createEmptyDraft(selectedDate, defaultDuration);
    return { key: hydrationKey, draft, baseline: draft };
  });

  if (hydration.key !== hydrationKey) {
    const draft = existingSession
      ? toDraft(existingSession, catalogByPair, defaultDuration)
      : createEmptyDraft(selectedDate, defaultDuration);
    setHydration({
      key: hydrationKey,
      draft,
      baseline: draft,
    });
  }

  const draft = hydration.draft;
  const baseline = hydration.baseline;
  const setDraft = useCallback(
    (updater: (current: WorkoutDraft) => WorkoutDraft) => {
      setHydration((current) => ({
        ...current,
        draft: updater(current.draft),
      }));
    },
    [],
  );

  const isEditingSession = Boolean(
    existingSession && !existingSession.isRestDay,
  );
  const hasChanges = !isDraftEqual(draft, baseline);

  const requestDateChange = useCallback(
    (nextDate: string) => {
      if (!nextDate || nextDate === selectedDate) return;
      if (formOpen && hasChanges) {
        setPendingConfirm({ type: "navigate", date: nextDate });
        return;
      }
      onSelectDate(nextDate);
    },
    [formOpen, hasChanges, onSelectDate, selectedDate],
  );

  const shiftDate = useCallback(
    (offset: number) => {
      requestDateChange(
        formatGymDate(addDays(parseGymDate(selectedDate), offset)),
      );
    },
    [requestDateChange, selectedDate],
  );

  const toggleGroup = useCallback(
    (group: MuscleGroup) => {
      const isActive = draft.groups.includes(group);
      if (isActive) {
        const hasGroupExercises = draft.exercises.some(
          (exercise) => exercise.group === group,
        );
        if (hasGroupExercises) {
          setPendingConfirm({ type: "deselect-group", group });
          return;
        }
      }

      setDraft((current) => {
        const active = current.groups.includes(group);
        return {
          ...current,
          groups: active
            ? current.groups.filter((item) => item !== group)
            : [...current.groups, group],
          exercises: active
            ? current.exercises.filter((exercise) => exercise.group !== group)
            : current.exercises,
        };
      });
    },
    [draft.exercises, draft.groups, setDraft],
  );

  const addExercise = useCallback(
    (exercise: GymExercise) => {
      const previous = historyByName.get(exercise.name);
      const strength = strengthFromHistory(previous);
      setDraft((current) => ({
        ...current,
        exercises: [
          ...current.exercises,
          {
            key: `${exercise._id}-${Date.now()}`,
            exerciseId: exercise._id,
            group: exercise.group,
            name: exercise.name,
            ...strength,
            cardioType: previous?.cardioType ?? "run",
            distanceKm: previous?.distanceKm ? String(previous.distanceKm) : "",
            durationMin: previous?.durationMin
              ? String(previous.durationMin)
              : "",
          },
        ],
      }));
    },
    [historyByName, setDraft],
  );

  const updateExercise = useCallback(
    (key: string, patch: Partial<ExerciseDraft>) => {
      setDraft((current) => ({
        ...current,
        exercises: current.exercises.map((exercise) =>
          exercise.key === key ? { ...exercise, ...patch } : exercise,
        ),
      }));
    },
    [setDraft],
  );

  const removeExercise = useCallback(
    (key: string) => {
      setDraft((current) => ({
        ...current,
        exercises: current.exercises.filter((exercise) => exercise.key !== key),
      }));
    },
    [setDraft],
  );

  const moveExercise = useCallback(
    (key: string, direction: -1 | 1) => {
      setDraft((current) => {
        const exercises = [...current.exercises];
        const index = exercises.findIndex((exercise) => exercise.key === key);
        if (index < 0) return current;

        const group = exercises[index].group;
        const groupIndices = exercises
          .map((exercise, i) => (exercise.group === group ? i : -1))
          .filter((i) => i >= 0);
        const position = groupIndices.indexOf(index);
        const swapWith = groupIndices[position + direction];
        if (swapWith === undefined) return current;

        const swapped = [...exercises];
        [swapped[index], swapped[swapWith]] = [
          swapped[swapWith],
          swapped[index],
        ];
        return { ...current, exercises: swapped };
      });
    },
    [setDraft],
  );

  const applyLast = useCallback(
    (key: string) => {
      setDraft((current) => ({
        ...current,
        exercises: current.exercises.map((exercise) => {
          if (exercise.key !== key) return exercise;
          const previous = historyByName.get(exercise.name);
          if (!previous) return exercise;

          if (exercise.group === "cardio") {
            return {
              ...exercise,
              cardioType: previous.cardioType ?? exercise.cardioType,
              distanceKm: previous.distanceKm
                ? String(previous.distanceKm)
                : "",
              durationMin: previous.durationMin
                ? String(previous.durationMin)
                : "",
            };
          }

          return {
            ...exercise,
            ...strengthFromHistory(previous),
          };
        }),
      }));
    },
    [historyByName, setDraft],
  );

  const isToday = selectedDate === today;
  const isFuture = selectedDate > today;

  const persist = useCallback(
    async (
      payload: Record<string, unknown>,
      success: string,
      kind: "session" | "rest",
    ) => {
      setSavingKind(kind);
      setErrorMessage(null);
      setSuccessMessage(null);

      try {
        const response = await fetch("/api/gym", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const result = await response.json();

        if (!response.ok || !result?.success) {
          setErrorMessage(result?.error ?? "Failed to save.");
          return false;
        }

        await onSaved();
        setFormOpen(false);
        setSuccessMessage(success);
        return true;
      } catch {
        setErrorMessage("Failed to save. Please try again.");
        return false;
      } finally {
        setSavingKind(null);
      }
    },
    [onSaved],
  );

  const saveRestDay = useCallback(async () => {
    if (isSaving || isFuture) return;

    const dayLabel = selectedDate === today ? "today" : shortDate(selectedDate);

    const ok = await persist(
      {
        date: selectedDate,
        isRestDay: true,
        groups: [],
        durationMin: 0,
        exercises: [],
      },
      `Rest day logged for ${dayLabel}`,
      "rest",
    );
    if (ok) setPendingConfirm(null);
  }, [isSaving, isFuture, persist, selectedDate, today]);

  const requestRestDay = useCallback(() => {
    if (isSaving || isFuture) return;

    const replacingWorkout = Boolean(
      existingSession && !existingSession.isRestDay,
    );
    if (replacingWorkout || draftHasWork(draft)) {
      setPendingConfirm({ type: "rest" });
      return;
    }

    void saveRestDay();
  }, [draft, existingSession, isFuture, isSaving, saveRestDay]);

  const save = useCallback(async () => {
    if (isSaving) return;

    const durationMin = toNumber(draft.durationMin);
    if (durationMin === undefined || durationMin < 1) {
      setErrorMessage("Duration is required.");
      return;
    }
    if (draft.groups.length === 0) {
      setErrorMessage("Select at least one muscle group.");
      return;
    }
    if (draft.exercises.length === 0) {
      setErrorMessage("Add at least one exercise.");
      return;
    }

    const dayLabel = draft.date === today ? "today" : shortDate(draft.date);
    const wasUpdate = Boolean(existingSession);

    await persist(
      {
        date: draft.date,
        isRestDay: false,
        groups: draft.groups,
        durationMin,
        exercises: draft.exercises.map((exercise) => {
          if (exercise.group === "cardio") {
            return {
              exerciseId: exercise.exerciseId,
              group: exercise.group,
              name: exercise.name,
              cardioType: exercise.cardioType,
              distanceKm: toNumber(exercise.distanceKm),
              durationMin: toNumber(exercise.durationMin),
            };
          }

          if (exercise.expanded) {
            const setDetails = exercise.setDetails
              .map((set) => ({
                reps: toNumber(set.reps),
                weight: toNumber(set.weight),
              }))
              .filter(
                (set): set is { reps: number; weight: number } =>
                  set.reps !== undefined && set.weight !== undefined,
              )
              .slice(0, MAX_SETS_PER_EXERCISE);

            return {
              exerciseId: exercise.exerciseId,
              group: exercise.group,
              name: exercise.name,
              sets: setDetails.length,
              setDetails,
            };
          }

          return {
            exerciseId: exercise.exerciseId,
            group: exercise.group,
            name: exercise.name,
            sets: toNumber(exercise.sets),
            reps: toNumber(exercise.reps),
            weight: toNumber(exercise.weight),
          };
        }),
      },
      wasUpdate
        ? `Updated session for ${shortDate(draft.date)}`
        : `Logged session for ${dayLabel}`,
      "session",
    );
  }, [draft, existingSession, isSaving, persist, today]);

  const canSave =
    !isSaving &&
    !isFuture &&
    draft.groups.length > 0 &&
    draft.exercises.length > 0 &&
    Boolean(toNumber(draft.durationMin)) &&
    (!isEditingSession || hasChanges);

  // Number keys toggle groups; Cmd/Ctrl+Enter saves.
  useEffect(() => {
    if (!formOpen) return;

    const handler = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement;

      if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
        event.preventDefault();
        if (canSave) void save();
        return;
      }

      if (isTyping || event.metaKey || event.ctrlKey || event.altKey) return;

      const index = Number(event.key);
      if (Number.isInteger(index) && index >= 1 && index <= 8) {
        event.preventDefault();
        toggleGroup(MUSCLE_GROUPS[index - 1]);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [canSave, formOpen, save, toggleGroup]);

  const handleConfirm = useCallback(async () => {
    if (!pendingConfirm) return;

    if (pendingConfirm.type === "rest") {
      await saveRestDay();
      return;
    }

    if (pendingConfirm.type === "navigate") {
      onSelectDate(pendingConfirm.date);
      setPendingConfirm(null);
      return;
    }

    if (pendingConfirm.type === "deselect-group") {
      const group = pendingConfirm.group;
      setDraft((current) => ({
        ...current,
        groups: current.groups.filter((item) => item !== group),
        exercises: current.exercises.filter(
          (exercise) => exercise.group !== group,
        ),
      }));
      setPendingConfirm(null);
    }
  }, [onSelectDate, pendingConfirm, saveRestDay, setDraft]);

  const confirmCopy = useMemo(() => {
    if (!pendingConfirm) return null;

    if (pendingConfirm.type === "rest") {
      return {
        title: "Log rest day?",
        description: existingSession?.isRestDay
          ? "This keeps the rest day for this date."
          : existingSession
            ? "This replaces the logged workout for this date with a rest day."
            : "This discards the current draft and logs a rest day instead.",
        confirmLabel: "Log rest day",
        loadingLabel: "Saving...",
        destructive: true,
      };
    }

    if (pendingConfirm.type === "navigate") {
      return {
        title: "Discard unsaved changes?",
        description: `You have unsaved edits for ${isToday ? "today" : shortDate(selectedDate)}. Switching days will lose them.`,
        confirmLabel: "Discard",
        loadingLabel: "Please wait...",
        destructive: true,
      };
    }

    return {
      title: `Remove ${MUSCLE_GROUP_LABELS[pendingConfirm.group]}?`,
      description: `This also removes ${
        draft.exercises.filter(
          (exercise) => exercise.group === pendingConfirm.group,
        ).length
      } exercise(s) from that group.`,
      confirmLabel: "Remove group",
      loadingLabel: "Please wait...",
      destructive: true,
    };
  }, [draft.exercises, existingSession, isToday, pendingConfirm, selectedDate]);

  return (
    <div className="rounded-lg border border-border bg-card/50 p-4 sm:p-5">
      <div className="flex items-center gap-1">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => shiftDate(-1)}
          disabled={isSaving}
          aria-label="Previous day"
          className="size-8 shrink-0 px-0"
        >
          <ChevronLeft className="size-4" />
        </Button>

        <label
          className={cn(
            "relative inline-flex h-8 cursor-pointer items-center rounded-md px-1.5 text-sm font-semibold tabular-nums transition-colors hover:bg-muted/40",
            isSaving && "pointer-events-none opacity-60",
          )}
        >
          {isToday ? "Today" : shortDate(selectedDate)}
          <span className="sr-only">Pick workout date</span>
          <input
            type="date"
            value={selectedDate}
            max={today}
            onChange={(event) => requestDateChange(event.target.value)}
            disabled={isSaving}
            aria-label="Workout date"
            className="absolute inset-0 cursor-pointer opacity-0"
          />
        </label>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => shiftDate(1)}
          disabled={isSaving || isToday}
          aria-label="Next day"
          className="size-8 shrink-0 px-0"
        >
          <ChevronRight className="size-4" />
        </Button>
        {!isToday ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => requestDateChange(today)}
            disabled={isSaving}
            className="h-8 shrink-0 px-2 text-[11px] text-muted-foreground"
          >
            Today
          </Button>
        ) : null}

        <div className="ml-auto flex items-center gap-1.5">
          {existingSession && formOpen ? (
            <span className="text-[11px] text-ring">Editing</span>
          ) : null}
          {formOpen && hasChanges ? (
            <span className="text-[11px] text-amber-500">Unsaved</span>
          ) : null}
        </div>
      </div>

      {successMessage ? (
        <p role="status" className="mt-3 text-xs text-ring">
          {successMessage}
        </p>
      ) : null}

      {!formOpen && existingSession ? (
        <LoggedSessionSummary
          session={existingSession}
          onEdit={() => setFormOpen(true)}
        />
      ) : (
        <div className="mt-5 space-y-5 pb-20 lg:pb-0">
          <div className="space-y-5">
            <div className="space-y-2">
              <div className="flex items-baseline justify-between gap-3">
                <Label className="text-xs text-muted-foreground">
                  Muscle groups
                </Label>
                <p className="hidden text-[10px] text-muted-foreground lg:block">
                  Press 1–8 to toggle
                </p>
              </div>
              <MuscleGroupPicker
                selected={draft.groups}
                onToggle={toggleGroup}
                disabled={isSaving}
              />
            </div>

            <DurationField
              value={draft.durationMin}
              disabled={isSaving}
              onChange={(durationMin) =>
                setDraft((current) => ({ ...current, durationMin }))
              }
            />

            <ExerciseEditor
              groups={draft.groups}
              catalog={catalog}
              exercises={draft.exercises}
              historyByName={historyByName}
              disabled={isSaving}
              onAdd={addExercise}
              onUpdate={updateExercise}
              onRemove={removeExercise}
              onMove={moveExercise}
              onApplyLast={applyLast}
            />
          </div>

          {errorMessage ? (
            <p className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-500">
              {errorMessage}
            </p>
          ) : null}

          <div className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-background/95 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur supports-[backdrop-filter]:bg-background/85 lg:static lg:inset-auto lg:z-auto lg:mt-1 lg:border-0 lg:bg-transparent lg:px-0 lg:py-0 lg:pb-0 lg:backdrop-blur-none lg:supports-[backdrop-filter]:bg-transparent">
            <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 border-t border-border pt-4 lg:max-w-none">
              <button
                type="button"
                onClick={requestRestDay}
                disabled={isSaving || isFuture}
                className="el-focus-styles inline-flex h-9 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium transition-colors hover:bg-muted/30 disabled:cursor-not-allowed disabled:opacity-60"
                style={{
                  color: GYM_REST_DAY_COLOR,
                }}
              >
                {savingKind === "rest" ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  <RestDayIcon className="size-3.5" />
                )}
                Rest day
              </button>

              <div className="ml-auto flex items-center gap-2">
                {existingSession ? (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      if (hasChanges) {
                        setHydration((current) => ({
                          ...current,
                          draft: current.baseline,
                        }));
                      }
                      setFormOpen(false);
                      setErrorMessage(null);
                    }}
                    disabled={isSaving}
                  >
                    Cancel
                  </Button>
                ) : null}
                <Button
                  type="button"
                  onClick={() => void save()}
                  disabled={!canSave}
                >
                  {savingKind === "session" ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Saving...
                    </>
                  ) : isEditingSession ? (
                    "Update Session"
                  ) : (
                    "Log Session"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {confirmCopy ? (
        <AdminConfirmDialog
          open={Boolean(pendingConfirm)}
          onOpenChange={(open) => {
            if (!open && !isSaving) setPendingConfirm(null);
          }}
          title={confirmCopy.title}
          description={confirmCopy.description}
          confirmLabel={confirmCopy.confirmLabel}
          loadingLabel={confirmCopy.loadingLabel}
          destructive={confirmCopy.destructive}
          loading={savingKind === "rest"}
          onConfirm={handleConfirm}
        />
      ) : null}
    </div>
  );
}

function DurationField({
  value,
  disabled,
  onChange,
}: {
  value: string;
  disabled: boolean;
  onChange: (value: string) => void;
}) {
  return (
    <div className="min-w-0 space-y-2">
      <Label className="text-xs text-muted-foreground">
        Duration <span className="text-red-500">*</span>
      </Label>
      <div className="flex flex-wrap items-center gap-1.5">
        {DURATION_PRESETS.map((minutes) => (
          <button
            key={minutes}
            type="button"
            disabled={disabled}
            onClick={() => onChange(String(minutes))}
            className={cn(
              "el-focus-styles h-8 shrink-0 rounded-md border px-2.5 text-xs tabular-nums transition-colors disabled:cursor-not-allowed disabled:opacity-60",
              value === String(minutes)
                ? "border-ring/50 bg-ring/15 text-ring"
                : "border-border bg-muted/20 text-muted-foreground hover:border-muted-foreground/40 hover:text-foreground",
            )}
          >
            {minutes}m
          </button>
        ))}
        <div className="relative">
          <Input
            type="number"
            inputMode="numeric"
            min="1"
            required
            placeholder="—"
            aria-label="Custom duration in minutes"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            disabled={disabled}
            className="h-8 w-[4.25rem] border-border bg-card pr-7 text-center text-xs tabular-nums [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground">
            m
          </span>
        </div>
      </div>
    </div>
  );
}

function LoggedSessionSummary({
  session,
  onEdit,
}: {
  session: WorkoutSession;
  onEdit: () => void;
}) {
  if (session.isRestDay) {
    return (
      <div
        className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border px-3.5 py-3"
        style={{
          borderColor: `${GYM_REST_DAY_COLOR}40`,
          backgroundColor: `${GYM_REST_DAY_COLOR}0f`,
        }}
      >
        <p className="text-sm font-medium text-foreground">Rest day logged</p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onEdit}
          className="shrink-0"
        >
          <Pencil className="mr-1.5 size-3.5" />
          Log workout
        </Button>
      </div>
    );
  }

  const volume = sessionVolume(session.exercises ?? []);

  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-ring/25 bg-ring/5 px-3.5 py-3">
      <div className="min-w-0 space-y-1.5">
        <div className="flex flex-wrap gap-1">
          {session.groups.map((group) => (
            <span
              key={group}
              className="rounded px-1.5 py-0.5 text-[10px] font-medium"
              style={{
                backgroundColor: `${MUSCLE_GROUP_COLORS[group]}1f`,
                color: MUSCLE_GROUP_COLORS[group],
              }}
            >
              {MUSCLE_GROUP_LABELS[group]}
            </span>
          ))}
        </div>
        <p className="text-[11px] text-muted-foreground">
          {[
            `${session.exercises?.length ?? 0} exercises`,
            session.durationMin ? `${session.durationMin} min` : null,
            volume > 0 ? `${volume.toLocaleString()} ${WEIGHT_UNIT}` : null,
          ]
            .filter(Boolean)
            .join(" · ")}
        </p>
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={onEdit}
        className="shrink-0"
      >
        <Pencil className="mr-1.5 size-3.5" />
        Edit
      </Button>
    </div>
  );
}
