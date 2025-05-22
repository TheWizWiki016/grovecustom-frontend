import { Car } from "lucide-react";
import { Auto } from "../app/types/Auto";
import { CarCard } from "./CarCard";
import { categoriasIcons, categoriasLabels } from "../app/constants/categories";

interface CategorySectionProps {
    category: string;
    autos: Auto[];
}

export const CategorySection = ({ category, autos }: CategorySectionProps) => (
    <div className="mb-16">
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
                    {autos.length} {autos.length === 1 ? 'vehículo' : 'vehículos'}
                </span>
            </div>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {autos.map((auto) => (
                <CarCard key={auto._id} auto={auto} />
            ))}
        </div>
    </div>
);