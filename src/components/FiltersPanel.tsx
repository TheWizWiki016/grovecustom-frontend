import { SearchBar } from "./SearchBar";
import { FilterButton } from "./FilterButton";
import { ClearFiltersButton } from "./ClearFiltersButton";
import { CategoryFilters } from "./CategoryFilters";

interface FiltersPanelProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    showFilters: boolean;
    onToggleFilters: () => void;
    selectedCategories: string[];
    categories: string[];
    onToggleCategory: (category: string) => void;
    onClearFilters: () => void;
}

export const FiltersPanel = ({
    searchTerm,
    onSearchChange,
    showFilters,
    onToggleFilters,
    selectedCategories,
    categories,
    onToggleCategory,
    onClearFilters
}: FiltersPanelProps) => (
    <section className="px-6 pb-8">
        <div className="max-w-7xl mx-auto">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-xl">
                <div className="flex flex-col lg:flex-row gap-4 items-center">
                    <SearchBar searchTerm={searchTerm} onSearchChange={onSearchChange} />
                    <FilterButton
                        showFilters={showFilters}
                        selectedCategoriesCount={selectedCategories.length}
                        onToggle={onToggleFilters}
                    />
                    {(selectedCategories.length > 0 || searchTerm) && (
                        <ClearFiltersButton onClear={onClearFilters} />
                    )}
                </div>

                {showFilters && (
                    <CategoryFilters
                        categories={categories}
                        selectedCategories={selectedCategories}
                        onToggleCategory={onToggleCategory}
                    />
                )}
            </div>
        </div>
    </section>
);