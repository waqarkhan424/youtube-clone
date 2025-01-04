
// "use client";
// import { useState } from "react";
// import axios from "axios";

// interface User {
//     username: string;
//     email: string;
//     profilePic?: string;
//     channelName?: string;
//     description?: string;
// }

// interface SignInModalProps {
//     isOpen: boolean;
//     onClose: () => void;
//     onSignInSuccess: (user: User) => void; // Callback for successful login
// }

// const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose, onSignInSuccess }) => {
//     const [isSignUp, setIsSignUp] = useState<boolean>(true); // Toggle between Sign Up and Login forms
//     const [username, setUsername] = useState<string>("");
//     const [email, setEmail] = useState<string>("");
//     const [password, setPassword] = useState<string>("");
//     const [channelName, setChannelName] = useState<string>("");
//     const [description, setDescription] = useState<string>("");
//     const [profilePic, setProfilePic] = useState<File | null>(null);

//     const resetForm = () => {
//         setUsername("");
//         setEmail("");
//         setPassword("");
//         setChannelName("");
//         setDescription("");
//         setProfilePic(null);
//     };

//     const handleSignUp = async () => {
//         try {
//             const formData = new FormData();
//             formData.append("username", username);
//             formData.append("email", email);
//             formData.append("password", password);
//             formData.append("channelName", channelName);
//             formData.append("description", description);
//             if (profilePic) {
//                 formData.append("profilePic", profilePic);
//             }

//             const response = await axios.post(
//                 `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users`,
//                 formData,
//                 {
//                     headers: {
//                         "Content-Type": "multipart/form-data",
//                     },
//                 }
//             );

//             console.log("User created successfully:", response.data);
//             onClose();
//             onSignInSuccess(response.data);
//         } catch (error) {
//             console.error("Error creating user:", error);
//         }
//     };

//     const handleLogin = async () => {
//         try {
//             const response = await axios.post(
//                 `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/login`,
//                 { email, password }
//             );

//             console.log("Login successful:", response.data);
//             onClose();
//             onSignInSuccess(response.data);
//         } catch (error) {
//             console.error("Error logging in:", error);
//         }
//     };

//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//             <div className="bg-white p-6 rounded-md w-96">
//                 <h2 className="text-xl font-bold mb-4">{isSignUp ? "Sign Up" : "Login"}</h2>
//                 <div className="flex flex-col gap-2">
//                     {isSignUp && (
//                         <>
//                             <input
//                                 type="text"
//                                 placeholder="Username"
//                                 value={username}
//                                 onChange={(e) => setUsername(e.target.value)}
//                                 className="border p-2 rounded-md"
//                             />
//                             <input
//                                 type="text"
//                                 placeholder="Channel Name"
//                                 value={channelName}
//                                 onChange={(e) => setChannelName(e.target.value)}
//                                 className="border p-2 rounded-md"
//                             />
//                             <textarea
//                                 placeholder="Description"
//                                 value={description}
//                                 onChange={(e) => setDescription(e.target.value)}
//                                 className="border p-2 rounded-md"
//                             />
//                             <input
//                                 type="file"
//                                 onChange={(e) => setProfilePic(e.target.files?.[0] || null)}
//                                 className="border p-2 rounded-md"
//                             />
//                         </>
//                     )}
//                     <input
//                         type="email"
//                         placeholder="Email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         className="border p-2 rounded-md"
//                     />
//                     <input
//                         type="password"
//                         placeholder="Password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         className="border p-2 rounded-md"
//                     />
//                 </div>
//                 <div className="flex justify-between mt-4">
//                     <button
//                         onClick={() => setIsSignUp((prev) => !prev)} // Toggle between Sign Up and Login
//                         className="text-blue-500"
//                     >
//                         {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
//                     </button>
//                     <button
//                         onClick={isSignUp ? handleSignUp : handleLogin}
//                         className="px-4 py-2 bg-blue-500 text-white rounded-md"
//                     >
//                         {isSignUp ? "Sign Up" : "Login"}
//                     </button>
//                 </div>
//                 <button
//                     onClick={() => {
//                         resetForm();
//                         onClose();
//                     }}
//                     className="absolute top-2 right-2 text-gray-500"
//                 >
//                     &times;
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default SignInModal;




"use client";
import { useState } from "react";
import axios from "axios";

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
    onSignInSuccess: (user: User) => void; // Callback for successful login
}

const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose, onSignInSuccess }) => {
    const [isSignUp, setIsSignUp] = useState<boolean>(true); // Toggle between Sign Up and Login forms
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [channelName, setChannelName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [profilePic, setProfilePic] = useState<File | null>(null);

    const resetForm = () => {
        setUsername("");
        setEmail("");
        setPassword("");
        setChannelName("");
        setDescription("");
        setProfilePic(null);
    };

    const handleSignUp = async () => {
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
            onClose();
            onSignInSuccess(response.data);
        } catch (error) {
            console.error("Error creating user:", error);
        }
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/users/login`,
                { email, password }
            );

            console.log("Login successful:", response.data);
            onClose();
            onSignInSuccess(response.data);
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-md w-96">
                <h2 className="text-xl font-bold mb-4">{isSignUp ? "Sign Up" : "Login"}</h2>
                <div className="flex flex-col gap-2">
                    {isSignUp && (
                        <>
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
                        </>
                    )}
                    {!isSignUp && (
                        <>
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
                        </>
                    )}
                </div>
                <div className="flex justify-between mt-4">
                    <button
                        onClick={() => setIsSignUp((prev) => !prev)} // Toggle between Sign Up and Login
                        className="text-blue-500"
                    >
                        {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
                    </button>
                    <button
                        onClick={isSignUp ? handleSignUp : handleLogin}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        {isSignUp ? "Sign Up" : "Login"}
                    </button>
                </div>
                <button
                    onClick={() => {
                        resetForm();
                        onClose();
                    }}
                    className="absolute top-2 right-2 text-gray-500"
                >
                    &times;
                </button>
            </div>
        </div>
    );
};

export default SignInModal;
