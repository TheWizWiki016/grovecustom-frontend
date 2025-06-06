"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
    Calendar,
    Clock,
    MapPin,
    Phone,
    Mail,
    User,
    Car,
    Home,
    Building2,
    Navigation,
    RefreshCw,
    MessageCircle,
    AlertCircle,
    CheckCircle,
    XCircle,
    Edit,
    ExternalLink,
    Eye,
    Loader
} from 'lucide-react';
import Image from 'next/image';

interface Auto {
    _id: string;
    marca: string;
    modelo: string;
    año: number;
    precio: number;
    imagenes?: string[];
    concesionarios?: Array<{
        nombre: string;
        direccion: string;
        mapsQuery: string;
    }>;
}

interface Cita {
    _id: string;
    autoId: Auto;
    fechaCita: string;
    horaCita: string;
    tipoServicio: string;
    ubicacion: string;
    direccion?: string;
    telefono: string;
    email: string;
    comentarios?: string;
    concesionarioIndex: number;
    estado?: 'pendiente' | 'confirmada' | 'completada' | 'cancelada';
    fechaCreacion?: string;
}

export default function MisCitasPage() {
    const { data: session, status } = useSession();
    const [citas, setCitas] = useState<Cita[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'todas' | 'pendiente' | 'confirmada' | 'completada'>('todas');

    // Datos de concesionarios (mismo que en AgendarCita)
    const concesionarios = [
        {
            nombre: "Grove Motors Centro",
            direccion: "Celaya 116, Zona A, 5 Señores, 98089 Zacatecas, Zac.",
            mapsQuery: "Celaya 116, Zona A, 5 Señores, 98089 Zacatecas, Zac."
        },
        {
            nombre: "Grove Motors Norte",
            direccion: "Nogal 105, Huerta Vieja, 98087 Zacatecas, Zac.",
            mapsQuery: "Nogal 105, Huerta Vieja, 98087 Zacatecas, Zac."
        },
        {
            nombre: "Grove Motors Sur",
            direccion: "José López Portillo 234, Dependencias Federales, 98618 Guadalupe, Zac.",
            mapsQuery: "José López Portillo 234, Dependencias Federales, 98618 Guadalupe, Zac."
        }
    ];

    useEffect(() => {
        if (session?.user?._id) {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/citas/usuario/${session.user._id}`)
                .then(res => res.json())
                .then(data => {
                    setCitas(data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error al cargar citas:', error);
                    setLoading(false);
                });
        }
    }, [session]);

    const getServiceLabel = (tipoServicio: string) => {
        switch (tipoServicio) {
            case 'prueba_manejo': return 'Prueba de Manejo';
            case 'inspeccion': return 'Inspección Técnica';
            case 'cotizacion': return 'Cotización Personalizada';
            default: return tipoServicio;
        }
    };

    const getServiceIcon = (tipoServicio: string) => {
        switch (tipoServicio) {
            case 'prueba_manejo': return Car;
            case 'inspeccion': return CheckCircle;
            case 'cotizacion': return Eye;
            default: return Car;
        }
    };

    const getStatusColor = (estado?: string) => {
        switch (estado) {
            case 'confirmada': return 'text-green-400 bg-green-500/20 border-green-500';
            case 'completada': return 'text-blue-400 bg-blue-500/20 border-blue-500';
            case 'cancelada': return 'text-red-400 bg-red-500/20 border-red-500';
            default: return 'text-yellow-400 bg-yellow-500/20 border-yellow-500';
        }
    };

    const getStatusIcon = (estado?: string) => {
        switch (estado) {
            case 'confirmada': return CheckCircle;
            case 'completada': return CheckCircle;
            case 'cancelada': return XCircle;
            default: return AlertCircle;
        }
    };

    const getStatusLabel = (estado?: string) => {
        switch (estado) {
            case 'confirmada': return 'Confirmada';
            case 'completada': return 'Completada';
            case 'cancelada': return 'Cancelada';
            default: return 'Pendiente';
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getConcesionarioInfo = (cita: Cita) => {
        if (cita.ubicacion === 'concesionario') {
            return concesionarios[cita.concesionarioIndex] || concesionarios[0];
        }
        return null;
    };

    const filteredCitas = filter === 'todas'
        ? citas
        : citas.filter(cita => (cita.estado || 'pendiente') === filter);

    if (status === "loading" || loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <Loader className="animate-spin h-16 w-16 text-yellow-500 mx-auto mb-4" />
                    <p className="text-white text-xl font-semibold">Cargando tus citas...</p>
                </div>
            </div>
        );
    }

    if (!session) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
                <div className="text-center max-w-md">
                    <User className="h-24 w-24 text-yellow-500 mx-auto mb-6" />
                    <h2 className="text-2xl font-bold text-white mb-4">Acceso Requerido</h2>
                    <p className="text-gray-300 mb-6">Debes iniciar sesión para ver tus citas programadas.</p>
                    <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold py-3 px-6 rounded-lg transition-all duration-300">
                        Iniciar Sesión
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                                Mis Citas
                            </h1>
                            <p className="text-gray-300 mt-2">
                                Gestiona y revisa todas tus citas programadas
                            </p>
                        </div>

                        {/* Filtros */}
                        <div className="flex gap-2 bg-gray-800 p-1 rounded-lg">
                            {[
                                { key: 'todas', label: 'Todas' },
                                { key: 'pendiente', label: 'Pendientes' },
                                { key: 'confirmada', label: 'Confirmadas' },
                                { key: 'completada', label: 'Completadas' }
                            ].map(({ key, label }) => (
                                <button
                                    key={key}
                                    onClick={() => setFilter(key as any)}
                                    className={`px-3 py-2 text-sm font-medium rounded transition-colors ${filter === key
                                        ? 'bg-yellow-500 text-black'
                                        : 'text-gray-300 hover:text-white hover:bg-gray-700'
                                        }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Estadísticas rápidas */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: 'Total', count: citas.length, color: 'blue' },
                        { label: 'Pendientes', count: citas.filter(c => !c.estado || c.estado === 'pendiente').length, color: 'yellow' },
                        { label: 'Confirmadas', count: citas.filter(c => c.estado === 'confirmada').length, color: 'green' },
                        { label: 'Completadas', count: citas.filter(c => c.estado === 'completada').length, color: 'purple' }
                    ].map(({ label, count, color }) => (
                        <div key={label} className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-4 border border-gray-700">
                            <div className="text-2xl font-bold text-white">{count}</div>
                            <div className={`text-sm text-${color}-400`}>{label}</div>
                        </div>
                    ))}
                </div>

                {/* Lista de citas */}
                {filteredCitas.length === 0 ? (
                    <div className="text-center py-16">
                        <Calendar className="h-24 w-24 text-gray-600 mx-auto mb-6" />
                        <h3 className="text-xl font-semibold text-white mb-2">
                            {filter === 'todas' ? 'No tienes citas registradas' : `No tienes citas ${filter}s`}
                        </h3>
                        <p className="text-gray-400 mb-6">
                            {filter === 'todas'
                                ? 'Comienza agendando tu primera cita para ver un auto.'
                                : `Cambia el filtro para ver otras citas.`
                            }
                        </p>
                        {filter === 'todas' && (
                            <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold py-3 px-6 rounded-lg transition-all duration-300">
                                Agendar Primera Cita
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="space-y-6">
                        {filteredCitas.map((cita) => {
                            const concesionario = getConcesionarioInfo(cita);
                            const ServiceIcon = getServiceIcon(cita.tipoServicio);
                            const StatusIcon = getStatusIcon(cita.estado);

                            return (
                                <div
                                    key={cita._id}
                                    className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 shadow-2xl border border-gray-700 hover:border-gray-600 transition-all duration-300"
                                >
                                    <div className="flex flex-col lg:flex-row gap-6">
                                        {/* Imagen del auto */}
                                        <div className="lg:w-1/3">
                                            {cita.autoId?.imagenes?.[0] ? (
                                                <div className="relative">
                                                    <Image
                                                        src={cita.autoId.imagenes[0]}
                                                        alt={`${cita.autoId.marca} ${cita.autoId.modelo}`}
                                                        width={400}
                                                        height={250}
                                                        className="w-full h-48 lg:h-56 object-cover rounded-xl"
                                                    />
                                                    <div className="absolute top-3 right-3">
                                                        <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(cita.estado)}`}>
                                                            <StatusIcon size={12} className="inline mr-1" />
                                                            {getStatusLabel(cita.estado)}
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="w-full h-48 lg:h-56 bg-gray-700 rounded-xl flex items-center justify-center">
                                                    <Car size={48} className="text-gray-500" />
                                                </div>
                                            )}
                                        </div>

                                        {/* Información de la cita */}
                                        <div className="lg:w-2/3 space-y-4">
                                            {/* Header de la cita */}
                                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                                                <div>
                                                    <h3 className="text-xl font-bold text-white mb-1">
                                                        {cita.autoId?.marca} {cita.autoId?.modelo} {cita.autoId?.año}
                                                    </h3>
                                                    <div className="flex items-center gap-2 text-green-400">
                                                        <ServiceIcon size={16} />
                                                        <span className="text-sm font-medium">{getServiceLabel(cita.tipoServicio)}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Detalles de fecha y hora */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div className="flex items-center gap-3 text-gray-300">
                                                    <Calendar size={18} className="text-yellow-500" />
                                                    <div>
                                                        <div className="font-medium text-white">{formatDate(cita.fechaCita)}</div>
                                                        <div className="text-sm text-gray-400">Fecha de la cita</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3 text-gray-300">
                                                    <Clock size={18} className="text-yellow-500" />
                                                    <div>
                                                        <div className="font-medium text-white">{cita.horaCita}</div>
                                                        <div className="text-sm text-gray-400">Hora programada</div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Ubicación */}
                                            <div className="flex items-start gap-3 text-gray-300">
                                                {cita.ubicacion === 'concesionario' ? (
                                                    <Building2 size={18} className="text-yellow-500 mt-1" />
                                                ) : (
                                                    <Home size={18} className="text-yellow-500 mt-1" />
                                                )}
                                                <div className="flex-1">
                                                    <div className="font-medium text-white">
                                                        {cita.ubicacion === 'concesionario' ? 'En Concesionario' : 'Servicio a Domicilio'}
                                                    </div>
                                                    <div className="text-sm text-gray-400">
                                                        {cita.ubicacion === 'concesionario' && concesionario ? (
                                                            <>
                                                                <div>{concesionario.nombre}</div>
                                                                <div>{concesionario.direccion}</div>
                                                            </>
                                                        ) : cita.direccion ? (
                                                            <div>{cita.direccion}</div>
                                                        ) : (
                                                            <div>Dirección no especificada</div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Comentarios */}
                                            {cita.comentarios && (
                                                <div className="flex items-start gap-3 text-gray-300">
                                                    <MessageCircle size={18} className="text-yellow-500 mt-1" />
                                                    <div>
                                                        <div className="font-medium text-white mb-1">Comentarios</div>
                                                        <div className="text-sm text-gray-400 bg-gray-800 rounded-lg p-3">
                                                            {cita.comentarios}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Mapa */}
                                            <div className="rounded-xl overflow-hidden border border-gray-700">
                                                {cita.ubicacion === "concesionario" && concesionario?.mapsQuery ? (
                                                    <iframe
                                                        title="Ubicación concesionario"
                                                        width="100%"
                                                        height="200"
                                                        style={{ border: 0 }}
                                                        loading="lazy"
                                                        allowFullScreen
                                                        referrerPolicy="no-referrer-when-downgrade"
                                                        src={`https://www.google.com/maps?q=${encodeURIComponent(concesionario.mapsQuery)}&output=embed`}
                                                    />
                                                ) : cita.ubicacion === "domicilio" && cita.direccion ? (
                                                    <iframe
                                                        title="Ubicación domicilio"
                                                        width="100%"
                                                        height="200"
                                                        style={{ border: 0 }}
                                                        loading="lazy"
                                                        allowFullScreen
                                                        referrerPolicy="no-referrer-when-downgrade"
                                                        src={`https://www.google.com/maps?q=${encodeURIComponent(cita.direccion)}&output=embed`}
                                                    />
                                                ) : (
                                                    <div className="h-48 bg-gray-800 flex items-center justify-center">
                                                        <MapPin className="h-12 w-12 text-gray-600" />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Botones de acción */}
                                            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-700">
                                                <button
                                                    className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                                                    onClick={() => {
                                                        const destino = cita.ubicacion === "concesionario"
                                                            ? concesionario?.mapsQuery
                                                            : cita.direccion;
                                                        if (destino) {
                                                            window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destino)}`, "_blank");
                                                        }
                                                    }}
                                                >
                                                    <Navigation size={18} />
                                                    Cómo llegar
                                                </button>
                                                <button
                                                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                                                    onClick={() => {
                                                        window.location.href = `/autos/AgendaCita/${cita.autoId._id}?reagendar=${cita._id}`;
                                                    }}
                                                >
                                                    <RefreshCw size={18} />
                                                    Reagendar
                                                </button>
                                                <button
                                                    className="sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                                                    onClick={() => {
                                                        window.location.href = `/autos/${cita.autoId._id}`;
                                                    }}
                                                >
                                                    <ExternalLink size={18} />
                                                    Ver Auto
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}