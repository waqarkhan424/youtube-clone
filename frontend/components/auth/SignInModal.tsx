"use client";
import { useState } from "react";
import axios from "axios";
import Modal from "../shared/Modal";
import FormInput from "../shared/FormInput";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface User {
    username: string;
    email: string;
    profilePic?: string;
    channelName?: string;
    description?: string;
}

interface SignInModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSignInSuccess?: (user: User) => void; // Make it optional

}

const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose, onSignInSuccess }) => {
    const [isSignUp, setIsSignUp] = useState(true);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [channelName, setChannelName] = useState("");
    const [description, setDescription] = useState("");
    const [profilePic, setProfilePic] = useState<File | null>(null);

    const queryClient = useQueryClient();


    const resetForm = () => {
        setUsername("");
        setEmail("");
        setPassword("");
        setChannelName("");
        setDescription("");
        setProfilePic(null);
    };


    // Mutation for handling login or sign-up
    const mutation = useMutation({
        mutationFn: async (formData: FormData | { email: string; password: string }) => {
            const url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users${isSignUp ? "" : "/login"}`;
            const config = isSignUp
                ? { headers: { "Content-Type": "multipart/form-data" } }
                : { headers: { "Content-Type": "application/json" } };

            const response = await axios.post(url, formData, config);
            return response.data;
        },
        onSuccess: (data) => {
            if (onSignInSuccess) {
                onSignInSuccess(data); // Call only if it's provided
            }
            queryClient.invalidateQueries({ queryKey: ["user"] }); // Invalidate user queries if cached
            resetForm(); // Reset form
            onClose(); // Close modal
        },
        onError: (error) => {
            console.error("Error during authentication:", error);
        },
    });


    const handleSubmit = () => {
        if (!email.trim() || !password.trim()) {
            alert("Please provide both email and password.");
            return;
        }

        if (isSignUp) {
            const formData = new FormData();
            formData.append("username", username);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("channelName", channelName);
            formData.append("description", description);

            if (profilePic) {
                formData.append("profilePic", profilePic);
            }

            mutation.mutate(formData); // Trigger mutation for sign-up
        } else {
            mutation.mutate({ email, password }); // Trigger mutation for login
        }
    };


    // Close modal and reset form
    const handleClose = () => {
        resetForm();
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <h2 className="text-xl font-bold mb-4">{isSignUp ? "Sign Up" : "Login"}</h2>
            <div className="flex flex-col gap-2">
                {isSignUp && (
                    <>
                        <div>
                            <label
                                htmlFor="profile-pic-upload"
                                className="block text-gray-700 mb-1"
                            >
                                Upload Profile Picture
                            </label>
                            <FormInput
                                id="profile-pic-upload"
                                type="file"
                                accept="image/*"
                                onChange={(e) => setProfilePic((e.target as HTMLInputElement).files?.[0] || null)}
                            />
                        </div>

                        <FormInput
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <FormInput
                            type="text"
                            placeholder="Channel Name"
                            value={channelName}
                            onChange={(e) => setChannelName(e.target.value)}
                        />
                        <FormInput
                            type="textarea"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            isTextArea
                        />
                    </>
                )}
                <FormInput
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <FormInput
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="flex justify-between mt-4">
                <button
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-blue-500"
                >
                    {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
                </button>
                <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                    {isSignUp ? "Sign Up" : "Login"}
                </button>
            </div>
        </Modal>
    );
};

export default SignInModal;
