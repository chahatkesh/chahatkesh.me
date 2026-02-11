"use client";
import { type ReactNode, Suspense } from "react";

import { ScrollProgress } from "~/components/shared";
import SmoothScrollProvider from "~/components/shared/smooth-scroll-provider";
import { TooltipProvider, TopLoader } from "~/components/ui";
import ReactQueryProvider from "./react-query";
import { PageTrackingWrapper } from "~/hooks";

const RootProviders = ({ children }: { children: ReactNode }) => {
  return (
    <ReactQueryProvider>
      <SmoothScrollProvider>
        <TooltipProvider>
          <ScrollProgress />
          <TopLoader />
          <Suspense fallback={null}>
            <PageTrackingWrapper>{children}</PageTrackingWrapper>
          </Suspense>
        </TooltipProvider>
      </SmoothScrollProvider>
    </ReactQueryProvider>
  );
};

export default RootProviders;
