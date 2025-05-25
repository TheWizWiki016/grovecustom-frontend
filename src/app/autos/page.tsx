'use client'

import Footer from "@/components/Footer";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { PageHeader } from "../../components/PageHeader";
import { FiltersPanel } from "../../components/FiltersPanel";
import { ResultsCounter } from "../../components/ResultsCounter";
import { CarsGrid } from "../../components/CarsGrid";
import { useAutosData } from "../hooks/useAutosData";
import { useFilters } from "../hooks/useFilters";

export default function AutosPage() {
    const { autos, loading } = useAutosData();
    const {
        searchTerm,
        setSearchTerm,
        selectedCategories,
        showFilters,
        setShowFilters,
        categories,
        filteredAutos,
        autosByCategory,
        toggleCategory,
        clearFilters,
        minPrice,
        maxPrice,
        setMinPrice,
        setMaxPrice
    } = useFilters(autos);

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
            <PageHeader />

            <FiltersPanel
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                showFilters={showFilters}
                onToggleFilters={() => setShowFilters(!showFilters)}
                selectedCategories={selectedCategories}
                categories={categories}
                onToggleCategory={toggleCategory}
                onClearFilters={clearFilters}
                minPrice={minPrice}
                maxPrice={maxPrice}
                setMinPrice={setMinPrice}
                setMaxPrice={setMaxPrice}
            />

            <ResultsCounter
                filteredCount={filteredAutos.length}
                totalCount={autos.length}
                searchTerm={searchTerm}
                selectedCategories={selectedCategories}
            />

            <CarsGrid
                autosByCategory={autosByCategory}
                onClearFilters={clearFilters}
            />

            <Footer />
        </div>
    );
}
