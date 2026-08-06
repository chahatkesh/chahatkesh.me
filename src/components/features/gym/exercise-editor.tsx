"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronUp,
  Copy,
  ListChecks,
  Plus,
  Trash2,
  X,
} from "lucide-react";

import { Button, Input, Label } from "~/components/ui";
import {
  CARDIO_TYPES,
  CARDIO_TYPE_LABELS,
  MAX_SETS_PER_EXERCISE,
  MUSCLE_GROUP_COLORS,
  MUSCLE_GROUP_LABELS,
  WEIGHT_UNIT,
} from "~/constants/gym";
import type { MuscleGroup } from "~/constants/gym";
import { cn } from "~/lib/utils";
import type { ExerciseHistoryEntry, GymExercise } from "~/types/gym";
import type { ExerciseDraft } from "./types";

const numberInputClassName =
  "h-9 border-border bg-card text-center text-sm tabular-nums [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none";

/** Compact “last time” label for chips and copy-last. */
export function formatLastPerformed(
  entry: ExerciseHistoryEntry | undefined,
): string | null {
  if (!entry) return null;

  if (entry.group === "cardio") {
    const parts: string[] = [];
    if (entry.distanceKm) parts.push(`${entry.distanceKm}km`);
    if (entry.durationMin) parts.push(`${entry.durationMin}m`);
    return parts.length > 0 ? parts.join(" · ") : null;
  }

  if (entry.setDetails?.length) {
    const weights = entry.setDetails.map((set) => set.weight);
    const min = Math.min(...weights);
    const max = Math.max(...weights);
    const count = entry.setDetails.length;
    if (min === max) return `${count} sets @ ${min}${WEIGHT_UNIT}`;
    return `${count} sets · ${min}–${max}${WEIGHT_UNIT}`;
  }

  const setsReps =
    entry.sets && entry.reps ? `${entry.sets}×${entry.reps}` : null;
  if (setsReps && entry.weight) {
    return `${setsReps} @ ${entry.weight}${WEIGHT_UNIT}`;
  }
  if (entry.weight) return `${entry.weight}${WEIGHT_UNIT}`;
  return setsReps;
}

interface ExerciseEditorProps {
  groups: MuscleGroup[];
  catalog: GymExercise[];
  exercises: ExerciseDraft[];
  historyByName: Map<string, ExerciseHistoryEntry>;
  disabled?: boolean;
  onAdd: (exercise: GymExercise) => void;
  onUpdate: (key: string, patch: Partial<ExerciseDraft>) => void;
  onRemove: (key: string) => void;
  onMove: (key: string, direction: -1 | 1) => void;
  onApplyLast: (key: string) => void;
}

export function ExerciseEditor({
  groups,
  catalog,
  exercises,
  historyByName,
  disabled = false,
  onAdd,
  onUpdate,
  onRemove,
  onMove,
  onApplyLast,
}: ExerciseEditorProps) {
  if (groups.length === 0) {
    return (
      <p className="text-xs text-muted-foreground">
        Select a muscle group to pick exercises.
      </p>
    );
  }

  const addedIds = new Set(exercises.map((exercise) => exercise.exerciseId));

  return (
    <div className="space-y-5">
      {groups.map((group) => {
        const color = MUSCLE_GROUP_COLORS[group];
        const groupCatalog = catalog
          .filter((exercise) => exercise.group === group)
          .sort((a, b) => {
            // Most-logged first, then catalog sort order, then name.
            if (b.usageCount !== a.usageCount) {
              return b.usageCount - a.usageCount;
            }
            if (a.sortOrder !== b.sortOrder) {
              return a.sortOrder - b.sortOrder;
            }
            return a.name.localeCompare(b.name);
          });
        const groupExercises = exercises.filter(
          (exercise) => exercise.group === group,
        );

        return (
          <div key={group} className="space-y-2.5">
            <div className="flex items-center gap-2">
              <span
                aria-hidden
                className="size-2 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="text-xs font-semibold tracking-tight">
                {MUSCLE_GROUP_LABELS[group]}
              </span>
              {groupExercises.length > 0 ? (
                <span className="text-[10px] text-muted-foreground">
                  {groupExercises.length}
                </span>
              ) : null}
            </div>

            {groupCatalog.length === 0 ? (
              <p className="text-[11px] text-muted-foreground">
                No exercises in this group yet.{" "}
                <Link
                  href="/admin/gym/exercises"
                  className="inline-flex items-center gap-1 font-medium text-ring underline-offset-2 hover:underline"
                >
                  <ListChecks className="size-3" />
                  Manage exercises
                </Link>
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {groupCatalog.map((exercise) => {
                  const isAdded = addedIds.has(exercise._id);
                  const lastLabel = formatLastPerformed(
                    historyByName.get(exercise.name),
                  );
                  return (
                    <button
                      key={exercise._id}
                      type="button"
                      disabled={disabled || isAdded}
                      onClick={() => onAdd(exercise)}
                      title={lastLabel ? `Last: ${lastLabel}` : undefined}
                      className={cn(
                        "el-focus-styles min-h-9 rounded-md border bg-muted/20 px-2.5 py-1.5 text-left text-xs transition-colors disabled:cursor-not-allowed sm:min-h-8 sm:text-[11px]",
                        isAdded
                          ? "border-border/50 text-muted-foreground/40"
                          : "border-border text-muted-foreground hover:border-muted-foreground/40 hover:text-foreground",
                      )}
                    >
                      <span className="font-medium">{exercise.name}</span>
                      {lastLabel && !isAdded ? (
                        <span className="ml-1.5 text-[10px] text-muted-foreground/70 sm:text-[10px]">
                          {lastLabel}
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            )}

            {groupExercises.length > 0 ? (
              <div className="space-y-2">
                {groupExercises.map((exercise, index) => (
                  <ExerciseRow
                    key={exercise.key}
                    exercise={exercise}
                    disabled={disabled}
                    canMoveUp={index > 0}
                    canMoveDown={index < groupExercises.length - 1}
                    lastLabel={formatLastPerformed(
                      historyByName.get(exercise.name),
                    )}
                    onUpdate={onUpdate}
                    onRemove={onRemove}
                    onMove={onMove}
                    onApplyLast={onApplyLast}
                  />
                ))}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

interface ExerciseRowProps {
  exercise: ExerciseDraft;
  disabled: boolean;
  canMoveUp: boolean;
  canMoveDown: boolean;
  lastLabel: string | null;
  onUpdate: (key: string, patch: Partial<ExerciseDraft>) => void;
  onRemove: (key: string) => void;
  onMove: (key: string, direction: -1 | 1) => void;
  onApplyLast: (key: string) => void;
}

function ExerciseRow({
  exercise,
  disabled,
  canMoveUp,
  canMoveDown,
  lastLabel,
  onUpdate,
  onRemove,
  onMove,
  onApplyLast,
}: ExerciseRowProps) {
  const color = MUSCLE_GROUP_COLORS[exercise.group];
  const isCardio = exercise.group === "cardio";

  const updateSetDetail = (
    index: number,
    field: "reps" | "weight",
    value: string,
  ) => {
    const next = exercise.setDetails.map((set, i) =>
      i === index ? { ...set, [field]: value } : set,
    );
    onUpdate(exercise.key, { setDetails: next });
  };

  const toggleExpanded = () => {
    if (exercise.expanded) {
      onUpdate(exercise.key, { expanded: false });
      return;
    }
    // Seed per-set rows from the uniform values so nothing is retyped.
    const count = Math.min(
      Math.max(Number(exercise.sets) || 1, 1),
      MAX_SETS_PER_EXERCISE,
    );
    const seeded = Array.from({ length: count }, (_, index) => ({
      reps: exercise.setDetails[index]?.reps ?? exercise.reps,
      weight: exercise.setDetails[index]?.weight ?? exercise.weight,
    }));
    onUpdate(exercise.key, { expanded: true, setDetails: seeded });
  };

  return (
    <div
      className="rounded-lg border border-border bg-background p-3"
      style={{ borderLeft: `2px solid ${color}` }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <span className="block truncate text-sm font-medium">
            {exercise.name}
          </span>
          {lastLabel ? (
            <button
              type="button"
              disabled={disabled}
              onClick={() => onApplyLast(exercise.key)}
              className="el-focus-styles mt-0.5 inline-flex items-center gap-1 text-[10px] text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed"
              title="Apply last performed values"
            >
              <Copy className="size-2.5" />
              Last: {lastLabel}
            </button>
          ) : null}
        </div>
        <div className="flex shrink-0 items-center gap-0.5">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onMove(exercise.key, -1)}
            disabled={disabled || !canMoveUp}
            aria-label={`Move ${exercise.name} up`}
            className="size-7 px-0 text-muted-foreground"
          >
            <ChevronUp className="size-3.5" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onMove(exercise.key, 1)}
            disabled={disabled || !canMoveDown}
            aria-label={`Move ${exercise.name} down`}
            className="size-7 px-0 text-muted-foreground"
          >
            <ChevronDown className="size-3.5" />
          </Button>
          {!isCardio ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={toggleExpanded}
              disabled={disabled}
              className="h-7 px-1.5 text-[11px] text-muted-foreground"
            >
              {exercise.expanded ? "Same for all" : "Log each set"}
            </Button>
          ) : null}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onRemove(exercise.key)}
            disabled={disabled}
            aria-label={`Remove ${exercise.name}`}
            className="size-7 px-0 text-muted-foreground hover:text-red-500"
          >
            <X className="size-3.5" />
          </Button>
        </div>
      </div>

      {isCardio ? (
        <div className="mt-3 grid grid-cols-1 gap-2 xs:grid-cols-3">
          <Field label="Type">
            <select
              value={exercise.cardioType}
              onChange={(event) =>
                onUpdate(exercise.key, {
                  cardioType: event.target.value as ExerciseDraft["cardioType"],
                })
              }
              disabled={disabled}
              aria-label="Cardio type"
              className="h-9 w-full rounded-md border border-border bg-card px-2 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {CARDIO_TYPES.map((type) => (
                <option key={type} value={type}>
                  {CARDIO_TYPE_LABELS[type]}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Distance (km)">
            <Input
              type="number"
              inputMode="decimal"
              step="0.1"
              min="0"
              placeholder="0"
              aria-label="Distance in kilometres"
              value={exercise.distanceKm}
              onChange={(event) =>
                onUpdate(exercise.key, { distanceKm: event.target.value })
              }
              disabled={disabled}
              className={numberInputClassName}
            />
          </Field>
          <Field label="Duration (min)">
            <Input
              type="number"
              inputMode="numeric"
              min="0"
              placeholder="0"
              aria-label="Duration in minutes"
              value={exercise.durationMin}
              onChange={(event) =>
                onUpdate(exercise.key, { durationMin: event.target.value })
              }
              disabled={disabled}
              className={numberInputClassName}
            />
          </Field>
        </div>
      ) : exercise.expanded ? (
        <div className="mt-3 space-y-2">
          <div className="hidden grid-cols-[2.5rem_1fr_1fr_2rem] gap-2 px-0.5 text-[10px] text-muted-foreground xs:grid">
            <span />
            <span>Reps</span>
            <span>Weight ({WEIGHT_UNIT})</span>
            <span />
          </div>
          {exercise.setDetails.map((set, index) => (
            <div
              key={`${exercise.key}-set-${index}`}
              className="grid grid-cols-1 gap-2 xs:grid-cols-[2.5rem_1fr_1fr_2rem] xs:items-center"
            >
              <span className="text-[11px] text-muted-foreground">
                Set {index + 1}
              </span>
              <Input
                type="number"
                inputMode="numeric"
                min="0"
                placeholder="Reps"
                aria-label={`Set ${index + 1} reps`}
                value={set.reps}
                onChange={(event) =>
                  updateSetDetail(index, "reps", event.target.value)
                }
                disabled={disabled}
                className={numberInputClassName}
              />
              <Input
                type="number"
                inputMode="decimal"
                step="0.5"
                min="0"
                placeholder={WEIGHT_UNIT}
                aria-label={`Set ${index + 1} weight`}
                value={set.weight}
                onChange={(event) =>
                  updateSetDetail(index, "weight", event.target.value)
                }
                disabled={disabled}
                className={numberInputClassName}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={disabled || exercise.setDetails.length <= 1}
                onClick={() =>
                  onUpdate(exercise.key, {
                    setDetails: exercise.setDetails.filter(
                      (_, i) => i !== index,
                    ),
                  })
                }
                aria-label={`Remove set ${index + 1}`}
                className="size-8 shrink-0 justify-self-end px-0 text-muted-foreground hover:text-red-500 xs:justify-self-center"
              >
                <Trash2 className="size-3.5" />
              </Button>
            </div>
          ))}
          {exercise.setDetails.length < MAX_SETS_PER_EXERCISE ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              disabled={disabled}
              onClick={() => {
                const last =
                  exercise.setDetails[exercise.setDetails.length - 1];
                onUpdate(exercise.key, {
                  setDetails: [
                    ...exercise.setDetails,
                    { reps: last?.reps ?? "", weight: last?.weight ?? "" },
                  ],
                });
              }}
              className="h-7 px-2 text-[11px] text-muted-foreground"
            >
              <Plus className="mr-1 size-3" />
              Add set
            </Button>
          ) : (
            <p className="text-[10px] text-muted-foreground">
              Max {MAX_SETS_PER_EXERCISE} sets per exercise.
            </p>
          )}
        </div>
      ) : (
        <div className="mt-3 grid grid-cols-3 gap-2">
          <Field label="Sets">
            <Input
              type="number"
              inputMode="numeric"
              min="0"
              placeholder="0"
              aria-label="Sets"
              value={exercise.sets}
              onChange={(event) =>
                onUpdate(exercise.key, { sets: event.target.value })
              }
              disabled={disabled}
              className={numberInputClassName}
            />
          </Field>
          <Field label="Reps">
            <Input
              type="number"
              inputMode="numeric"
              min="0"
              placeholder="0"
              aria-label="Reps"
              value={exercise.reps}
              onChange={(event) =>
                onUpdate(exercise.key, { reps: event.target.value })
              }
              disabled={disabled}
              className={numberInputClassName}
            />
          </Field>
          <Field label={`Weight (${WEIGHT_UNIT})`}>
            <Input
              type="number"
              inputMode="decimal"
              step="0.5"
              min="0"
              placeholder="0"
              aria-label={`Weight in ${WEIGHT_UNIT}`}
              value={exercise.weight}
              onChange={(event) =>
                onUpdate(exercise.key, { weight: event.target.value })
              }
              disabled={disabled}
              className={numberInputClassName}
            />
          </Field>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-1">
      <Label className="text-[10px] text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}
