"use client"

import { useEffect, useState } from "react"
import { Trash2, ShieldCheck, UserPlus, Mail, Users, Crown, User, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "@/hooks/use-toast"
import AdminGuard from "@/components/AdminGuard"

const API_URL = process.env.NEXT_PUBLIC_API_URL

type Usuario = {
    _id: string
    nombre: string
    email: string
    rol: string
}

export default function AdministrarUsuarios() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([])
    const [filteredUsuarios, setFilteredUsuarios] = useState<Usuario[]>([])
    const [nuevoUsuario, setNuevoUsuario] = useState({ nombre: "", email: "", password: "" })
    const [loading, setLoading] = useState(true)
    const [registering, setRegistering] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")

    const cargarUsuarios = async () => {
        try {
            const res = await fetch(`${API_URL}/api/users`)
            if (!res.ok) throw new Error("Error al cargar usuarios")
            const data = await res.json()
            setUsuarios(data)
            setFilteredUsuarios(data)
        } catch (error) {
            toast({
                title: "Error",
                description: "No se pudieron cargar los usuarios",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        cargarUsuarios()
    }, [])

    useEffect(() => {
        const filtered = usuarios.filter(
            (usuario) =>
                usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                usuario.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                usuario.rol.toLowerCase().includes(searchTerm.toLowerCase()),
        )
        setFilteredUsuarios(filtered)
    }, [searchTerm, usuarios])

    const handleRegister = async () => {
        if (!nuevoUsuario.nombre || !nuevoUsuario.email || !nuevoUsuario.password) {
            toast({
                title: "Error",
                description: "Todos los campos son obligatorios",
                variant: "destructive",
            })
            return
        }

        setRegistering(true)
        try {
            const res = await fetch(`${API_URL}/api/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevoUsuario),
            })

            if (res.ok) {
                await cargarUsuarios()
                setNuevoUsuario({ nombre: "", email: "", password: "" })
                toast({
                    title: "Éxito",
                    description: "Usuario registrado correctamente",
                })
            } else {
                const errorData = await res.json()
                throw new Error(errorData.message || "Error al registrar usuario")
            }
        } catch (error) {
            toast({
                title: "Error",
                description: error instanceof Error ? error.message : "Error al registrar usuario",
                variant: "destructive",
            })
        } finally {
            setRegistering(false)
        }
    }

    const cambiarRol = async (id: string, nuevoRol: string, nombreUsuario: string) => {
        try {
            const res = await fetch(`${API_URL}/api/users/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ rol: nuevoRol }),
            })

            if (res.ok) {
                await cargarUsuarios()
                toast({
                    title: "Éxito",
                    description: `${nombreUsuario} ahora es ${nuevoRol === "admin" ? "administrador" : "usuario"}`,
                })
            } else {
                throw new Error("Error al cambiar rol")
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "No se pudo cambiar el rol del usuario",
                variant: "destructive",
            })
        }
    }

    const eliminarUsuario = async (id: string, nombreUsuario: string) => {
        try {
            const res = await fetch(`${API_URL}/api/users/${id}`, { method: "DELETE" })
            if (res.ok) {
                await cargarUsuarios()
                toast({
                    title: "Éxito",
                    description: `Usuario ${nombreUsuario} eliminado correctamente`,
                })
            } else {
                throw new Error("Error al eliminar usuario")
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "No se pudo eliminar el usuario",
                variant: "destructive",
            })
        }
    }

    const LoadingSkeleton = () => (
        <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                        <div className="space-y-2 flex-1">
                            <div className="h-5 bg-gray-700 rounded animate-pulse w-1/3" />
                            <div className="h-4 bg-gray-700 rounded animate-pulse w-1/2" />
                            <div className="h-4 bg-gray-700 rounded animate-pulse w-1/4" />
                        </div>
                        <div className="flex gap-2">
                            <div className="h-9 w-9 bg-gray-700 rounded animate-pulse" />
                            <div className="h-9 w-9 bg-gray-700 rounded animate-pulse" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )

    const EmptyState = () => (
        <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="rounded-full bg-gray-800/50 backdrop-blur-sm p-6 mb-4 border border-gray-700">
                <Users className="h-12 w-12 text-yellow-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No hay usuarios registrados</h3>
            <p className="text-gray-400 mb-6 max-w-sm">Comienza agregando el primer usuario al sistema.</p>
        </div>
    )

    if (loading) {
        return (
            <AdminGuard>
                <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-400 mx-auto"></div>
                        <p className="text-yellow-400 mt-4 text-xl">Cargando usuarios...</p>
                    </div>
                </div>
            </AdminGuard>
        )
    }

    return (
        <AdminGuard>
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
                {/* Header */}
                <div className="border-b border-gray-700 bg-gray-800/30 backdrop-blur-sm">
                    <div className="max-w-6xl mx-auto px-6 py-8">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-2">
                                Administración de Usuarios
                            </h1>
                            <p className="text-gray-400 text-lg">Gestiona los usuarios y permisos del sistema</p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
                    {/* Add User Form */}
                    <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
                        <CardHeader>
                            <CardTitle className="text-yellow-400 flex items-center gap-2">
                                <UserPlus className="h-5 w-5" />
                                Agregar Nuevo Usuario
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Nombre completo</label>
                                    <Input
                                        type="text"
                                        placeholder="Nombre completo"
                                        value={nuevoUsuario.nombre}
                                        onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })}
                                        className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Email</label>
                                    <Input
                                        type="email"
                                        placeholder="correo@ejemplo.com"
                                        value={nuevoUsuario.email}
                                        onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, email: e.target.value })}
                                        className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Contraseña</label>
                                    <Input
                                        type="password"
                                        placeholder="Contraseña segura"
                                        value={nuevoUsuario.password}
                                        onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, password: e.target.value })}
                                        className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <Button
                                    onClick={handleRegister}
                                    disabled={registering}
                                    className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold px-6 py-2 rounded-xl hover:from-yellow-500 hover:to-yellow-700 transition-all"
                                >
                                    {registering ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-black mr-2"></div>
                                            Registrando...
                                        </>
                                    ) : (
                                        <>
                                            <UserPlus className="w-4 h-4 mr-2" />
                                            Registrar Usuario
                                        </>
                                    )}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Search and Stats */}
                    {usuarios.length > 0 && (
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <Input
                                    placeholder="Buscar usuarios..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-12 bg-gray-800/50 backdrop-blur-sm border-gray-700 text-white placeholder:text-gray-400 h-12 rounded-xl focus:border-yellow-400 focus:ring-yellow-400"
                                />
                            </div>
                            <div className="flex items-center gap-4">
                                <Badge className="bg-yellow-400/20 text-yellow-400 border-yellow-400/30 px-3 py-1">
                                    {filteredUsuarios.length} {filteredUsuarios.length === 1 ? "usuario" : "usuarios"}
                                </Badge>
                                <Badge className="bg-blue-400/20 text-blue-400 border-blue-400/30 px-3 py-1">
                                    {usuarios.filter((u) => u.rol === "admin").length} administradores
                                </Badge>
                            </div>
                        </div>
                    )}

                    {/* Users List */}
                    {loading && <LoadingSkeleton />}

                    {!loading && usuarios.length === 0 && <EmptyState />}

                    {!loading && usuarios.length > 0 && (
                        <>
                            {filteredUsuarios.length === 0 ? (
                                <div className="text-center py-16">
                                    <div className="rounded-full bg-gray-800/50 backdrop-blur-sm p-6 mb-4 inline-flex border border-gray-700">
                                        <Search className="h-12 w-12 text-yellow-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2 text-white">No se encontraron usuarios</h3>
                                    <p className="text-gray-400">Intenta con otros términos de búsqueda</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {filteredUsuarios.map((usuario) => (
                                        <Card
                                            key={usuario._id}
                                            className="bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:border-yellow-400/50 transition-all duration-200"
                                        >
                                            <CardContent className="p-6">
                                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                    <div className="space-y-2">
                                                        <div className="flex items-center gap-3">
                                                            <h3 className="font-semibold text-lg text-white">{usuario.nombre}</h3>
                                                            <Badge
                                                                className={
                                                                    usuario.rol === "admin"
                                                                        ? "bg-purple-400/20 text-purple-400 border-purple-400/30"
                                                                        : "bg-gray-400/20 text-gray-400 border-gray-400/30"
                                                                }
                                                            >
                                                                {usuario.rol === "admin" ? (
                                                                    <>
                                                                        <Crown className="w-3 h-3 mr-1" />
                                                                        Administrador
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <User className="w-3 h-3 mr-1" />
                                                                        Usuario
                                                                    </>
                                                                )}
                                                            </Badge>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-gray-400">
                                                            <Mail className="w-4 h-4" />
                                                            <span>{usuario.email}</span>
                                                        </div>
                                                    </div>

                                                    <div className="flex gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            onClick={() =>
                                                                cambiarRol(usuario._id, usuario.rol === "admin" ? "user" : "admin", usuario.nombre)
                                                            }
                                                            className="border-gray-600 hover:bg-gray-700 text-green-400 hover:text-green-300"
                                                            title={`Cambiar a ${usuario.rol === "admin" ? "usuario" : "administrador"}`}
                                                        >
                                                            <ShieldCheck className="h-4 w-4" />
                                                        </Button>

                                                        <AlertDialog>
                                                            <AlertDialogTrigger asChild>
                                                                <Button
                                                                    variant="outline"
                                                                    size="icon"
                                                                    className="border-gray-600 hover:bg-gray-700 text-red-400 hover:text-red-300"
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent className="bg-gray-900 border-gray-700">
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle className="text-white">¿Eliminar usuario?</AlertDialogTitle>
                                                                    <AlertDialogDescription className="text-gray-400">
                                                                        Esta acción no se puede deshacer. Se eliminará permanentemente el usuario{" "}
                                                                        <strong>{usuario.nombre}</strong> del sistema.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel className="bg-gray-700 text-white border-gray-600 hover:bg-gray-600">
                                                                        Cancelar
                                                                    </AlertDialogCancel>
                                                                    <AlertDialogAction
                                                                        onClick={() => eliminarUsuario(usuario._id, usuario.nombre)}
                                                                        className="bg-red-600 text-white hover:bg-red-700"
                                                                    >
                                                                        Eliminar
                                                                    </AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </AdminGuard>
    )
}
