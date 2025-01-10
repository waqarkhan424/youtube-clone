import { useState } from "react";
import { useRouter } from "next/navigation";
import useStore from "@/store/useStore";


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

interface UserDropdownProps {
    user: User;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ user }) => {
    const router = useRouter();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Use the signOut action from Zustand
    const signOut = useStore((state) => state.signOut);

    return (
        <div className="relative">
            <img
                src={
                    user.channels?.[0]?.profilePic
                        ? `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${user.channels[0].profilePic}`
                        : "/default-profile.png"
                }
                alt={`${user.username}'s profile`}
                className="w-10 h-10 rounded-full border cursor-pointer"
                onClick={() => setDropdownOpen((prev) => !prev)}
            />
            {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
                    <div className="p-4">
                        <img
                            src={
                                user.channels?.[0]?.profilePic
                                    ? `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${user.channels[0].profilePic}`
                                    : "/default-profile.png"
                            }
                            alt="Profile"
                            className="w-12 h-12 rounded-full mx-auto"
                        />
                        <p className="text-center mt-2 font-bold">{user.username}</p>
                        <p className="text-center text-gray-600 text-sm">{user.email}</p>
                    </div>
                    <div className="border-t">
                        <button
                            className="block w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-100"
                            onClick={() => router.push("/your-channel")}
                        >
                            View Your Channel
                        </button>
                        <button
                            className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                            onClick={signOut} // Directly call the Zustand action
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDropdown;
