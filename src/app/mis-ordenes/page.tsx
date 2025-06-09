"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { Loader, Car, Calendar, DollarSign, ExternalLink } from "lucide-react"
import Image from "next/image"

interface Auto {
    _id: string;
    marca: string;
    modelo: string;
    año: number;
    imagenes?: string[];
}

interface Venta {
    _id: string;
    autoId: Auto;
    monto: number;
    fecha: string;
    tipo?: string;
}

export default function MisComprasPage() {
    const { data: session, status } = useSession()
    const [ventas, setVentas] = useState<Venta[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (session?.user?._id) {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ventas/usuario/${session.user._id}`)
                .then(res => res.json())
                .then(data => {
                    console.log('Ventas recibidas:', data); // <-- Agrega este log
                    setVentas(data)
                    setLoading(false)
                })
                .catch(() => setLoading(false))
        } else {
            setLoading(false)
        }
    }, [session])

    if (status === "loading" || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <Loader className="animate-spin w-12 h-12 text-yellow-500" />
                <span className="ml-4">Cargando compras...</span>
            </div>
        )
    }

    if (!session) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <p>Debes iniciar sesión para ver tus compras.</p>
            </div>
        )
    }

    return (
        <main className="min-h-screen bg-gray-900 text-white px-4 py-12">
            <div className="max-w-5xl mx-auto space-y-6">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-6">
                    Mis Compras
                </h1>

                {ventas.length === 0 ? (
                    <p className="text-gray-400">Aún no has realizado ninguna compra.</p>
                ) : (
                    ventas.map(venta => (
                        <div key={venta._id} className="bg-gray-800 rounded-xl p-6 border border-gray-700 flex gap-4 items-center">
                            {venta.autoId.imagenes?.[0] ? (
                                <Image
                                    src={venta.autoId.imagenes[0]}
                                    alt="Imagen del auto"
                                    width={120}
                                    height={80}
                                    className="rounded-lg object-cover"
                                />
                            ) : (
                                <div className="w-32 h-20 bg-gray-700 flex items-center justify-center rounded-lg">
                                    <Car className="text-gray-500" size={32} />
                                </div>
                            )}

                            <div className="flex-1">
                                <h2 className="text-xl font-bold">{venta.autoId.marca} {venta.autoId.modelo} {venta.autoId.año}</h2>
                                <p className="text-gray-400 text-sm">ID: {venta._id}</p>
                                <div className="flex gap-4 mt-2">
                                    <div className="flex items-center gap-2 text-green-400">
                                        <DollarSign size={16} /> ${venta.monto.toLocaleString()}
                                    </div>
                                    <div className="flex items-center gap-2 text-blue-400">
                                        <Calendar size={16} /> {new Date(venta.fecha).toLocaleString()}
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => window.location.href = `/autos/${venta.autoId._id}`}
                                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                            >
                                <ExternalLink size={16} /> Ver Auto
                            </button>
                        </div>
                    ))
                )}
            </div>
        </main>
    )
}
