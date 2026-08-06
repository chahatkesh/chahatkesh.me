"use client";

import { useMemo, useState } from "react";
import useSWR, { mutate } from "swr";
import { Dumbbell, Loader2, Pencil, Trash2 } from "lucide-react";

import {
  AdminConfirmDialog,
  AdminErrorState,
  AdminListCard,
  AdminListCreateTile,
  AdminListMeta,
  AdminLoadingState,
  AdminPageHeader,
  ProtectedRoute,
  adminListDangerActionClassName,
  adminListIconActionClassName,
} from "~/components/admin";
import { Button, Input, Label } from "~/components/ui";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";
import {
  MUSCLE_GROUPS,
  MUSCLE_GROUP_COLORS,
  MUSCLE_GROUP_LABELS,
} from "~/constants/gym";
import type { MuscleGroup } from "~/constants/gym";
import { API_ROUTES } from "~/constants";
import { ADMIN_SWR_CONFIG, adminFetcher } from "~/lib/fetcher";
import type { GymExercise, GymExerciseListApiResponse } from "~/types/gym";

const BREADCRUMBS = [
  { name: "Admin", url: "/admin" },
  { name: "Gym", url: "/admin/gym" },
  { name: "Exercises", url: "/admin/gym/exercises" },
];

type ExerciseFormState = {
  name: string;
  group: MuscleGroup;
};

const createInitialFormState = (): ExerciseFormState => ({
  name: "",
  group: "chest",
});

function AdminGymExercisesContent() {
  const { data, error, isLoading } = useSWR<GymExerciseListApiResponse>(
    API_ROUTES.GYM_EXERCISES,
    adminFetcher,
    ADMIN_SWR_CONFIG,
  );

  const [filterGroup, setFilterGroup] = useState<MuscleGroup | "all">("all");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editing, setEditing] = useState<GymExercise | null>(null);
  const [formData, setFormData] = useState<ExerciseFormState>(
    createInitialFormState(),
  );
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<GymExercise | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const exercises = useMemo(() => data?.data ?? [], [data?.data]);

  const filtered = useMemo(() => {
    if (filterGroup === "all") return exercises;
    return exercises.filter((exercise) => exercise.group === filterGroup);
  }, [exercises, filterGroup]);

  const openCreate = () => {
    setEditing(null);
    setFormData(createInitialFormState());
    setFormError(null);
    setIsSheetOpen(true);
  };

  const openEdit = (exercise: GymExercise) => {
    setEditing(exercise);
    setFormData({ name: exercise.name, group: exercise.group });
    setFormError(null);
    setIsSheetOpen(true);
  };

  const save = async () => {
    const name = formData.name.trim();
    if (!name) {
      setFormError("Exercise name is required.");
      return;
    }

    setIsSaving(true);
    setFormError(null);
    try {
      const response = await fetch(
        editing
          ? API_ROUTES.GYM_EXERCISE_BY_ID(editing._id)
          : API_ROUTES.GYM_EXERCISES,
        {
          method: editing ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, group: formData.group }),
        },
      );
      const payload = (await response.json()) as {
        success?: boolean;
        error?: string;
      };
      if (!response.ok || !payload.success) {
        setFormError(payload.error ?? "Failed to save exercise.");
        return;
      }
      setIsSheetOpen(false);
      await mutate(API_ROUTES.GYM_EXERCISES);
    } catch {
      setFormError("Failed to save exercise.");
    } finally {
      setIsSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeletingId(deleteTarget._id);
    setDeleteError(null);
    try {
      const response = await fetch(
        API_ROUTES.GYM_EXERCISE_BY_ID(deleteTarget._id),
        { method: "DELETE" },
      );
      const payload = (await response.json()) as {
        success?: boolean;
        error?: string;
      };
      if (!response.ok || !payload.success) {
        setDeleteError(payload.error ?? "Failed to delete exercise.");
        return;
      }
      setDeleteTarget(null);
      await mutate(API_ROUTES.GYM_EXERCISES);
    } catch {
      setDeleteError("Failed to delete exercise.");
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) return <AdminLoadingState breadcrumbs={BREADCRUMBS} />;
  if (error || !data?.success) {
    return (
      <AdminErrorState
        breadcrumbs={BREADCRUMBS}
        errorMessage="Failed to load exercises. Please refresh and try again."
      />
    );
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        breadcrumbs={BREADCRUMBS}
        title="Exercise Catalog"
        subtitle="Manage the exercises available when logging workouts."
      />

      <div className="flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={() => setFilterGroup("all")}
          className={`rounded-md border px-2.5 py-1 text-[11px] transition-colors ${
            filterGroup === "all"
              ? "border-foreground/30 bg-muted text-foreground"
              : "border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          All ({exercises.length})
        </button>
        {MUSCLE_GROUPS.map((group) => {
          const count = exercises.filter((item) => item.group === group).length;
          const active = filterGroup === group;
          const color = MUSCLE_GROUP_COLORS[group];
          return (
            <button
              key={group}
              type="button"
              onClick={() => setFilterGroup(group)}
              className="rounded-md border px-2.5 py-1 text-[11px] transition-colors"
              style={
                active
                  ? {
                      borderColor: `${color}66`,
                      backgroundColor: `${color}26`,
                      color,
                    }
                  : undefined
              }
            >
              {MUSCLE_GROUP_LABELS[group]} ({count})
            </button>
          );
        })}
      </div>

      <div className="space-y-3">
        <AdminListCreateTile label="Add exercise" onClick={openCreate} />

        {filtered.map((exercise, index) => {
          const isDeleting = deletingId === exercise._id;
          const canDelete = exercise.usageCount === 0;
          const color = MUSCLE_GROUP_COLORS[exercise.group];

          return (
            <AdminListCard
              key={exercise._id}
              index={index}
              disabled={isDeleting}
              icon={
                <Dumbbell
                  className="size-5"
                  strokeWidth={1.75}
                  style={{ color }}
                />
              }
              title={exercise.name}
              meta={
                <AdminListMeta
                  items={[
                    MUSCLE_GROUP_LABELS[exercise.group],
                    exercise.usageCount > 0
                      ? `${exercise.usageCount} session${exercise.usageCount === 1 ? "" : "s"}`
                      : "Unused",
                  ]}
                />
              }
              actions={
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openEdit(exercise)}
                    disabled={isDeleting}
                    className={adminListIconActionClassName}
                    aria-label="Edit exercise"
                    title="Edit"
                  >
                    <Pencil className="size-3.5" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setDeleteError(null);
                      setDeleteTarget(exercise);
                    }}
                    disabled={isDeleting || !canDelete}
                    aria-label={
                      canDelete
                        ? "Delete exercise"
                        : "Cannot delete — used in logged sessions"
                    }
                    title={
                      canDelete
                        ? "Delete"
                        : "Used in logged sessions — cannot delete"
                    }
                    className={adminListDangerActionClassName}
                  >
                    {isDeleting ? (
                      <Loader2 className="size-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="size-3.5" />
                    )}
                  </Button>
                </>
              }
            />
          );
        })}

        {filtered.length === 0 ? (
          <p className="rounded-lg border border-dashed border-border px-4 py-8 text-center text-sm text-muted-foreground">
            No exercises in this group yet.
          </p>
        ) : null}
      </div>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>
              {editing ? "Edit exercise" : "Add exercise"}
            </SheetTitle>
            <SheetDescription>
              {editing
                ? "Renames update linked workout logs automatically."
                : "New exercises appear in the workout logger for their muscle group."}
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="exercise-name">Name</Label>
              <Input
                id="exercise-name"
                value={formData.name}
                onChange={(event) =>
                  setFormData((current) => ({
                    ...current,
                    name: event.target.value,
                  }))
                }
                maxLength={80}
                placeholder="e.g. Incline Dumbbell Press"
                disabled={isSaving}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="exercise-group">Muscle group</Label>
              <select
                id="exercise-group"
                value={formData.group}
                onChange={(event) =>
                  setFormData((current) => ({
                    ...current,
                    group: event.target.value as MuscleGroup,
                  }))
                }
                disabled={isSaving}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {MUSCLE_GROUPS.map((group) => (
                  <option key={group} value={group}>
                    {MUSCLE_GROUP_LABELS[group]}
                  </option>
                ))}
              </select>
            </div>

            {formError ? (
              <p className="text-sm text-red-500">{formError}</p>
            ) : null}

            <div className="flex justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsSheetOpen(false)}
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={() => void save()}
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Saving
                  </>
                ) : editing ? (
                  "Save changes"
                ) : (
                  "Add exercise"
                )}
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <AdminConfirmDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteTarget(null);
            setDeleteError(null);
          }
        }}
        title="Delete exercise?"
        description={
          deleteTarget
            ? `Remove "${deleteTarget.name}" from the catalog. This cannot be undone.`
            : undefined
        }
        loading={Boolean(deletingId)}
        onConfirm={confirmDelete}
      />

      {deleteError ? (
        <p className="text-sm text-red-500" role="alert">
          {deleteError}
        </p>
      ) : null}
    </div>
  );
}

export default function AdminGymExercisesPage() {
  return (
    <ProtectedRoute>
      <AdminGymExercisesContent />
    </ProtectedRoute>
  );
}
