const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function obtenerAutos() {
    const res = await fetch(`${API_URL}/autos`, {
        cache: 'no-store', // o 'force-cache' si usas ISR
    });

    if (!res.ok) {
        throw new Error('Error al obtener los autos');
    }

    return res.json();
}
