"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Car, Mail, Lock, Eye, EyeOff, ArrowLeft, Shield } from "lucide-react";
import Link from "next/link";

export default function SignInPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        console.log("Resultado del login:", res); // 👈 Agrega esto


        setIsLoading(false);

        if (res?.error) {
            setError("Correo o contraseña incorrectos");
        } else {
            router.push("/");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,215,0,0.1),transparent)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,215,0,0.05),transparent)]"></div>

            {/* Navigation */}
            <div className="absolute top-6 left-6 z-10">
                <Link href="/" className="flex items-center gap-2 text-gray-300 hover:text-yellow-400 transition-colors group">
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Volver al inicio
                </Link>
            </div>

            {/* Main Content */}
            <div className="flex items-center justify-center min-h-screen px-6">
                <div className="w-full max-w-md">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                                <Car className="w-6 h-6 text-black" />
                            </div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-white bg-clip-text text-transparent">
                                GROVE CUSTOM CARS
                            </h1>
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-2">Acceso Exclusivo</h2>
                        <p className="text-gray-400">Ingresa a tu cuenta para acceder a nuestro catálogo premium</p>
                    </div>

                    {/* Login Form */}
                    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 shadow-2xl">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Error Message */}
                            {error && (
                                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-center">
                                    <p className="text-red-400 text-sm">{error}</p>
                                </div>
                            )}

                            {/* Email Field */}
                            <div>
                                <label className="block text-white font-semibold mb-2">
                                    Correo Electrónico
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all"
                                        placeholder="tu@email.com"
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div>
                                <label className="block text-white font-semibold mb-2">
                                    Contraseña
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg pl-12 pr-12 py-3 text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all"
                                        placeholder="Tu contraseña"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-400 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Forgot Password */}
                            <div className="text-right">
                                <Link href="/forgot-password" className="text-sm text-gray-400 hover:text-yellow-400 transition-colors">
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-4 px-6 rounded-lg font-bold text-black bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                                        Verificando...
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        <Shield className="w-5 h-5" />
                                        Iniciar Sesión
                                    </span>
                                )}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="my-8 flex items-center">
                            <div className="flex-1 border-t border-gray-600"></div>
                            <span className="px-4 text-gray-400 text-sm">o</span>
                            <div className="flex-1 border-t border-gray-600"></div>
                        </div>

                        {/* Register Link */}
                        <div className="text-center">
                            <p className="text-gray-400">
                                ¿No tienes una cuenta?{" "}
                                <Link href="../auth/register" className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors">
                                    Regístrate aquí
                                </Link>
                            </p>
                        </div>
                    </div>

                    {/* Security Note */}
                    <div className="mt-6 text-center">
                        <div className="inline-flex items-center gap-2 text-sm text-gray-500">
                            <Shield className="w-4 h-4" />
                            Tus datos están protegidos con encriptación SSL
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}