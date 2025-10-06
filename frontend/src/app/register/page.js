"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignUp, setIsSignUp] = useState(true);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("/api/sigin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });
        const data = await res.json();
        if (res.ok) {
            if (data.message === "User registered successfully") router.push("/login");
            else alert("User already exists");
        } else {
            alert(data.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="p-8 rounded-lg shadow-lg w-96 h-[500px]">
                <div className="flex justify-between mb-6">
                    <button
                        onClick={() => {
                            router.push("/login");
                            setIsSignUp(false)
                        }}
                        className={`w-1/2 p-3 text-lg font-semibold rounded-l-md ${!isSignUp ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => {
                            router.push("/register");
                            setIsSignUp(true)
                        }}
                        className={`w-1/2 p-3 text-lg font-semibold rounded-r-md ${isSignUp ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                    >
                        Sign Up
                    </button>
                </div>
                <h3  className="mb-[10px]; mt-[-8px]; text-[25px]">Sing Up</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full Name"
                        className="w-full p-2 mb-4 rounded-md border"
                    />
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full p-2 mb-4 rounded-md border"
                    />
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full p-2 mb-4 rounded-md border"
                        type="password"
                    />
                    <button
                        type="submit"
                        className="w-full p-2 bg-blue-500 text-white rounded-md"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );

}
