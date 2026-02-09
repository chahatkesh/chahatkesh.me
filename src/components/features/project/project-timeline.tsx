import { MotionDiv } from "~/components/shared";
import { typo } from "~/components/ui";
import config from "~/config";

interface ProjectTimelineProps {
  dateStarted: string;
  datePublished: string;
  dateModified: string;
}

function TimelineCard({
  label,
  date,
  sublabel,
  highlight,
}: {
  label: string;
  date: string;
  sublabel: string;
  highlight?: boolean;
}) {
  return (
    <div className="relative group">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${highlight ? "from-primary/20" : "from-primary/10"} to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />
      <div
        className={`relative p-6 rounded-lg border ${highlight ? "border-primary/50" : "border-neutral-800"} bg-neutral-900/50 backdrop-blur-sm`}
      >
        <div
          className={`text-sm ${highlight ? "text-primary/80" : "text-neutral-400"} mb-2`}
        >
          {label}
        </div>
        <time
          dateTime={date}
          className={`text-2xl font-bold ${highlight ? "text-primary" : "text-white"} block`}
        >
          {new Date(date).toLocaleDateString(config.seo.language, {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </time>
        <div className="text-xs text-neutral-500 mt-2">{sublabel}</div>
      </div>
    </div>
  );
}

/**
 * Shows the project timeline as 3 date cards: Started, Published, Last Updated.
 */
export function ProjectTimeline({
  dateStarted,
  datePublished,
  dateModified,
}: ProjectTimelineProps) {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.22 }}
      className="space-y-6"
    >
      <h2 className={typo({ variant: "h2" })}>Project Timeline</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TimelineCard
          label="Started Development"
          date={dateStarted}
          sublabel="First commit"
        />
        <TimelineCard
          label="Published"
          date={datePublished}
          sublabel="Official launch"
          highlight
        />
        <TimelineCard
          label="Last Updated"
          date={dateModified}
          sublabel="Latest commit"
        />
      </div>
    </MotionDiv>
  );
}
