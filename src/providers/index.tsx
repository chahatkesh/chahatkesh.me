"use client";
import { ReactNode, Suspense } from "react";

import { ScrollProgress } from "~/components/shared";
import { TooltipProvider, TopLoader } from "~/components/ui";
import ReactQueryProvider from "./react-query";
import { PageTrackingWrapper } from "~/hooks";

const RootProviders = ({ children }: { children: ReactNode }) => {
  return (
    <ReactQueryProvider>
      <TooltipProvider>
        <ScrollProgress />
        <TopLoader />
        <Suspense fallback={null}>
          <PageTrackingWrapper>{children}</PageTrackingWrapper>
        </Suspense>
      </TooltipProvider>
    </ReactQueryProvider>
  );
};

export default RootProviders;
