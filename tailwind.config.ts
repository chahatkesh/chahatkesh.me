import type { Config } from "tailwindcss";
import animatePlugin from "tailwindcss-animate";
import plugin from "tailwindcss/plugin";
import { fontFamily } from "tailwindcss/defaultTheme";

const shadcnPlugin = plugin(
  function ({ addBase, addVariant }) {
    addVariant("light", "@media (prefers-color-scheme: light)");
    addBase({
      "*": {
        "@apply border-border": {},
      },
      body: {
        "@apply bg-background text-foreground": {},
      },
    });
  },
  {
    theme: {
      container: {
        center: true,
        padding: "1rem",
        screens: {
          xl: "57rem",
        },
      },
      extend: {
        typography: {
          DEFAULT: {
            css: {
              maxWidth: "100ch",
            },
          },
        },
        fontFamily: {
          sans: ["var(--font-sans)", ...fontFamily.sans],
          ubuntu: "var(--font-ubuntu)",
          poem: ["var(--font-poem)", ...fontFamily.serif],
        },
        screens: {
          xs: "380px",
          sm: "500px",
        },
        colors: {
          border: "hsl(var(--border) / <alpha-value>)",
          input: "hsl(var(--input) / <alpha-value>)",
          ring: "hsl(var(--ring) / <alpha-value>)",
          background: "hsl(var(--background) / <alpha-value>)",
          foreground: "hsl(var(--foreground) / <alpha-value>)",
          brand: {
            DEFAULT: "hsl(var(--ring) / <alpha-value>)",
            foreground: "hsl(var(--brand-foreground) / <alpha-value>)",
          },
          info: "hsl(var(--info) / <alpha-value>)",
          warning: "hsl(var(--warning) / <alpha-value>)",
          success: "hsl(var(--success) / <alpha-value>)",
          danger: "hsl(var(--danger) / <alpha-value>)",
          scrim: "hsl(var(--media-accent) / <alpha-value>)",
          primary: {
            DEFAULT: "hsl(var(--primary) / <alpha-value>)",
            foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
          },
          secondary: {
            DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
            foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
          },
          destructive: {
            DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
            foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
          },
          muted: {
            DEFAULT: "hsl(var(--muted) / <alpha-value>)",
            foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
          },
          accent: {
            DEFAULT: "hsl(var(--accent) / <alpha-value>)",
            foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
          },
          popover: {
            DEFAULT: "hsl(var(--popover) / <alpha-value>)",
            foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
          },
          card: {
            DEFAULT: "hsl(var(--card) / <alpha-value>)",
            foreground: "hsl(var(--card-foreground) / <alpha-value>)",
          },
        },
        borderRadius: {
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)",
        },
        keyframes: {
          "accordion-down": {
            from: { height: "0" },
            to: { height: "var(--radix-accordion-content-height)" },
          },
          "accordion-up": {
            from: { height: "var(--radix-accordion-content-height)" },
            to: { height: "0" },
          },
          "fade-in": {
            from: { opacity: "0" },
            to: { opacity: "1" },
          },
          "fade-up": {
            from: { opacity: "0", transform: "translateY(20px)" },
            to: { opacity: "1", transform: "translateY(0)" },
          },
        },
        animation: {
          "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out",
          "fade-in": "fade-in 0.5s ease-out",
          "fade-up": "fade-up 0.6s ease-out",
        },
        transitionTimingFunction: {
          smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
          "smooth-in": "cubic-bezier(0.4, 0, 1, 1)",
          "smooth-out": "cubic-bezier(0, 0, 0.2, 1)",
          "smooth-in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
        },
      },
    },
  },
);

const shadcnPreset = {
  prefix: "",
  content: [],
  plugins: [animatePlugin, shadcnPlugin],
} satisfies Config;

const config = {
  darkMode: "media",
  presets: [shadcnPreset],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;

export default config;
