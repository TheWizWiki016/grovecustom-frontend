'use client'
import React, { useState, useEffect } from "react";
import {
    Calendar,
    Clock,
    MapPin,
    Phone,
    Mail,
    User,
    Car,
    Check,
    X,
    Home,
    Building2,
    ChevronLeft,
    ChevronRight,
    AlertCircle,
    CheckCircle,
    Calculator,
    Menu,
    Settings,
    Wrench,
    Hammer,
    Zap,
    Star,
    Shield,
    Award,
    Sparkles,
    ArrowRight
} from 'lucide-react'

export default function UnderConstructionPage() {
    const [currentTime, setCurrentTime] = useState<Date>(new Date());
    const [animatedText, setAnimatedText] = useState('');
    const [progress, setProgress] = useState(0);
    const [emailInput, setEmailInput] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const fullText = "Estamos creando la experiencia automotriz más innovadora de México";

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        let index = 0;
        const typeWriter = setInterval(() => {
            if (index < fullText.length) {
                setAnimatedText(fullText.substring(0, index + 1));
                index++;
            } else {
                clearInterval(typeWriter);
            }
        }, 80);
        return () => clearInterval(typeWriter);
    }, []);

    useEffect(() => {
        const progressTimer = setInterval(() => {
            setProgress(prev => {
                if (prev < 73) {
                    return prev + 1;
                }
                return prev;
            });
        }, 100);
        return () => clearInterval(progressTimer);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleEmailSubmit = () => {
        if (emailInput.includes('@')) {
            setIsSubscribed(true);
            setTimeout(() => setIsSubscribed(false), 3000);
            setEmailInput('');
        }
    };

    const features = [
        {
            icon: Car,
            title: "Showroom Virtual",
            description: "Explora vehículos en 360° con realidad aumentada",
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: Calendar,
            title: "Citas Inteligentes",
            description: "IA que programa tu prueba de manejo perfecta",
            color: "from-purple-500 to-pink-500"
        },
        {
            icon: Calculator,
            title: "Financiamiento Smart",
            description: "Algoritmos que encuentran tu mejor opción",
            color: "from-green-500 to-emerald-500"
        },
        {
            icon: Shield,
            title: "Garantía Plus",
            description: "Cobertura extendida con monitoreo IoT",
            color: "from-orange-500 to-red-500"
        },
        {
            icon: Zap,
            title: "Servicio Express",
            description: "Mantenimiento predictivo automatizado",
            color: "from-yellow-500 to-amber-500"
        },
        {
            icon: Award,
            title: "Premium Club",
            description: "Beneficios exclusivos y experiencias VIP",
            color: "from-indigo-500 to-blue-500"
        }
    ];

    const stats = [
        { number: "500+", label: "Vehículos Premium" },
        { number: "15", label: "Años de Experiencia" },
        { number: "98%", label: "Satisfacción Cliente" },
        { number: "24/7", label: "Soporte Técnico" }
    ];

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden relative">
            {/* Cursor Following Light */}
            <div
                className="fixed w-96 h-96 bg-gradient-radial from-yellow-500/20 via-yellow-500/5 to-transparent rounded-full pointer-events-none z-0 transition-all duration-300"
                style={{
                    left: mousePosition.x - 192,
                    top: mousePosition.y - 192,
                    background: `radial-gradient(circle, rgba(251, 191, 36, 0.15) 0%, rgba(251, 191, 36, 0.05) 30%, transparent 70%)`
                }}
            />

            {/* Animated Grid Background */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(251, 191, 36, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(251, 191, 36, 0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: '60px 60px',
                        animation: 'grid-move 20s linear infinite'
                    }}
                />
            </div>

            {/* Floating Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
                <div className="absolute bottom-32 left-32 w-40 h-40 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full blur-xl animate-pulse delay-500"></div>
                <div className="absolute bottom-20 right-20 w-28 h-28 bg-gradient-to-r from-pink-500/20 to-red-500/20 rounded-full blur-xl animate-pulse delay-700"></div>
            </div>

            {/* Floating Tech Icons */}
            <div className="absolute inset-0 pointer-events-none">
                {[Wrench, Hammer, Settings, Car, Zap, Star, Shield, Sparkles].map((Icon, index) => (
                    <div
                        key={index}
                        className="absolute animate-float"
                        style={{
                            top: `${20 + (index * 10)}%`,
                            left: `${10 + (index * 12)}%`,
                            animationDelay: `${index * 300}ms`,
                            animationDuration: `${4 + (index % 3)}s`
                        }}
                    >
                        <Icon size={16 + (index % 3) * 8} className="text-yellow-500/20" />
                    </div>
                ))}
            </div>

            {/* Main Content */}
            <div className="relative z-10 min-h-screen flex flex-col">
                {/* Header */}
                <header className="p-6 flex justify-between items-center backdrop-blur-sm bg-black/20 border-b border-gray-800/50">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
                            <Car size={24} className="text-black" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white">Grove Custom</h1>
                            <p className="text-xs text-gray-400">Premium Automotive</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-yellow-500/20 rounded-full border border-yellow-500/30">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                            <span className="text-xs text-yellow-400">En Desarrollo</span>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
                    <div className="max-w-6xl mx-auto text-center">
                        {/* Main Title */}
                        <div className="mb-12">
                            <div className="inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full border border-yellow-500/30 mb-8">
                                <Sparkles size={16} className="text-yellow-400" />
                                <span className="text-sm text-yellow-400 font-medium">Próximamente</span>
                            </div>

                            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black mb-6">
                                <span className="text-white">El Futuro</span>
                                <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 animate-pulse">
                                    Automotriz
                                </span>
                            </h1>

                            {/* Animated Subtitle */}
                            <div className="h-20 flex items-center justify-center mb-8">
                                <p className="text-xl sm:text-2xl text-gray-300 max-w-4xl leading-relaxed">
                                    {animatedText}
                                    <span className="animate-pulse text-yellow-400">|</span>
                                </p>
                            </div>
                        </div>

                        {/* Progress Section */}
                        <div className="mb-16">
                            <div className="max-w-2xl mx-auto">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-lg font-semibold text-white flex items-center gap-2">
                                        <Building2 size={20} className="text-yellow-500" />
                                        Progreso de Desarrollo
                                    </span>
                                    <span className="text-2xl font-bold text-yellow-400">{progress}%</span>
                                </div>
                                <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden shadow-inner">
                                    <div
                                        className="bg-gradient-to-r from-yellow-500 via-yellow-400 to-orange-500 h-4 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
                                        style={{ width: `${progress}%` }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                                    </div>
                                </div>
                                <div className="flex justify-between mt-2 text-sm text-gray-400">
                                    <span>Inicio</span>
                                    <span>Backend</span>
                                    <span>Frontend</span>
                                    <span>Lanzamiento</span>
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center group">
                                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-yellow-500/50 transition-all duration-300 group-hover:scale-105">
                                        <div className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-2">{stat.number}</div>
                                        <div className="text-sm text-gray-400">{stat.label}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Features Grid */}
                        <div className="mb-16">
                            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-12 flex items-center justify-center gap-3">
                                <Zap size={32} className="text-yellow-500" />
                                Tecnología de Vanguardia
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                                {features.map((feature, index) => (
                                    <div key={index}
                                        className="group bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm p-8 rounded-3xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 relative overflow-hidden"
                                        style={{ animationDelay: `${index * 150}ms` }}>

                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                            <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-10`}></div>
                                        </div>

                                        <div className="relative z-10">
                                            <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                                                <feature.icon size={28} className="text-white" />
                                            </div>
                                            <h4 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors duration-300">
                                                {feature.title}
                                            </h4>
                                            <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Newsletter Subscription */}
                        <div className="mb-16 max-w-2xl mx-auto">
                            <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-orange-500/5"></div>
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                                        <Mail size={24} className="text-yellow-500" />
                                        Sé el Primero en Saber
                                    </h3>
                                    <p className="text-gray-300 mb-6">
                                        Recibe actualizaciones exclusivas sobre nuestro lanzamiento
                                    </p>

                                    {!isSubscribed ? (
                                        <div className="flex gap-3">
                                            <input
                                                type="email"
                                                value={emailInput}
                                                onChange={(e) => setEmailInput(e.target.value)}
                                                placeholder="tu@email.com"
                                                className="flex-1 px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500 transition-colors duration-300"
                                            />
                                            <button
                                                onClick={handleEmailSubmit}
                                                className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-semibold rounded-xl hover:from-yellow-400 hover:to-orange-400 transition-all duration-300 flex items-center gap-2 group"
                                            >
                                                Notificarme
                                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center gap-3 py-3 text-green-400">
                                            <CheckCircle size={24} />
                                            <span className="font-semibold">¡Gracias! Te mantendremos informado.</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Contact & Time */}
                        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
                            {/* Contact Info */}
                            <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50">
                                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                    <Phone size={20} className="text-yellow-500" />
                                    Contacto
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer">
                                        <Phone size={18} className="text-yellow-500" />
                                        <span>+52 492 123 4567</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors duration-300 cursor-pointer">
                                        <Mail size={18} className="text-yellow-500" />
                                        <span>info@grovecustom.com</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-gray-300">
                                        <MapPin size={18} className="text-yellow-500" />
                                        <span>Zacatecas, México</span>
                                    </div>
                                </div>
                            </div>

                            {/* Live Clock */}
                            <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-sm rounded-3xl p-8 border border-yellow-500/20">
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                                    <Clock size={20} className="text-yellow-500" />
                                    Lanzamiento
                                </h3>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-yellow-400 mb-2">
                                        Q3 2025
                                    </div>
                                    <div className="text-sm text-gray-300 mb-3">
                                        {currentTime.toLocaleDateString('es-ES', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </div>
                                    <div className="text-lg text-yellow-400 font-mono">
                                        {currentTime.toLocaleTimeString('es-ES')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes grid-move {
                    0% { transform: translate(0, 0); }
                    100% { transform: translate(60px, 60px); }
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                
                .animate-float {
                    animation: float 4s ease-in-out infinite;
                }
                
                .animate-shimmer {
                    animation: shimmer 2s infinite;
                }
            `}</style>
        </div>
    );
}