import { League_Spartan, Lora } from "next/font/google";
import localFont from "next/font/local";

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

export const fontUbuntu = localFont({
  src: [
    {
      path: "../../assets/fonts/lt_remark/LTRemark-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../assets/fonts/lt_remark/LTRemark-Italic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../assets/fonts/lt_remark/LTRemark-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../assets/fonts/lt_remark/LTRemark-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../assets/fonts/lt_remark/LTRemark-Black.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../assets/fonts/lt_remark/LTRemark-BlackItalic.otf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-ubuntu",
});
