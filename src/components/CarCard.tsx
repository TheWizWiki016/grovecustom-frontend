import Image from "next/image";
import Link from "next/link";
import { Car, Gauge, Zap, Fuel } from "lucide-react";
import { Auto } from "../app/types/Auto";
import { categoriasIcons, categoriasLabels } from "../app/constants/categories";

interface CarCardProps {
    auto: Auto;
}

export const CarCard = ({ auto }: CarCardProps) => (
    <Link href={`/autos/${auto._id}`}>
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
);