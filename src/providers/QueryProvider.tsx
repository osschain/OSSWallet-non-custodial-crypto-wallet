import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { PropsWithChildren } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: Infinity,
    },
  },
});

const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

export default function QueryProvider({ children }: PropsWithChildren) {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: asyncStoragePersister,
        dehydrateOptions: {
          shouldDehydrateQuery: (query) => {
            const queryIsReadyForPersistance = query.state.status === "success";
            if (queryIsReadyForPersistance) {
              const { queryKey } = query;

              const excludeFromPersisting =
                queryKey.includes("balances") ||
                queryKey.includes("assets") ||
                queryKey.includes("nfts") ||
                queryKey.includes("history") ||
                queryKey.includes("histories");

              return excludeFromPersisting;
            }
            return queryIsReadyForPersistance;
          },
        },
      }}
    >
      {children}
    </PersistQueryClientProvider>
  );
}
