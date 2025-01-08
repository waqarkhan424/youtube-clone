"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function ClientLayout({ children }: { children: React.ReactNode }) {

    // Initialize React Query client
    const [queryClient] = useState(() => new QueryClient());

    return (
        // Provide the React Query client to the application
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}
