import { X } from "lucide-react";

interface ClearFiltersButtonProps {
    onClear: () => void;
}

export const ClearFiltersButton = ({ onClear }: ClearFiltersButtonProps) => (
    <button
        onClick={onClear}
        className="flex items-center gap-2 px-4 py-4 bg-red-500/80 hover:bg-red-500 text-white rounded-xl transition-all duration-300 border border-red-500/30"
    >
        <X size={16} />
        Limpiar
    </button>
);