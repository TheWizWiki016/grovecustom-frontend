
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Car, Eye, Star, Zap, Fuel, Gauge, Crown, Award, Settings, ChevronLeft, ChevronRight } from 'lucide-react'
import Footer from '@/components/Footer'

// Types for cars
interface Auto {
  _id: string
  marca: string
  modelo: string
  año: number
  precio: number
  descripcion: string
  potencia?: string
  caballosFuerza?: number
  cilindrada?: string
  transmision?: string
  tipoCombustible?: string
  categoria?: string
  imagenes: string[]
  videos: string[]
}

// Category icons
const categoriasIcons = {
  'supercar': <Zap className="w-5 h-5" />,
  'hypercar': <Crown className="w-5 h-5" />,
  'luxury-sedan': <Star className="w-5 h-5" />,
  'luxury-suv': <Award className="w-5 h-5" />,
  'convertible': <Car className="w-5 h-5" />,
  'coupe-gran-turismo': <Gauge className="w-5 h-5" />,
  'deportivo-clasico': <Settings className="w-5 h-5" />
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

export default function HomePage() {
  const [autos, setAutos] = useState<Auto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  // Fetch cars from API
  useEffect(() => {
    const fetchAutos = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/autos')
        if (!response.ok) {
          throw new Error('Error al cargar los autos')
        }
        const data = await response.json()
        setAutos(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido')
      } finally {
        setLoading(false)
      }
    }

    fetchAutos()
  }, [])

  // Hero slider functionality
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % autos.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + autos.length) % autos.length)
  }

  useEffect(() => {
    if (autos.length > 0) {
      const interval = setInterval(nextSlide, 5000)
      return () => clearInterval(interval)
    }
  }, [autos.length])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-400 mx-auto"></div>
          <p className="text-yellow-400 mt-4 text-xl">Cargando vehículos de lujo...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Car className="w-24 h-24 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Error al cargar</h2>
          <p className="text-gray-400">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <><div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Hero Section with Slider */}
      <section className="relative h-96 bg-gray-800/30 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6">
            {autos.length > 0 ? (
              <>
                <div className="relative w-80 h-48 mx-auto mb-4">
                  {autos[currentSlide].imagenes.length > 0 ? (
                    <Image
                      src={autos[currentSlide].imagenes[0]}
                      alt={`${autos[currentSlide].marca} ${autos[currentSlide].modelo}`}
                      fill
                      className="object-cover rounded-lg shadow-2xl" />
                  ) : (
                    <div className="w-full h-full bg-gray-700 rounded-lg flex items-center justify-center">
                      <Car className="w-16 h-16 text-gray-500" />
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <span className="text-sm text-yellow-400 font-medium">Slide de autos</span>
                  <div className="mt-2 text-gray-300">
                    <h3 className="text-xl font-bold">{autos[currentSlide].marca} {autos[currentSlide].modelo}</h3>
                    <p className="text-lg text-yellow-400">${autos[currentSlide].precio.toLocaleString()}</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center">
                <Car className="w-24 h-24 text-gray-600 mx-auto mb-4" />
                <span className="text-sm text-yellow-400 font-medium">No hay autos disponibles</span>
              </div>
            )}
          </div>
        </div>

        {/* Slider Navigation */}
        {autos.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/80 hover:bg-black rounded-full p-3 shadow-lg transition-all border border-gray-700"
            >
              <ChevronLeft className="w-6 h-6 text-yellow-400" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/80 hover:bg-black rounded-full p-3 shadow-lg transition-all border border-gray-700"
            >
              <ChevronRight className="w-6 h-6 text-yellow-400" />
            </button>

            {/* Slider Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {autos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-yellow-400' : 'bg-gray-600'}`} />
              ))}
            </div>
          </>
        )}
      </section>

      {/* Title Section */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-4">
            GROVE CUSTOM CARS
          </h1>
        </div>
      </section>

      {/* Cars Grid */}
      <section className="pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {autos.length === 0 ? (
            <div className="text-center py-16">
              <Car className="w-24 h-24 text-gray-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-400 mb-2">
                No hay vehículos disponibles
              </h3>
              <p className="text-gray-500 mb-6">
                Aún no hay vehículos registrados en la colección.
              </p>
              <Link
                href="/autos/nuevo"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold px-6 py-3 rounded-xl hover:from-yellow-500 hover:to-yellow-700 transition-all"
              >
                <Car className="w-5 h-5" />
                Agregar Primer Vehículo
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {autos.map((auto) => (
                <div
                  key={auto._id}
                  className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-xl hover:border-yellow-400 transition-all duration-300 group"
                >
                  {/* Car Image */}
                  <div className="relative h-64 bg-gray-700">
                    {auto.imagenes.length > 0 ? (
                      <Image
                        src={auto.imagenes[0]}
                        alt={`${auto.marca} ${auto.modelo}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Car className="w-16 h-16 text-gray-500" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="">
                      </div>
                    </div>

                    {/* Category Badge */}
                    {auto.categoria && (
                      <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2">
                        <span className="text-yellow-400">
                          {categoriasIcons[auto.categoria as keyof typeof categoriasIcons]}
                        </span>
                        <span className="text-white text-xs font-semibold">
                          {categoriasLabels[auto.categoria as keyof typeof categoriasLabels]}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Car Information */}
                  <div className="p-6">
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-white mb-3">
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
                      <div className="flex justify-center gap-4 mb-6 text-sm text-gray-300">
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

                      <Link
                        href={`/autos/${auto._id}`}
                        className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black py-3 px-6 rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-700 transition-all flex items-center justify-center gap-2 group-hover:scale-105"
                      >
                        <Eye className="w-4 h-4" />
                        Ver Detalles
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div><Footer /></>
  )
}