"use server"
export async function fetch_getInitialVideos() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/videos`, {
        cache: "no-store", // Optional: Prevent caching for fresh data
    });

    if (!response.ok) {
        throw new Error("Failed to fetch videos");
    }

    return response.json();
}

