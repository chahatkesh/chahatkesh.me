"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import useSWR, { mutate } from "swr";
import { ListChecks } from "lucide-react";

import {
  AdminConfirmDialog,
  AdminErrorState,
  AdminLoadingState,
  AdminPageHeader,
  ProtectedRoute,
} from "~/components/admin";
import { Button } from "~/components/ui";
import { WorkoutLogger, WorkoutSessionList } from "~/components/features/gym";
import { API_ROUTES } from "~/constants";
import { ADMIN_SWR_CONFIG, adminFetcher } from "~/lib/fetcher";
import { formatGymDate, parseGymDate } from "~/lib/gym";
import type {
  ExerciseHistoryApiResponse,
  GymExerciseListApiResponse,
  WorkoutListApiResponse,
  WorkoutSession,
} from "~/types/gym";

const BREADCRUMBS = [
  { name: "Admin", url: "/admin" },
  { name: "Gym", url: "/admin/gym" },
];

function AdminGymContent() {
  const { data, error, isLoading } = useSWR<WorkoutListApiResponse>(
    API_ROUTES.GYM,
    adminFetcher,
    ADMIN_SWR_CONFIG,
  );
  const { data: historyData } = useSWR<ExerciseHistoryApiResponse>(
    API_ROUTES.GYM_EXERCISE_HISTORY,
    adminFetcher,
    ADMIN_SWR_CONFIG,
  );
  const { data: catalogData } = useSWR<GymExerciseListApiResponse>(
    API_ROUTES.GYM_EXERCISES,
    adminFetcher,
    ADMIN_SWR_CONFIG,
  );

  const [selectedDate, setSelectedDate] = useState(() =>
    formatGymDate(new Date()),
  );
  const [editToken, setEditToken] = useState(0);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<WorkoutSession | null>(null);

  const refresh = useCallback(async () => {
    await Promise.all([
      mutate(API_ROUTES.GYM),
      mutate(API_ROUTES.GYM_EXERCISE_HISTORY),
      mutate(API_ROUTES.GYM_EXERCISES),
    ]);
  }, []);

  // The logger hydrates from the selected date, so editing just re-points it.
  const handleEdit = useCallback((session: WorkoutSession) => {
    setSelectedDate(session.date);
    setEditToken((token) => token + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const confirmDelete = useCallback(async () => {
    if (!deleteTarget) return;
    setDeletingId(deleteTarget._id);
    try {
      const response = await fetch(API_ROUTES.GYM_BY_ID(deleteTarget._id), {
        method: "DELETE",
      });
      if (!response.ok) {
        alert("Failed to delete session. Please try again.");
        return;
      }
      await refresh();
    } finally {
      setDeletingId(null);
      setDeleteTarget(null);
    }
  }, [deleteTarget, refresh]);

  if (isLoading) return <AdminLoadingState breadcrumbs={BREADCRUMBS} />;
  if (error || !data?.success) {
    return (
      <AdminErrorState
        breadcrumbs={BREADCRUMBS}
        errorMessage="Failed to load workouts. Please refresh and try again."
      />
    );
  }

  const sessions = data.data ?? [];

  return (
    <div className="space-y-6">
      <AdminPageHeader
        breadcrumbs={BREADCRUMBS}
        title="Workout Log"
        subtitle="Log sessions and rest days in a few taps."
      />

      <div className="flex flex-wrap justify-center gap-2 sm:justify-end">
        <Button asChild variant="outline" size="sm">
          <Link href="/admin/gym/photos">Progress photos</Link>
        </Button>
        <Button asChild variant="outline" size="sm">
          <Link href="/admin/gym/exercises">
            <ListChecks className="mr-1.5 size-3.5" />
            Manage exercises
          </Link>
        </Button>
      </div>

      <WorkoutLogger
        sessions={sessions}
        history={historyData?.data ?? []}
        catalog={catalogData?.data ?? []}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        onSaved={refresh}
        editToken={editToken}
      />

      <div className="space-y-3">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="text-sm font-semibold tracking-tight">
            Recent Sessions
          </h2>
          {sessions.length > 0 ? (
            <p className="text-xs text-muted-foreground">
              {sessions.length} total
            </p>
          ) : null}
        </div>
        <WorkoutSessionList
          sessions={sessions}
          deletingId={deletingId}
          onEdit={handleEdit}
          onDelete={setDeleteTarget}
        />
      </div>

      <AdminConfirmDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
        title={deleteTarget?.isRestDay ? "Delete rest day?" : "Delete session?"}
        description={
          deleteTarget
            ? deleteTarget.isRestDay
              ? `This removes the rest day logged on ${parseGymDate(
                  deleteTarget.date,
                ).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}. Your streak may change.`
              : `This removes the workout logged on ${parseGymDate(
                  deleteTarget.date,
                ).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}.`
            : undefined
        }
        loading={Boolean(deletingId)}
        loadingLabel="Deleting..."
        onConfirm={confirmDelete}
      />
    </div>
  );
}

export default function AdminGymPage() {
  return (
    <ProtectedRoute>
      <AdminGymContent />
    </ProtectedRoute>
  );
}
