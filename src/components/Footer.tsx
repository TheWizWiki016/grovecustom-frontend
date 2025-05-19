// src/components/Footer.tsx
export default function Footer() {
    return (
        <footer className="bg-gradient-to-t from-[#393E41] to-[#2c2f31] mt-12 text-gray-300">
            <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
                <div>
                    <h3 className="text-3xl font-extrabold text-[#E7BB41] mb-5">Grove Custom</h3>
                    <p className="text-gray-400 max-w-sm leading-relaxed">
                        La experiencia definitiva en autos de lujo personalizados. Calidad, estilo y exclusividad en cada detalle.
                    </p>
                </div>
                <div>
                    <h3 className="text-3xl font-extrabold text-[#E7BB41] mb-5">Contacto</h3>
                    <ul className="space-y-3 text-gray-400">
                        <li>
                            Email:{" "}
                            <a href="mailto:info@grovecustom.com" className="hover:text-[#E7BB41] underline">
                                info@grovecustom.com
                            </a>
                        </li>
                        <li>
                            Teléfono:{" "}
                            <a href="tel:+1234567890" className="hover:text-[#E7BB41] underline">
                                (123) 456-7890
                            </a>
                        </li>
                        <li>Dirección: Luxury Avenue #123</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-3xl font-extrabold text-[#E7BB41] mb-5">Síguenos</h3>
                    <div className="flex space-x-6 mt-3 text-[#E7BB41]">
                        {/* Facebook */}
                        <a href="#" aria-label="Facebook" className="hover:text-yellow-400 transition-colors duration-300">
                            <svg
                                className="w-7 h-7"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.342v21.316C0 23.4.6 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.466.099 2.797.143v3.24l-1.92.001c-1.504 0-1.796.715-1.796 1.764v2.31h3.587l-.467 3.622h-3.12V24h6.116C23.4 24 24 23.4 24 22.658V1.342C24 .6 23.4 0 22.675 0z" />
                            </svg>
                        </a>
                        {/* Instagram */}
                        <a href="#" aria-label="Instagram" className="hover:text-yellow-400 transition-colors duration-300">
                            <svg
                                className="w-7 h-7"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                                <path d="M16 11.37a4 4 0 11-7.999-.001 4 4 0 017.999 0z" />
                                <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
                            </svg>
                        </a>
                        {/* Twitter */}
                        <a href="#" aria-label="Twitter" className="hover:text-yellow-400 transition-colors duration-300">
                            <svg
                                className="w-7 h-7"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path d="M23 3a10.9 10.9 0 01-3.14.86 4.48 4.48 0 001.98-2.48 9.05 9.05 0 01-2.88 1.1 4.52 4.52 0 00-7.7 4.12 12.83 12.83 0 01-9.32-4.7 4.52 4.52 0 001.4 6.04A4.5 4.5 0 012 9.71v.06a4.52 4.52 0 003.63 4.43 4.48 4.48 0 01-2.05.08 4.53 4.53 0 004.22 3.14 9 9 0 01-5.59 1.92A9.15 9.15 0 012 19.52a12.79 12.79 0 006.93 2.03c8.32 0 12.88-6.9 12.88-12.87 0-.2 0-.42-.02-.63A9.22 9.22 0 0023 3z" />
                            </svg>
                        </a>
                        {/* YouTube */}
                        <a href="#" aria-label="YouTube" className="hover:text-yellow-400 transition-colors duration-300">
                            <svg
                                className="w-7 h-7"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path d="M19.615 3.184c-1.17-.14-5.866-.14-5.866-.14s-4.7 0-5.87.14A3.13 3.13 0 005.152 4.8C5 6.012 5 9.556 5 9.556s0 3.543.152 4.756a3.13 3.13 0 001.727 1.618c1.17.14 5.866.14 5.866.14s4.7 0 5.87-.14a3.13 3.13 0 001.728-1.618c.15-1.212.15-4.756.15-4.756s0-3.543-.15-4.756a3.13 3.13 0 00-1.727-1.617zM10.4 13.794v-5.57l4.75 2.785-4.75 2.785z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            <div className="text-center text-gray-500 text-sm py-6 border-t border-gray-700">
                <p>© 2025 Grove Custom. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
}
