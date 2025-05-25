'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react'; // Asegúrate de tener lucide-react instalado

export default function RegisterPage() {
    const router = useRouter();
    const [form, setForm] = useState({ email: '', password: '', nombre: '' });
    const [error, setError] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setMensaje('');
        setLoading(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || 'Error al registrar');

            setMensaje('✅ Usuario registrado correctamente. Redirigiendo...');
            setTimeout(() => router.push('/auth/signin'), 2000);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6 transition-all">
                <h1 className="text-3xl font-bold text-center text-gray-800">Crear cuenta</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-700 mb-1">Nombre</label>
                        <input
                            type="text"
                            name="nombre"
                            value={form.nombre}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-black"
                            placeholder="Tu nombre"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-700 mb-1">Correo electrónico</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-black"
                            placeholder="ejemplo@correo.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-gray-700 mb-1">Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-black"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center items-center bg-black text-white py-2 rounded-xl hover:bg-gray-800 transition duration-200 disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Registrarse'}
                    </button>
                </form>

                {mensaje && <p className="text-green-600 text-sm text-center">{mensaje}</p>}
                {error && <p className="text-red-600 text-sm text-center">{error}</p>}

                <p className="text-center text-sm text-gray-500">
                    ¿Ya tienes una cuenta?{' '}
                    <a href="/auth/signin" className="text-black font-medium hover:underline">
                        Inicia sesión
                    </a>
                </p>
            </div>
        </div>
    );
}
