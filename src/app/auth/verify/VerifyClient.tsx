'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function VerifyClient() {
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [user, setUser] = useState<{ email: string } | null>(null);

    useEffect(() => {
        const token = searchParams.get('token');
        if (!token) {
            setError('Token no encontrado en la URL');
            setLoading(false);
            return;
        }
        fetch('https://grovecustom-backend.onrender.com/api/auth/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }),
        })
            .then(async res => {
                if (!res.ok) {
                    const data = await res.json();
                    throw new Error(data.error || 'Error al verificar token');
                }
                return res.json();
            })
            .then(data => {
                setUser(data.user);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [searchParams]);

    if (loading) return <p>Verificando...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Bienvenido, {user?.email}</h1>
            <p>Has iniciado sesión correctamente con magic link.</p>
        </div>
    );
}
