"use client";
import { type ReactNode, Suspense } from "react";
import { MotionConfig } from "framer-motion";

import { TooltipProvider } from "~/components/ui";
import ReactQueryProvider from "./react-query";
import { PageTracker } from "~/hooks";

const RootProviders = ({ children }: { children: ReactNode }) => {
  return (
    <ReactQueryProvider>
      <TooltipProvider>
        <MotionConfig reducedMotion="user">
          <Suspense fallback={null}>
            <PageTracker />
          </Suspense>
          {children}
        </MotionConfig>
      </TooltipProvider>
    </ReactQueryProvider>
  );
};

export default RootProviders;
