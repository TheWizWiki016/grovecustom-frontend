'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Car, Eye, Star, Zap, Fuel, Gauge, Crown, Award, Settings, ChevronLeft, ChevronRight } from 'lucide-react'
import Footer from '@/components/Footer'
import { SpeedInsights } from "@vercel/speed-insights/next"

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
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/autos`)
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
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
        {/* Hero Section with Enhanced Slider */}
        <section className="relative h-[450px] overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900/10 to-black">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-400/3 via-transparent to-transparent"></div>

          {/* Title Overlay */}
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-30">
            <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent text-center">
              GROVE CUSTOM CARS
            </h1>
            <p className="text-center text-gray-300 mt-2 text-base">Colección Exclusiva de Lujo</p>
          </div>

          {/* Enhanced Infinite Slider */}
          <div className="absolute inset-0 flex items-center justify-center pt-24">
            <div className="relative w-full max-w-5xl mx-auto px-4">
              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 z-30 bg-black/40 hover:bg-black/60 text-white p-2.5 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 shadow-lg"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 z-30 bg-black/40 hover:bg-black/60 text-white p-2.5 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 shadow-lg"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Infinite Slider Container */}
              <div className="relative flex items-center justify-center h-64 perspective-1000">
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Create infinite loop by showing previous, current, and next sets */}
                  {[-2, -1, 0, 1, 2].map((position) => {
                    const actualIndex = ((currentSlide + position) % autos.length + autos.length) % autos.length
                    const auto = autos[actualIndex]
                    if (!auto) return null

                    const isCenter = position === 0
                    const isAdjacent = Math.abs(position) === 1
                    const absPosition = Math.abs(position)

                    return (
                      <Link
                        key={`${actualIndex}-${position}`}
                        href={`/autos/${auto._id}`}
                        className={`
                          absolute rounded-xl overflow-hidden shadow-2xl cursor-pointer
                          transition-all duration-500 ease-out transform-gpu
                          ${isCenter
                            ? 'w-80 h-56 z-20 shadow-yellow-400/30 hover:shadow-yellow-400/50'
                            : isAdjacent
                              ? 'w-64 h-44 z-10 opacity-75 hover:opacity-90 hover:scale-105'
                              : 'w-52 h-36 z-0 opacity-40 hover:opacity-60'
                          }
                        `}
                        style={{
                          transform: `
                            translateX(${position * 200}px) 
                            translateZ(${isCenter ? 0 : -100}px)
                            rotateY(${position * 8}deg)
                            scale(${isCenter ? 1 : isAdjacent ? 0.9 : 0.8})
                          `,
                          filter: isCenter ? 'none' : `blur(${absPosition * 0.5}px)`,
                        }}
                      >
                        {/* Car Image */}
                        <div className="relative w-full h-full group">
                          {auto.imagenes.length > 0 ? (
                            <Image
                              src={auto.imagenes[0]}
                              alt={`${auto.marca} ${auto.modelo}`}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                              <Car className="w-12 h-12 text-gray-500" />
                            </div>
                          )}

                          {/* Dynamic Gradient Overlay */}
                          <div className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-500 ${isCenter
                            ? 'from-black/70 via-transparent to-transparent'
                            : 'from-black/50 via-black/20 to-transparent'
                            }`}></div>

                          {/* Category Badge - Only on center and adjacent */}
                          {(isCenter || isAdjacent) && auto.categoria && (
                            <div className={`absolute top-3 left-3 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1.5 transition-all duration-300 ${isCenter ? 'opacity-100' : 'opacity-70'
                              }`}>
                              <span className="text-yellow-400">
                                {categoriasIcons[auto.categoria as keyof typeof categoriasIcons]}
                              </span>
                              <span className="text-white text-xs font-semibold">
                                {categoriasLabels[auto.categoria as keyof typeof categoriasLabels]}
                              </span>
                            </div>
                          )}

                          {/* Car Info Overlay */}
                          <div className={`absolute bottom-0 left-0 right-0 p-3 text-white transition-all duration-500 ${isCenter ? 'opacity-100' : 'opacity-0'
                            }`}>
                            <h3 className="font-bold mb-1 text-lg truncate">
                              {auto.marca} {auto.modelo}
                            </h3>
                            <p className="text-yellow-400 font-semibold text-base mb-2">
                              ${auto.precio.toLocaleString()}
                            </p>
                            <div className="flex items-center gap-3 text-xs text-gray-300">
                              <span className="flex items-center gap-1">
                                <Gauge className="w-3 h-3" />
                                {auto.año}
                              </span>
                              {auto.caballosFuerza && (
                                <span className="flex items-center gap-1">
                                  <Zap className="w-3 h-3" />
                                  {auto.caballosFuerza} HP
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Enhanced Hover Effect */}
                          <div className={`absolute inset-0 bg-gradient-to-t from-yellow-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center ${isCenter ? '' : 'backdrop-blur-sm'
                            }`}>
                            <div className="bg-yellow-400/90 backdrop-blur-sm text-black px-3 py-2 rounded-lg font-semibold flex items-center gap-2 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                              <Eye className="w-4 h-4" />
                              Ver Detalles
                            </div>
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>

              {/* Elegant Slide Indicators */}
              <div className="flex justify-center mt-6 gap-2">
                {autos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${index === currentSlide
                      ? 'bg-yellow-400 w-8 shadow-lg shadow-yellow-400/50'
                      : 'bg-gray-600 hover:bg-gray-500 w-1.5'
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Cars Grid */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Nuestra Colección
              </h2>
              <p className="text-gray-400 text-lg">
                Descubre los vehículos más exclusivos del mundo
              </p>
            </div>

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
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
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
        <SpeedInsights />
      </div>
      <Footer />
    </>
  )
}