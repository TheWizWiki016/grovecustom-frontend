'use client';

import { useState } from 'react';
import {
    Mail,
    Car,
    ArrowRight,
    CheckCircle,
    AlertCircle,
    Loader2,
    Sparkles,
    Shield,
    Zap
} from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success', 'error', 'loading'
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setMessage('');
        setMessageType('loading');
        setIsLoading(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (res.ok) {
                setMessage('¡Perfecto! Revisa tu correo para acceder con el link mágico.');
                setMessageType('success');
            } else {
                const data = await res.json();
                setMessage('Error: ' + (data.error || 'Error al enviar el email'));
                setMessageType('error');
            }
        } catch (error) {
            setMessage('Error en la conexión al servidor. Intenta nuevamente.');
            setMessageType('error');
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    }

    const getMessageIcon = () => {
        switch (messageType) {
            case 'success':
                return <CheckCircle className="w-5 h-5 text-green-400" />;
            case 'error':
                return <AlertCircle className="w-5 h-5 text-red-400" />;
            case 'loading':
                return <Loader2 className="w-5 h-5 text-yellow-400 animate-spin" />;
            default:
                return null;
        }
    };

    const getMessageStyles = () => {
        switch (messageType) {
            case 'success':
                return 'bg-green-900/30 border-green-500/30 text-green-300';
            case 'error':
                return 'bg-red-900/30 border-red-500/30 text-red-300';
            case 'loading':
                return 'bg-yellow-900/30 border-yellow-500/30 text-yellow-300';
            default:
                return '';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:50px_50px]"></div>
            </div>

            {/* Main Container */}
            <div className="relative w-full max-w-md">

                {/* Logo Section */}
                <div className="text-center mb-8 sm:mb-12">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-3 rounded-2xl shadow-2xl">
                            <Car className="w-8 h-8 text-black" />
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                                Grove Custom
                            </h1>
                            <p className="text-yellow-400 text-xs font-medium tracking-wider">LUXURY CARS</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white">
                            Bienvenido de vuelta
                        </h2>
                        <p className="text-gray-400 text-sm sm:text-base">
                            Accede a tu cuenta de forma segura y rápida
                        </p>
                    </div>
                </div>

                {/* Login Card */}
                <div className="bg-gray-900/70 backdrop-blur-xl border border-gray-700/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl">

                    {/* Features */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                        <div className="text-center">
                            <div className="bg-blue-500/10 p-3 rounded-xl mb-2 mx-auto w-fit">
                                <Shield className="w-5 h-5 text-blue-400" />
                            </div>
                            <p className="text-xs text-gray-400">Seguro</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-purple-500/10 p-3 rounded-xl mb-2 mx-auto w-fit">
                                <Zap className="w-5 h-5 text-purple-400" />
                            </div>
                            <p className="text-xs text-gray-400">Rápido</p>
                        </div>
                        <div className="text-center">
                            <div className="bg-yellow-500/10 p-3 rounded-xl mb-2 mx-auto w-fit">
                                <Sparkles className="w-5 h-5 text-yellow-400" />
                            </div>
                            <p className="text-xs text-gray-400">Mágico</p>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Email Input */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-300">
                                Correo electrónico
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="w-5 h-5 text-gray-400 group-focus-within:text-yellow-400 transition-colors duration-300" />
                                </div>
                                <input
                                    type="email"
                                    placeholder="tu@email.com"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                    disabled={isLoading}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading || !email.trim()}
                            className="group relative w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-yellow-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
                        >
                            <span className="flex items-center justify-center gap-3">
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Enviando...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                                        Enviar Link Mágico
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                    </>
                                )}
                            </span>
                        </button>

                        {/* Message */}
                        {message && (
                            <div className={`p-4 rounded-xl border ${getMessageStyles()} transition-all duration-300 animate-in slide-in-from-top-2`}>
                                <div className="flex items-start gap-3">
                                    {getMessageIcon()}
                                    <p className="text-sm leading-relaxed">{message}</p>
                                </div>
                            </div>
                        )}
                    </form>

                    {/* Additional Info */}
                    <div className="mt-8 pt-6 border-t border-gray-700/50">
                        <div className="text-center space-y-3">
                            <p className="text-xs text-gray-400">
                                ¿No tienes cuenta aún?
                            </p>
                            <a
                                href="/register"
                                className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 font-medium text-sm transition-colors duration-300 hover:underline"
                            >
                                Crear cuenta VIP
                                <ArrowRight className="w-4 h-4" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Security Notice */}
                <div className="mt-6 text-center">
                    <p className="text-xs text-gray-500">
                        🔒 Tu información está protegida con encriptación de grado militar
                    </p>
                </div>
            </div>
        </div>
    );
}