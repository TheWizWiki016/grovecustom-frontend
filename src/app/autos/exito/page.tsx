// ✅ page.tsx CORRECTO y funcionando con Stripe session_id
export default async function Exito({
    searchParams,
}: {
    searchParams: { session_id?: string }
}) {
    const sessionId = searchParams.session_id

    if (!sessionId) {
        return <div>No se encontró session_id</div>
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/checkout-session?session_id=${sessionId}`, {
        cache: 'no-store',
    })

    if (!res.ok) {
        return <div>Error al obtener la sesión</div>
    }

    const session = await res.json()

    return (
        <div>
            <h1>Compra Exitosa</h1>
            <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
    )
}
