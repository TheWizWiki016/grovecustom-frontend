'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'


import {
    Car,
    Gauge,
    Fuel,
    Settings,
    Video,
    Camera,
    ChevronLeft,
    ChevronRight,
    X,
    Tag,
    Calendar,
    Phone,
    Mail,
    MapPin,
    Heart,
    Share2,
    Eye,
    Star
} from 'lucide-react'

interface Auto {
    _id: string
    marca: string
    modelo: string
    año: number
    precio: number
    descripcion: string
    categoria?: string
    potencia?: string
    caballosFuerza?: number
    cilindrada?: string
    tamanoMotor?: string
    transmision?: string
    tipoCombustible?: string
    imagenes?: string[]
    videos?: string[]
}

export default function DetalleAutoPage() {
    const { id } = useParams()
    const [auto, setAuto] = useState<Auto | null>(null)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
    const [isImageModalOpen, setIsImageModalOpen] = useState(false)
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
    const [modalImageIndex, setModalImageIndex] = useState(0)
    const [modalVideoIndex, setModalVideoIndex] = useState(0)
    const [isMobile, setIsMobile] = useState(false)
    const [isFavorite, setIsFavorite] = useState(false)
    const [viewCount, setViewCount] = useState(847)

    useEffect(() => {
        const fetchAuto = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/autos/${id}`)
            const data = await res.json()
            setAuto(data)
        }
        fetchAuto()
    }, [id])

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkIfMobile()
        window.addEventListener('resize', checkIfMobile)
        return () => window.removeEventListener('resize', checkIfMobile)
    }, [])

    // Funciones para el slider de imágenes
    const nextImage = () => {
        if (auto?.imagenes) {
            setCurrentImageIndex((prev) =>
                prev === auto.imagenes!.length - 1 ? 0 : prev + 1
            )
        }
    }

    const prevImage = () => {
        if (auto?.imagenes) {
            setCurrentImageIndex((prev) =>
                prev === 0 ? auto.imagenes!.length - 1 : prev - 1
            )
        }
    }

    // Funciones para el slider de videos
    const nextVideo = () => {
        if (auto?.videos) {
            setCurrentVideoIndex((prev) =>
                prev === auto.videos!.length - 1 ? 0 : prev + 1
            )
        }
    }

    const prevVideo = () => {
        if (auto?.videos) {
            setCurrentVideoIndex((prev) =>
                prev === 0 ? auto.videos!.length - 1 : prev - 1
            )
        }
    }

    // Funciones para modal (solo desktop)
    const openImageModal = (index: number) => {
        if (!isMobile) {
            setModalImageIndex(index)
            setIsImageModalOpen(true)
        }
    }

    const openVideoModal = (index: number) => {
        if (!isMobile) {
            setModalVideoIndex(index)
            setIsVideoModalOpen(true)
        }
    }

    const closeModals = () => {
        setIsImageModalOpen(false)
        setIsVideoModalOpen(false)
    }

    // Función para obtener el color de la categoría
    const getCategoryColor = (categoria: string) => {
        const colors = {
            'SUV': 'bg-gradient-to-r from-blue-500 to-blue-600',
            'Sedán': 'bg-gradient-to-r from-green-500 to-green-600',
            'Sedan': 'bg-gradient-to-r from-green-500 to-green-600',
            'Hatchback': 'bg-gradient-to-r from-purple-500 to-purple-600',
            'Coupé': 'bg-gradient-to-r from-red-500 to-red-600',
            'Coupe': 'bg-gradient-to-r from-red-500 to-red-600',
            'Convertible': 'bg-gradient-to-r from-yellow-500 to-yellow-600',
            'Deportivo': 'bg-gradient-to-r from-orange-500 to-orange-600',
            'Pickup': 'bg-gradient-to-r from-gray-600 to-gray-700',
            'Camioneta': 'bg-gradient-to-r from-gray-600 to-gray-700',
            'Van': 'bg-gradient-to-r from-indigo-500 to-indigo-600',
            'Minivan': 'bg-gradient-to-r from-indigo-500 to-indigo-600',
            'Crossover': 'bg-gradient-to-r from-teal-500 to-teal-600',
            'Wagon': 'bg-gradient-to-r from-pink-500 to-pink-600',
            'Eléctrico': 'bg-gradient-to-r from-emerald-500 to-emerald-600',
            'Híbrido': 'bg-gradient-to-r from-lime-500 to-lime-600'
        }
        return colors[categoria as keyof typeof colors] || 'bg-gradient-to-r from-gray-500 to-gray-600'
    }

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${auto?.marca} ${auto?.modelo} ${auto?.año}`,
                    text: `Mira este increíble ${auto?.marca} ${auto?.modelo} por $${auto?.precio.toLocaleString()}`,
                    url: window.location.href,
                })
            } catch (err) {
                console.log('Error sharing:', err)
            }
        } else {
            // Fallback para navegadores que no soportan Web Share API
            navigator.clipboard.writeText(window.location.href)
            alert('Enlace copiado al portapapeles')
        }
    }

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite)
    }

    // Navegación del modal
    const nextModalImage = () => {
        if (auto?.imagenes) {
            setModalImageIndex((prev) =>
                prev === auto.imagenes!.length - 1 ? 0 : prev + 1
            )
        }
    }

    const prevModalImage = () => {
        if (auto?.imagenes) {
            setModalImageIndex((prev) =>
                prev === 0 ? auto.imagenes!.length - 1 : prev - 1
            )
        }
    }

    if (!auto)
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-32 w-32 border-4 border-yellow-500 border-t-transparent"></div>
                    <p className="text-white text-xl font-semibold mt-6">Cargando vehículo...</p>
                    <p className="text-gray-400 text-sm mt-2">Por favor espera un momento</p>
                </div>
            </div>
        )

    return (
        <>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-white">
                {/* Header con información principal mejorado */}
                <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 mb-8 shadow-2xl border border-gray-700 overflow-hidden">
                    {/* Patrón de fondo decorativo */}
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-transparent"></div>

                    {/* Acciones flotantes */}
                    <div className="absolute top-6 right-6 flex gap-3">
                        <button
                            onClick={toggleFavorite}
                            className={`p-3 rounded-full backdrop-blur-sm border transition-all duration-300 ${isFavorite
                                ? 'bg-red-500/20 border-red-500 text-red-400'
                                : 'bg-gray-800/50 border-gray-600 text-gray-400 hover:text-red-400 hover:border-red-500'
                                }`}
                        >
                            <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
                        </button>
                        <button
                            onClick={handleShare}
                            className="p-3 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-600 text-gray-400 hover:text-blue-400 hover:border-blue-500 transition-all duration-300"
                        >
                            <Share2 size={20} />
                        </button>
                    </div>

                    {/* Estadísticas de visualización */}
                    <div className="flex items-center gap-2 mb-4 text-sm text-gray-400">
                        <Eye size={16} />
                        <span>{viewCount.toLocaleString()} visualizaciones</span>
                        <div className="flex items-center gap-1 ml-4">
                            <Star size={16} className="text-yellow-500" fill="currentColor" />
                            <span>4.8 (127 reseñas)</span>
                        </div>
                    </div>

                    {/* Categoría del vehículo mejorada */}
                    {auto.categoria && (
                        <div className="mb-6">
                            <span className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-bold text-sm ${getCategoryColor(auto.categoria)} shadow-lg transform hover:scale-105 transition-all duration-300`}>
                                <Tag size={18} />
                                {auto.categoria}
                            </span>
                        </div>
                    )}

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 mb-4 tracking-tight leading-tight">
                        {auto.marca} {auto.modelo}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        <p className="text-xl text-gray-300 bg-gray-800/50 px-4 py-2 rounded-full">
                            Año: <span className="font-bold text-white">{auto.año}</span>
                        </p>
                        <p className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-500">
                            ${auto.precio.toLocaleString()}
                        </p>
                    </div>

                    <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700 mb-8">
                        <p className="text-gray-300 text-lg leading-relaxed">
                            {auto.descripcion}
                        </p>
                    </div>

                    {/* Botones de acción mejorados */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button className="bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:from-green-600 hover:via-green-700 hover:to-green-800 text-white font-bold py-4 px-8 rounded-full text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 min-w-64 group">
                            <Phone size={24} className="group-hover:animate-pulse" />
                            Contactar Vendedor
                        </button>

                        <button className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 text-white font-bold py-4 px-8 rounded-full text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 min-w-64 group">
                            <Calendar size={24} className="group-hover:animate-bounce" />
                            Agendar Cita
                        </button>

                        <button className="bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:from-yellow-600 hover:via-yellow-700 hover:to-yellow-800 text-black font-bold py-4 px-8 rounded-full text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 min-w-64 group">
                            <Camera size={24} className="group-hover:rotate-12 transition-transform" />
                            Solicitar Video
                        </button>
                    </div>
                </div>

                {/* Información de contacto */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 rounded-xl p-6 border border-green-700/50 hover:border-green-600 transition-all duration-300">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-500 rounded-full">
                                <Phone size={24} className="text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white">Llámanos</h3>
                                <p className="text-green-300">+57 300 123 4567</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 rounded-xl p-6 border border-blue-700/50 hover:border-blue-600 transition-all duration-300">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-500 rounded-full">
                                <Mail size={24} className="text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white">Email</h3>
                                <p className="text-blue-300">ventas@autosdream.com</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 rounded-xl p-6 border border-purple-700/50 hover:border-purple-600 transition-all duration-300">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-purple-500 rounded-full">
                                <MapPin size={24} className="text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white">Ubicación</h3>
                                <p className="text-purple-300">Bogotá, Colombia</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Información técnica mejorada */}
                <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 mb-8 shadow-2xl border border-gray-700">
                    <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-8 flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full">
                            <Settings size={32} className="text-white" />
                        </div>
                        Especificaciones Técnicas
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {auto.categoria && (
                            <InfoItem
                                icon={<Tag className="text-yellow-500" size={28} />}
                                label="Categoría"
                                value={auto.categoria}
                            />
                        )}
                        {auto.potencia && (
                            <InfoItem
                                icon={<Gauge className="text-yellow-500" size={28} />}
                                label="Potencia"
                                value={auto.potencia}
                            />
                        )}
                        {auto.caballosFuerza && (
                            <InfoItem
                                icon={<Gauge className="text-yellow-500" size={28} />}
                                label="Caballos de fuerza"
                                value={auto.caballosFuerza + ' HP'}
                            />
                        )}
                        {auto.cilindrada && (
                            <InfoItem
                                icon={<Settings className="text-yellow-500" size={28} />}
                                label="Cilindrada"
                                value={auto.cilindrada}
                            />
                        )}
                        {auto.tamanoMotor && (
                            <InfoItem
                                icon={<Settings className="text-yellow-500" size={28} />}
                                label="Tamaño Motor"
                                value={auto.tamanoMotor}
                            />
                        )}
                        {auto.transmision && (
                            <InfoItem
                                icon={<Car className="text-yellow-500" size={28} />}
                                label="Transmisión"
                                value={auto.transmision}
                            />
                        )}
                        {auto.tipoCombustible && (
                            <InfoItem
                                icon={<Fuel className="text-yellow-500" size={28} />}
                                label="Combustible"
                                value={auto.tipoCombustible}
                            />
                        )}
                    </div>
                </div>

                {/* Galería de imágenes con slider mejorada */}
                {auto.imagenes && auto.imagenes.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-8 flex items-center gap-4">
                            <div className="p-3 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full">
                                <Camera size={32} className="text-white" />
                            </div>
                            Galería de Imágenes
                        </h2>

                        {/* Imagen principal mejorada */}
                        <div className="relative group mb-8">
                            <div
                                className="relative rounded-2xl overflow-hidden shadow-2xl cursor-pointer border-4 border-gray-700 hover:border-yellow-500 transition-all duration-500"
                                onClick={() => openImageModal(currentImageIndex)}
                            >
                                <Image
                                    src={auto.imagenes[currentImageIndex]}
                                    alt={`${auto.marca} ${auto.modelo} - Imagen ${currentImageIndex + 1}`}
                                    width={1200}
                                    height={600}
                                    className="object-cover w-full h-64 sm:h-80 md:h-96 lg:h-[600px] transition-all duration-500 group-hover:scale-105"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/30 group-hover:from-black/50 group-hover:to-black/50 transition-all duration-500"></div>

                                {!isMobile && (
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                                        <div className="bg-black/70 backdrop-blur-sm text-white font-bold text-xl px-8 py-4 rounded-full border border-white/20">
                                            Ver en pantalla completa
                                        </div>
                                    </div>
                                )}

                                {/* Indicador de imagen actual */}
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                                    <div className="bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                                        {currentImageIndex + 1} / {auto.imagenes.length}
                                    </div>
                                </div>
                            </div>

                            {/* Controles del slider mejorados */}
                            {auto.imagenes.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-black/70 backdrop-blur-sm hover:bg-black/90 text-white p-4 rounded-full transition-all duration-300 border border-white/20 hover:border-yellow-500 hover:scale-110"
                                    >
                                        <ChevronLeft size={28} />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black/70 backdrop-blur-sm hover:bg-black/90 text-white p-4 rounded-full transition-all duration-300 border border-white/20 hover:border-yellow-500 hover:scale-110"
                                    >
                                        <ChevronRight size={28} />
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Thumbnails mejorados */}
                        {auto.imagenes.length > 1 && (
                            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                                {auto.imagenes.map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentImageIndex(i)}
                                        className={`flex-shrink-0 rounded-xl overflow-hidden border-3 transition-all duration-300 hover:scale-105 ${i === currentImageIndex
                                            ? 'border-yellow-500 shadow-lg shadow-yellow-500/25 scale-105'
                                            : 'border-gray-600 hover:border-gray-400'
                                            }`}
                                    >
                                        <Image
                                            src={img}
                                            alt={`Thumbnail ${i + 1}`}
                                            width={120}
                                            height={80}
                                            className="object-cover w-24 h-16 sm:w-32 sm:h-20 transition-all duration-300"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Galería de videos con slider mejorada */}
                {auto.videos && auto.videos.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-8 flex items-center gap-4">
                            <div className="p-3 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full">
                                <Video size={32} className="text-white" />
                            </div>
                            Videos del Vehículo
                        </h2>

                        {/* Video principal mejorado */}
                        <div className="relative group mb-8">
                            <div
                                className="relative rounded-2xl overflow-hidden shadow-2xl cursor-pointer border-4 border-gray-700 hover:border-yellow-500 transition-all duration-500"
                                onClick={() => openVideoModal(currentVideoIndex)}
                            >
                                <video
                                    src={auto.videos[currentVideoIndex]}
                                    controls
                                    className="w-full h-64 sm:h-80 md:h-96 lg:h-[600px] object-cover rounded-xl"
                                    poster="/api/placeholder/1200/600"
                                />

                                {/* Indicador de video actual */}
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                                    <div className="bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                                        Video {currentVideoIndex + 1} / {auto.videos.length}
                                    </div>
                                </div>
                            </div>

                            {/* Controles del slider de videos mejorados */}
                            {auto.videos.length > 1 && (
                                <>
                                    <button
                                        onClick={prevVideo}
                                        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-black/70 backdrop-blur-sm hover:bg-black/90 text-white p-4 rounded-full transition-all duration-300 border border-white/20 hover:border-yellow-500 hover:scale-110"
                                    >
                                        <ChevronLeft size={28} />
                                    </button>
                                    <button
                                        onClick={nextVideo}
                                        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black/70 backdrop-blur-sm hover:bg-black/90 text-white p-4 rounded-full transition-all duration-300 border border-white/20 hover:border-yellow-500 hover:scale-110"
                                    >
                                        <ChevronRight size={28} />
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Video thumbnails mejorados */}
                        {auto.videos.length > 1 && (
                            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                                {auto.videos.map((vid, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentVideoIndex(i)}
                                        className={`flex-shrink-0 rounded-xl overflow-hidden border-3 transition-all duration-300 relative hover:scale-105 ${i === currentVideoIndex
                                            ? 'border-yellow-500 shadow-lg shadow-yellow-500/25 scale-105'
                                            : 'border-gray-600 hover:border-gray-400'
                                            }`}
                                    >
                                        <video
                                            src={vid}
                                            className="object-cover w-24 h-16 sm:w-32 sm:h-20"
                                            muted
                                        />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                            <div className="bg-white/90 rounded-full p-2">
                                                <Video size={16} className="text-gray-800" />
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </main>

            {/* Botón flotante de contacto para móvil */}
            <div className="md:hidden fixed bottom-4 left-4 right-4 z-40">
                <div className="flex gap-2">
                    <button className="flex-1 bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white font-bold py-4 px-4 rounded-full text-sm shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                        <Phone size={20} />
                        Llamar
                    </button>
                    <button className="flex-1 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-bold py-4 px-4 rounded-full text-sm shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                        <Calendar size={20} />
                        Agendar
                    </button>
                </div>
            </div>

            {/* Modal para imágenes (solo desktop) mejorado */}
            {isImageModalOpen && !isMobile && auto?.imagenes && (
                <div
                    className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={closeModals}
                >
                    <div className="relative max-w-7xl max-h-full">
                        <button
                            onClick={closeModals}
                            className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/90 transition-all duration-300 z-10 border border-white/20"
                        >
                            <X size={28} />
                        </button>

                        <div className="relative">
                            <Image
                                src={auto.imagenes[modalImageIndex]}
                                alt={`${auto.marca} ${auto.modelo} - Modal Image ${modalImageIndex +
                                    1}`}
                                width={1400}
                                height={800}
                                className="object-contain max-w-full max-h-[80vh] rounded-xl"
                                onClick={(e) => e.stopPropagation()}
                            />

                            {/* Controles del modal */}
                            {auto.imagenes.length > 1 && (
                                <>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            prevModalImage()
                                        }}
                                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/70 backdrop-blur-sm hover:bg-black/90 text-white p-4 rounded-full transition-all duration-300 border border-white/20 hover:border-yellow-500"
                                    >
                                        <ChevronLeft size={32} />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            nextModalImage()
                                        }}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/70 backdrop-blur-sm hover:bg-black/90 text-white p-4 rounded-full transition-all duration-300 border border-white/20 hover:border-yellow-500"
                                    >
                                        <ChevronRight size={32} />
                                    </button>
                                </>
                            )}

                            {/* Contador de imágenes en modal */}
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                                <div className="bg-black/70 backdrop-blur-sm text-white px-6 py-3 rounded-full text-lg font-medium">
                                    {modalImageIndex + 1} / {auto.imagenes.length}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal para videos (solo desktop) mejorado */}
            {isVideoModalOpen && !isMobile && auto?.videos && (
                <div
                    className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={closeModals}
                >
                    <div className="relative max-w-7xl max-h-full">
                        <button
                            onClick={closeModals}
                            className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/90 transition-all duration-300 z-10 border border-white/20"
                        >
                            <X size={28} />
                        </button>

                        <div className="relative">
                            <video
                                src={auto.videos[modalVideoIndex]}
                                controls
                                autoPlay
                                className="max-w-full max-h-[80vh] rounded-xl"
                                onClick={(e) => e.stopPropagation()}
                            />

                            {/* Contador de videos en modal */}
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                                <div className="bg-black/70 backdrop-blur-sm text-white px-6 py-3 rounded-full text-lg font-medium">
                                    Video {modalVideoIndex + 1} / {auto.videos.length}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

// Componente para mostrar información técnica
function InfoItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
    return (
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-gray-700/50 hover:border-yellow-500/50 transition-all duration-300 group hover:scale-105">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 rounded-full border border-yellow-500/30 group-hover:border-yellow-500 transition-all duration-300">
                    {icon}
                </div>
                <div className="flex-1">
                    <p className="text-gray-400 text-sm font-medium uppercase tracking-wide">{label}</p>
                    <p className="text-white text-lg font-bold">{value}</p>
                </div>
            </div>
        </div>
    )
}