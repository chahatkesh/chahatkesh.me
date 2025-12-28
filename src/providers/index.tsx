"use client";
import { ReactNode } from "react";

import { ScrollProgress } from "~/components/shared";
import { TooltipProvider, TopLoader, Toaster } from "~/components/ui";
import ReactQueryProvider from "./react-query";

const RootProviders = ({ children }: { children: ReactNode }) => {
  return (
    <ReactQueryProvider>
      <TooltipProvider>
        <ScrollProgress />
        <TopLoader />
        {children}
        <Toaster />
      </TooltipProvider>
    </ReactQueryProvider>
  );
};

export default RootProviders;
