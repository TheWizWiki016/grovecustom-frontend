import { categoriasLabels } from "../app/constants/categories";

interface ResultsCounterProps {
    filteredCount: number;
    totalCount: number;
    searchTerm: string;
    selectedCategories: string[];
}

export const ResultsCounter = ({ filteredCount, totalCount, searchTerm, selectedCategories }: ResultsCounterProps) => (
    <section className="px-6 pb-4">
        <div className="max-w-7xl mx-auto">
            <p className="text-gray-300 text-lg">
                Mostrando {filteredCount} de {totalCount} vehículos
                {searchTerm && ` para "${searchTerm}"`}
                {selectedCategories.length > 0 && ` en ${selectedCategories.map(cat => categoriasLabels[cat as keyof typeof categoriasLabels] || cat).join(', ')}`}
            </p>
        </div>
    </section>
);