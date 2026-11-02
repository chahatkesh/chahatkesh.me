"use client";

import Image, { type StaticImageData } from "next/image";
import { type DragEvent, type MouseEvent } from "react";
import bff from "~/assets/images/writings/frontend/bff.webp";
import cleanArchitecture from "~/assets/images/writings/frontend/clean-architecture.webp";
import hexagonal from "~/assets/images/writings/frontend/hexagonal.webp";
import hydration from "~/assets/images/writings/frontend/hydration.webp";
import isr from "~/assets/images/writings/frontend/isr.webp";
import javascriptWeight from "~/assets/images/writings/frontend/javascript-weight.webp";
import modularMonolith from "~/assets/images/writings/frontend/modular-monolith.webp";
import mvc from "~/assets/images/writings/frontend/mvc.webp";
import rsc from "~/assets/images/writings/frontend/rsc.webp";
import spa from "~/assets/images/writings/frontend/spa.webp";
import ssg from "~/assets/images/writings/frontend/ssg.webp";
import ssr from "~/assets/images/writings/frontend/ssr.webp";
import thinVsThick from "~/assets/images/writings/frontend/thin-vs-thick.webp";

const figures = {
  bff,
  "clean-architecture": cleanArchitecture,
  hexagonal,
  hydration,
  isr,
  "javascript-weight": javascriptWeight,
  "modular-monolith": modularMonolith,
  mvc,
  rsc,
  spa,
  ssg,
  ssr,
  "thin-vs-thick": thinVsThick,
} as const satisfies Record<string, StaticImageData>;

type WritingFigureName = keyof typeof figures;

function isFigure(src: string): src is WritingFigureName {
  return src in figures;
}

/** Column is 55rem at the top breakpoint. Phones scroll a 40rem-wide diagram. */
const FIGURE_SIZES =
  "(min-width: 57rem) 55rem, (min-width: 40rem) 100vw, 40rem";

function blockImageAction(event: MouseEvent | DragEvent) {
  event.preventDefault();
}

export function WritingFigure({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  if (!isFigure(src)) {
    throw new Error(`Unknown writing figure "${src}".`);
  }

  return (
    <figure className="writing-figure font-sans">
      <div
        className="writing-figure-frame"
        onContextMenu={blockImageAction}
        onDragStart={blockImageAction}
      >
        <Image
          src={figures[src]}
          alt={alt}
          sizes={FIGURE_SIZES}
          quality={90}
          draggable={false}
        />
      </div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}
