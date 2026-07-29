"use client";
import { type ReactNode, Suspense } from "react";
import { MotionConfig } from "framer-motion";

import { TooltipProvider } from "~/components/ui";
import ReactQueryProvider from "./react-query";
import { PageTrackingWrapper } from "~/hooks";

const RootProviders = ({ children }: { children: ReactNode }) => {
  return (
    <ReactQueryProvider>
      <TooltipProvider>
        <MotionConfig reducedMotion="user">
          <Suspense fallback={null}>
            <PageTrackingWrapper>{children}</PageTrackingWrapper>
          </Suspense>
        </MotionConfig>
      </TooltipProvider>
    </ReactQueryProvider>
  );
};

export default RootProviders;
