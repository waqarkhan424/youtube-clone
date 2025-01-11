
import { create } from "zustand";
import axios from "axios";



interface User {
    id: string;
    username: string;
    email: string;
    channels?: Array<{
        channelName: string;
        description: string;
        profilePic: string;
    }>;
}




interface AppState {
    user: User | null;
    setUser: (user: User | null) => void;

    searchQuery: string;
    setSearchQuery: (query: string) => void;

    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;

    signOut: () => void; // New action for sign-out logic

    fetchUser: () => Promise<void>; // Fetch and store the user

}

const useStore = create<AppState>((set) => ({
    user: null, // Default user state
    setUser: (user) => set({ user }),

    searchQuery: "", // Default search query
    setSearchQuery: (query) => set({ searchQuery: query }),

    isModalOpen: false, // Default modal state
    setIsModalOpen: (isOpen) => set({ isModalOpen: isOpen }),

    signOut: () => {
        localStorage.removeItem("authToken"); // Remove token
        axios.post(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/logout`, {}, { withCredentials: true })
            .then(() => {
                set({ user: null }); // Clear user in Zustand store
                window.location.reload(); // Reload the app
            });
    },

    fetchUser: async () => {
        try {
            const token = localStorage.getItem("authToken"); // Ensure the token is stored in localStorage
            if (!token) throw new Error("No authentication token found");

            const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/me`, {
                withCredentials: true, // Ensure cookies are sent
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the request
                },
            });
            set({ user: response.data });
        } catch (error) {
            console.error("Failed to fetch user:", error);
            set({ user: null }); // Clear user on error
        }
    },






}));

export default useStore;
