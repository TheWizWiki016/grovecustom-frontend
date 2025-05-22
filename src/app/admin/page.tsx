'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {
    Car, Search, Edit, Trash2, LogOut,
    Filter, ChevronDown, ChevronUp, Plus,
    AlignJustify, X, User, Settings
} from 'lucide-react'

interface Auto {
    _id: string
    marca: string
    modelo: string
    año: number
    precio: number
    categoria: string
    imagenes?: string[]
    potencia?: string
    descripcion?: string
}

export default function AdminDashboardPage() {
    const [autos, setAutos] = useState<Auto[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [sortField, setSortField] = useState('marca')
    const [sortDirection, setSortDirection] = useState('asc')
    const [filterCategory, setFilterCategory] = useState('')
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [selectedAuto, setSelectedAuto] = useState(null)

    const router = useRouter()

    // Categorías de vehículos (igual que en el formulario original)
    const categorias = [
        { value: 'supercar', label: 'Supercar' },
        { value: 'hypercar', label: 'Hypercar' },
        { value: 'luxury-sedan', label: 'Sedán de Lujo' },
        { value: 'luxury-suv', label: 'SUV de Lujo' },
        { value: 'convertible', label: 'Convertible' },
        { value: 'coupe-gran-turismo', label: 'Coupé Gran Turismo' },
        { value: 'deportivo-clasico', label: 'Deportivo Clásico' }
    ]

    // Comprobar autenticación y cargar autos
    useEffect(() => {
        const token = localStorage.getItem('authToken')
        if (!token) {
            router.push('/login')
            return
        }

        fetchAutos()
    }, [router])

    // Función para cargar los autos
    const fetchAutos = async () => {
        setLoading(true)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/autos`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            })

            if (res.ok) {
                const data = await res.json()
                setAutos(data)
            } else if (res.status === 401) {
                // Token inválido o expirado
                localStorage.removeItem('authToken')
                router.push('/login')
            }
        } catch (error) {
            console.error('Error al cargar los autos:', error)
        } finally {
            setLoading(false)
        }
    }

    // Cerrar sesión
    const handleLogout = () => {
        localStorage.removeItem('authToken')
        router.push('/login')
    }

    // Función para eliminar auto
    const handleDelete = async (id: string) => {
        if (!confirm('¿Estás seguro de eliminar este vehículo?')) return

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/autos/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            })

            if (res.ok) {
                // Actualizar la lista de autos
                setAutos(autos.filter(auto => auto._id !== id))
            } else {
                alert('Error al eliminar el vehículo')
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }

    // Función para ordenar
    const handleSort = (field) => {
        setSortDirection(sortField === field && sortDirection === 'asc' ? 'desc' : 'asc')
        setSortField(field)
    }

    // Filtrar y ordenar autos
    const filteredAndSortedAutos = autos
        .filter(auto => {
            const matchesSearch =
                auto.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
                auto.modelo.toLowerCase().includes(searchTerm.toLowerCase())

            const matchesCategory = !filterCategory || auto.categoria === filterCategory

            return matchesSearch && matchesCategory
        })
        .sort((a, b) => {
            if (sortField === 'año' || sortField === 'precio') {
                // Ordenar numéricamente
                return sortDirection === 'asc'
                    ? a[sortField] - b[sortField]
                    : b[sortField] - a[sortField]
            } else {
                // Ordenar alfabéticamente
                return sortDirection === 'asc'
                    ? a[sortField].localeCompare(b[sortField])
                    : b[sortField].localeCompare(a[sortField])
            }
        })

    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
            {/* Sidebar móvil */}
            <div className={`fixed inset-0 bg-black bg-opacity-80 z-40 lg:hidden transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className={`fixed top-0 left-0 w-64 h-full bg-gray-900 shadow-lg transform transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="p-5">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-xl font-bold text-yellow-400">Admin Panel</h2>
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-gray-400 hover:text-yellow-400"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <nav className="space-y-4">
                            <a href="#" className="flex items-center gap-3 text-white hover:text-yellow-400 py-2 px-4 rounded-lg bg-gray-800">
                                <Car size={20} />
                                <span>Vehículos</span>
                            </a>
                            <a href="#" className="flex items-center gap-3 text-gray-400 hover:text-yellow-400 py-2 px-4 rounded-lg">
                                <User size={20} />
                                <span>Usuarios</span>
                            </a>
                            <a href="#" className="flex items-center gap-3 text-gray-400 hover:text-yellow-400 py-2 px-4 rounded-lg">
                                <Settings size={20} />
                                <span>Configuración</span>
                            </a>
                        </nav>

                        <div className="absolute bottom-5 left-0 w-full px-5">
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 text-gray-400 hover:text-yellow-400 w-full p-3"
                            >
                                <LogOut size={20} />
                                <span>Cerrar sesión</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex h-screen overflow-hidden">
                {/* Sidebar desktop */}
                <div className="hidden lg:flex flex-col w-64 bg-gray-900/80 border-r border-gray-800">
                    <div className="p-6">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                                <Car className="text-black w-6 h-6" />
                            </div>
                            <h2 className="text-xl font-bold text-white">Admin Panel</h2>
                        </div>

                        <nav className="space-y-2">
                            <a href="#" className="flex items-center gap-3 text-white hover:text-yellow-400 py-2 px-4 rounded-lg bg-gray-800">
                                <Car size={20} />
                                <span>Vehículos</span>
                            </a>
                            <a href="#" className="flex items-center gap-3 text-gray-400 hover:text-yellow-400 py-2 px-4 rounded-lg">
                                <User size={20} />
                                <span>Usuarios</span>
                            </a>
                            <a href="#" className="flex items-center gap-3 text-gray-400 hover:text-yellow-400 py-2 px-4 rounded-lg">
                                <Settings size={20} />
                                <span>Configuración</span>
                            </a>
                        </nav>
                    </div>

                    <div className="mt-auto p-6">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 text-gray-400 hover:text-yellow-400"
                        >
                            <LogOut size={20} />
                            <span>Cerrar sesión</span>
                        </button>
                    </div>
                </div>

                {/* Contenido principal */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Header */}
                    <header className="bg-gray-900/80 border-b border-gray-800 shadow-md">
                        <div className="px-6 py-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setMobileMenuOpen(true)}
                                    className="lg:hidden text-gray-400 hover:text-yellow-400"
                                >
                                    <AlignJustify size={24} />
                                </button>
                                <h1 className="text-xl font-bold text-white hidden sm:block">Administración de Vehículos</h1>
                            </div>

                            <div className="flex items-center gap-4">
                                <a
                                    href="/admin/nuevo-auto"
                                    className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-medium px-4 py-2 rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all flex items-center gap-2"
                                >
                                    <Plus size={18} />
                                    <span className="hidden sm:inline">Agregar Vehículo</span>
                                </a>
                            </div>
                        </div>
                    </header>

                    {/* Contenido */}
                    <div className="flex-1 overflow-auto p-6">
                        {/* Filtros y búsqueda */}
                        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {/* Búsqueda */}
                            <div className="relative">
                                <div className="flex items-center gap-3 bg-gray-800/70 rounded-xl px-4 py-3 border border-gray-700 focus-within:border-yellow-400 transition-colors">
                                    <Search className="text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        placeholder="Buscar por marca o modelo"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="bg-transparent w-full outline-none text-white placeholder-gray-400"
                                    />
                                </div>
                            </div>

                            {/* Filtro por categoría */}
                            <div className="relative">
                                <div className="flex items-center gap-3 bg-gray-800/70 rounded-xl px-4 py-3 border border-gray-700 focus-within:border-yellow-400 transition-colors">
                                    <Filter className="text-gray-400" size={20} />
                                    <select
                                        value={filterCategory}
                                        onChange={(e) => setFilterCategory(e.target.value)}
                                        className="bg-transparent w-full outline-none text-white cursor-pointer"
                                    >
                                        <option value="" className="bg-gray-800">Todas las categorías</option>
                                        {categorias.map((cat) => (
                                            <option key={cat.value} value={cat.value} className="bg-gray-800">
                                                {cat.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Tabla de vehículos */}
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700">
                            {loading ? (
                                <div className="p-8 text-center">
                                    <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                    <p className="text-gray-400">Cargando vehículos...</p>
                                </div>
                            ) : filteredAndSortedAutos.length === 0 ? (
                                <div className="p-8 text-center">
                                    <Car className="w-12 h-12 text-gray-500 mx-auto mb-3" />
                                    <p className="text-gray-400">No se encontraron vehículos</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-900/50 text-left">
                                            <tr>
                                                <th className="px-6 py-4"></th>
                                                <th
                                                    className="px-6 py-4 cursor-pointer hover:text-yellow-400"
                                                    onClick={() => handleSort('marca')}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <span>Marca</span>
                                                        {sortField === 'marca' && (
                                                            sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                                                        )}
                                                    </div>
                                                </th>
                                                <th
                                                    className="px-6 py-4 cursor-pointer hover:text-yellow-400"
                                                    onClick={() => handleSort('modelo')}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <span>Modelo</span>
                                                        {sortField === 'modelo' && (
                                                            sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                                                        )}
                                                    </div>
                                                </th>
                                                <th
                                                    className="px-6 py-4 cursor-pointer hover:text-yellow-400"
                                                    onClick={() => handleSort('año')}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <span>Año</span>
                                                        {sortField === 'año' && (
                                                            sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                                                        )}
                                                    </div>
                                                </th>
                                                <th
                                                    className="px-6 py-4 cursor-pointer hover:text-yellow-400"
                                                    onClick={() => handleSort('precio')}
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <span>Precio</span>
                                                        {sortField === 'precio' && (
                                                            sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                                                        )}
                                                    </div>
                                                </th>
                                                <th className="px-6 py-4">Categoría</th>
                                                <th className="px-6 py-4 text-right">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-800">
                                            {filteredAndSortedAutos.map((auto) => (
                                                <tr key={auto._id} className="hover:bg-gray-700/30">
                                                    <td className="px-6 py-4 w-16">
                                                        {auto.imagenes && auto.imagenes.length > 0 ? (
                                                            <div className="w-12 h-12 rounded-lg overflow-hidden">
                                                                <Image
                                                                    src={auto.imagenes[0]}
                                                                    alt={`${auto.marca} ${auto.modelo}`}
                                                                    width={48}
                                                                    height={48}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>
                                                        ) : (
                                                            <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center">
                                                                <Car className="text-gray-500" size={24} />
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 font-medium">{auto.marca}</td>
                                                    <td className="px-6 py-4">{auto.modelo}</td>
                                                    <td className="px-6 py-4">{auto.año}</td>
                                                    <td className="px-6 py-4">
                                                        <span className="text-yellow-400">${auto.precio?.toLocaleString()}</span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="bg-gray-700 px-3 py-1 rounded-full text-xs">
                                                            {categorias.find(cat => cat.value === auto.categoria)?.label || auto.categoria}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <div className="flex items-center justify-end gap-2">
                                                            <button
                                                                onClick={() => router.push(`/admin/editar-auto/${auto._id}`)}
                                                                className="bg-blue-600 p-2 rounded-lg hover:bg-blue-700 transition-colors"
                                                                title="Editar"
                                                            >
                                                                <Edit size={16} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(auto._id)}
                                                                className="bg-red-600 p-2 rounded-lg hover:bg-red-700 transition-colors"
                                                                title="Eliminar"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal para ver detalles (versión básica) */}
            {selectedAuto && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-gray-800 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-white">
                                {selectedAuto.marca} {selectedAuto.modelo}
                            </h3>
                            <button
                                onClick={() => setSelectedAuto(null)}
                                className="text-gray-400 hover:text-yellow-400"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Contenido del modal */}
                        <div className="space-y-4">
                            {selectedAuto.imagenes && selectedAuto.imagenes.length > 0 && (
                                <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden">
                                    <Image
                                        src={selectedAuto.imagenes[0]}
                                        alt={`${selectedAuto.marca} ${selectedAuto.modelo}`}
                                        width={600}
                                        height={400}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-gray-400 text-sm">Año</p>
                                    <p>{selectedAuto.año}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">Precio</p>
                                    <p className="text-yellow-400">${selectedAuto.precio?.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">Categoría</p>
                                    <p>{categorias.find(cat => cat.value === selectedAuto.categoria)?.label || selectedAuto.categoria}</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-sm">Potencia</p>
                                    <p>{selectedAuto.potencia || 'No especificado'}</p>
                                </div>
                            </div>

                            <div>
                                <p className="text-gray-400 text-sm mb-1">Descripción</p>
                                <p className="text-gray-200">{selectedAuto.descripcion}</p>
                            </div>

                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    onClick={() => router.push(`/admin/editar-auto/${selectedAuto._id}`)}
                                    className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    <Edit size={16} />
                                    <span>Editar</span>
                                </button>
                                <button
                                    onClick={() => setSelectedAuto(null)}
                                    className="flex items-center gap-2 bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                                >
                                    <X size={16} />
                                    <span>Cerrar</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    )
}