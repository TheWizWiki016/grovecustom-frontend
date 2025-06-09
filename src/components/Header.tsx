"use client"

import { useState, useEffect } from "react"
import { useSession, signIn, signOut } from "next-auth/react"
import Cookies from "js-cookie"

import {
    Car,
    Menu,
    X,
    User,
    LogIn,
    LogOut,
    Home,
    Mail,
    Crown,
    ChevronDown,
    Calendar,
    Shield,
    Database,
    UserCog,
    Settings,
    Plus,
    PencilRuler,
    DollarSign,
} from "lucide-react"

export default function ImprovedHeader() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [userMenuOpen, setUserMenuOpen] = useState(false)
    const { data: session, status } = useSession()
    const [userRole, setUserRole] = useState<string>("user")

    useEffect(() => {
        if (session?.user?.email === "admin@admin.com") {
            setUserRole("admin")
            Cookies.set("userRole", "admin", { expires: 7 })
            return
        }

        // Obtener el rol desde la sesión normalmente
        if (session?.user?.rol) {
            setUserRole(session.user.rol)
        } else {
            // Fallback a cookie si no hay sesión
            const rolCookie = Cookies.get("userRole")
            if (rolCookie) {
                setUserRole(rolCookie)
            } else {
                setUserRole("user")
            }
        }
    }, [session])

    const navigationItems = [
        { name: "Inicio", href: "/", icon: Home },
        { name: "Autos", href: "/autos", icon: Car },
        { name: "Contacto", href: "/contacto", icon: Mail },
    ]

    // Opciones específicas para administradores
    const adminMenuItems = [
        {
            name: "Agregar Auto",
            href: "/admin/agregar",
            icon: Plus,
            description: "Agregar nuevos Vehículos al inventario",
        },
        {
            name: "Gestionar Autos",
            href: "/admin/autos",
            icon: PencilRuler,
            description: "Gestiona los vehículos en el inventario",
        },
        {
            name: "Gestionar Usuarios",
            href: "/admin/usuarios",
            icon: UserCog,
            description: "Gestionar usuarios del sistema",
        },
        {
            name: "Ventas",
            href: "/admin/ventas",
            icon: DollarSign,
            description: "Gestionar las ventas ",
        },
        {
            name: "Mis Citas",
            href: "/mis-citas",
            icon: Calendar,
            description: "Ver mis citas programadas",
        },
        {
            name: "Mis Ordenes",
            href: "/mis-ordenes",
            icon: Calendar,
            description: "Ver mis ordenes ",
        },
    ]

    // Opciones específicas para usuarios regulares
    const userMenuItems = [
        {
            name: "Mi Perfil",
            href: "/profile",
            icon: User,
            description: "Ver y editar mi información personal",
        },
        {
            name: "Mis Citas",
            href: "/mis-citas",
            icon: Calendar,
            description: "Ver mis citas programadas",
        },
        {
            name: "Mis Ordenes",
            href: "/mis-ordenes",
            icon: Calendar,
            description: "Ver mis ordenes ",
        },
    ]

    const handleSignIn = () => {
        signIn()
        setMobileMenuOpen(false)
        setUserMenuOpen(false)
    }

    const handleSignOut = () => {
        signOut()
        setUserMenuOpen(false)
        setMobileMenuOpen(false)
        Cookies.remove("userRole")
        setUserRole("user")
    }

    // Función para obtener las opciones de menú según el rol
    const getMenuItems = () => {
        return userRole === "admin" ? adminMenuItems : userMenuItems
    }

    // Función para obtener el color del badge según el rol
    const getRoleBadge = () => {
        const isSpecialUser = session?.user?.email === "admin@admin.com"

        if (userRole === "admin") {
            return (
                <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-red-500/20 text-red-400 rounded-full border border-red-500/30">
                    <Shield className="w-3 h-3" />
                    {isSpecialUser ? "Super Admin" : "Administrador"}
                </span>
            )
        }
        return (
            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/30">
                <User className="w-3 h-3" />
                Usuario
            </span>
        )
    }

    // Obtener el nombre del usuario
    const getUserDisplayName = () => {
        if (session?.user?.email === "admin@admin.com") {
            return "Edgar (Super Admin)"
        }
        return session?.user?.nombre || session?.user?.name || "Usuario"
    }

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
                            const IconComponent = item.icon
                            return (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="group flex items-center gap-2 px-3 xl:px-4 py-2 rounded-xl text-gray-300 hover:text-yellow-400 hover:bg-gray-800/50 transition-all duration-300 hover:scale-105"
                                >
                                    <IconComponent className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                                    <span className="font-medium text-sm xl:text-base">{item.name}</span>
                                </a>
                            )
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
                                        className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 hover:scale-105 border ${session.user?.email === "admin@admin.com"
                                            ? "bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-red-200 border-red-600"
                                            : "bg-gray-800 hover:bg-gray-700 text-yellow-400 border-gray-700"
                                            }`}
                                    >
                                        {session.user?.image ? (
                                            <img
                                                src={session.user.image || "/placeholder.svg"}
                                                alt="User Avatar"
                                                className="w-6 h-6 rounded-full"
                                            />
                                        ) : (
                                            <div
                                                className={`w-6 h-6 rounded-full flex items-center justify-center ${session.user?.email === "admin@admin.com" ? "bg-red-400" : "bg-yellow-400"
                                                    }`}
                                            >
                                                {session.user?.email === "admin@admin.com" ? (
                                                    <Shield className="w-4 h-4 text-black" />
                                                ) : (
                                                    <User className="w-4 h-4 text-black" />
                                                )}
                                            </div>
                                        )}
                                        <span className="text-sm font-medium text-white max-w-20 truncate">{getUserDisplayName()}</span>
                                        <ChevronDown
                                            className={`w-4 h-4 transition-transform duration-300 ${userMenuOpen ? "rotate-180" : ""}`}
                                        />
                                    </button>

                                    {/* Desktop User Dropdown */}
                                    {userMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-72 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl py-2 z-50">
                                            <div className="px-4 py-3 border-b border-gray-700">
                                                <div className="flex items-center justify-between mb-2">
                                                    <p className="text-sm font-medium text-white truncate">{getUserDisplayName()}</p>
                                                    {getRoleBadge()}
                                                </div>
                                                <p className="text-xs text-gray-400 truncate">{session.user?.email}</p>
                                                {session.user?._id && (
                                                    <p className="text-xs text-gray-500 font-mono">ID: {session.user._id.slice(-8)}</p>
                                                )}
                                                {session.user?.email === "admin@admin.com" && (
                                                    <p className="text-xs text-red-400 font-semibold mt-1">🔥 Usuario Especial</p>
                                                )}
                                            </div>

                                            {/* Opciones dinámicas según el rol */}
                                            <div className="py-2 max-h-64 overflow-y-auto">
                                                {getMenuItems().map((item) => {
                                                    const IconComponent = item.icon
                                                    return (
                                                        <a
                                                            key={item.name}
                                                            href={item.href}
                                                            className="flex items-start gap-3 px-4 py-3 text-sm text-gray-300 hover:text-yellow-400 hover:bg-gray-800 transition-all duration-300 group"
                                                            onClick={() => setUserMenuOpen(false)}
                                                        >
                                                            <IconComponent className="w-4 h-4 mt-0.5 group-hover:scale-110 transition-transform duration-300 flex-shrink-0" />
                                                            <div className="flex-1 min-w-0">
                                                                <div className="font-medium truncate">{item.name}</div>
                                                                <div className="text-xs text-gray-500 leading-tight">{item.description}</div>
                                                            </div>
                                                        </a>
                                                    )
                                                })}
                                            </div>

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
                            {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden bg-gray-900 border-t border-gray-800 backdrop-blur-none bg-opacity-100 z-50 relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                        <nav className="space-y-2">
                            {navigationItems.map((item) => {
                                const IconComponent = item.icon
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
                                )
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
                                    <div
                                        className={`px-4 py-3 rounded-xl ${session.user?.email === "admin@admin.com"
                                            ? "bg-gradient-to-r from-red-900/50 to-red-800/50 border border-red-700"
                                            : "bg-gray-800"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3 mb-2">
                                            {session.user?.image ? (
                                                <img
                                                    src={session.user.image || "/placeholder.svg"}
                                                    alt="User Avatar"
                                                    className="w-8 h-8 rounded-full"
                                                />
                                            ) : (
                                                <div
                                                    className={`w-8 h-8 rounded-full flex items-center justify-center ${session.user?.email === "admin@admin.com" ? "bg-red-400" : "bg-yellow-400"
                                                        }`}
                                                >
                                                    {session.user?.email === "admin@admin.com" ? (
                                                        <Shield className="w-4 h-4 text-black" />
                                                    ) : (
                                                        <User className="w-4 h-4 text-black" />
                                                    )}
                                                </div>
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <p className="text-white font-medium text-sm truncate">{getUserDisplayName()}</p>
                                                <p className="text-gray-400 text-xs truncate">{session.user?.email}</p>
                                            </div>
                                            {getRoleBadge()}
                                        </div>
                                    </div>

                                    {/* User Menu Items - Dinámicos según el rol */}
                                    <div className="space-y-1">
                                        {getMenuItems().map((item) => {
                                            const IconComponent = item.icon
                                            return (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    onClick={() => setMobileMenuOpen(false)}
                                                    className="flex items-start gap-3 px-4 py-3 rounded-xl text-gray-300 hover:text-yellow-400 hover:bg-gray-800/70 transition-all duration-300 group"
                                                >
                                                    <IconComponent className="w-5 h-5 mt-0.5 group-hover:scale-110 transition-transform duration-300 flex-shrink-0" />
                                                    <div className="flex-1 min-w-0">
                                                        <span className="font-medium block truncate">{item.name}</span>
                                                        <span className="text-xs text-gray-500 leading-tight">{item.description}</span>
                                                    </div>
                                                </a>
                                            )
                                        })}
                                    </div>

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
                    className="fixed inset-0 bg-black/20 lg:hidden z-40"
                    onClick={() => {
                        setMobileMenuOpen(false)
                        setUserMenuOpen(false)
                    }}
                />
            )}
        </header>
    )
}
