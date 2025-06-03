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
    Hammer
} from 'lucide-react'

export default function UnderConstructionPage() {
    const [currentTime, setCurrentTime] = useState<Date>(new Date());
    const [animatedText, setAnimatedText] = useState('');
    const fullText = "Estamos trabajando duro para ofrecerte la mejor experiencia automotriz";

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
        }, 50);
        return () => clearInterval(typeWriter);
    }, []);

    const features = [
        {
            icon: Car,
            title: "Catálogo Completo",
            description: "Amplia selección de vehículos"
        },
        {
            icon: Calendar,
            title: "Citas en Línea",
            description: "Agenda tu prueba de manejo fácilmente"
        },
        {
            icon: Calculator,
            title: "Cotizaciones",
            description: "Financiamiento personalizado"
        },
        {
            icon: Settings,
            title: "Servicios Premium",
            description: "Mantenimiento y garantía"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            {/* Floating Icons */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-20 animate-bounce delay-300">
                    <Wrench size={24} className="text-yellow-500/30" />
                </div>
                <div className="absolute top-40 right-32 animate-bounce delay-700">
                    <Hammer size={20} className="text-yellow-500/30" />
                </div>
                <div className="absolute bottom-32 left-32 animate-bounce delay-500">
                    <Settings size={28} className="text-yellow-500/30" />
                </div>
                <div className="absolute bottom-20 right-20 animate-bounce delay-1000">
                    <Car size={32} className="text-yellow-500/30" />
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Logo/Brand Area */}
                    <div className="mb-8 sm:mb-12">
                        <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl mb-6 shadow-2xl transform hover:scale-105 transition-transform duration-300">
                            <Car size={40} className="text-black sm:w-12 sm:h-12" />
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-4">
                            Grove Custom
                        </h1>
                    </div>

                    {/* Main Message */}
                    <div className="mb-8 sm:mb-12">
                        <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 sm:mb-8">
                            Página en
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 animate-pulse">
                                Construcción
                            </span>
                        </h2>

                        {/* Animated Subtitle */}
                        <div className="h-16 sm:h-20 flex items-center justify-center">
                            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-3xl leading-relaxed">
                                {animatedText}
                                <span className="animate-pulse text-yellow-400">|</span>
                            </p>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-8 sm:mb-12">
                        <div className="max-w-md mx-auto">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-sm font-medium text-gray-400">Progreso</span>
                                <span className="text-sm font-medium text-yellow-400">60%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-3 rounded-full transition-all duration-1000 ease-out animate-pulse"
                                    style={{ width: '%' }}></div>
                            </div>
                        </div>
                    </div>

                    {/* Coming Soon Features */}
                    <div className="mb-8 sm:mb-12">
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8">
                            Próximamente Disponible
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
                            {features.map((feature, index) => (
                                <div key={index}
                                    className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 sm:p-6 rounded-xl border border-gray-700 hover:border-yellow-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                                    style={{ animationDelay: `${index * 200}ms` }}>
                                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 rounded-lg mb-4">
                                        <feature.icon size={24} className="text-yellow-500" />
                                    </div>
                                    <h4 className="text-white font-semibold mb-2 text-sm sm:text-base">
                                        {feature.title}
                                    </h4>
                                    <p className="text-gray-400 text-xs sm:text-sm">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-700/50 mb-8 sm:mb-12 max-w-2xl mx-auto">
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 flex items-center justify-center gap-3">
                            <Mail size={24} className="text-yellow-500" />
                            Mantente Informado
                        </h3>

                        <div className="space-y-4 sm:space-y-6">
                            <div className="flex items-center justify-center gap-4 text-gray-300">
                                <Phone size={20} className="text-yellow-500 flex-shrink-0" />
                                <span className="text-sm sm:text-base">+52 492 123 4567</span>
                            </div>

                            <div className="flex items-center justify-center gap-4 text-gray-300">
                                <Mail size={20} className="text-yellow-500 flex-shrink-0" />
                                <span className="text-sm sm:text-base">info@grovecustom.com</span>
                            </div>

                            <div className="flex items-center justify-center gap-4 text-gray-300">
                                <MapPin size={20} className="text-yellow-500 flex-shrink-0" />
                                <span className="text-sm sm:text-base text-center">
                                    Zacatecas, México
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Countdown Timer */}
                    <div className="bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-yellow-500/20 max-w-lg mx-auto">
                        <h3 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center justify-center gap-3">
                            <Clock size={20} className="text-yellow-500" />
                            Lanzamiento Estimado
                        </h3>

                        <div className="text-center">
                            <div className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-2">
                                Próximamente
                            </div>
                            <div className="text-sm sm:text-base text-gray-300">
                                {currentTime.toLocaleDateString('es-ES', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </div>
                            <div className="text-lg sm:text-xl text-yellow-400 font-mono mt-2">
                                {currentTime.toLocaleTimeString('es-ES')}
                            </div>
                        </div>
                    </div>
                    <footer />
                </div>
            </div>
        </div>
    );
}