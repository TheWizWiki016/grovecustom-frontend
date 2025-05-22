import React from 'react';
import {
    Mail,
    Phone,
    MapPin,
    Facebook,
    Instagram,
    Twitter,
    Youtube,
    Car,
    Award,
    Shield,
    Clock,
    ArrowUp
} from 'lucide-react';

export default function ImprovedFooter() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10 w-32 h-32 border-2 border-yellow-400 rounded-full"></div>
                <div className="absolute bottom-20 right-20 w-24 h-24 border border-yellow-400 rotate-45"></div>
                <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-yellow-400 rounded-full blur-xl"></div>
            </div>

            <div className="relative z-10">
                {/* Main Footer Content */}
                <div className="container mx-auto px-6 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                        {/* Brand Section */}
                        <div className="lg:col-span-1">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-3 rounded-xl">
                                    <Car className="w-8 h-8 text-black" />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                                        Grove Custom
                                    </h3>
                                    <p className="text-yellow-400 text-sm font-medium">LUXURY CARS</p>
                                </div>
                            </div>
                            <p className="text-gray-300 leading-relaxed mb-6">
                                La experiencia definitiva en autos de lujo personalizados. Calidad, estilo y exclusividad en cada detalle que define la perfección automotriz.
                            </p>

                            {/* Value Props */}
                            <div className="space-y-3 text-sm">
                                <div className="flex items-center gap-3 text-gray-300">
                                    <Award className="w-4 h-4 text-yellow-400" />
                                    <span>Calidad Premium Garantizada</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-300">
                                    <Shield className="w-4 h-4 text-yellow-400" />
                                    <span>Servicio Post-Venta Exclusivo</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-300">
                                    <Clock className="w-4 h-4 text-yellow-400" />
                                    <span>Disponible 24/7</span>
                                </div>
                            </div>
                        </div>

                        {/* Contact Section */}
                        <div>
                            <h4 className="text-xl font-bold text-white mb-6 relative">
                                Contacto
                                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
                            </h4>
                            <div className="space-y-4">
                                <div className="group">
                                    <a
                                        href="mailto:info@grovecustom.com"
                                        className="flex items-center gap-3 text-gray-300 hover:text-yellow-400 transition-all duration-300 group-hover:translate-x-1"
                                    >
                                        <div className="bg-gray-800 p-2 rounded-lg group-hover:bg-yellow-400 group-hover:text-black transition-all duration-300">
                                            <Mail className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wide">Email</p>
                                            <p className="font-medium">info@grovecustom.com</p>
                                        </div>
                                    </a>
                                </div>

                                <div className="group">
                                    <a
                                        href="tel:+1234567890"
                                        className="flex items-center gap-3 text-gray-300 hover:text-yellow-400 transition-all duration-300 group-hover:translate-x-1"
                                    >
                                        <div className="bg-gray-800 p-2 rounded-lg group-hover:bg-yellow-400 group-hover:text-black transition-all duration-300">
                                            <Phone className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wide">Teléfono</p>
                                            <p className="font-medium">(123) 456-7890</p>
                                        </div>
                                    </a>
                                </div>

                                <div className="group">
                                    <div className="flex items-center gap-3 text-gray-300 group-hover:translate-x-1 transition-all duration-300">
                                        <div className="bg-gray-800 p-2 rounded-lg">
                                            <MapPin className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase tracking-wide">Ubicación</p>
                                            <p className="font-medium">Luxury Avenue #123</p>
                                            <p className="text-sm text-gray-400">Ciudad de México</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Services Section */}
                        <div>
                            <h4 className="text-xl font-bold text-white mb-6 relative">
                                Servicios
                                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
                            </h4>
                            <ul className="space-y-3 text-gray-300">
                                <li><a href="#" className="hover:text-yellow-400 transition-colors duration-300 hover:translate-x-1 inline-block">Venta de Autos de Lujo</a></li>
                                <li><a href="#" className="hover:text-yellow-400 transition-colors duration-300 hover:translate-x-1 inline-block">Personalización Completa</a></li>
                                <li><a href="#" className="hover:text-yellow-400 transition-colors duration-300 hover:translate-x-1 inline-block">Mantenimiento Premium</a></li>
                                <li><a href="#" className="hover:text-yellow-400 transition-colors duration-300 hover:translate-x-1 inline-block">Financiamiento VIP</a></li>
                                <li><a href="#" className="hover:text-yellow-400 transition-colors duration-300 hover:translate-x-1 inline-block">Seguros Especializados</a></li>
                                <li><a href="#" className="hover:text-yellow-400 transition-colors duration-300 hover:translate-x-1 inline-block">Concierge Automotriz</a></li>
                            </ul>
                        </div>

                        {/* Social Media & Newsletter */}
                        <div>
                            <h4 className="text-xl font-bold text-white mb-6 relative">
                                Conecta con Nosotros
                                <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
                            </h4>

                            {/* Social Media Icons */}
                            <div className="flex gap-3 mb-8">
                                <a
                                    href="#"
                                    className="bg-gray-800 p-3 rounded-xl hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-600 hover:text-black transition-all duration-300 hover:scale-110 hover:rotate-12"
                                    aria-label="Facebook"
                                >
                                    <Facebook className="w-5 h-5" />
                                </a>
                                <a
                                    href="#"
                                    className="bg-gray-800 p-3 rounded-xl hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-600 hover:text-black transition-all duration-300 hover:scale-110 hover:rotate-12"
                                    aria-label="Instagram"
                                >
                                    <Instagram className="w-5 h-5" />
                                </a>
                                <a
                                    href="#"
                                    className="bg-gray-800 p-3 rounded-xl hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-600 hover:text-black transition-all duration-300 hover:scale-110 hover:rotate-12"
                                    aria-label="Twitter"
                                >
                                    <Twitter className="w-5 h-5" />
                                </a>
                                <a
                                    href="#"
                                    className="bg-gray-800 p-3 rounded-xl hover:bg-gradient-to-r hover:from-yellow-400 hover:to-yellow-600 hover:text-black transition-all duration-300 hover:scale-110 hover:rotate-12"
                                    aria-label="YouTube"
                                >
                                    <Youtube className="w-5 h-5" />
                                </a>
                            </div>

                            {/* Newsletter Signup */}
                            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4">
                                <p className="text-sm text-gray-300 mb-3">
                                    Suscríbete para recibir ofertas exclusivas
                                </p>
                                <div className="flex gap-2">
                                    <input
                                        type="email"
                                        placeholder="tu@email.com"
                                        className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 transition-colors"
                                    />
                                    <button className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-4 py-2 rounded-lg text-sm font-semibold hover:from-yellow-500 hover:to-yellow-700 transition-all">
                                        →
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 bg-black/50 backdrop-blur-sm">
                    <div className="container mx-auto px-6 py-6">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="text-center md:text-left">
                                <p className="text-gray-400 text-sm">
                                    © 2025 Grove Custom Cars. Todos los derechos reservados.
                                </p>
                                <p className="text-gray-500 text-xs mt-1">
                                    Diseñado con pasión por la excelencia automotriz
                                </p>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="flex gap-4 text-xs text-gray-500">
                                    <a href="#" className="hover:text-yellow-400 transition-colors">Términos</a>
                                    <a href="#" className="hover:text-yellow-400 transition-colors">Privacidad</a>
                                    <a href="#" className="hover:text-yellow-400 transition-colors">Cookies</a>
                                </div>

                                <button
                                    onClick={scrollToTop}
                                    className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black p-2 rounded-full hover:from-yellow-500 hover:to-yellow-700 transition-all hover:scale-110 group"
                                    aria-label="Volver arriba"
                                >
                                    <ArrowUp className="w-4 h-4 group-hover:animate-bounce" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}