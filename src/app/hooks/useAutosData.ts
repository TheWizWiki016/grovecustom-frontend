import { useState, useEffect, useMemo } from "react";
import { Auto } from "../types/Auto";

export const useAutosData = () => {
    const [autos, setAutos] = useState<Auto[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAutos = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/autos`, { cache: "no-store" });
                const data: Auto[] = await res.json();
                setAutos(data);
            } catch (error) {
                console.error("Error fetching autos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAutos();
    }, []);

    return { autos, loading };
};
