"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        setIsLoading(false);

        if (res?.error) {
            setError("Correo o contraseña incorrectos");
        } else {
            router.push("/"); // o la ruta que quieras
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-sm"
            >
                <h1 className="text-2xl font-bold text-white mb-6">Iniciar Sesión</h1>

                {error && (
                    <p className="text-red-400 mb-4 text-sm text-center">{error}</p>
                )}

                <label className="block mb-4">
                    <span className="text-gray-300 text-sm">Correo</span>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none"
                    />
                </label>

                <label className="block mb-6">
                    <span className="text-gray-300 text-sm">Contraseña</span>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:outline-none"
                    />
                </label>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-black font-semibold transition"
                >
                    {isLoading ? "Procesando..." : "Entrar"}
                </button>
            </form>
        </div>
    );
}
