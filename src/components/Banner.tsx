// src/components/Banner.tsx
export default function Banner() {
    return (
        <section className="container mx-auto px-4 py-8">
            <div className="relative w-full h-96 bg-gray-800 flex items-center justify-center overflow-hidden rounded-lg">
                <img src="/img/1350183.png" alt="Auto de lujo" className="w-full h-full object-cover opacity-40" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <h2 className="text-[var(--gold)] text-3xl md:text-5xl font-extrabold text-center px-6">El Estilo que Mereces</h2>
                </div>
                <button className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-[var(--gold)] p-2 rounded-full hover:bg-white">
                    <i className="fas fa-chevron-left text-[var(--dark)]" />
                </button>
                <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-[var(--gold)] p-2 rounded-full hover:bg-white">
                    <i className="fas fa-chevron-right text-[var(--dark)]" />
                </button>
            </div>
        </section>
    )
}
