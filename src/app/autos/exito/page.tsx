
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Mail, CreditCard, Clock, Loader2, Car, ShoppingBag, Calendar, Zap } from 'lucide-react';
import Link from 'next/link';

type Session = {
    id: string;
    payment_status: string;
    customer_details?: {
        email?: string;
        name?: string;
    };
    amount_total?: number;
    currency?: string;
    metadata?: {
        vehiculo_marca?: string;
        vehiculo_modelo?: string;
        vehiculo_año?: string;
    };
    // Agrega otros campos según sea necesario
};

export default function Exito() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');

    const [session, setSession] = useState<Session | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!sessionId) {
            setError('ID de sesión no encontrado');
            setLoading(false);
            return;
        }

        fetch(`http://localhost:5000/api/checkout-session?session_id=${sessionId}`)
            .then(res => {
                if (!res.ok) throw new Error('Error al obtener la sesión');
                return res.json();
            })
            .then(data => {
                setSession(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [sessionId]);

    // Estado de carga
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-yellow-400 mx-auto"></div>
                    <p className="text-yellow-400 mt-4 text-xl">Verificando tu compra...</p>
                </div>
            </div>
        );
    }

    // Estado de error
    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center px-6">
                <div className="max-w-md w-full">
                    <div className="bg-gray-800/50 backdrop-blur-sm border border-red-500/30 rounded-2xl shadow-2xl p-8 text-center">
                        <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Car className="w-10 h-10 text-red-400" />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-4">
                            Oops! Algo salió mal
                        </h1>
                        <p className="text-gray-300 mb-6">
                            No pudimos procesar tu solicitud en este momento.
                        </p>
                        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
                            <p className="text-red-400 text-sm">
                                Error: {error}
                            </p>
                        </div>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold px-6 py-3 rounded-xl hover:from-yellow-500 hover:to-yellow-700 transition-all"
                        >
                            <Car className="w-5 h-5" />
                            Volver al Inicio
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // Estado de éxito
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
            {/* Header con gradiente similar al título principal */}
            <section className="py-12 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-yellow-400/20">
                        <CheckCircle2 className="w-12 h-12 text-black" />
                    </div>
                    <h1 className="text-6xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-4">
                        ¡COMPRA EXITOSA!
                    </h1>
                    <p className="text-xl text-gray-300">
                        Tu pago ha sido procesado correctamente
                    </p>
                </div>
            </section>

            {/* Contenido principal */}
            <section className="pb-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-2xl overflow-hidden">
                        {/* Información del vehículo si está disponible */}
                        {session?.metadata && (session.metadata.vehiculo_marca || session.metadata.vehiculo_modelo) && (
                            <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 border-b border-gray-700 p-8">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center">
                                        <Car className="w-8 h-8 text-black" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-white mb-1">Vehículo Adquirido</h2>
                                        <p className="text-gray-300">Tu nuevo vehículo de lujo</p>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <h3 className="text-3xl font-bold text-yellow-400">
                                        {session.metadata.vehiculo_marca} {session.metadata.vehiculo_modelo}
                                    </h3>
                                    {session.metadata.vehiculo_año && (
                                        <p className="text-gray-300 text-lg">Año {session.metadata.vehiculo_año}</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Detalles de la transacción */}
                        <div className="p-8 space-y-6">
                            <h2 className="text-2xl font-bold text-white mb-6 text-center">
                                Detalles de la Transacción
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* ID de Transacción */}
                                <div className="bg-gray-700/30 border border-gray-600 rounded-xl p-6">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-12 h-12 bg-yellow-400/20 rounded-lg flex items-center justify-center">
                                            <CreditCard className="w-6 h-6 text-yellow-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-400">ID de Transacción</p>
                                            <p className="text-lg font-semibold text-white break-all">{session?.id}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Estado del Pago */}
                                <div className="bg-gray-700/30 border border-gray-600 rounded-xl p-6">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-12 h-12 bg-green-400/20 rounded-lg flex items-center justify-center">
                                            <CheckCircle2 className="w-6 h-6 text-green-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-400">Estado del Pago</p>
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-400/20 text-green-400 border border-green-400/30">
                                                {session?.payment_status === 'paid' ? 'Pagado' : session?.payment_status}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Monto Total */}
                                {session && session.amount_total && (
                                    <div className="bg-gray-700/30 border border-gray-600 rounded-xl p-6">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-12 h-12 bg-yellow-400/20 rounded-lg flex items-center justify-center">
                                                <ShoppingBag className="w-6 h-6 text-yellow-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-400">Monto Total</p>
                                                <p className="text-2xl font-bold text-yellow-400">
                                                    ${(session.amount_total / 100).toLocaleString()} {session.currency?.toUpperCase()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Email del Cliente */}
                                {session && session.customer_details?.email && (
                                    <div className="bg-gray-700/30 border border-gray-600 rounded-xl p-6">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-12 h-12 bg-blue-400/20 rounded-lg flex items-center justify-center">
                                                <Mail className="w-6 h-6 text-blue-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-400">Correo Electrónico</p>
                                                <p className="text-lg font-semibold text-white">{session.customer_details.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Información adicional */}
                            <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-xl p-6">
                                <div className="flex items-start gap-3">
                                    <Clock className="w-6 h-6 text-yellow-400 mt-0.5" />
                                    <div>
                                        <h3 className="font-semibold text-yellow-400 mb-2">¿Qué sigue?</h3>
                                        <ul className="text-sm text-gray-300 space-y-1">
                                            <li>• Recibirás un correo de confirmación en breve</li>
                                            <li>• Nos pondremos en contacto contigo para coordinar la entrega</li>
                                            <li>• Tu vehículo será preparado según las especificaciones acordadas</li>
                                            <li>• Para cualquier consulta, nuestro equipo está disponible 24/7</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Botones de acción */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-6">
                                <Link
                                    href="/"
                                    className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold py-4 px-6 rounded-xl hover:from-yellow-500 hover:to-yellow-700 transition-all text-center flex items-center justify-center gap-2 shadow-lg shadow-yellow-400/20"
                                >
                                    <Car className="w-5 h-5" />
                                    Volver al Catálogo
                                </Link>
                                <Link
                                    href="/mis-compras"
                                    className="flex-1 border-2 border-yellow-400 text-yellow-400 font-bold py-4 px-6 rounded-xl hover:bg-yellow-400/10 transition-all text-center flex items-center justify-center gap-2"
                                >
                                    <Calendar className="w-5 h-5" />
                                    Ver Mis Compras
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}