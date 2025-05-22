import { Tag, Car } from "lucide-react";
import { categoriasIcons, categoriasLabels } from "../app/constants/categories";

interface CategoryFiltersProps {
    categories: string[];
    selectedCategories: string[];
    onToggleCategory: (category: string) => void;
}

export const CategoryFilters = ({ categories, selectedCategories, onToggleCategory }: CategoryFiltersProps) => (
    <div className="mt-6 pt-6 border-t border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Tag size={20} className="text-yellow-400" />
            Filtrar por Categoría
        </h3>
        <div className="flex flex-wrap gap-3">
            {categories.map(category => (
                <button
                    key={category}
                    onClick={() => onToggleCategory(category)}
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
);