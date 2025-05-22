// components/FilterButton.tsx
import { Filter } from "lucide-react";

interface FilterButtonProps {
    showFilters: boolean;
    selectedCategoriesCount: number;
    onToggle: () => void;
}

export const FilterButton = ({ showFilters, selectedCategoriesCount, onToggle }: FilterButtonProps) => (
    <button
        onClick={onToggle}
        className="flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold rounded-xl hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 shadow-lg shadow-yellow-400/20"
    >
        <Filter size={20} />
        Filtros
        {selectedCategoriesCount > 0 && (
            <span className="bg-black text-yellow-400 rounded-full px-2 py-1 text-xs font-bold">
                {selectedCategoriesCount}
            </span>
        )}
    </button>
);