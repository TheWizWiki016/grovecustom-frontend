
'use client'

import { useState, useEffect } from 'react'
import { Car, Crown, Star, Award, Shield, Users, Clock, Phone, Mail, MapPin, Send, CheckCircle, Zap } from 'lucide-react'
import Link from 'next/link'
import Footer from '@/components/Footer'


export default function AboutContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    })
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [activeTeamMember, setActiveTeamMember] = useState(0)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitted(true)
        setTimeout(() => {
            setIsSubmitted(false)
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            })
        }, 3000)
    }

    const stats = [
        { icon: <Car className="w-8 h-8" />, value: "500+", label: "Vehículos de Lujo" },
        { icon: <Users className="w-8 h-8" />, value: "1000+", label: "Clientes Satisfechos" },
        { icon: <Crown className="w-8 h-8" />, value: "25+", label: "Años de Experiencia" },
        { icon: <Award className="w-8 h-8" />, value: "100%", label: "Garantía de Calidad" }
    ]

    const features = [
        { icon: <Shield className="w-6 h-6" />, title: "Autenticidad Garantizada", description: "Todos nuestros vehículos pasan por rigurosas inspecciones" },
        { icon: <Star className="w-6 h-6" />, title: "Servicio Premium", description: "Atención personalizada y exclusiva para cada cliente" },
        { icon: <Zap className="w-6 h-6" />, title: "Tecnología Avanzada", description: "Los últimos avances en ingeniería automotriz" },
        { icon: <Clock className="w-6 h-6" />, title: "Disponibilidad 24/7", description: "Soporte y asesoría en cualquier momento" }
    ]

    const teamMembers = [
        {
            name: "Alexander Grove",
            position: "CEO & Fundador",
            image: "/api/placeholder/300/400",
            description: "Con más de 25 años en la industria automotriz de lujo, Alexander es un visionario que transformó Grove Custom Cars en la referencia mundial de vehículos exclusivos."
        },
        {
            name: "Isabella Rodriguez",
            position: "Directora de Ventas",
            image: "/api/placeholder/300/400",
            description: "Especialista en relaciones con clientes de alto perfil, Isabella garantiza que cada experiencia de compra sea única y memorable."
        },
        {
            name: "Marcus Thompson",
            position: "Jefe de Ingeniería",
            image: "/api/placeholder/300/400",
            description: "Ingeniero automotriz con experiencia en Ferrari y McLaren, Marcus supervisa todas las modificaciones y personalizaciones."
        }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
            {/* Hero Section */}
            <section className="relative py-32 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.1),transparent)]"></div>
                <div className={`max-w-7xl mx-auto text-center transform transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-6">
                        GROVE CUSTOM CARS
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto">
                        Donde la pasión por los automóviles de lujo se encuentra con la excelencia y la exclusividad
                    </p>
                </div>
            </section>

            {/* About Section */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                            <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-yellow-400 to-white bg-clip-text text-transparent">
                                Nuestra Historia
                            </h2>
                            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                                Desde 1999, Grove Custom Cars ha sido sinónimo de excelencia en el mundo de los automóviles de lujo.
                                Fundada por Alexander Grove, un apasionado coleccionista e ingeniero automotriz, nuestra empresa nació
                                del deseo de ofrecer vehículos únicos que combinan el rendimiento excepcional con el diseño más sofisticado.
                            </p>
                            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                                Ubicados en el corazón de Los Angeles, California, nos especializamos en la venta, personalización
                                y mantenimiento de las marcas más prestigiosas del mundo: Ferrari, Lamborghini, Porsche, McLaren,
                                Aston Martin y muchas más.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                {stats.map((stat, index) => (
                                    <div
                                        key={index}
                                        className={`bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 text-center hover:border-yellow-400 transition-all duration-300 transform hover:scale-105`}
                                        style={{ animationDelay: `${index * 200}ms` }}
                                    >
                                        <div className="text-yellow-400 mb-3 flex justify-center">
                                            {stat.icon}
                                        </div>
                                        <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                                        <div className="text-sm text-gray-400">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={`transform transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                            <div className="relative">
                                <img
                                    src="/api/placeholder/600/500"
                                    alt="Grove Custom Cars Showroom"
                                    className="rounded-lg shadow-2xl"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
                                <div className="absolute bottom-6 left-6 right-6">
                                    <h3 className="text-2xl font-bold text-white mb-2">Nuestro Showroom Premium</h3>
                                    <p className="text-gray-200">Un espacio de 5,000 m² dedicado a los automóviles más exclusivos del mundo</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-6 bg-gray-800/20">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-yellow-400 to-white bg-clip-text text-transparent">
                        ¿Por Qué Elegirnos?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className={`bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8 text-center hover:border-yellow-400 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2`}
                                style={{ animationDelay: `${index * 150}ms` }}
                            >
                                <div className="text-yellow-400 mb-4 flex justify-center">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-4 text-white">{feature.title}</h3>
                                <p className="text-gray-400">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-yellow-400 to-white bg-clip-text text-transparent">
                        Nuestro Equipo
                    </h2>
                    <div className="grid lg:grid-cols-3 gap-8">
                        {teamMembers.map((member, index) => (
                            <div
                                key={index}
                                className={`group cursor-pointer transform transition-all duration-500 hover:scale-105 ${activeTeamMember === index ? 'lg:scale-110' : ''}`}
                                onClick={() => setActiveTeamMember(index)}
                            >
                                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg overflow-hidden hover:border-yellow-400 transition-all">
                                    <div className="relative h-80 overflow-hidden">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                                        <p className="text-yellow-400 font-semibold mb-4">{member.position}</p>
                                        <p className="text-gray-300 text-sm leading-relaxed">{member.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-20 px-6 bg-gray-800/20">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-yellow-400 to-white bg-clip-text text-transparent">
                        Contáctanos
                    </h2>
                    <div className="grid lg:grid-cols-2 gap-16">
                        {/* Contact Information */}
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-3xl font-bold text-white mb-8">Información de Contacto</h3>
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 group">
                                        <div className="w-12 h-12 bg-yellow-400/20 rounded-full flex items-center justify-center group-hover:bg-yellow-400/30 transition-colors">
                                            <MapPin className="w-6 h-6 text-yellow-400" />
                                        </div>
                                        <div>
                                            <p className="text-white font-semibold">Dirección</p>
                                            <p className="text-gray-400">123 Luxury Avenue, Beverly Hills, CA 90210</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 group">
                                        <div className="w-12 h-12 bg-yellow-400/20 rounded-full flex items-center justify-center group-hover:bg-yellow-400/30 transition-colors">
                                            <Phone className="w-6 h-6 text-yellow-400" />
                                        </div>
                                        <div>
                                            <p className="text-white font-semibold">Teléfono</p>
                                            <p className="text-gray-400">+1 (555) 123-4567</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 group">
                                        <div className="w-12 h-12 bg-yellow-400/20 rounded-full flex items-center justify-center group-hover:bg-yellow-400/30 transition-colors">
                                            <Mail className="w-6 h-6 text-yellow-400" />
                                        </div>
                                        <div>
                                            <p className="text-white font-semibold">Email</p>
                                            <p className="text-gray-400">info@grovecustomcars.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Map */}
                            <div className="relative h-80 rounded-lg overflow-hidden shadow-2xl">
                                <div className="absolute inset-0 bg-gray-700 flex items-center justify-center">
                                    <div className="text-center">
                                        <MapPin className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                                        <p className="text-white text-lg font-semibold">Grove Custom Cars</p>
                                        <p className="text-gray-400">Beverly Hills, California</p>
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div>
                            <h3 className="text-3xl font-bold text-white mb-8">Envíanos un Mensaje</h3>
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-white font-semibold mb-2">Nombre *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all"
                                            placeholder="Tu nombre completo"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-white font-semibold mb-2">Email *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all"
                                            placeholder="tu@email.com"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-white font-semibold mb-2">Teléfono</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all"
                                            placeholder="+1 (555) 123-4567"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-white font-semibold mb-2">Asunto *</label>
                                        <select
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all"
                                        >
                                            <option value="">Selecciona un asunto</option>
                                            <option value="compra">Consulta de Compra</option>
                                            <option value="venta">Quiero Vender mi Vehículo</option>
                                            <option value="servicio">Servicio y Mantenimiento</option>
                                            <option value="personalizacion">Personalización</option>
                                            <option value="otros">Otros</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-white font-semibold mb-2">Mensaje *</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        rows={6}
                                        className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all resize-none"
                                        placeholder="Cuéntanos sobre tus necesidades y cómo podemos ayudarte..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitted}
                                    className={`w-full py-4 px-6 rounded-lg font-bold text-black transition-all duration-300 transform hover:scale-105 ${isSubmitted
                                        ? 'bg-green-500 hover:bg-green-600'
                                        : 'bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700'
                                        }`}
                                >
                                    {isSubmitted ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <CheckCircle className="w-5 h-5" />
                                            ¡Mensaje Enviado!
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center gap-2">
                                            <Send className="w-5 h-5" />
                                            Enviar Mensaje
                                        </span>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-white bg-clip-text text-transparent">
                        ¿Listo para Encontrar tu Auto de Ensueño?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Explora nuestra exclusiva colección de vehículos de lujo y encuentra el que se adapte a tu estilo único.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">

                        <Link href="/autos">
                            <button className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold py-4 px-8 rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all transform hover:scale-105">
                                Ver Inventario
                            </button>
                        </Link>

                        <button className="border-2 border-yellow-400 text-yellow-400 font-bold py-4 px-8 rounded-lg hover:bg-yellow-400 hover:text-black transition-all transform hover:scale-105">
                            Agendar Cita
                        </button>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}