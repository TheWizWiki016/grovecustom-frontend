import { useState, useMemo } from "react";
import { Auto } from "../types/Auto";

export const useFilters = (autos: Auto[]) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [showFilters, setShowFilters] = useState(false);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(Infinity);

    const categories = useMemo(() => {
        const uniqueCategories = [...new Set(
            autos.map(auto => auto.categoria)
                .filter((cat): cat is string => typeof cat === 'string')
        )];
        return uniqueCategories.sort();
    }, [autos]);

    const filteredAutos = useMemo(() => {
        return autos.filter(auto => {
            const matchesSearch =
                auto.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
                auto.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                auto.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (auto.categoria && auto.categoria.toLowerCase().includes(searchTerm.toLowerCase()));

            const matchesCategory =
                selectedCategories.length === 0 ||
                (auto.categoria && selectedCategories.includes(auto.categoria));

            const matchesPrice =
                typeof auto.precio === 'number' &&
                auto.precio >= minPrice &&
                auto.precio <= maxPrice;

            return matchesSearch && matchesCategory && matchesPrice;
        });
    }, [autos, searchTerm, selectedCategories, minPrice, maxPrice]);

    const autosByCategory = useMemo(() => {
        const grouped: { [key: string]: Auto[] } = {};

        filteredAutos.forEach(auto => {
            const category = auto.categoria || 'Sin Categoría';
            if (!grouped[category]) {
                grouped[category] = [];
            }
            grouped[category].push(auto);
        });

        return grouped;
    }, [filteredAutos]);

    const toggleCategory = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const clearFilters = () => {
        setSelectedCategories([]);
        setSearchTerm("");
        setMinPrice(0);
        setMaxPrice(Infinity);
    };

    return {
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
    };
};
