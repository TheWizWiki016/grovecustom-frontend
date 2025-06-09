'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function ExitoPagoPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const { data: session } = useSession()

    const [loading, setLoading] = useState(true)
    const [orden, setOrden] = useState<any>(null)

    const autoId = searchParams.get('autoId')
    const usuarioId = searchParams.get('usuarioId')
    const precio = searchParams.get('precio')

    useEffect(() => {
        const registrarVenta = async () => {
            if (!autoId || !usuarioId || !precio || !session?.user?.nombre) return

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ventas`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    autoId,
                    usuarioId,
                    monto: parseFloat(precio),
                    nombre: session.user.nombre, // <-- Aquí está el fix
                }),
            })

            if (res.ok) {
                const data = await res.json()
                setOrden(data)
            } else {
                alert('Error registrando la venta')
            }

            setLoading(false)
        }

        registrarVenta()
    }, [autoId, usuarioId, precio, session])

    // (lo demás permanece igual)


    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <p>Registrando tu orden...</p>
            </div>
        )
    }

    if (!orden) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <p>Error al procesar el pago.</p>
            </div>
        )
    }

    return (
        <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-6 py-12">
            <h1 className="text-4xl font-bold text-green-400 mb-4">¡Pago exitoso!</h1>
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-8 w-full max-w-md space-y-4">
                <div>
                    <p className="text-gray-400">ID de Orden:</p>
                    <p className="font-semibold break-all">{orden._id}</p>
                </div>
                <div>
                    <p className="text-gray-400">ID de Auto:</p>
                    <p>{orden.autoId}</p>
                </div>
                <div>
                    <p className="text-gray-400">Usuario:</p>
                    <p>{orden.usuarioId}</p>
                </div>
                <div>
                    <p className="text-gray-400">Monto pagado:</p>
                    <p className="text-green-400 font-bold text-lg">${orden.monto.toLocaleString()}</p>
                </div>
                <div>
                    <p className="text-gray-400">Fecha:</p>
                    <p>{new Date(orden.fecha).toLocaleString()}</p>
                </div>
            </div>

            <button
                onClick={() => router.push('/mis-ordenes')}
                className="mt-8 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold py-3 px-6 rounded-lg transition-all duration-300"
            >
                Ver Mis Órdenes
            </button>
        </main>
    )
}
