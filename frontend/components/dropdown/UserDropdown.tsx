import { useState } from "react";
import { useRouter } from "next/navigation";
import useStore from "@/store/useStore";



const UserDropdown: React.FC = () => {
    const router = useRouter();
    const [dropdownOpen, setDropdownOpen] = useState(false);


    // Access the user and signOut action from Zustand
    const user = useStore((state) => state.user);
    const signOut = useStore((state) => state.signOut);


    // Handle case when user or channels are not available
    if (!user || !user.channels?.length) return null;

    const { username, email, channels } = user;
    const { profilePic } = channels[0];
    const profilePicUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${profilePic}`;

    return (
        <div className="relative">
            <img
                src={profilePicUrl}
                alt="Profile Picture"
                className="w-10 h-10 rounded-full border cursor-pointer"
                onClick={() => setDropdownOpen((prev) => !prev)}
            />
            {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
                    <div className="p-4">
                        <img
                            src={profilePicUrl}
                            alt="Profile Picture"
                            className="w-12 h-12 rounded-full mx-auto"
                        />
                        <p className="text-center mt-2 font-bold">{username}</p>
                        <p className="text-center text-gray-600 text-sm">{email}</p>
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
