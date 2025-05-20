'use client'

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { Search, Filter, Car, Tag, X, Zap, Crown, Star, Award, Settings, Gauge, Fuel } from "lucide-react";

type Auto = {
    _id: string;
    marca: string;
    modelo: string;
    descripcion: string;
    precio: number;
    imagenes: string[];
    categoria?: string;
    año?: number;
    caballosFuerza?: number;
    tipoCombustible?: string;
    potencia?: string;
    cilindrada?: string;
    transmision?: string;
};

// Category icons matching the home page
const categoriasIcons = {
    'supercar': <Zap className="w-4 h-4" />,
    'hypercar': <Crown className="w-4 h-4" />,
    'luxury-sedan': <Star className="w-4 h-4" />,
    'luxury-suv': <Award className="w-4 h-4" />,
    'convertible': <Car className="w-4 h-4" />,
    'coupe-gran-turismo': <Gauge className="w-4 h-4" />,
    'deportivo-clasico': <Settings className="w-4 h-4" />
}

const categoriasLabels = {
    'supercar': 'Supercar',
    'hypercar': 'Hypercar',
    'luxury-sedan': 'Sedán de Lujo',
    'luxury-suv': 'SUV de Lujo',
    'convertible': 'Convertible',
    'coupe-gran-turismo': 'Coupé GT',
    'deportivo-clasico': 'Clásico'
}

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
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-400 mx-auto"></div>
                    <p className="text-yellow-400 mt-4 text-xl">Cargando vehículos de lujo...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
            {/* Header Section */}
            <section className="py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-6xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-4 text-center">
                        COLECCIÓN DE LUJO
                    </h1>
                    <p className="text-gray-300 text-xl text-center">Encuentra el vehículo perfecto para ti</p>
                </div>
            </section>

            {/* Search and Filters Section */}
            <section className="px-6 pb-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-xl">
                        <div className="flex flex-col lg:flex-row gap-4 items-center">
                            {/* Search Bar */}
                            <div className="relative flex-1 w-full">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Buscar por marca, modelo, descripción o categoría..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300"
                                />
                            </div>

                            {/* Filter Button */}
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold rounded-xl hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 shadow-lg shadow-yellow-400/20"
                            >
                                <Filter size={20} />
                                Filtros
                                {selectedCategories.length > 0 && (
                                    <span className="bg-black text-yellow-400 rounded-full px-2 py-1 text-xs font-bold">
                                        {selectedCategories.length}
                                    </span>
                                )}
                            </button>

                            {/* Clear Filters */}
                            {(selectedCategories.length > 0 || searchTerm) && (
                                <button
                                    onClick={clearFilters}
                                    className="flex items-center gap-2 px-4 py-4 bg-red-500/80 hover:bg-red-500 text-white rounded-xl transition-all duration-300 border border-red-500/30"
                                >
                                    <X size={16} />
                                    Limpiar
                                </button>
                            )}
                        </div>

                        {/* Expandable Filters Panel */}
                        {showFilters && (
                            <div className="mt-6 pt-6 border-t border-gray-700">
                                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                    <Tag size={20} className="text-yellow-400" />
                                    Filtrar por Categoría
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {categories.map(category => (
                                        <button
                                            key={category}
                                            onClick={() => toggleCategory(category)}
                                            className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 border ${selectedCategories.includes(category)
                                                ? 'bg-yellow-400/20 border-yellow-400 text-yellow-400 shadow-lg'
                                                : 'bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-600/50 hover:border-gray-500'
                                                }`}
                                        >
                                            <span className="text-yellow-400">
                                                {categoriasIcons[category as keyof typeof categoriasIcons] || <Car className="w-4 h-4" />}
                                            </span>
                                            {categoriasLabels[category as keyof typeof categoriasLabels] || category}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Results Counter */}
            <section className="px-6 pb-4">
                <div className="max-w-7xl mx-auto">
                    <p className="text-gray-300 text-lg">
                        Mostrando {filteredAutos.length} de {autos.length} vehículos
                        {searchTerm && ` para "${searchTerm}"`}
                        {selectedCategories.length > 0 && ` en ${selectedCategories.map(cat => categoriasLabels[cat as keyof typeof categoriasLabels] || cat).join(', ')}`}
                    </p>
                </div>
            </section>

            {/* Cars Grid by Category */}
            <section className="px-6 pb-16">
                <div className="max-w-7xl mx-auto">
                    {Object.keys(autosByCategory).length === 0 ? (
                        <div className="text-center py-16">
                            <Car size={80} className="mx-auto text-gray-600 mb-6" />
                            <h3 className="text-3xl font-bold text-gray-400 mb-4">No se encontraron vehículos</h3>
                            <p className="text-gray-500 text-lg mb-8">Intenta cambiar los filtros de búsqueda</p>
                            <button
                                onClick={clearFilters}
                                className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold px-6 py-3 rounded-xl hover:from-yellow-500 hover:to-yellow-700 transition-all"
                            >
                                Limpiar Filtros
                            </button>
                        </div>
                    ) : (
                        Object.entries(autosByCategory)
                            .sort(([a], [b]) => a.localeCompare(b))
                            .map(([category, categoryAutos]) => (
                                <div key={category} className="mb-16">
                                    {/* Category Header */}
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="bg-yellow-400/20 rounded-full p-3">
                                            <span className="text-yellow-400">
                                                {categoriasIcons[category as keyof typeof categoriasIcons] || <Car className="w-6 h-6" />}
                                            </span>
                                        </div>
                                        <div>
                                            <h2 className="text-3xl font-bold text-white">
                                                {categoriasLabels[category as keyof typeof categoriasLabels] || category}
                                            </h2>
                                            <span className="bg-gray-700/50 text-gray-300 px-3 py-1 rounded-full text-sm">
                                                {categoryAutos.length} {categoryAutos.length === 1 ? 'vehículo' : 'vehículos'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Cars Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                        {categoryAutos.map((auto) => (
                                            <Link key={auto._id} href={`/autos/${auto._id}`}>
                                                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:border-yellow-400 transition-all duration-300 group">
                                                    {/* Car Image */}
                                                    <div className="relative h-64 bg-gray-700">
                                                        {auto.imagenes && auto.imagenes.length > 0 ? (
                                                            <Image
                                                                src={auto.imagenes[0]}
                                                                alt={`${auto.marca} ${auto.modelo}`}
                                                                fill
                                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                                sizes="(max-width: 768px) 100vw, 33vw"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center">
                                                                <Car className="w-16 h-16 text-gray-500" />
                                                            </div>
                                                        )}

                                                        {/* Category Badge */}
                                                        {auto.categoria && (
                                                            <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2">
                                                                <span className="text-yellow-400">
                                                                    {categoriasIcons[auto.categoria as keyof typeof categoriasIcons] || <Car className="w-4 h-4" />}
                                                                </span>
                                                                <span className="text-white text-xs font-semibold">
                                                                    {categoriasLabels[auto.categoria as keyof typeof categoriasLabels] || auto.categoria}
                                                                </span>
                                                            </div>
                                                        )}

                                                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <div className="bg-yellow-400/20 backdrop-blur-sm rounded-full px-4 py-2">
                                                                <span className="text-yellow-400 font-semibold">Ver Detalles</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Car Information */}
                                                    <div className="p-6">
                                                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                                                            {auto.marca} {auto.modelo}
                                                        </h3>

                                                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                                            {auto.descripcion}
                                                        </p>

                                                        {/* Price */}
                                                        <div className="mb-4">
                                                            <span className="text-3xl font-bold text-yellow-400">
                                                                ${auto.precio.toLocaleString()}
                                                            </span>
                                                        </div>

                                                        {/* Specifications */}
                                                        <div className="flex justify-center gap-4 text-sm text-gray-300">
                                                            <div className="flex items-center gap-1">
                                                                <Gauge className="w-4 h-4 text-yellow-400" />
                                                                <span>{auto.año}</span>
                                                            </div>
                                                            {auto.caballosFuerza && (
                                                                <div className="flex items-center gap-1">
                                                                    <Zap className="w-4 h-4 text-yellow-400" />
                                                                    <span>{auto.caballosFuerza} HP</span>
                                                                </div>
                                                            )}
                                                            {auto.tipoCombustible && (
                                                                <div className="flex items-center gap-1">
                                                                    <Fuel className="w-4 h-4 text-yellow-400" />
                                                                    <span>{auto.tipoCombustible}</span>
                                                                </div>
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
                </div>
            </section>
        </div>
    );
}