import { Auto } from "../app/types/Auto";
import { CategorySection } from "./CategorySection";
import { EmptyState } from "./EmptyState";

interface CarsGridProps {
    autosByCategory: { [key: string]: Auto[] };
    onClearFilters: () => void;
}

export const CarsGrid = ({ autosByCategory, onClearFilters }: CarsGridProps) => (
    <section className="px-6 pb-16">
        <div className="max-w-7xl mx-auto">
            {Object.keys(autosByCategory).length === 0 ? (
                <EmptyState onClearFilters={onClearFilters} />
            ) : (
                Object.entries(autosByCategory)
                    .sort(([a], [b]) => a.localeCompare(b))
                    .map(([category, categoryAutos]) => (
                        <CategorySection
                            key={category}
                            category={category}
                            autos={categoryAutos}
                        />
                    ))
            )}
        </div>
    </section>
);
