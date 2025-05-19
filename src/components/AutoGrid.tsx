// src/components/AutoGrid.tsx
export default function AutoGrid() {
    const autos = [
        { nombre: 'Modelo Premium', descripcion: 'Deportivo exclusivo con potencia y estilo.' },
        { nombre: 'Modelo Elegance', descripcion: 'Diseño refinado para quienes exigen excelencia.' },
        { nombre: 'Modelo Sport', descripcion: 'Velocidad y lujo en su máxima expresión.' },
        { nombre: 'Modelo Executive', descripcion: 'Para líderes que marcan tendencias.' },
        { nombre: 'Modelo SUV', descripcion: 'Robustez y lujo para todas las rutas.' },
        { nombre: 'Modelo Classic', descripcion: 'Tradición e innovación en un solo modelo.' },
    ]

    return (
        <section className="container mx-auto px-4 py-6">
            <h2 className="text-3xl font-bold text-[var(--gold)] mb-8 text-center">Nuestros Autos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6">
                {autos.map((auto, idx) => (
                    <div key={idx} className="bg-gray-800 shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
                        <div className="w-full aspect-square bg-gray-700 flex items-center justify-center">
                            <span className="text-[var(--gold)] text-lg">{auto.nombre}</span>
                        </div>
                        <div className="p-4">
                            <p className="text-gray-400 text-sm mt-2">{auto.descripcion}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
