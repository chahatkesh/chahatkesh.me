"use client";

import { useState } from "react";
import { Dumbbell, Loader2, Pencil, Trash2 } from "lucide-react";

import {
  AdminListCard,
  AdminListMeta,
  adminListDangerActionClassName,
  adminListIconActionClassName,
} from "~/components/admin";
import { Button } from "~/components/ui";
import { MAX_RECENT_GYM_SESSIONS } from "~/constants/limits";
import {
  GYM_REST_DAY_COLOR,
  MUSCLE_GROUP_COLORS,
  MUSCLE_GROUP_LABELS,
  WEIGHT_UNIT,
} from "~/constants/gym";
import { parseGymDate, sessionVolume } from "~/lib/gym";
import type { WorkoutSession } from "~/types/gym";
import { RestDayIcon } from "./rest-day-icon";

interface WorkoutSessionListProps {
  sessions: WorkoutSession[];
  deletingId: string | null;
  onEdit: (session: WorkoutSession) => void;
  onDelete: (session: WorkoutSession) => void;
  /** How many sessions to show before "Show all". Defaults to MAX_RECENT_GYM_SESSIONS. */
  initialVisible?: number;
}

export function WorkoutSessionList({
  sessions,
  deletingId,
  onEdit,
  onDelete,
  initialVisible = MAX_RECENT_GYM_SESSIONS,
}: WorkoutSessionListProps) {
  const [expanded, setExpanded] = useState(false);

  if (sessions.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-border bg-muted/10 px-4 py-8 text-center text-sm text-muted-foreground">
        No sessions logged yet.
      </p>
    );
  }

  const canCollapse = sessions.length > initialVisible;
  const visibleSessions =
    expanded || !canCollapse ? sessions : sessions.slice(0, initialVisible);
  const hiddenCount = sessions.length - initialVisible;

  return (
    <div className="space-y-3">
      {visibleSessions.map((session, index) => {
        const isRest = Boolean(session.isRestDay);
        const volume = isRest ? 0 : sessionVolume(session.exercises ?? []);

        return (
          <AdminListCard
            key={session._id}
            index={index}
            icon={
              isRest ? (
                <RestDayIcon
                  className="size-[18px]"
                  style={{ color: GYM_REST_DAY_COLOR }}
                />
              ) : (
                <Dumbbell className="size-[18px]" strokeWidth={1.75} />
              )
            }
            content={
              <div className="min-w-0 space-y-1.5 pr-1">
                <p className="text-sm font-medium tracking-tight text-foreground">
                  {parseGymDate(session.date).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                {isRest ? (
                  <div className="flex flex-wrap gap-1">
                    <span
                      className="rounded px-1.5 py-0.5 text-[10px] font-medium"
                      style={{
                        backgroundColor: `${GYM_REST_DAY_COLOR}22`,
                        color: GYM_REST_DAY_COLOR,
                      }}
                    >
                      Rest
                    </span>
                  </div>
                ) : (
                  <>
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
                    <AdminListMeta
                      items={[
                        `${session.exercises?.length ?? 0} exercises`,
                        session.durationMin
                          ? `${session.durationMin} min`
                          : null,
                        volume > 0
                          ? `${volume.toLocaleString()} ${WEIGHT_UNIT}`
                          : null,
                      ]}
                    />
                  </>
                )}
              </div>
            }
            actions={
              <>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(session)}
                  aria-label={isRest ? "Edit rest day" : "Edit session"}
                  className={adminListIconActionClassName}
                >
                  <Pencil className="size-3.5" />
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => onDelete(session)}
                  disabled={deletingId === session._id}
                  aria-label={isRest ? "Delete rest day" : "Delete session"}
                  className={adminListDangerActionClassName}
                >
                  {deletingId === session._id ? (
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

      {canCollapse ? (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setExpanded((value) => !value)}
          className="w-full text-muted-foreground"
        >
          {expanded
            ? "Show less"
            : `Show ${hiddenCount} older session${hiddenCount === 1 ? "" : "s"}`}
        </Button>
      ) : null}
    </div>
  );
}
