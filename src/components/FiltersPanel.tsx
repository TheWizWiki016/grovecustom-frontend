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
    minPrice: number;
    maxPrice: number;
    setMinPrice: (value: number) => void;
    setMaxPrice: (value: number) => void;
    priceRange?: {
        min: number;
        max: number;
    };
}

export const FiltersPanel = ({
    searchTerm,
    onSearchChange,
    showFilters,
    onToggleFilters,
    selectedCategories,
    categories,
    onToggleCategory,
    onClearFilters,
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
    priceRange = { min: 0, max: 1000000 }
}: FiltersPanelProps) => {
    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    };

    const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value <= (maxPrice === Infinity ? priceRange.max : maxPrice)) {
            setMinPrice(value);
        }
    };

    const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value >= minPrice) {
            setMaxPrice(value);
        }
    };

    const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value ? parseInt(e.target.value) : 0;
        if (value <= (maxPrice === Infinity ? priceRange.max : maxPrice)) {
            setMinPrice(value);
        }
    };

    const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value ? parseInt(e.target.value) : Infinity;
        if (value >= minPrice) {
            setMaxPrice(value);
        }
    };

    return (
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
                        {(selectedCategories.length > 0 || searchTerm || minPrice > 0 || maxPrice < Infinity) && (
                            <ClearFiltersButton onClear={onClearFilters} />
                        )}
                    </div>

                    {showFilters && (
                        <>
                            <CategoryFilters
                                categories={categories}
                                selectedCategories={selectedCategories}
                                onToggleCategory={onToggleCategory}
                            />

                            {/* Filtros de precio mejorados */}
                            <div className="mt-6 p-6 bg-gray-900/30 rounded-xl border border-gray-600">
                                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                    </svg>
                                    Filtrar por precio
                                </h3>

                                {/* Rango de precios visual */}
                                <div className="mb-6">
                                    <div className="flex justify-between text-sm text-gray-300 mb-2">
                                        <span>{formatPrice(minPrice)}</span>
                                        <span>{maxPrice === Infinity ? 'Sin límite' : formatPrice(maxPrice)}</span>
                                    </div>

                                    {/* Slider de rango dual */}
                                    <div className="relative">
                                        <div className="flex gap-2">
                                            <div className="flex-1">
                                                <input
                                                    type="range"
                                                    min={priceRange.min}
                                                    max={priceRange.max}
                                                    step="10000"
                                                    value={minPrice}
                                                    onChange={handleMinPriceChange}
                                                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb-green"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <input
                                                    type="range"
                                                    min={priceRange.min}
                                                    max={priceRange.max}
                                                    step="10000"
                                                    value={maxPrice === Infinity ? priceRange.max : maxPrice}
                                                    onChange={handleMaxPriceChange}
                                                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider-thumb-blue"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Inputs numéricos */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-300">
                                            Precio mínimo
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">$</span>
                                            <input
                                                type="number"
                                                min={priceRange.min}
                                                max={maxPrice === Infinity ? priceRange.max : maxPrice}
                                                step="10000"
                                                className="w-full bg-gray-700 border border-gray-600 text-white px-8 py-3 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                                                value={minPrice === 0 ? "" : minPrice}
                                                onChange={handleMinInputChange}
                                                placeholder="0"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-300">
                                            Precio máximo
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">$</span>
                                            <input
                                                type="number"
                                                min={minPrice}
                                                max={priceRange.max}
                                                step="10000"
                                                className="w-full bg-gray-700 border border-gray-600 text-white px-8 py-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                                                value={maxPrice === Infinity ? "" : maxPrice}
                                                onChange={handleMaxInputChange}
                                                placeholder="Sin límite"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Botones de precios rápidos */}
                                <div className="mt-4">
                                    <p className="text-sm text-gray-400 mb-2">Rangos rápidos:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {[
                                            { label: "Hasta $100K", min: 0, max: 100000 },
                                            { label: "$100K - $300K", min: 100000, max: 300000 },
                                            { label: "$300K - $500K", min: 300000, max: 500000 },
                                            { label: "$500K+", min: 500000, max: Infinity }
                                        ].map((range) => (
                                            <button
                                                key={range.label}
                                                onClick={() => {
                                                    setMinPrice(range.min);
                                                    setMaxPrice(range.max);
                                                }}
                                                className={`px-3 py-1 text-xs rounded-full border transition-all duration-200 ${minPrice === range.min && maxPrice === range.max
                                                    ? 'bg-green-500 text-white border-green-500'
                                                    : 'bg-gray-700 text-gray-300 border-gray-600 hover:bg-gray-600 hover:border-gray-500'
                                                    }`}
                                            >
                                                {range.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Estilos CSS para los sliders */}
            <style jsx>{`
                .slider-thumb-green::-webkit-slider-thumb {
                    appearance: none;
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    background: #10b981;
                    cursor: pointer;
                    border: 2px solid #ffffff;
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
                }

                .slider-thumb-green::-moz-range-thumb {
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    background: #10b981;
                    cursor: pointer;
                    border: 2px solid #ffffff;
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
                }

                .slider-thumb-blue::-webkit-slider-thumb {
                    appearance: none;
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    background: #3b82f6;
                    cursor: pointer;
                    border: 2px solid #ffffff;
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
                }

                .slider-thumb-blue::-moz-range-thumb {
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    background: #3b82f6;
                    cursor: pointer;
                    border: 2px solid #ffffff;
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
                }
            `}</style>
        </section>
    );
};