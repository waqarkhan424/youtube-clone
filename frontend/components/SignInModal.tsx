"use client";
import { useState } from "react";
import axios from "axios";

interface SignInModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose }) => {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [channelName, setChannelName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [profilePic, setProfilePic] = useState<File | null>(null);

    const handleSubmit = async () => {

        try {
            const formData = new FormData();
            formData.append("username", username);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("channelName", channelName);
            formData.append("description", description);
            if (profilePic) {
                formData.append("profilePic", profilePic);
            }


            // Send data to backend
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log("User created successfully:", response.data);
            onClose(); // Close the modal after successful submission
        } catch (error) {
            console.error("Error creating user:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-md w-96">
                <h2 className="text-xl font-bold mb-4">Sign In</h2>
                <div className="flex flex-col gap-2">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border p-2 rounded-md"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border p-2 rounded-md"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border p-2 rounded-md"
                    />
                    <input
                        type="text"
                        placeholder="Channel Name"
                        value={channelName}
                        onChange={(e) => setChannelName(e.target.value)}
                        className="border p-2 rounded-md"
                    />
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border p-2 rounded-md"
                    />
                    <input
                        type="file"
                        onChange={(e) => setProfilePic(e.target.files?.[0] || null)}
                        className="border p-2 rounded-md"
                    />
                </div>
                <div className="flex justify-end gap-2 mt-4">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-md">
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignInModal;
