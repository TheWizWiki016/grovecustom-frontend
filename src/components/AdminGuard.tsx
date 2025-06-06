"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { type ReactNode, useEffect, useState } from "react"
import { Shield, ShieldCheck, AlertCircle, Loader2 } from "lucide-react"

interface AdminGuardProps {
    children: ReactNode
}

export default function AdminGuard({ children }: AdminGuardProps) {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [isRedirecting, setIsRedirecting] = useState(false)

    useEffect(() => {
        if (status !== "loading") {
            if (!session) {
                setIsRedirecting(true)
                setTimeout(() => router.push("/"), 1500)
            } else if (session?.user?.email !== "admin@admin.com") {
                setIsRedirecting(true)
                setTimeout(() => router.push("/"), 1500)
            }
        }
    }, [status, session, router])

    // Loading state
    if (status === "loading") {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <div className="text-center space-y-6">
                    <div className="relative">
                        <div className="w-20 h-20 mx-auto">
                            <Shield className="w-20 h-20 text-purple-400 animate-pulse" />
                            <div className="absolute inset-0 w-20 h-20 border-4 border-purple-400/30 border-t-purple-400 rounded-full animate-spin"></div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-white">Verificando Acceso</h2>
                        <p className="text-purple-200">Validando credenciales de administrador...</p>
                    </div>
                    <div className="flex justify-center space-x-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                </div>
            </div>
        )
    }

    // Unauthorized access
    if (!session) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-900 flex items-center justify-center">
                <div className="text-center space-y-6 max-w-md mx-auto px-6">
                    <div className="relative">
                        <AlertCircle className="w-20 h-20 text-red-400 mx-auto" />
                        {isRedirecting && (
                            <div className="absolute inset-0 w-20 h-20 border-4 border-red-400/30 border-t-red-400 rounded-full animate-spin mx-auto"></div>
                        )}
                    </div>
                    <div className="space-y-3">
                        <h2 className="text-3xl font-bold text-white">Acceso Denegado</h2>
                        <p className="text-red-200">Necesitas iniciar sesión para acceder a esta área.</p>
                        {isRedirecting && (
                            <div className="flex items-center justify-center space-x-2 text-red-300">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Redirigiendo al inicio...</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    // Not admin
    if (session?.user?.email !== "admin@admin.com") {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-900 via-orange-800 to-red-900 flex items-center justify-center">
                <div className="text-center space-y-6 max-w-md mx-auto px-6">
                    <div className="relative">
                        <Shield className="w-20 h-20 text-orange-400 mx-auto" />
                        {isRedirecting && (
                            <div className="absolute inset-0 w-20 h-20 border-4 border-orange-400/30 border-t-orange-400 rounded-full animate-spin mx-auto"></div>
                        )}
                    </div>
                    <div className="space-y-3">
                        <h2 className="text-3xl font-bold text-white">Permisos Insuficientes</h2>
                        <p className="text-orange-200">No tienes permisos de administrador para acceder a esta sección.</p>
                        <div className="bg-orange-800/30 border border-orange-600/50 rounded-lg p-4 mt-4">
                            <p className="text-sm text-orange-300">
                                Conectado como: <span className="font-semibold">{session.user?.email}</span>
                            </p>
                        </div>
                        {isRedirecting && (
                            <div className="flex items-center justify-center space-x-2 text-orange-300">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span>Redirigiendo al inicio...</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    // Success - show admin content with smooth transition
    return (
        <div className="animate-in fade-in duration-50">
            <div className="fixed top-4 right-4 z-50">
            </div>
            {children}
        </div>
    )
}
