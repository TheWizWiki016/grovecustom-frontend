import session from './session.json' // Asegúrate de colocar el archivo en el mismo directorio

export default function ExitoPage() {
    return (
        <div className="text-white p-8">
            <h1>Compra simulada</h1>
            <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
    )
}
