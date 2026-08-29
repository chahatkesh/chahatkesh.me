import { League_Spartan, Lora, Outfit } from "next/font/google";

export const fontSans = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const fontPoem = Lora({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-poem",
  display: "swap",
});

// Headings use font-medium (500), font-semibold (600), and font-bold (700).
export const fontUbuntu = League_Spartan({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-ubuntu",
  display: "swap",
});
