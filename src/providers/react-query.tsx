import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { FETCH_TIMEOUT_MS } from "~/constants";

function ReactQueryProvider({ children }: React.PropsWithChildren) {
  const [client] = React.useState(
    new QueryClient({
      defaultOptions: {
        queries: { staleTime: FETCH_TIMEOUT_MS, refetchOnWindowFocus: false },
      },
    }),
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

export default ReactQueryProvider;
