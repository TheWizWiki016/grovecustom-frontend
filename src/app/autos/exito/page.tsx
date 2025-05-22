// src/app/autos/exito/page.tsx

import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

// 👇 NO USAMOS INTERFACES NI TIPOS PERSONALIZADOS AQUÍ
export default async function Exito({
    searchParams,
}: {
    searchParams: { session_id?: string }
}) {
    const sessionId = searchParams.session_id

    if (!sessionId) {
        return (
            <div>
                <h1>No se encontró la sesión</h1>
                <Link href="/">Volver al inicio</Link>
            </div>
        )
    }

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/checkout-session?session_id=${sessionId}`,
        { cache: 'no-store' }
    )

    if (!res.ok) {
        return (
            <div>
                <h1>Error al obtener la sesión</h1>
                <Link href="/">Volver al inicio</Link>
            </div>
        )
    }

    const session = await res.json()

    return (
        <div className="text-white p-8">
            <CheckCircle2 className="text-green-500 w-12 h-12" />
            <h1>¡Compra exitosa!</h1>
            <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
    )
}
