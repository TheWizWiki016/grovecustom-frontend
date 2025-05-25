"use client";

import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export default function ProfilePage() {
    const { data: session, status, update } = useSession();

    const [nombre, setNombre] = useState(session?.user?.nombre || "");
    const [email, setEmail] = useState(session?.user?.email || "");
    const [loading, setLoading] = useState(false);
    const [mensaje, setMensaje] = useState<string | null>(null);

    if (status === "loading") {
        return <p>Cargando perfil...</p>;
    }

    if (!session || !session.user) {
        return <p>No has iniciado sesión.</p>;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMensaje(null);

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${session.user.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ nombre, email }),
                }
            );

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Error al actualizar usuario");
            }

            const updatedUser = await res.json();

            // Actualiza la sesión para reflejar los cambios en la UI
            await update({
                ...session,
                user: {
                    ...session.user,
                    nombre: updatedUser.nombre,
                    email: updatedUser.email,
                },
            });

            setMensaje("Perfil actualizado correctamente.");
        } catch (error: any) {
            setMensaje(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Editar Perfil</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-semibold mb-1" htmlFor="nombre">
                        Nombre
                    </label>
                    <input
                        id="nombre"
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block font-semibold mb-1" htmlFor="email">
                        Correo electrónico
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 rounded text-black font-semibold"
                >
                    {loading ? "Guardando..." : "Guardar cambios"}
                </button>
            </form>

            {mensaje && (
                <p className={`mt-4 text-center ${mensaje.startsWith("Error") ? "text-red-600" : "text-green-600"}`}>
                    {mensaje}
                </p>
            )}

            <button
                onClick={() => signOut()}
                className="mt-6 w-full py-2 bg-red-600 hover:bg-red-700 rounded text-white font-semibold"
            >
                Cerrar sesión
            </button>
        </div>
    );
}
