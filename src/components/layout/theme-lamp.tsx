"use client";

import { useId, useRef, useState, type PointerEvent } from "react";
import { useColorScheme } from "~/hooks/use-color-scheme";
import { getColorScheme, setColorScheme } from "~/lib/color-scheme";
import styles from "./theme-lamp.module.css";

export default function ThemeLamp() {
  const id = useId();
  const light = useColorScheme() === "light";
  const start = useRef<{ id: number; y: number } | null>(null);
  const skipClick = useRef(false);
  const [pull, setPull] = useState(0);
  const toggle = () =>
    setColorScheme(getColorScheme() === "light" ? "dark" : "light");

  function release(event: PointerEvent<HTMLButtonElement>) {
    if (start.current?.id !== event.pointerId) return;
    const distance = event.clientY - start.current.y;
    skipClick.current = Math.abs(distance) > 5;
    if (distance >= 14) toggle();
    start.current = null;
    setPull(0);
  }

  return (
    <button
      type="button"
      className={`${styles.lamp} el-focus-styles`}
      aria-label="Light mode"
      aria-pressed={light}
      onPointerDown={(event) => {
        if (!event.isPrimary || event.button !== 0) return;
        start.current = { id: event.pointerId, y: event.clientY };
        skipClick.current = false;
        event.currentTarget.setPointerCapture(event.pointerId);
        setPull(2);
      }}
      onPointerMove={(event) => {
        if (start.current?.id === event.pointerId)
          setPull(
            Math.min(17, Math.max(2, (event.clientY - start.current.y) * 0.65)),
          );
      }}
      onPointerUp={release}
      onLostPointerCapture={() => {
        start.current = null;
        setPull(0);
      }}
      onClick={(event) => {
        if (!event.detail || !skipClick.current) toggle();
        skipClick.current = false;
      }}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 80 155"
        width="80"
        height="155"
        fill="none"
        className={styles.fixture}
      >
        <defs>
          <linearGradient
            id={`${id}-copper`}
            x2="1"
            y2=".25"
            gradientUnits="objectBoundingBox"
          >
            <stop stopColor="#653623" />
            <stop offset=".22" stopColor="#bc7953" />
            <stop offset=".38" stopColor="#b46c48" />
            <stop offset=".74" stopColor="#955235" />
            <stop offset="1" stopColor="#693922" />
          </linearGradient>
          <linearGradient id={`${id}-brass`}>
            <stop stopColor="#896943" />
            <stop offset=".35" stopColor="#dabe84" />
            <stop offset=".65" stopColor="#ae8f5c" />
            <stop offset="1" stopColor="#735a39" />
          </linearGradient>
          <radialGradient id={`${id}-wood`} cx=".32" cy=".24" r=".85">
            <stop stopColor="#f1be82" />
            <stop offset=".58" stopColor="#cf9155" />
            <stop offset="1" stopColor="#995d32" />
          </radialGradient>
          <radialGradient id={`${id}-halo`}>
            <stop stopColor="#fff0b7" stopOpacity=".8" />
            <stop offset=".4" stopColor="#ffd487" stopOpacity=".3" />
            <stop offset="1" stopColor="#edb764" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${id}-beam`} x1="0" x2="0" y1="0" y2="1">
            <stop stopColor="#ffe2a6" stopOpacity=".19" />
            <stop offset=".52" stopColor="#ffd596" stopOpacity=".08" />
            <stop offset="1" stopColor="#ffdc9e" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M25 0h30c0 5-7 8-15 8S25 5 25 0Z" fill={`url(#${id}-brass)`} />
        <g className={styles.shade}>
          <g className={styles.glow}>
            <path
              d="M7 63 Q40 65 73 63 L134 212 H-54Z"
              fill={`url(#${id}-beam)`}
            />
            <ellipse
              cx="40"
              cy="66"
              rx="26"
              ry="27"
              fill={`url(#${id}-halo)`}
            />
          </g>
          <path d="M40 5v20" stroke="#9f8966" strokeWidth="2" />
          <rect
            x="34"
            y="20"
            width="12"
            height="14"
            rx="3"
            fill={`url(#${id}-brass)`}
          />
          <rect x="32" y="29" width="16" height="6" rx="2" fill="#775337" />
          <ellipse className={styles.bulb} cx="40" cy="64" rx="8" ry="9" />
          <path
            d="M5 62c10-5 18-14 23-27 1-3 3-4 6-4h12c3 0 5 1 6 4 5 13 13 22 23 27v2Q40 68 5 64Z"
            fill={`url(#${id}-copper)`}
          />
          <path
            d="M6 64q34 3 68 0"
            stroke="#ddb38a"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
          <circle cx="60" cy="63" r="2.2" fill="#745840" stroke="#cca679" />
        </g>
        <g className={styles.cord}>
          <path
            className={styles.chain}
            d="M60 64v68"
            stroke="#b2a48d"
            strokeWidth="1.7"
            style={{
              transform: `scaleY(${1 + pull / 68})`,
              transitionDuration: pull ? "0ms" : undefined,
            }}
          />
          <g
            className={styles.weight}
            style={{
              transform: `translateY(${pull}px)`,
              transitionDuration: pull ? "0ms" : undefined,
            }}
          >
            <ellipse
              cx="60"
              cy="140"
              rx="9.3"
              ry="10.5"
              fill={`url(#${id}-wood)`}
            />
          </g>
        </g>
      </svg>
      <span aria-hidden="true" className={styles.hint}>
        Pull for {light ? "dark" : "light"}
      </span>
    </button>
  );
}
