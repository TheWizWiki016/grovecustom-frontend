'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { Car, Gauge, Fuel, Settings, Video, Camera, ChevronLeft, ChevronRight, X, ShoppingCart, Tag } from 'lucide-react'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!) // Define tu clave pública en .env



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
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchAuto = async () => {
            const res = await fetch(`http://localhost:5000/api/autos/${id}`)
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
            'Híbrido': 'bg-lime-500'
        }
        return colors[categoria as keyof typeof colors] || 'bg-gray-500'
    }
    const handlePurchase = async () => {
        setIsLoading(true)

        try {
            const stripe = await stripePromise
            if (!stripe) throw new Error('Stripe no cargó correctamente.')

            const response = await fetch('http://localhost:5000/api/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ auto }),
            })

            const data = await response.json()

            if (data.url) {
                window.location.href = data.url // redirección a Stripe Checkout
            } else {
                throw new Error('No se recibió URL de Stripe.')
            }
        } catch (error) {
            console.error('Error en la compra:', error)
            alert('Error al procesar la compra. Inténtalo de nuevo.')
        } finally {
            setIsLoading(false)
        }
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
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-500"></div>
                    <p className="text-white text-xl font-semibold mt-4">Cargando...</p>
                </div>
            </div>
        )

    return (
        <>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-white">
                {/* Header con información principal */}
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-8 mb-8 shadow-2xl">
                    {/* Categoría del vehículo */}
                    {auto.categoria && (
                        <div className="mb-4">
                            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-white font-semibold text-sm ${getCategoryColor(auto.categoria)} shadow-lg`}>
                                <Tag size={16} />
                                {auto.categoria}
                            </span>
                        </div>
                    )}

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-yellow-500 mb-4 tracking-wide">
                        {auto.marca} {auto.modelo}
                    </h1>
                    <p className="text-lg text-gray-300 mb-2">Año: {auto.año}</p>
                    <p className="text-2xl sm:text-3xl font-bold text-green-400 mb-6">
                        ${auto.precio.toLocaleString()}
                    </p>
                    <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-4xl mb-8">
                        {auto.descripcion}
                    </p>

                    {/* Botón de Comprar Ahora */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={handlePurchase}
                            disabled={isLoading}
                            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-500 disabled:to-gray-600 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 disabled:hover:scale-100 transition-all duration-300 flex items-center justify-center gap-3 min-w-48"
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                                    Procesando...
                                </>
                            ) : (
                                <>
                                    <ShoppingCart size={24} />
                                    Comprar Ahora
                                </>
                            )}
                        </button>

                        <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 min-w-48">
                            <Camera size={24} />
                            Agendar Cita
                        </button>
                    </div>
                </div>

                {/* Información técnica mejorada */}
                <div className="bg-gray-900 bg-opacity-50 rounded-xl p-6 mb-8 shadow-xl">
                    <h2 className="text-2xl font-bold text-yellow-500 mb-6 flex items-center gap-3">
                        <Settings size={28} /> Especificaciones Técnicas
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {auto.categoria && (
                            <InfoItem
                                icon={<Tag className="text-yellow-500" size={24} />}
                                label="Categoría"
                                value={auto.categoria}
                            />
                        )}
                        {auto.potencia && (
                            <InfoItem icon={<Gauge className="text-yellow-500" size={24} />} label="Potencia" value={auto.potencia} />
                        )}
                        {auto.caballosFuerza && (
                            <InfoItem icon={<Gauge className="text-yellow-500" size={24} />} label="Caballos de fuerza" value={auto.caballosFuerza + ' HP'} />
                        )}
                        {auto.cilindrada && (
                            <InfoItem icon={<Settings className="text-yellow-500" size={24} />} label="Cilindrada" value={auto.cilindrada} />
                        )}
                        {auto.tamanoMotor && (
                            <InfoItem icon={<Settings className="text-yellow-500" size={24} />} label="Tamaño Motor" value={auto.tamanoMotor} />
                        )}
                        {auto.transmision && (
                            <InfoItem icon={<Car className="text-yellow-500" size={24} />} label="Transmisión" value={auto.transmision} />
                        )}
                        {auto.tipoCombustible && (
                            <InfoItem icon={<Fuel className="text-yellow-500" size={24} />} label="Combustible" value={auto.tipoCombustible} />
                        )}
                    </div>
                </div>

                {/* Galería de imágenes con slider */}
                {auto.imagenes && auto.imagenes.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold flex items-center gap-3 mb-6 text-yellow-500">
                            <Camera size={28} /> Galería de Imágenes
                        </h2>

                        {/* Imagen principal */}
                        <div className="relative group mb-6">
                            <div
                                className="relative rounded-xl overflow-hidden shadow-2xl cursor-pointer"
                                onClick={() => openImageModal(currentImageIndex)}
                            >
                                <Image
                                    src={auto.imagenes[currentImageIndex]}
                                    alt={`${auto.marca} ${auto.modelo} - Imagen ${currentImageIndex + 1}`}
                                    width={1200}
                                    height={600}
                                    className="object-cover w-full h-64 sm:h-80 md:h-96 lg:h-[500px] transition-transform duration-300 group-hover:scale-105"
                                    priority
                                />
                                {!isMobile && (
                                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                                        <p className="text-white font-semibold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            Click para ver en pantalla completa
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Controles del slider */}
                            {auto.imagenes.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full transition-all duration-300"
                                    >
                                        <ChevronLeft size={24} />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full transition-all duration-300"
                                    >
                                        <ChevronRight size={24} />
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Thumbnails */}
                        {auto.imagenes.length > 1 && (
                            <div className="flex gap-3 overflow-x-auto pb-4">
                                {auto.imagenes.map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentImageIndex(i)}
                                        className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-300 ${i === currentImageIndex
                                            ? 'border-yellow-500 scale-105'
                                            : 'border-gray-600 hover:border-gray-400'
                                            }`}
                                    >
                                        <Image
                                            src={img}
                                            alt={`Thumbnail ${i + 1}`}
                                            width={120}
                                            height={80}
                                            className="object-cover w-20 h-12 sm:w-24 sm:h-16"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Galería de videos con slider */}
                {auto.videos && auto.videos.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold flex items-center gap-3 mb-6 text-yellow-500">
                            <Video size={28} /> Videos
                        </h2>

                        {/* Video principal */}
                        <div className="relative group">
                            <div
                                className="relative rounded-xl overflow-hidden shadow-2xl cursor-pointer"
                                onClick={() => openVideoModal(currentVideoIndex)}
                            >
                                <video
                                    src={auto.videos[currentVideoIndex]}
                                    controls
                                    className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] object-cover rounded-xl"
                                    poster="/api/placeholder/1200/600"
                                />
                            </div>

                            {/* Controles del slider de videos */}
                            {auto.videos.length > 1 && (
                                <>
                                    <button
                                        onClick={prevVideo}
                                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full transition-all duration-300"
                                    >
                                        <ChevronLeft size={24} />
                                    </button>
                                    <button
                                        onClick={nextVideo}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full transition-all duration-300"
                                    >
                                        <ChevronRight size={24} />
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Video thumbnails */}
                        {auto.videos.length > 1 && (
                            <div className="flex gap-3 overflow-x-auto pb-4 mt-4">
                                {auto.videos.map((vid, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentVideoIndex(i)}
                                        className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-300 relative ${i === currentVideoIndex
                                            ? 'border-yellow-500 scale-105'
                                            : 'border-gray-600 hover:border-gray-400'
                                            }`}
                                    >
                                        <video
                                            src={vid}
                                            className="object-cover w-20 h-12 sm:w-24 sm:h-16"
                                            muted
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                                            <Video size={16} className="text-white" />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </main>

            {/* Botón flotante de compra para móvil */}
            <div className="md:hidden fixed bottom-4 left-4 right-4 z-40">
                <button
                    onClick={handlePurchase}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-500 disabled:to-gray-600 text-white font-bold py-4 px-6 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 disabled:hover:scale-100 transition-all duration-300 flex items-center justify-center gap-3"
                >
                    {isLoading ? (
                        <>
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                            Procesando...
                        </>
                    ) : (
                        <>
                            <ShoppingCart size={24} />
                            Comprar Ahora - ${auto.precio.toLocaleString()}
                        </>
                    )}
                </button>
            </div>

            {/* Modal para imágenes (solo desktop) */}
            {isImageModalOpen && !isMobile && auto?.imagenes && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
                    onClick={closeModals}
                >
                    <div className="relative max-w-6xl max-h-full">
                        <button
                            onClick={closeModals}
                            className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-300 z-10"
                        >
                            <X size={24} />
                        </button>

                        <div className="relative">
                            <Image
                                src={auto.imagenes[modalImageIndex]}
                                alt={`${auto.marca} ${auto.modelo} - Modal Image ${modalImageIndex + 1}`}
                                width={1200}
                                height={800}
                                className="object-contain max-h-screen rounded-lg"
                                onClick={(e) => e.stopPropagation()}
                            />

                            {auto.imagenes.length > 1 && (
                                <>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            prevModalImage()
                                        }}
                                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full transition-all duration-300"
                                    >
                                        <ChevronLeft size={28} />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            nextModalImage()
                                        }}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full transition-all duration-300"
                                    >
                                        <ChevronRight size={28} />
                                    </button>
                                </>
                            )}
                        </div>

                        <div className="text-center mt-4">
                            <p className="text-white text-lg">
                                {modalImageIndex + 1} de {auto.imagenes.length}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal para videos (solo desktop) */}
            {isVideoModalOpen && !isMobile && auto?.videos && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
                    onClick={closeModals}
                >
                    <div className="relative max-w-6xl max-h-full">
                        <button
                            onClick={closeModals}
                            className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all duration-300 z-10"
                        >
                            <X size={24} />
                        </button>

                        <video
                            src={auto.videos[modalVideoIndex]}
                            controls
                            autoPlay
                            className="max-w-full max-h-screen rounded-lg"
                            onClick={(e) => e.stopPropagation()}
                        />

                        <div className="text-center mt-4">
                            <p className="text-white text-lg">
                                Video {modalVideoIndex + 1} de {auto.videos.length}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

// Componente para mostrar ítem con ícono mejorado
function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
    return (
        <div className="flex items-center gap-4 bg-gray-800 bg-opacity-50 rounded-lg p-4 shadow-lg hover:bg-opacity-70 transition-all duration-300 border border-gray-700">
            <div className="flex-shrink-0">{icon}</div>
            <div className="min-w-0 flex-1">
                <p className="font-semibold text-gray-200 truncate">{label}</p>
                <p className="text-white font-medium">{value}</p>
            </div>
        </div>
    )
}