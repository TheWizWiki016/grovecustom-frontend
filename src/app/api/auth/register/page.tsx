'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Car, User, Mail, Lock, Eye, EyeOff, ArrowLeft, Shield, CheckCircle, UserPlus } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
    const router = useRouter();
    const [form, setForm] = useState({ email: '', password: '', nombre: '' });
    const [error, setError] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setMensaje('');
        setLoading(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || 'Error al registrar');

            setMensaje('✅ Usuario registrado correctamente. Redirigiendo...');
            setTimeout(() => router.push('/auth/signin'), 2000);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
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
                        <h2 className="text-3xl font-bold text-white mb-2">Únete a la Élite</h2>
                        <p className="text-gray-400">Crea tu cuenta y accede al mundo de los automóviles de lujo más exclusivos</p>
                    </div>

                    {/* Register Form */}
                    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 shadow-2xl">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Success Message */}
                            {mensaje && (
                                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-green-400" />
                                        <p className="text-green-400 text-sm">{mensaje}</p>
                                    </div>
                                </div>
                            )}

                            {/* Error Message */}
                            {error && (
                                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-center">
                                    <p className="text-red-400 text-sm">{error}</p>
                                </div>
                            )}

                            {/* Name Field */}
                            <div>
                                <label className="block text-white font-semibold mb-2">
                                    Nombre Completo
                                </label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        name="nombre"
                                        value={form.nombre}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all"
                                        placeholder="Tu nombre completo"
                                    />
                                </div>
                            </div>

                            {/* Email Field */}
                            <div>
                                <label className="block text-white font-semibold mb-2">
                                    Correo Electrónico
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
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
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        required
                                        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg pl-12 pr-12 py-3 text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all"
                                        placeholder="Crea una contraseña segura"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-400 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">
                                    La contraseña debe tener al menos 8 caracteres
                                </p>
                            </div>

                            {/* Terms and Conditions */}
                            <div className="flex items-start gap-3">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    required
                                    className="mt-1 w-4 h-4 text-yellow-400 bg-gray-700 border-gray-600 rounded focus:ring-yellow-400 focus:ring-2"
                                />
                                <label htmlFor="terms" className="text-sm text-gray-400">
                                    Acepto los{" "}
                                    <Link href="/pagina_construccion" className="text-yellow-400 hover:text-yellow-300 transition-colors">
                                        términos y condiciones
                                    </Link>{" "}
                                    y la{" "}
                                    <Link href="/pagina_construccion" className="text-yellow-400 hover:text-yellow-300 transition-colors">
                                        política de privacidad
                                    </Link>
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 px-6 rounded-lg font-bold text-black bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                                        Creando cuenta...
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        <UserPlus className="w-5 h-5" />
                                        Crear Cuenta
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

                        {/* Login Link */}
                        <div className="text-center">
                            <p className="text-gray-400">
                                ¿Ya tienes una cuenta?{" "}
                                <Link href="../auth/signin" className="text-yellow-400 hover:text-yellow-300 font-semibold transition-colors">
                                    Inicia sesión aquí
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

                    {/* Benefits Section */}
                    <div className="mt-8 bg-gray-800/30 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-white mb-4 text-center">
                            Beneficios de ser miembro
                        </h3>
                        <div className="space-y-3 text-sm text-gray-300">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                <span>Acceso exclusivo a vehículos de lujo premium</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                <span>Asesoría personalizada de expertos</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                <span>Notificaciones de nuevos arrivals</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                <span>Servicios de personalización exclusivos</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}