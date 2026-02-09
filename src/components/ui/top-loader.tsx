"use client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { BRAND_ACCENT_HEX } from "~/constants";

const TopLoader = () => {
  return <ProgressBar height="4px" color={BRAND_ACCENT_HEX} shallowRouting />;
};

export default TopLoader;
