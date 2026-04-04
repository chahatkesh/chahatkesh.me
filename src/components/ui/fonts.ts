import { League_Spartan, Lora } from "next/font/google";

export const fontSans = League_Spartan({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-sans",
});

export const fontPoem = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-poem",
});
