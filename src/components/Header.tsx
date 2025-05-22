'use client';

import React, { useState } from 'react';
import {
    Car,
    Menu,
    X,
    User,
    LogIn,
    Home,
    Mail,
    Settings,
    Crown
} from 'lucide-react';

export default function ImprovedHeader() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const navigationItems = [
        { name: 'Inicio', href: '/', icon: Home },
        { name: 'Autos', href: '/autos', icon: Car },
        { name: 'Contacto', href: '/contacto', icon: Mail },
    ];

    return (
        <header className="sticky top-0 z-50 bg-gradient-to-r from-gray-900 via-black to-gray-900 backdrop-blur-md border-b border-gray-800/50 shadow-2xl">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex justify-between items-center h-20">

                    {/* Logo Section */}
                    <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-2.5 rounded-xl shadow-lg">
                            <Car className="w-8 h-8 text-black" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                                Grove Custom
                            </h1>
                            <p className="text-yellow-400 text-xs font-medium tracking-wider">LUXURY CARS</p>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-8">
                        {navigationItems.map((item) => {
                            const IconComponent = item.icon;
                            return (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="group flex items-center gap-2 px-4 py-2 rounded-xl text-gray-300 hover:text-yellow-400 hover:bg-gray-800/50 transition-all duration-300 hover:scale-105"
                                >
                                    <IconComponent className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                                    <span className="font-medium">{item.name}</span>
                                </a>
                            );
                        })}
                    </nav>

                    {/* Right Section - Login Button & Mobile Menu */}
                    <div className="flex items-center gap-4">

                        {/* Login Button */}
                        <div className="relative">
                            <button
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                                className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-4 py-2 rounded-xl font-semibold hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 hover:scale-105 shadow-lg"
                            >
                                <User className="w-4 h-4" />
                                <span className="hidden sm:inline">Iniciar Sesión</span>
                            </button>

                            {/* User Dropdown Menu */}
                            {userMenuOpen && (
                                <div className="absolute right-0 mt-2 w-56 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl z-50 overflow-hidden">
                                    <div className="p-4 border-b border-gray-700 bg-gradient-to-r from-gray-800 to-gray-900">
                                        <p className="text-white font-semibold">Acceso Exclusivo</p>
                                        <p className="text-gray-400 text-sm">Ingresa a tu cuenta VIP</p>
                                    </div>
                                    <div className="py-2">
                                        <a
                                            href="/login"
                                            className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-yellow-400 hover:text-black transition-all duration-300 group"
                                        >
                                            <LogIn className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            <span>Iniciar Sesión</span>
                                        </a>
                                        <a
                                            href="/register"
                                            className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-yellow-400 hover:text-black transition-all duration-300 group"
                                        >
                                            <Crown className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                                            <span>Registro VIP</span>
                                        </a>
                                        <div className="border-t border-gray-700 mt-2 pt-2">
                                            <a
                                                href="/admin"
                                                className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-yellow-400 hover:text-black transition-all duration-300 group"
                                            >
                                                <Settings className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                                                <span>Administración</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden bg-gray-800 p-2.5 rounded-xl text-yellow-400 hover:bg-gray-700 hover:scale-105 transition-all duration-300 border border-gray-700"
                            aria-label="Toggle mobile menu"
                        >
                            {mobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden bg-gray-900/95 backdrop-blur-md border-t border-gray-800">
                    <div className="max-w-7xl mx-auto px-6 py-4">
                        <nav className="space-y-2">
                            {navigationItems.map((item) => {
                                const IconComponent = item.icon;
                                return (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-yellow-400 hover:bg-gray-800/70 transition-all duration-300 group"
                                    >
                                        <IconComponent className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                                        <span className="font-medium">{item.name}</span>
                                    </a>
                                );
                            })}

                            {/* Divider */}
                            <div className="border-t border-gray-700 my-4"></div>

                            {/* Mobile Login Options */}
                            <div className="space-y-2">
                                <a
                                    href="/login"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-yellow-400 hover:bg-gray-800/70 transition-all duration-300 group"
                                >
                                    <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                    <span className="font-medium">Iniciar Sesión</span>
                                </a>
                                <a
                                    href="/register"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-yellow-400 hover:bg-gray-800/70 transition-all duration-300 group"
                                >
                                    <Crown className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                                    <span className="font-medium">Registro VIP</span>
                                </a>
                                <a
                                    href="/admin"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-yellow-400 hover:bg-gray-800/70 transition-all duration-300 group"
                                >
                                    <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                                    <span className="font-medium">Administración</span>
                                </a>
                            </div>
                        </nav>
                    </div>
                </div>
            )}

            {/* Overlay for mobile menu */}
            {(mobileMenuOpen || userMenuOpen) && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                    onClick={() => {
                        setMobileMenuOpen(false);
                        setUserMenuOpen(false);
                    }}
                />
            )}
        </header>
    );
}