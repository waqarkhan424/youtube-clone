"use client";
import { useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useStore from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
} from "@/components/ui/dialog";

const SignInModal: React.FC = () => {
    const [isSignUp, setIsSignUp] = useState(true);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [channelName, setChannelName] = useState("");
    const [description, setDescription] = useState("");
    const [profilePic, setProfilePic] = useState<File | null>(null);

    const isModalOpen = useStore((state) => state.isModalOpen);
    const setIsModalOpen = useStore((state) => state.setIsModalOpen);

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

            if (data.token) {
                localStorage.setItem("authToken", data.token); // Save token
            }

            queryClient.invalidateQueries({ queryKey: ["user"] }); // Invalidate user queries if cached
            resetForm(); // Reset form
            setIsModalOpen(false); // Close the modal using Zustand

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


    return (

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{isSignUp ? "Sign Up" : "Login"}</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    {isSignUp && (
                        <>
                            <div>
                                <Label htmlFor="profile-pic-upload">Upload Profile </Label>
                                <Input
                                    id="profile-pic-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setProfilePic((e.target as HTMLInputElement).files?.[0] || null)}
                                />
                            </div>
                            <div>
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div>
                                <Label htmlFor="channel-name">Channel Name</Label>
                                <Input
                                    id="channel-name"
                                    type="text"
                                    placeholder="Channel Name"
                                    value={channelName}
                                    onChange={(e) => setChannelName(e.target.value)}
                                />
                            </div>
                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                        </>
                    )}
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>



                <DialogFooter>
                    <Button variant="ghost" onClick={() => setIsSignUp(!isSignUp)}>
                        {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
                    </Button>
                    <Button onClick={handleSubmit}>
                        {isSignUp ? "Sign Up" : "Login"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    );
};

export default SignInModal;
