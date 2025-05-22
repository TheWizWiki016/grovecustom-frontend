// components/EmptyState.tsx
import { Car } from "lucide-react";

interface EmptyStateProps {
    onClearFilters: () => void;
}

export const EmptyState = ({ onClearFilters }: EmptyStateProps) => (
    <div className="text-center py-16">
        <Car size={80} className="mx-auto text-gray-600 mb-6" />
        <h3 className="text-3xl font-bold text-gray-400 mb-4">No se encontraron vehículos</h3>
        <p className="text-gray-500 text-lg mb-8">Intenta cambiar los filtros de búsqueda</p>
        <button
            onClick={onClearFilters}
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold px-6 py-3 rounded-xl hover:from-yellow-500 hover:to-yellow-700 transition-all"
        >
            Limpiar Filtros
        </button>
    </div>
);