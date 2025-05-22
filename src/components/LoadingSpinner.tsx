// components/LoadingSpinner.tsx
export const LoadingSpinner = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-400 mx-auto"></div>
            <p className="text-yellow-400 mt-4 text-xl">Cargando vehículos de lujo...</p>
        </div>
    </div>
);