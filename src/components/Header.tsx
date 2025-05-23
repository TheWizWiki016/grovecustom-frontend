'use client';

import React, { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import {
    Car,
    Menu,
    X,
    User,
    LogIn,
    LogOut,
    Home,
    Mail,
    Settings,
    Crown,
    ChevronDown
} from 'lucide-react';

export default function ImprovedHeader() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const { data: session, status } = useSession();

    const navigationItems = [
        { name: 'Inicio', href: '/', icon: Home },
        { name: 'Autos', href: '/autos', icon: Car },
        { name: 'Contacto', href: '/contacto', icon: Mail },
    ];

    const handleSignIn = () => {
        signIn();
        setMobileMenuOpen(false);
        setUserMenuOpen(false);
    };

    const handleSignOut = () => {
        signOut();
        setUserMenuOpen(false);
        setMobileMenuOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 bg-gradient-to-r from-gray-900 via-black to-gray-900 backdrop-blur-md border-b border-gray-800/50 shadow-2xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 sm:h-20">

                    {/* Logo Section */}
                    <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                        <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl shadow-lg">
                            <Car className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
                        </div>
                        <div className="hidden xs:block">
                            <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                                Grove Custom
                            </h1>
                            <p className="text-yellow-400 text-xs font-medium tracking-wider hidden sm:block">LUXURY CARS</p>
                        </div>
                        <div className="block xs:hidden">
                            <h1 className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                                Grove Custom
                            </h1>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
                        {navigationItems.map((item) => {
                            const IconComponent = item.icon;
                            return (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="group flex items-center gap-2 px-3 xl:px-4 py-2 rounded-xl text-gray-300 hover:text-yellow-400 hover:bg-gray-800/50 transition-all duration-300 hover:scale-105"
                                >
                                    <IconComponent className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                                    <span className="font-medium text-sm xl:text-base">{item.name}</span>
                                </a>
                            );
                        })}
                    </nav>

                    {/* Right Section - User Menu & Mobile Menu */}
                    <div className="flex items-center gap-2 sm:gap-4">

                        {/* Desktop User Menu */}
                        <div className="hidden lg:block relative">
                            {status === "loading" ? (
                                <div className="w-8 h-8 bg-gray-800 rounded-full animate-pulse"></div>
                            ) : session ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                                        className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-xl text-yellow-400 transition-all duration-300 hover:scale-105 border border-gray-700"
                                    >
                                        {session.user?.image ? (
                                            <img
                                                src={session.user.image}
                                                alt="User Avatar"
                                                className="w-6 h-6 rounded-full"
                                            />
                                        ) : (
                                            <User className="w-5 h-5" />
                                        )}
                                        <span className="text-sm font-medium text-white max-w-20 truncate">
                                            {session.user?.name || session.user?.email}
                                        </span>
                                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${userMenuOpen ? 'rotate-180' : ''}`} />
                                    </button>

                                    {/* Desktop User Dropdown */}
                                    {userMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl py-2 z-50">
                                            <div className="px-4 py-2 border-b border-gray-700">
                                                <p className="text-sm font-medium text-white truncate">
                                                    {session.user?.name || 'Usuario'}
                                                </p>
                                                <p className="text-xs text-gray-400 truncate">
                                                    {session.user?.email}
                                                </p>
                                            </div>
                                            <a
                                                href="/profile"
                                                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-yellow-400 hover:bg-gray-800 transition-all duration-300"
                                                onClick={() => setUserMenuOpen(false)}
                                            >
                                                <User className="w-4 h-4" />
                                                Perfil
                                            </a>
                                            <a
                                                href="/admin"
                                                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-yellow-400 hover:bg-gray-800 transition-all duration-300"
                                                onClick={() => setUserMenuOpen(false)}
                                            >
                                                <Settings className="w-4 h-4" />
                                                Administración
                                            </a>
                                            <hr className="border-gray-700 my-1" />
                                            <button
                                                onClick={handleSignOut}
                                                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-red-400 hover:bg-gray-800 transition-all duration-300 w-full text-left"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                Cerrar Sesión
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={handleSignIn}
                                        className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 px-4 py-2 rounded-xl text-black font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                                    >
                                        <LogIn className="w-4 h-4" />
                                        <span className="text-sm">Iniciar Sesión</span>
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden bg-gray-800 p-2 sm:p-2.5 rounded-lg sm:rounded-xl text-yellow-400 hover:bg-gray-700 hover:scale-105 transition-all duration-300 border border-gray-700"
                            aria-label="Toggle mobile menu"
                        >
                            {mobileMenuOpen ? (
                                <X className="w-5 h-5 sm:w-6 sm:h-6" />
                            ) : (
                                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden bg-gray-900/95 backdrop-blur-md border-t border-gray-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
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

                            {/* Mobile User Section */}
                            <div className="border-t border-gray-700 my-4"></div>

                            {status === "loading" ? (
                                <div className="px-4 py-3">
                                    <div className="w-full h-8 bg-gray-800 rounded animate-pulse"></div>
                                </div>
                            ) : session ? (
                                <div className="space-y-2">
                                    {/* User Info */}
                                    <div className="px-4 py-2 bg-gray-800/50 rounded-xl">
                                        <div className="flex items-center gap-3">
                                            {session.user?.image ? (
                                                <img
                                                    src={session.user.image}
                                                    alt="User Avatar"
                                                    className="w-8 h-8 rounded-full"
                                                />
                                            ) : (
                                                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                                                    <User className="w-4 h-4 text-black" />
                                                </div>
                                            )}
                                            <div>
                                                <p className="text-white font-medium text-sm">
                                                    {session.user?.name || 'Usuario'}
                                                </p>
                                                <p className="text-gray-400 text-xs">
                                                    {session.user?.email}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* User Menu Items */}
                                    <a
                                        href="/profile"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-yellow-400 hover:bg-gray-800/70 transition-all duration-300 group"
                                    >
                                        <User className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                                        <span className="font-medium">Mi Perfil</span>
                                    </a>
                                    <a
                                        href="/admin"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-yellow-400 hover:bg-gray-800/70 transition-all duration-300 group"
                                    >
                                        <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                                        <span className="font-medium">Administración</span>
                                    </a>
                                    <button
                                        onClick={handleSignOut}
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-red-400 hover:bg-gray-800/70 transition-all duration-300 group w-full text-left"
                                    >
                                        <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                        <span className="font-medium">Cerrar Sesión</span>
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <button
                                        onClick={handleSignIn}
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 group w-full"
                                    >
                                        <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                        <span>Iniciar Sesión</span>
                                    </button>
                                    <a
                                        href="/register"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-yellow-400 hover:bg-gray-800/70 transition-all duration-300 group"
                                    >
                                        <Crown className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                                        <span className="font-medium">Registro VIP</span>
                                    </a>
                                </div>
                            )}
                        </nav>
                    </div>
                </div>
            )}

            {/* Overlay for dropdowns */}
            {(mobileMenuOpen || userMenuOpen) && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm lg:hidden z-40"
                    onClick={() => {
                        setMobileMenuOpen(false);
                        setUserMenuOpen(false);
                    }}
                />
            )}
        </header>
    );
}