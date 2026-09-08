"use client";

import { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock3,
  Keyboard,
  Layers3,
} from "lucide-react";
import { cn } from "~/lib/utils";

const LAYERS = [
  {
    name: "App",
    eyebrow: "What I write",
    description:
      "The product people touch: its windows, state, commands, and application logic. On disk it may be an app bundle; once launched, its executable is running as one or more processes.",
    examples: ["My code", "Resources", "Entitlements"],
  },
  {
    name: "Frameworks",
    eyebrow: "The public vocabulary",
    description:
      "AppKit and SwiftUI help describe interfaces, Core Text shapes text, Core Animation manages composited layers, and Metal exposes the GPU. These systems cooperate; this is a learning map, not a strict call stack.",
    examples: ["AppKit", "SwiftUI", "Core Text", "Metal"],
  },
  {
    name: "Loader & runtimes",
    eyebrow: "How code becomes alive",
    description:
      "The dynamic loader maps the executable and its dependencies. Language runtimes and libraries then provide machinery such as Objective-C message dispatch, Swift metadata, allocation, and queued work.",
    examples: ["dyld", "Objective-C", "Swift", "libdispatch"],
  },
  {
    name: "XNU kernel",
    eyebrow: "The privileged referee",
    description:
      "XNU combines Mach, BSD subsystems, and IOKit. It schedules threads, manages virtual memory, exposes files and sockets, mediates devices, and enforces boundaries between processes.",
    examples: ["Mach", "BSD", "IOKit"],
  },
  {
    name: "Apple silicon",
    eyebrow: "The physical machine",
    description:
      "CPU and GPU cores, unified memory, storage, displays, and devices do the physical work. Everything above exists partly to share this hardware safely and predictably.",
    examples: ["CPU", "GPU", "Memory", "Devices"],
  },
] as const;

const KEYSTROKE_STEPS = [
  {
    label: "Key",
    title: "The keyboard reports an input",
    body: "A key press begins as a hardware event. The device and its driver turn that physical change into data the operating system can understand.",
  },
  {
    label: "Kernel",
    title: "The event crosses the device boundary",
    body: "The HID and IOKit path brings the input into the system. The exact route varies by keyboard and OS version, but application code never polls the key switch directly.",
  },
  {
    label: "WindowServer",
    title: "macOS finds the destination",
    body: "WindowServer participates in deciding which onscreen application and window should receive the event, according to focus and the current session.",
  },
  {
    label: "App",
    title: "The application receives an event",
    body: "AppKit represents the input as an event and routes it through the app. Eventually a control—perhaps a text view—accepts it and changes its state.",
  },
  {
    label: "Layout",
    title: "The interface becomes dirty",
    body: "Changing the text invalidates some combination of layout and display. The app and frameworks prepare the content that must appear in a future frame.",
  },
  {
    label: "Render",
    title: "Text and layers become pixels",
    body: "Text shaping, drawing, Core Animation, and GPU work contribute to renderable surfaces. The details are more parallel and more cached than a single neat pipeline suggests.",
  },
  {
    label: "Display",
    title: "The compositor presents the result",
    body: "WindowServer composites the app's surface with the rest of the desktop. At a display refresh, the new frame can finally make the letter visible.",
  },
] as const;

type Panel = "layers" | "keystroke" | "budget";

export function MacOSInternalsLab() {
  const [panel, setPanel] = useState<Panel>("layers");
  const [layerIndex, setLayerIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [refreshRate, setRefreshRate] = useState(120);
  const [workTime, setWorkTime] = useState(8);

  const budget = 1000 / refreshRate;
  const frameCount = Math.max(1, Math.ceil(workTime / budget));
  const missedFrames = frameCount - 1;
  const presentationTime = frameCount * budget;
  const activeLayer = LAYERS[layerIndex]!;
  const activeStep = KEYSTROKE_STEPS[stepIndex]!;

  const verdict = useMemo(() => {
    if (missedFrames === 0) return "Inside the idealized frame budget";
    if (missedFrames === 1) return "One refresh opportunity missed";
    return `${missedFrames} refresh opportunities missed`;
  }, [missedFrames]);

  return (
    <section
      aria-label="Interactive macOS internals lab"
      className="writing-macos-lab my-8 overflow-hidden rounded-2xl border border-border/80 bg-card/30 font-sans shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]"
    >
      <div
        className="flex gap-1 overflow-x-auto border-b border-border/80 p-1.5"
        aria-label="macOS internals explorations"
      >
        <LabTab active={panel === "layers"} onClick={() => setPanel("layers")}>
          Five layers
        </LabTab>
        <LabTab
          active={panel === "keystroke"}
          onClick={() => setPanel("keystroke")}
        >
          One keystroke
        </LabTab>
        <LabTab active={panel === "budget"} onClick={() => setPanel("budget")}>
          Frame budget
        </LabTab>
      </div>

      {panel === "layers" && (
        <div className="grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
          <div className="border-b border-border/80 p-4 lg:border-b-0 lg:border-r">
            <div className="mx-auto flex max-w-sm flex-col gap-1.5">
              {LAYERS.map((layer, index) => (
                <button
                  key={layer.name}
                  type="button"
                  onClick={() => setLayerIndex(index)}
                  aria-pressed={index === layerIndex}
                  className="el-focus-styles group flex items-center justify-between rounded-lg border border-border/70 bg-background/40 px-3 py-2.5 text-left text-muted-foreground transition-all hover:border-ring/30 hover:text-foreground aria-pressed:border-ring/50 aria-pressed:bg-ring/10 aria-pressed:text-foreground"
                >
                  <span className="flex items-center gap-2.5">
                    <span className="font-mono text-[10px] tabular-nums text-ring/75">
                      {String(LAYERS.length - index).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-medium">{layer.name}</span>
                  </span>
                  <Layers3
                    aria-hidden
                    className={cn(
                      "size-3.5 transition-opacity",
                      index === layerIndex
                        ? "text-ring"
                        : "opacity-25 group-hover:opacity-60",
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="p-5 sm:p-7" aria-live="polite" aria-atomic="true">
            <p className="!mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ring">
              {activeLayer.eyebrow}
            </p>
            <h3 className="!mb-3 !mt-0 border-0 p-0 font-poem text-xl font-semibold text-foreground">
              {activeLayer.name}
            </h3>
            <p className="!mb-5 text-sm leading-7 text-muted-foreground">
              {activeLayer.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {activeLayer.examples.map((example) => (
                <span
                  key={example}
                  className="rounded-full border border-border/80 bg-background/50 px-2.5 py-1 font-mono text-[11px] text-foreground/80"
                >
                  {example}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {panel === "keystroke" && (
        <div className="p-5 sm:p-7">
          <div className="mb-6 flex items-center gap-2">
            {KEYSTROKE_STEPS.map((step, index) => (
              <button
                key={step.label}
                type="button"
                onClick={() => setStepIndex(index)}
                aria-label={`Step ${index + 1}: ${step.label}`}
                aria-current={index === stepIndex ? "step" : undefined}
                className="el-focus-styles group flex min-h-11 min-w-0 flex-1 items-center rounded-full"
              >
                <span
                  className={cn(
                    "block h-1.5 rounded-full transition-colors",
                    index <= stepIndex
                      ? "bg-ring"
                      : "bg-border group-hover:bg-ring/40",
                  )}
                />
                <span className="sr-only">{step.label}</span>
              </button>
            ))}
          </div>

          <div className="grid items-start gap-6 sm:grid-cols-[auto_1fr]">
            <div className="flex size-11 items-center justify-center rounded-full border border-ring/30 bg-ring/10 text-ring">
              <Keyboard aria-hidden className="size-5" />
            </div>
            <div aria-live="polite" aria-atomic="true">
              <p className="!mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ring">
                Step {stepIndex + 1} of {KEYSTROKE_STEPS.length} ·{" "}
                {activeStep.label}
              </p>
              <h3 className="!mb-3 !mt-0 border-0 p-0 font-poem text-xl font-semibold text-foreground">
                {activeStep.title}
              </h3>
              <p className="!mb-0 max-w-xl text-sm leading-7 text-muted-foreground">
                {activeStep.body}
              </p>
            </div>
          </div>

          <div className="mt-7 flex items-center justify-between border-t border-border/70 pt-4">
            <StepButton
              direction="previous"
              disabled={stepIndex === 0}
              onClick={() => setStepIndex((current) => current - 1)}
            />
            <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
              {String(stepIndex + 1).padStart(2, "0")} /{" "}
              {String(KEYSTROKE_STEPS.length).padStart(2, "0")}
            </span>
            <StepButton
              direction="next"
              disabled={stepIndex === KEYSTROKE_STEPS.length - 1}
              onClick={() => setStepIndex((current) => current + 1)}
            />
          </div>
        </div>
      )}

      {panel === "budget" && (
        <div className="grid gap-7 p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_17rem]">
          <div>
            <div className="mb-6">
              <p className="!mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ring">
                Idealized deadline
              </p>
              <h3 className="!mb-2 !mt-0 border-0 p-0 font-poem text-xl font-semibold text-foreground">
                How much time does one refresh leave?
              </h3>
              <p className="!mb-0 text-sm leading-7 text-muted-foreground">
                This calculator assumes work starts at a refresh boundary. Real
                latency also depends on input timing, buffering, scheduling,
                variable refresh rate, and the compositor.
              </p>
            </div>

            <fieldset className="mb-7">
              <legend className="mb-2 text-xs font-medium text-foreground">
                Display refresh rate
              </legend>
              <div className="flex gap-2">
                {[60, 90, 120].map((rate) => (
                  <button
                    key={rate}
                    type="button"
                    onClick={() => setRefreshRate(rate)}
                    aria-pressed={refreshRate === rate}
                    className={cn(
                      "el-focus-styles rounded-md border px-3 py-1.5 font-mono text-xs transition-colors",
                      refreshRate === rate
                        ? "border-ring/50 bg-ring/10 text-ring"
                        : "border-border text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {rate} Hz
                  </button>
                ))}
              </div>
            </fieldset>

            <label
              htmlFor="macos-work-time"
              className="mb-2 flex items-center justify-between gap-3 text-xs"
            >
              <span className="font-medium text-foreground">
                App + rendering work
              </span>
              <span className="font-mono tabular-nums text-ring">
                {workTime.toFixed(1)} ms
              </span>
            </label>
            <input
              id="macos-work-time"
              type="range"
              min="1"
              max="25"
              step="0.5"
              value={workTime}
              onChange={(event) => setWorkTime(Number(event.target.value))}
              className="w-full accent-[hsl(var(--ring))]"
            />
          </div>

          <div
            className="rounded-xl border border-border/80 bg-background/45 p-5"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            <Clock3 aria-hidden className="mb-5 size-5 text-ring" />
            <dl className="space-y-4 text-sm">
              <Metric label="One refresh" value={`${budget.toFixed(2)} ms`} />
              <Metric
                label="Earliest idealized presentation"
                value={`${presentationTime.toFixed(2)} ms`}
              />
              <Metric label="Result" value={verdict} />
            </dl>
          </div>
        </div>
      )}
    </section>
  );
}

function LabTab({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "el-focus-styles shrink-0 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
        active
          ? "bg-ring/15 text-ring"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

function StepButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "previous" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  const Icon = direction === "previous" ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-label={`${direction === "previous" ? "Previous" : "Next"} step`}
      className="el-focus-styles flex size-8 items-center justify-center rounded-full border border-border/80 text-foreground transition-colors enabled:hover:border-ring/50 enabled:hover:text-ring disabled:cursor-not-allowed disabled:opacity-30"
    >
      <Icon aria-hidden className="size-4" />
    </button>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 font-mono text-sm leading-6 text-foreground">
        {value}
      </dd>
    </div>
  );
}
