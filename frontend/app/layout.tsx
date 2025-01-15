// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { useState } from "react";
// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";


// const geistSans = Geist({
//     variable: "--font-geist-sans",
//     subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//     variable: "--font-geist-mono",
//     subsets: ["latin"],
// });

// export const metadata: Metadata = {
//     title: "YouTube Clone",
//     description: "Generated by create next app",
// };

// export default function RootLayout({
//     children,
// }: Readonly<{
//     children: React.ReactNode;
// }>) {

//     const [queryClient] = useState(() => new QueryClient());

//     return (
//         <html lang="en">
//             <body
//                 className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//             >
//                 {/* {children} */}

//                 <QueryClientProvider client={queryClient}>
//                     {children}
//                 </QueryClientProvider>

//             </body>
//         </html>
//     );
// }



/////////////////////////////////////////////////////

import "./globals.css"; // Import global styles
import ClientLayout from "./layout.client"; // Import the client-side layout
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster"


// Metadata for SEO and browser
export const metadata: Metadata = {
    title: "YouTube Clone",
    description: "Generated by create next app",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>

                {/* Global Toaster for toast notifications */}
                <Toaster />

                {/* Wrap children with the client-side layout */}
                <ClientLayout>{children}</ClientLayout>
            </body>
        </html>
    );
}
