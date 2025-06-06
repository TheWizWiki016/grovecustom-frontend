"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Calendar,
    Clock,
    MapPin,
    Phone,
    Mail,
    MessageSquare,
    Car,
    Filter,
    Search,
    Eye,
    Edit,
    Trash2,
} from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import axios from "axios"

interface Cita {
    _id: string
    autoId: string
    usuarioId: string
    fechaCita: string
    horaCita: string
    tipoServicio: string
    ubicacion: string
    direccion: string
    telefono: string
    email: string
    comentarios: string
    esDomicilio: boolean
    concesionarioIndex: number
    creadoEn: string
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"

async function fetchCitas(): Promise<Cita[]> {
    const res = await axios.get(`${API_URL}/api/citas`)
    return res.data
}

export default function CitasManagement() {
    const [citas, setCitas] = useState<Cita[]>([])
    const [filteredCitas, setFilteredCitas] = useState<Cita[]>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [filterTipo, setFilterTipo] = useState("todos")
    const [filterUbicacion, setFilterUbicacion] = useState("todos")
    const [selectedCita, setSelectedCita] = useState<Cita | null>(null)

    // Cargar citas desde la API al montar el componente
    useEffect(() => {
        fetchCitas().then(setCitas)
    }, [])

    // Filtrar citas
    useEffect(() => {
        const filtered = citas.filter((cita) => {
            const matchesSearch =
                cita.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                cita.telefono.includes(searchTerm) ||
                cita.comentarios.toLowerCase().includes(searchTerm.toLowerCase())

            const matchesTipo = filterTipo === "todos" || cita.tipoServicio === filterTipo
            const matchesUbicacion = filterUbicacion === "todos" ||
                (filterUbicacion === "domicilio" && cita.esDomicilio) ||
                (filterUbicacion === "concesionario" && !cita.esDomicilio)

            return matchesSearch && matchesTipo && matchesUbicacion
        })

        setFilteredCitas(filtered)
    }, [searchTerm, filterTipo, filterUbicacion, citas])

    // Estadísticas
    const totalCitas = citas.length
    const citasHoy = citas.filter((cita) => {
        const today = new Date().toISOString().split("T")[0]
        return cita.fechaCita === today
    }).length
    const citasDomicilio = citas.filter((cita) => cita.esDomicilio).length
    const citasConcesionario = citas.filter((cita) => !cita.esDomicilio).length

    const getServiceBadgeColor = (tipo: string) => {
        switch (tipo) {
            case "prueba_manejo":
                return "bg-blue-100 text-blue-800"
            case "mantenimiento":
                return "bg-green-100 text-green-800"
            case "entrega":
                return "bg-purple-100 text-purple-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    const getServiceLabel = (tipo: string) => {
        switch (tipo) {
            case "prueba_manejo":
                return "Prueba de Manejo"
            case "mantenimiento":
                return "Mantenimiento"
            case "entrega":
                return "Entrega"
            default:
                return tipo
        }
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Cabecera */}
                <h1 className="text-4xl font-bold text-yellow-400 mb-8 text-center">Panel de Citas</h1>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <Card className="bg-gradient-to-br from-blue-600 to-blue-700 border-blue-500">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-blue-100 text-sm font-medium">Total Citas</p>
                                    <p className="text-3xl font-bold text-white">{totalCitas}</p>
                                </div>
                                <div className="text-blue-200 text-2xl"><Calendar /></div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-green-600 to-green-700 border-green-500">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-green-100 text-sm font-medium">Citas Hoy</p>
                                    <p className="text-3xl font-bold text-white">{citasHoy}</p>
                                </div>
                                <div className="text-green-200 text-2xl"><Clock /></div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-purple-600 to-purple-700 border-purple-500">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-purple-100 text-sm font-medium">A Domicilio</p>
                                    <p className="text-3xl font-bold text-white">{citasDomicilio}</p>
                                </div>
                                <div className="text-purple-200 text-2xl"><MapPin /></div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-yellow-600 to-yellow-700 border-yellow-500">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-yellow-100 text-sm font-medium">En Concesionario</p>
                                    <p className="text-3xl font-bold text-white">{citasConcesionario}</p>
                                </div>
                                <div className="text-yellow-200 text-2xl"><Car /></div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Filtros */}
                <Card className="bg-gray-800 border-gray-700 mb-8">
                    <CardHeader>
                        <CardTitle className="text-yellow-400 flex items-center gap-2"><Filter className="w-5 h-5" />Filtros y Búsqueda</CardTitle>
                        <CardDescription className="text-gray-300">Filtra las citas por tipo, ubicación o búsqueda</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                            <div className="relative flex-1 w-full">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <Input
                                    placeholder="Buscar por email, teléfono o comentarios..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 bg-gray-700 border-gray-600 text-white"
                                />
                            </div>
                            <Select value={filterTipo} onValueChange={setFilterTipo}>
                                <SelectTrigger className="w-full sm:w-48 bg-gray-700 border-gray-600 text-white">
                                    <SelectValue placeholder="Tipo de Servicio" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-700 border-gray-600">
                                    <SelectItem value="todos" className="text-white hover:bg-gray-600">Todos los Servicios</SelectItem>
                                    <SelectItem value="prueba_manejo" className="text-white hover:bg-gray-600">Prueba de Manejo</SelectItem>
                                    <SelectItem value="mantenimiento" className="text-white hover:bg-gray-600">Mantenimiento</SelectItem>
                                    <SelectItem value="entrega" className="text-white hover:bg-gray-600">Entrega</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={filterUbicacion} onValueChange={setFilterUbicacion}>
                                <SelectTrigger className="w-full sm:w-48 bg-gray-700 border-gray-600 text-white">
                                    <SelectValue placeholder="Ubicación" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-700 border-gray-600">
                                    <SelectItem value="todos" className="text-white hover:bg-gray-600">Todas las Ubicaciones</SelectItem>
                                    <SelectItem value="concesionario" className="text-white hover:bg-gray-600">Concesionario</SelectItem>
                                    <SelectItem value="domicilio" className="text-white hover:bg-gray-600">Domicilio</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Tabla de Citas */}
                <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                        <CardTitle className="text-yellow-400">Lista de Citas ({filteredCitas.length})</CardTitle>
                        <CardDescription className="text-gray-300">Gestiona todas las citas programadas en el sistema</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-700">
                                        <th className="text-left p-4 font-medium text-gray-200">Fecha & Hora</th>
                                        <th className="text-left p-4 font-medium text-gray-200">Cliente</th>
                                        <th className="text-left p-4 font-medium text-gray-200">Servicio</th>
                                        <th className="text-left p-4 font-medium text-gray-200">Ubicación</th>
                                        <th className="text-left p-4 font-medium text-gray-200">Contacto</th>
                                        <th className="text-left p-4 font-medium text-gray-200">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredCitas.map((cita) => (
                                        <tr key={cita._id} className="border-b border-gray-700 hover:bg-gray-700/50">
                                            <td className="p-4">
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-white">
                                                        {format(new Date(cita.fechaCita), "dd MMM yyyy", { locale: es })}
                                                    </span>
                                                    <span className="text-sm text-gray-400">{cita.horaCita}</span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-white">{cita.email}</span>
                                                    <span className="text-sm text-gray-400">{cita.telefono}</span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <Badge className={getServiceBadgeColor(cita.tipoServicio)}>
                                                    {getServiceLabel(cita.tipoServicio)}
                                                </Badge>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    {cita.esDomicilio ? (
                                                        <>
                                                            <MapPin className="w-4 h-4 text-blue-400" />
                                                            <span className="text-sm text-white">Domicilio</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Car className="w-4 h-4 text-green-400" />
                                                            <span className="text-sm text-white">Concesionario</span>
                                                        </>
                                                    )}
                                                </div>
                                                {cita.direccion && <div className="text-xs text-gray-400 mt-1">{cita.direccion}</div>}
                                            </td>
                                            <td className="p-4">
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-1 text-sm text-white">
                                                        <Phone className="w-3 h-3" />
                                                        {cita.telefono}
                                                    </div>
                                                    <div className="flex items-center gap-1 text-sm text-white">
                                                        <Mail className="w-3 h-3" />
                                                        {cita.email}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex gap-2">
                                                    <Dialog>
                                                        <DialogTrigger asChild>
                                                            <Button variant="outline" size="sm" onClick={() => setSelectedCita(cita)}>
                                                                <Eye className="w-4 h-4" />
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="max-w-2xl bg-gray-900 border-gray-700 text-white">
                                                            <DialogHeader>
                                                                <DialogTitle>Detalles de la Cita</DialogTitle>
                                                                <DialogDescription>Información completa de la cita programada</DialogDescription>
                                                            </DialogHeader>
                                                            {selectedCita && (
                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                                    <div className="space-y-4">
                                                                        <div>
                                                                            <label className="text-sm font-medium text-gray-400">Fecha y Hora</label>
                                                                            <div className="flex items-center gap-2 mt-1">
                                                                                <Calendar className="w-4 h-4 text-blue-400" />
                                                                                <span>
                                                                                    {format(new Date(selectedCita.fechaCita), "dd 'de' MMMM, yyyy", {
                                                                                        locale: es,
                                                                                    })}
                                                                                </span>
                                                                            </div>
                                                                            <div className="flex items-center gap-2 mt-1">
                                                                                <Clock className="w-4 h-4 text-blue-400" />
                                                                                <span>{selectedCita.horaCita}</span>
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            <label className="text-sm font-medium text-gray-400">Tipo de Servicio</label>
                                                                            <div className="mt-1">
                                                                                <Badge className={getServiceBadgeColor(selectedCita.tipoServicio)}>
                                                                                    {getServiceLabel(selectedCita.tipoServicio)}
                                                                                </Badge>
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            <label className="text-sm font-medium text-gray-400">Ubicación</label>
                                                                            <div className="flex items-center gap-2 mt-1">
                                                                                {selectedCita.esDomicilio ? (
                                                                                    <>
                                                                                        <MapPin className="w-4 h-4 text-blue-400" />
                                                                                        <span>Servicio a Domicilio</span>
                                                                                    </>
                                                                                ) : (
                                                                                    <>
                                                                                        <Car className="w-4 h-4 text-green-400" />
                                                                                        <span>En Concesionario</span>
                                                                                    </>
                                                                                )}
                                                                            </div>
                                                                            {selectedCita.direccion && (
                                                                                <p className="text-sm text-gray-400 mt-1">{selectedCita.direccion}</p>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                    <div className="space-y-4">
                                                                        <div>
                                                                            <label className="text-sm font-medium text-gray-400">
                                                                                Información de Contacto
                                                                            </label>
                                                                            <div className="space-y-2 mt-1">
                                                                                <div className="flex items-center gap-2">
                                                                                    <Mail className="w-4 h-4 text-gray-400" />
                                                                                    <span className="text-sm">{selectedCita.email}</span>
                                                                                </div>
                                                                                <div className="flex items-center gap-2">
                                                                                    <Phone className="w-4 h-4 text-gray-400" />
                                                                                    <span className="text-sm">{selectedCita.telefono}</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        {selectedCita.comentarios && (
                                                                            <div>
                                                                                <label className="text-sm font-medium text-gray-400">Comentarios</label>
                                                                                <div className="flex items-start gap-2 mt-1">
                                                                                    <MessageSquare className="w-4 h-4 text-gray-400 mt-0.5" />
                                                                                    <p className="text-sm text-gray-300">{selectedCita.comentarios}</p>
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                        <div>
                                                                            <label className="text-sm font-medium text-gray-400">Creado</label>
                                                                            <p className="text-sm text-gray-400 mt-1">
                                                                                {format(new Date(selectedCita.creadoEn), "dd/MM/yyyy 'a las' HH:mm", {
                                                                                    locale: es,
                                                                                })}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </DialogContent>
                                                    </Dialog>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        {filteredCitas.length === 0 && (
                            <div className="text-center py-12">
                                <Calendar className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                                <h3 className="text-lg font-medium text-white mb-2">No se encontraron citas</h3>
                                <p className="text-gray-400">
                                    {searchTerm || filterTipo !== "todos" || filterUbicacion !== "todos"
                                        ? "Intenta ajustar los filtros de búsqueda"
                                        : "No hay citas programadas en el sistema"}
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}
