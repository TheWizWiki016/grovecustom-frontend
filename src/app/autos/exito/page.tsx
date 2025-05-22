export default async function Exito({
    searchParams,
}: {
    searchParams?: { [key: string]: string | string[] | undefined }
}) {
    const sessionId = searchParams?.session_id as string | undefined

    if (!sessionId) {
        return (
            <div>
                <h1>No se encontró el session_id</h1>
            </div>
        )
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
            <h1>Compra exitosa</h1>
            <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
    )
}
