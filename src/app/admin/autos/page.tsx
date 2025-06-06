"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Pencil, Trash2, PlusCircle, Car, Search, Filter, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
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

interface Auto {
    _id: string
    marca: string
    modelo: string
    año: number
    precio: number
    imagenes: string[]
}

export default function AdminAutosPage() {
    const [autos, setAutos] = useState<Auto[]>([])
    const [filteredAutos, setFilteredAutos] = useState<Auto[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const router = useRouter()

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/autos`)
            .then((res) => res.json())
            .then((data) => {
                setAutos(data)
                setFilteredAutos(data)
            })
            .catch(() => {
                toast({
                    title: "Error",
                    description: "No se pudieron cargar los autos",
                    variant: "destructive",
                })
            })
            .finally(() => setLoading(false))
    }, [])

    useEffect(() => {
        const filtered = autos.filter(
            (auto) =>
                `${auto.marca} ${auto.modelo}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                auto.año.toString().includes(searchTerm),
        )
        setFilteredAutos(filtered)
    }, [searchTerm, autos])

    const eliminarAuto = async (id: string) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/autos/${id}`, {
            method: "DELETE",
        })

        if (res.ok) {
            setAutos((prev) => prev.filter((auto) => auto._id !== id))
            toast({
                title: "Éxito",
                description: "Auto eliminado correctamente",
            })
        } else {
            toast({
                title: "Error",
                description: "No se pudo eliminar el auto",
                variant: "destructive",
            })
        }
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("es-MX", {
            style: "currency",
            currency: "MXN",
            minimumFractionDigits: 0,
        }).format(price)
    }

    const LoadingSkeleton = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
                <Card key={i} className="overflow-hidden bg-gray-900/50 border-gray-800/50 backdrop-blur-sm">
                    <CardHeader className="p-0">
                        <Skeleton className="h-48 w-full bg-gray-800/50" />
                    </CardHeader>
                    <CardContent className="p-4">
                        <Skeleton className="h-6 w-3/4 mb-2 bg-gray-700/50" />
                        <Skeleton className="h-4 w-1/2 mb-4 bg-gray-700/50" />
                        <Skeleton className="h-5 w-1/3 bg-gray-700/50" />
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                        <div className="flex gap-2 ml-auto">
                            <Skeleton className="h-9 w-9 bg-gray-700/50" />
                            <Skeleton className="h-9 w-9 bg-gray-700/50" />
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )

    const EmptyState = () => (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-2xl"></div>
                <div className="relative rounded-full bg-gradient-to-br from-gray-800 to-gray-900 p-8 mb-6 border border-gray-700/50">
                    <Car className="h-16 w-16 text-gray-400" />
                </div>
            </div>
            <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                No hay autos registrados
            </h3>
            <p className="text-gray-400 mb-8 max-w-md leading-relaxed">
                Comienza agregando tu primer auto al inventario para gestionar tu concesionaria de manera profesional.
            </p>
            <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
            >
                <Link href="/admin/agregar">
                    <PlusCircle className="w-5 h-5 mr-2" />
                    Agregar primer auto
                </Link>
            </Button>
        </div>
    )

    const CarCard = ({ auto }: { auto: Auto }) => (
        <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-gray-900/80 to-gray-800/80 border-gray-700/50 backdrop-blur-sm hover:border-gray-600/50 hover:scale-[1.02] hover:-translate-y-1">
            <CardHeader className="p-0 relative">
                <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                    {auto.imagenes?.[0] ? (
                        <Image
                            src={auto.imagenes[0] || "/placeholder.svg"}
                            alt={`${auto.marca} ${auto.modelo}`}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <Car className="h-12 w-12 text-gray-500 group-hover:text-gray-400 transition-colors duration-300" />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
            </CardHeader>
            <CardContent className="p-6">
                <h3 className="font-bold text-xl mb-2 line-clamp-1 text-white group-hover:text-blue-400 transition-colors duration-300">
                    {auto.marca} {auto.modelo}
                </h3>
                <p className="text-sm text-gray-400 mb-4 font-medium">Año {auto.año}</p>
                <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                    {formatPrice(auto.precio)}
                </div>
            </CardContent>
            <CardFooter className="p-6 pt-0">
                <div className="flex gap-3 ml-auto">
                    <Button
                        variant="outline"
                        size="icon"
                        asChild
                        className="border-gray-600 hover:border-blue-500 hover:bg-blue-500/10 hover:text-blue-400 transition-all duration-300"
                    >
                        <Link href={`/admin/autos/${auto._id}`}>
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Editar auto</span>
                        </Link>
                    </Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="border-gray-600 hover:border-red-500 hover:bg-red-500/10 hover:text-red-400 transition-all duration-300"
                            >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Eliminar auto</span>
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-gray-900 border-gray-700">
                            <AlertDialogHeader>
                                <AlertDialogTitle className="text-white">¿Eliminar auto?</AlertDialogTitle>
                                <AlertDialogDescription className="text-gray-400">
                                    Esta acción no se puede deshacer. Se eliminará permanentemente el {auto.marca}{" "}
                                    {auto.modelo} ({auto.año}) del inventario.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700">
                                    Cancelar
                                </AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={() => eliminarAuto(auto._id)}
                                    className="bg-red-600 text-white hover:bg-red-700"
                                >
                                    Eliminar
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </CardFooter>
        </Card>
    )

    return (
        <AdminGuard>
            <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
                {/* Animated background elements */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>

                {/* Header */}
                <div className="relative border-b border-gray-800/50 bg-black/20 backdrop-blur-sm">
                    <div className="container mx-auto px-4 py-8">
                        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                            <div>
                                <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-2">
                                    Gestión de Autos
                                </h1>
                                <p className="text-gray-400 text-lg">Administra tu inventario de vehículos de manera profesional</p>
                            </div>
                            <Button
                                asChild
                                size="lg"
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                            >
                                <Link href="/admin/agregar">
                                    <PlusCircle className="w-5 h-5 mr-2" />
                                    Agregar Auto
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="relative container mx-auto px-4 py-8">
                    {/* Search and Controls */}
                    {!loading && autos.length > 0 && (
                        <div className="flex flex-col gap-6 mb-8 md:flex-row md:items-center md:justify-between">
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <Input
                                    placeholder="Buscar por marca, modelo o año..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-12 pr-4 py-3 bg-gray-900/50 border-gray-700/50 text-white placeholder:text-gray-500 focus:border-blue-500/50 focus:bg-gray-900/70 backdrop-blur-sm transition-all duration-300"
                                />
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant={viewMode === 'grid' ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => setViewMode('grid')}
                                        className={viewMode === 'grid' ? 'bg-blue-600 hover:bg-blue-700' : 'border-gray-700 hover:bg-gray-800'}
                                    >
                                        <Grid className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant={viewMode === 'list' ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => setViewMode('list')}
                                        className={viewMode === 'list' ? 'bg-blue-600 hover:bg-blue-700' : 'border-gray-700 hover:bg-gray-800'}
                                    >
                                        <List className="w-4 h-4" />
                                    </Button>
                                </div>
                                <Badge
                                    variant="secondary"
                                    className="text-sm bg-gradient-to-r from-gray-800 to-gray-700 text-gray-200 border border-gray-600/50 px-3 py-1"
                                >
                                    {filteredAutos.length} {filteredAutos.length === 1 ? "auto" : "autos"}
                                </Badge>
                            </div>
                        </div>
                    )}

                    {/* Loading State */}
                    {loading && <LoadingSkeleton />}

                    {/* Empty State */}
                    {!loading && autos.length === 0 && <EmptyState />}

                    {/* Cars Display */}
                    {!loading && autos.length > 0 && (
                        <>
                            {filteredAutos.length === 0 ? (
                                <div className="text-center py-20">
                                    <div className="relative inline-flex mb-6">
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-2xl"></div>
                                        <div className="relative rounded-full bg-gradient-to-br from-gray-800 to-gray-900 p-8 border border-gray-700/50">
                                            <Search className="h-16 w-16 text-gray-400" />
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                        No se encontraron resultados
                                    </h3>
                                    <p className="text-gray-400 text-lg">Intenta con otros términos de búsqueda</p>
                                </div>
                            ) : (
                                <div className={`grid gap-6 ${viewMode === 'grid'
                                    ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                                    : 'grid-cols-1 lg:grid-cols-2'
                                    }`}>
                                    {filteredAutos.map((auto) => (
                                        <CarCard key={auto._id} auto={auto} />
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