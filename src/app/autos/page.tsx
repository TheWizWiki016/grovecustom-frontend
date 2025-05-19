'use client'

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { Search, Filter, Car, Tag, X } from "lucide-react";

type Auto = {
    _id: string;
    marca: string;
    modelo: string;
    descripcion: string;
    precio: number;
    imagenes: string;
    categoria?: string;
    año?: number;
};

export default function AutosPage() {
    const [autos, setAutos] = useState<Auto[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [showFilters, setShowFilters] = useState(false);

    // Fetch autos
    useEffect(() => {
        const fetchAutos = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/autos", {
                    cache: "no-store",
                });
                const data: Auto[] = await res.json();
                setAutos(data);
            } catch (error) {
                console.error("Error fetching autos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAutos();
    }, []);

    // Obtener categorías únicas
    const categories = useMemo(() => {
        const uniqueCategories = [...new Set(autos.map(auto => auto.categoria).filter((cat): cat is string => typeof cat === 'string'))];
        return uniqueCategories.sort();
    }, [autos]);

    // Filtrar autos
    const filteredAutos = useMemo(() => {
        return autos.filter(auto => {
            const matchesSearch =
                auto.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
                auto.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                auto.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (auto.categoria && auto.categoria.toLowerCase().includes(searchTerm.toLowerCase()));

            const matchesCategory =
                selectedCategories.length === 0 ||
                (auto.categoria && selectedCategories.includes(auto.categoria));

            return matchesSearch && matchesCategory;
        });
    }, [autos, searchTerm, selectedCategories]);

    // Agrupar autos por categoría
    const autosByCategory = useMemo(() => {
        const grouped: { [key: string]: Auto[] } = {};

        filteredAutos.forEach(auto => {
            const category = auto.categoria || 'Sin Categoría';
            if (!grouped[category]) {
                grouped[category] = [];
            }
            grouped[category].push(auto);
        });

        return grouped;
    }, [filteredAutos]);

    // Función para obtener el color de la categoría
    const getCategoryColor = (categoria: string) => {
        const colors = {
            'SUV': 'bg-blue-500',
            'Sedán': 'bg-green-500',
            'Sedan': 'bg-green-500',
            'Hatchback': 'bg-purple-500',
            'Coupé': 'bg-red-500',
            'Coupe': 'bg-red-500',
            'Convertible': 'bg-yellow-500',
            'Deportivo': 'bg-orange-500',
            'Pickup': 'bg-gray-600',
            'Camioneta': 'bg-gray-600',
            'Van': 'bg-indigo-500',
            'Minivan': 'bg-indigo-500',
            'Crossover': 'bg-teal-500',
            'Wagon': 'bg-pink-500',
            'Eléctrico': 'bg-emerald-500',
            'Híbrido': 'bg-lime-500',
            'Sin Categoría': 'bg-gray-500'
        };
        return colors[categoria as keyof typeof colors] || 'bg-gray-500';
    };

    // Manejar filtro por categoría
    const toggleCategory = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    // Limpiar filtros
    const clearFilters = () => {
        setSelectedCategories([]);
        setSearchTerm("");
    };

    if (loading) {
        return (
            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex items-center justify-center min-h-64">
                    <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-500 mb-4"></div>
                        <p className="text-white text-xl font-semibold">Cargando autos...</p>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="max-w-7xl mx-auto px-6 py-12">
            <div className="mb-10">
                <h1 className="text-4xl font-extrabold text-yellow-500 mb-6">Autos de Lujo</h1>
                <p className="text-gray-300 text-lg">Encuentra el auto perfecto para ti</p>
            </div>

            {/* Barra de búsqueda y filtros */}
            <div className="bg-gray-900 bg-opacity-50 rounded-xl p-6 mb-8 shadow-xl">
                <div className="flex flex-col lg:flex-row gap-4 items-center">
                    {/* Barra de búsqueda */}
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Buscar por marca, modelo, descripción o categoría..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
                        />
                    </div>

                    {/* Botón de filtros */}
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition-all duration-300 whitespace-nowrap"
                    >
                        <Filter size={20} />
                        Filtros
                        {selectedCategories.length > 0 && (
                            <span className="bg-black text-yellow-500 rounded-full px-2 py-1 text-xs font-bold">
                                {selectedCategories.length}
                            </span>
                        )}
                    </button>

                    {/* Botón limpiar filtros */}
                    {(selectedCategories.length > 0 || searchTerm) && (
                        <button
                            onClick={clearFilters}
                            className="flex items-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-300"
                        >
                            <X size={16} />
                            Limpiar
                        </button>
                    )}
                </div>

                {/* Panel de filtros expandible */}
                {showFilters && (
                    <div className="mt-6 pt-6 border-t border-gray-700">
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <Tag size={20} className="text-yellow-500" />
                            Filtrar por Categoría
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => toggleCategory(category)}
                                    className={`px-4 py-2 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${selectedCategories.includes(category)
                                        ? `${getCategoryColor(category)} text-white shadow-lg scale-105`
                                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                                        }`}
                                >
                                    <span className={`w-2 h-2 rounded-full ${selectedCategories.includes(category)
                                        ? 'bg-white'
                                        : getCategoryColor(category).replace('bg-', 'bg-opacity-70 bg-')
                                        }`}></span>
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Resultados */}
            <div className="mb-6">
                <p className="text-gray-300">
                    Mostrando {filteredAutos.length} de {autos.length} autos
                    {searchTerm && ` para "${searchTerm}"`}
                    {selectedCategories.length > 0 && ` en ${selectedCategories.join(', ')}`}
                </p>
            </div>

            {/* Autos agrupados por categoría */}
            {Object.keys(autosByCategory).length === 0 ? (
                <div className="text-center py-16">
                    <Car size={64} className="mx-auto text-gray-600 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-400 mb-2">No se encontraron autos</h3>
                    <p className="text-gray-500">Intenta cambiar los filtros de búsqueda</p>
                </div>
            ) : (
                Object.entries(autosByCategory)
                    .sort(([a], [b]) => a.localeCompare(b))
                    .map(([category, categoryAutos]) => (
                        <div key={category} className="mb-12">
                            {/* Header de categoría */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className={`w-4 h-4 rounded-full ${getCategoryColor(category)}`}></div>
                                <h2 className="text-2xl font-bold text-white">
                                    {category}
                                </h2>
                                <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm">
                                    {categoryAutos.length} {categoryAutos.length === 1 ? 'auto' : 'autos'}
                                </span>
                            </div>

                            {/* Grid de autos */}
                            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                                {categoryAutos.map((auto) => (
                                    <Link key={auto._id} href={`/autos/${auto._id}`} passHref>
                                        <div className="group cursor-pointer bg-gray-900 bg-opacity-50 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-yellow-500/20 transform hover:scale-105 transition-all duration-300">
                                            <div className="relative w-full h-64 overflow-hidden">
                                                {auto.imagenes ? (
                                                    <Image
                                                        src={auto.imagenes[0]}
                                                        alt={`${auto.marca} ${auto.modelo}`}
                                                        fill
                                                        style={{ objectFit: "cover" }}
                                                        className="group-hover:scale-110 transition-transform duration-300"
                                                        sizes="(max-width: 768px) 100vw, 33vw"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gray-700 flex items-center justify-center text-gray-400">
                                                        Sin imagen
                                                    </div>
                                                )}
                                                {auto.categoria && (
                                                    <div className="absolute top-4 left-4">
                                                        <span className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${getCategoryColor(auto.categoria)} shadow-lg`}>
                                                            {auto.categoria}
                                                        </span>
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            </div>
                                            <div className="p-6">
                                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-500 transition-colors duration-300">
                                                    {auto.marca} {auto.modelo}
                                                </h3>
                                                <p className="text-gray-300 mb-4 line-clamp-2">
                                                    {auto.descripcion}
                                                </p>
                                                <div className="flex items-center justify-between">
                                                    <p className="text-yellow-500 font-bold text-lg">
                                                        ${auto.precio.toLocaleString()}
                                                    </p>
                                                    {auto.año && (
                                                        <p className="text-gray-400 text-sm">
                                                            {auto.año}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                        </div>
                    ))
            )}
        </main>
    );
}