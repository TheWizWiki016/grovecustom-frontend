'use client'

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from "react";
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { useSession, signIn } from "next-auth/react";
import {
    Calendar,
    Clock,
    MapPin,
    Phone,
    Mail,
    User,
    Car,
    Check,
    X,
    Home,
    Building2,
    ChevronLeft,
    ChevronRight,
    AlertCircle,
    CheckCircle,
    Calculator,
    Menu
} from 'lucide-react'

interface Auto {
    _id: string
    marca: string
    modelo: string
    año: number
    precio: number
    descripcion: string
    categoria?: string
    imagenes?: string[]
}

interface User {
    _id: string
    nombre: string
    email: string
    avatar?: string
}

interface LoginModalProps {
    isOpen: boolean
    onClose: () => void
    onLogin: (user: User) => void
}

interface AppointmentData {
    autoId: string
    fechaCita: string
    horaCita: string
    tipoServicio: string
    ubicacion: string
    direccion?: string
    telefono: string
    email: string
    comentarios?: string
    esDomicilio: boolean
}

// Componente Modal de Login
function LoginModal({ isOpen, onClose, onLogin }: LoginModalProps) {
    const [isLogin, setIsLogin] = useState(true)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        nombre: ''
    })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    if (!isOpen) return null

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        try {
            const endpoint = isLogin ? '/api/login' : '/api/register'
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                const data = await response.json()
                onLogin(data.user)
                onClose()
            } else {
                const errorData = await response.json()
                setError(errorData.message || 'Error en el proceso')
            }
        } catch (err) {
            setError('Error de conexión')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 sm:p-8 max-w-md w-full mx-4 border border-gray-700 shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                        {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors p-1"
                    >
                        <X size={24} />
                    </button>
                </div>

                {error && (
                    <div className="bg-red-500/20 border border-red-500 text-red-400 p-3 rounded-lg mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Nombre
                            </label>
                            <input
                                type="text"
                                value={formData.nombre}
                                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors text-sm sm:text-base"
                                required={!isLogin}
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors text-sm sm:text-base"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors text-sm sm:text-base"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 text-sm sm:text-base"
                    >
                        {isLoading ? 'Procesando...' : (isLogin ? 'Iniciar Sesión' : 'Registrarse')}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-yellow-400 hover:text-yellow-300 transition-colors text-sm"
                    >
                        {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default function AgendarCitaPage() {
    const { id } = useParams()
    const { data: session, status } = useSession();
    const [auto, setAuto] = useState<Auto | null>(null)
    const [autoError, setAutoError] = useState<string | null>(null)
    const [user, setUser] = useState<User | null>(null);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [activeTab, setActiveTab] = useState('fecha'); // Para navegación móvil

    const [appointmentData, setAppointmentData] = useState({
        autoId: '',
        fechaCita: '',
        horaCita: '',
        tipoServicio: 'prueba_manejo',
        ubicacion: 'concesionario',
        esDomicilio: false,
        direccion: '',
        telefono: '',
        email: '',
        comentarios: '',
        concesionarioIndex: 0,
    });

    // Lista de concesionarios
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

    const router = useRouter();

    // Estados para el calendario personalizado
    const [currentDate, setCurrentDate] = useState<Date | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    useEffect(() => {
        setCurrentDate(new Date());
    }, []);

    // Horarios disponibles
    const horariosDisponibles = [
        '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
        '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
        '16:00', '16:30', '17:00', '17:30', '18:00'
    ];

    useEffect(() => {
        const fetchAuto = async () => {
            try {
                const url = `${process.env.NEXT_PUBLIC_API_URL}/api/autos/${id}`;
                const res = await fetch(url);
                if (!res.ok) throw new Error('No se pudo obtener el auto');
                const data = await res.json();
                setAuto(data);
            } catch (error) {
                setAutoError('Error al obtener auto');
                console.error('Error al obtener auto:', error);
            }
        };

        if (id) fetchAuto();
    }, [id])

    useEffect(() => {
        if (session?.user && session.user.email) {
            setUser({
                _id: session.user.id,
                nombre: session.user.nombre || 'Usuario',
                email: session.user.email,
            });
            setAppointmentData(prev => ({
                ...prev,
                email: session.user.email
            }));
        } else {
            setUser(null);
            setAppointmentData(prev => ({
                ...prev,
                email: ''
            }));
        }
    }, [session]);

    useEffect(() => {
        if (id && typeof id === 'string') {
            setAppointmentData(prev => ({
                ...prev,
                autoId: id,
            }));
        }
    }, [id]);

    const handleLogin = (userData: User) => {
        setUser(userData)
        setAppointmentData(prev => ({
            ...prev,
            email: userData.email
        }));
    }

    // Funciones del calendario
    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days = [];

        // Días del mes anterior para completar la primera semana
        for (let i = startingDayOfWeek - 1; i >= 0; i--) {
            const day = new Date(year, month, -i);
            days.push({ date: day, isCurrentMonth: false });
        }

        // Días del mes actual
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            days.push({ date, isCurrentMonth: true });
        }

        // Días del siguiente mes para completar la última semana
        const remainingDays = 42 - days.length;
        for (let day = 1; day <= remainingDays; day++) {
            const date = new Date(year, month + 1, day);
            days.push({ date, isCurrentMonth: false });
        }

        return days;
    };

    const isDateAvailable = (date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const dayOfWeek = date.getDay();
        return date >= today && dayOfWeek !== 0;
    };

    const selectDate = (date: Date) => {
        if (isDateAvailable(date)) {
            setSelectedDate(date);
            setAppointmentData(prev => ({
                ...prev,
                fechaCita: date.toISOString().split('T')[0]
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) {
            setIsLoginModalOpen(true);
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/citas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    autoId: auto._id,
                    usuarioId: user._id,
                    fechaCita: appointmentData.fechaCita,
                    horaCita: appointmentData.horaCita,
                    tipoServicio: appointmentData.tipoServicio,
                    ubicacion: appointmentData.ubicacion,
                    direccion: appointmentData.direccion,
                    telefono: appointmentData.telefono,
                    email: appointmentData.email,
                    comentarios: appointmentData.comentarios,
                    esDomicilio: appointmentData.esDomicilio,
                    concesionarioIndex: appointmentData.concesionarioIndex,
                }),
            });

            if (!response.ok) throw new Error('No se pudo guardar la cita');

            setShowSuccess(true);

            setTimeout(() => {
                setShowSuccess(false);
                setAppointmentData({
                    autoId: id as string,
                    fechaCita: '',
                    horaCita: '',
                    tipoServicio: 'prueba_manejo',
                    ubicacion: 'concesionario',
                    direccion: '',
                    telefono: '',
                    email: user.email,
                    comentarios: '',
                    esDomicilio: false,
                    concesionarioIndex: 0,
                });
                setSelectedDate(null);
            }, 3000);

        } catch (error) {
            console.error('Error al agendar cita:', error);
            alert('Error al guardar la cita');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (autoError) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
                <div className="text-center">
                    <p className="text-red-400 text-lg sm:text-xl font-semibold mt-6">{autoError}</p>
                </div>
            </div>
        )
    }

    if (!auto) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 sm:h-32 sm:w-32 border-4 border-yellow-500 border-t-transparent"></div>
                    <p className="text-white text-lg sm:text-xl font-semibold mt-6">Cargando...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
                {/* Header */}
                <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 shadow-2xl border border-gray-700">
                    <div className="flex flex-col sm:flex-row justify-between items-start mb-4 sm:mb-6 gap-4">
                        <div className="w-full sm:w-auto">
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-2">
                                Agendar Cita
                            </h1>
                            <p className="text-gray-300 text-base sm:text-lg">
                                {auto.marca} {auto.modelo} {auto.año}
                            </p>
                        </div>
                    </div>

                    {/* Información del auto */}
                    <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
                        {auto.imagenes && auto.imagenes[0] && (
                            <div className="w-full lg:w-1/3">
                                <Image
                                    src={auto.imagenes[0]}
                                    alt={`${auto.marca} ${auto.modelo}`}
                                    width={400}
                                    height={300}
                                    className="w-full h-40 sm:h-48 lg:h-56 object-cover rounded-lg sm:rounded-xl"
                                />
                            </div>
                        )}
                        <div className="w-full lg:w-2/3">
                            <p className="text-2xl sm:text-3xl font-bold text-green-400 mb-2">
                                ${auto.precio.toLocaleString()}
                            </p>
                            <p className="text-gray-300 mb-4 text-sm sm:text-base">
                                {auto.descripcion}
                            </p>
                            <div className="flex items-center gap-2 text-yellow-400">
                                <Car size={18} className="sm:w-5 sm:h-5" />
                                <span className="text-sm sm:text-base">Disponible para prueba de manejo</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Alerta de éxito */}
                {showSuccess && (
                    <div className="bg-green-500/20 border border-green-500 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8 animate-fade-in">
                        <div className="flex items-start gap-3">
                            <CheckCircle size={20} className="text-green-400 mt-0.5 flex-shrink-0 sm:w-6 sm:h-6" />
                            <div>
                                <h3 className="text-base sm:text-lg font-semibold text-green-400">¡Cita Agendada Exitosamente!</h3>
                                <p className="text-green-300 text-sm sm:text-base">Te contactaremos pronto para confirmar los detalles.</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Navegación por pestañas en móvil */}
                <div className="lg:hidden mb-6">
                    <div className="flex bg-gray-800 rounded-lg p-1 gap-1">
                        <button
                            onClick={() => setActiveTab('fecha')}
                            className={`flex-1 py-2 px-3 rounded text-sm font-medium transition-colors ${activeTab === 'fecha'
                                ? 'bg-yellow-500 text-black'
                                : 'text-gray-300 hover:text-white'
                                }`}
                        >
                            <Calendar size={16} className="inline mr-2" />
                            Fecha
                        </button>
                        <button
                            onClick={() => setActiveTab('info')}
                            className={`flex-1 py-2 px-3 rounded text-sm font-medium transition-colors ${activeTab === 'info'
                                ? 'bg-yellow-500 text-black'
                                : 'text-gray-300 hover:text-white'
                                }`}
                        >
                            <User size={16} className="inline mr-2" />
                            Información
                        </button>
                    </div>
                </div>

                {/* Contenido principal */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                    {/* Calendario y horarios */}
                    <div className={`bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl border border-gray-700 ${activeTab !== 'fecha' ? 'hidden lg:block' : ''
                        }`}>
                        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-3">
                            <Calendar size={24} className="text-yellow-500 sm:w-7 sm:h-7" />
                            Selecciona Fecha y Hora
                        </h2>

                        {/* Calendario personalizado */}
                        <div className="mb-4 sm:mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <button
                                    onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                                >
                                    <ChevronLeft size={18} className="sm:w-5 sm:h-5" />
                                </button>
                                <h3 className="text-base sm:text-lg font-semibold">
                                    {currentDate ? currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }) : ''}
                                </h3>
                                <button
                                    onClick={() => {
                                        if (currentDate) {
                                            setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
                                        }
                                    }}
                                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                                >
                                    <ChevronRight size={18} className="sm:w-5 sm:h-5" />
                                </button>
                            </div>

                            {/* Días de la semana */}
                            <div className="grid grid-cols-7 gap-1 mb-2">
                                {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
                                    <div key={day} className="text-center text-xs sm:text-sm font-semibold text-gray-400 py-2">
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* Días del mes */}
                            <div className="grid grid-cols-7 gap-1">
                                {getDaysInMonth(currentDate).map((day, index) => {
                                    const isAvailable = day.isCurrentMonth && isDateAvailable(day.date);
                                    const isSelected = selectedDate && day.date.toDateString() === selectedDate.toDateString();

                                    return (
                                        <button
                                            key={index}
                                            onClick={() => selectDate(day.date)}
                                            disabled={!isAvailable}
                                            className={`
                                                p-2 sm:p-3 text-xs sm:text-sm rounded-lg transition-all duration-200 min-h-[32px] sm:min-h-[40px]
                                                ${!day.isCurrentMonth
                                                    ? 'text-gray-600 cursor-not-allowed'
                                                    : isAvailable
                                                        ? isSelected
                                                            ? 'bg-yellow-500 text-black font-bold'
                                                            : 'hover:bg-gray-700 text-white'
                                                        : 'text-gray-600 cursor-not-allowed'
                                                }
                                            `}
                                        >
                                            {day.date.getDate()}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Horarios disponibles */}
                        {selectedDate && (
                            <div>
                                <h3 className="text-base sm:text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                    <Clock size={18} className="text-yellow-500 sm:w-5 sm:h-5" />
                                    Horarios Disponibles
                                </h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                    {horariosDisponibles.map(hora => (
                                        <button
                                            key={hora}
                                            onClick={() => setAppointmentData(prev => ({ ...prev, horaCita: hora }))}
                                            className={`
                                                p-2 sm:p-3 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200
                                                ${appointmentData.horaCita === hora
                                                    ? 'bg-yellow-500 text-black'
                                                    : 'bg-gray-800 text-white hover:bg-gray-700'
                                                }
                                            `}
                                        >
                                            {hora}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Botón continuar en móvil */}
                        <div className="lg:hidden mt-6">
                            <button
                                onClick={() => setActiveTab('info')}
                                disabled={!selectedDate || !appointmentData.horaCita}
                                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 disabled:from-gray-600 disabled:to-gray-700 text-black font-bold py-3 px-4 rounded-lg transition-all duration-300 disabled:cursor-not-allowed"
                            >
                                Continuar
                            </button>
                        </div>
                    </div>

                    {/* Formulario de información */}
                    <div className={`bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl border border-gray-700 ${activeTab !== 'info' ? 'hidden lg:block' : ''
                        }`}>
                        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-3">
                            <User size={24} className="text-yellow-500 sm:w-7 sm:h-7" />
                            Información de Contacto
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                            {/* Tipo de servicio */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-3">
                                    Tipo de Servicio
                                </label>
                                <div className="space-y-2">
                                    {[
                                        { value: 'prueba_manejo', label: 'Prueba de Manejo', icon: Car },
                                        { value: 'inspeccion', label: 'Inspección Técnica', icon: CheckCircle },
                                        { value: 'cotizacion', label: 'Cotización Personalizada', icon: Calculator }
                                    ].map(({ value, label, icon: Icon }) => (
                                        <label key={value} className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-800 rounded-lg transition-colors">
                                            <input
                                                type="radio"
                                                name="tipoServicio"
                                                value={value}
                                                checked={appointmentData.tipoServicio === value}
                                                onChange={(e) => setAppointmentData(prev => ({
                                                    ...prev,
                                                    tipoServicio: e.target.value
                                                }))}
                                                className="text-yellow-500"
                                            />
                                            <Icon size={18} className="text-yellow-500 sm:w-5 sm:h-5" />
                                            <span className="text-white text-sm sm:text-base">{label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Ubicación */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-3">
                                    Ubicación de la Cita
                                </label>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-800 rounded-lg transition-colors">
                                        <input
                                            type="radio"
                                            name="ubicacion"
                                            value="concesionario"
                                            checked={appointmentData.ubicacion === 'concesionario'}
                                            onChange={(e) => setAppointmentData(prev => ({
                                                ...prev,
                                                ubicacion: e.target.value,
                                                esDomicilio: false
                                            }))}
                                            className="text-yellow-500"
                                        />
                                        <Building2 size={18} className="text-yellow-500 sm:w-5 sm:h-5" />
                                        <span className="text-white text-sm sm:text-base">En Concesionario</span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer p-2 hover:bg-gray-800 rounded-lg transition-colors">
                                        <input
                                            type="radio"
                                            name="ubicacion"
                                            value="domicilio"
                                            checked={appointmentData.ubicacion === 'domicilio'}
                                            onChange={(e) => setAppointmentData(prev => ({
                                                ...prev,
                                                ubicacion: e.target.value,
                                                esDomicilio: true
                                            }))}
                                            className="text-yellow-500"
                                        />
                                        <Home size={18} className="text-yellow-500 sm:w-5 sm:h-5" />
                                        <span className="text-white text-sm sm:text-base">A Domicilio</span>
                                    </label>
                                </div>
                            </div>

                            {/* Selección de concesionario */}
                            {appointmentData.ubicacion === 'concesionario' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-3">
                                        Selecciona Concesionario
                                    </label>
                                    <div className="space-y-3">
                                        {concesionarios.map((concesionario, index) => (
                                            <label key={index} className="flex items-start gap-3 cursor-pointer p-3 border border-gray-700 rounded-lg hover:bg-gray-800 transition-colors">
                                                <input
                                                    type="radio"
                                                    name="concesionario"
                                                    value={index}
                                                    checked={appointmentData.concesionarioIndex === index}
                                                    onChange={(e) => setAppointmentData(prev => ({
                                                        ...prev,
                                                        concesionarioIndex: parseInt(e.target.value)
                                                    }))}
                                                    className="text-yellow-500 mt-1"
                                                />
                                                <div className="flex-1">
                                                    <div className="font-semibold text-white text-sm sm:text-base">{concesionario.nombre}</div>
                                                    <div className="text-gray-400 text-xs sm:text-sm">{concesionario.direccion}</div>
                                                    <a
                                                        href={`https://maps.google.com/maps?q=${encodeURIComponent(concesionario.mapsQuery)}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-yellow-400 hover:text-yellow-300 text-xs inline-flex items-center gap-1 mt-1"
                                                    >
                                                        <MapPin size={12} />
                                                        Ver en mapa
                                                    </a>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Dirección para domicilio */}
                            {appointmentData.ubicacion === 'domicilio' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Dirección Completa
                                    </label>
                                    <textarea
                                        value={appointmentData.direccion}
                                        onChange={(e) => setAppointmentData(prev => ({
                                            ...prev,
                                            direccion: e.target.value
                                        }))}
                                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors text-sm sm:text-base resize-none"
                                        rows={3}
                                        placeholder="Ingresa tu dirección completa para la visita a domicilio"
                                        required={appointmentData.ubicacion === 'domicilio'}
                                    />
                                </div>
                            )}

                            {/* Teléfono */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Número de Teléfono
                                </label>
                                <div className="relative">
                                    <Phone size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 sm:w-5 sm:h-5" />
                                    <input
                                        type="tel"
                                        value={appointmentData.telefono}
                                        onChange={(e) => setAppointmentData(prev => ({
                                            ...prev,
                                            telefono: e.target.value
                                        }))}
                                        className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors text-sm sm:text-base"
                                        placeholder="Ej: +52 492 123 4567"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Correo Electrónico
                                </label>
                                <div className="relative">
                                    <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 sm:w-5 sm:h-5" />
                                    <input
                                        type="email"
                                        value={appointmentData.email}
                                        onChange={(e) => setAppointmentData(prev => ({
                                            ...prev,
                                            email: e.target.value
                                        }))}
                                        className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors text-sm sm:text-base"
                                        placeholder="tu@email.com"
                                        required
                                        disabled={!!user}
                                    />
                                </div>
                                {user && (
                                    <p className="text-xs text-gray-400 mt-1">
                                        Usando el email de tu cuenta
                                    </p>
                                )}
                            </div>

                            {/* Comentarios adicionales */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Comentarios Adicionales (Opcional)
                                </label>
                                <textarea
                                    value={appointmentData.comentarios}
                                    onChange={(e) => setAppointmentData(prev => ({
                                        ...prev,
                                        comentarios: e.target.value
                                    }))}
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors text-sm sm:text-base resize-none"
                                    rows={3}
                                    placeholder="Cualquier información adicional que quieras compartir..."
                                />
                            </div>

                            {/* Botón volver en móvil */}
                            <div className="lg:hidden">
                                <button
                                    type="button"
                                    onClick={() => setActiveTab('fecha')}
                                    className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 mb-4"
                                >
                                    ← Volver a Fecha y Hora
                                </button>
                            </div>

                            {/* Información de autenticación */}
                            {!user && (
                                <div className="bg-yellow-500/20 border border-yellow-500 rounded-lg p-4">
                                    <div className="flex items-start gap-3">
                                        <AlertCircle size={18} className="text-yellow-400 mt-0.5 flex-shrink-0 sm:w-5 sm:h-5" />
                                        <div>
                                            <p className="text-yellow-400 text-sm sm:text-base font-medium">
                                                Inicia sesión para agendar tu cita
                                            </p>
                                            <p className="text-yellow-300 text-xs sm:text-sm">
                                                Necesitas una cuenta para guardar tu cita y recibir confirmaciones.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Resumen de la cita */}
                            {selectedDate && appointmentData.horaCita && (
                                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                                    <h3 className="text-base sm:text-lg font-semibold text-white mb-3">Resumen de tu Cita</h3>
                                    <div className="space-y-2 text-sm sm:text-base">
                                        <div className="flex items-center gap-2 text-gray-300">
                                            <Calendar size={16} className="text-yellow-500" />
                                            <span>{selectedDate.toLocaleDateString('es-ES', {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-300">
                                            <Clock size={16} className="text-yellow-500" />
                                            <span>{appointmentData.horaCita}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-300">
                                            <Car size={16} className="text-yellow-500" />
                                            <span>
                                                {appointmentData.tipoServicio === 'prueba_manejo' && 'Prueba de Manejo'}
                                                {appointmentData.tipoServicio === 'inspeccion' && 'Inspección Técnica'}
                                                {appointmentData.tipoServicio === 'cotizacion' && 'Cotización Personalizada'}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-300">
                                            {appointmentData.ubicacion === 'concesionario' ? (
                                                <>
                                                    <Building2 size={16} className="text-yellow-500" />
                                                    <span>{concesionarios[appointmentData.concesionarioIndex]?.nombre}</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Home size={16} className="text-yellow-500" />
                                                    <span>Servicio a domicilio</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Botón de envío */}
                            <button
                                type="submit"
                                disabled={
                                    isSubmitting ||
                                    !selectedDate ||
                                    !appointmentData.horaCita ||
                                    !appointmentData.telefono ||
                                    !appointmentData.email ||
                                    (appointmentData.ubicacion === 'domicilio' && !appointmentData.direccion)
                                }
                                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 disabled:from-gray-600 disabled:to-gray-700 text-black font-bold py-3 sm:py-4 px-4 rounded-lg transition-all duration-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-black border-t-transparent"></div>
                                        <span className="text-sm sm:text-base">Agendando...</span>
                                    </>
                                ) : (
                                    <>
                                        <Check size={20} className="sm:w-5 sm:h-5" />
                                        <span className="text-sm sm:text-base">
                                            {user ? 'Agendar Cita' : 'Iniciar Sesión y Agendar'}
                                        </span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Información adicional */}
                <div className="mt-6 sm:mt-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl border border-gray-700">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-3">
                        <AlertCircle size={20} className="text-yellow-500 sm:w-6 sm:h-6" />
                        Información Importante
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm sm:text-base">
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <Check size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                                <p className="text-gray-300">
                                    Te contactaremos para confirmar tu cita en las próximas 2 horas.
                                </p>
                            </div>
                            <div className="flex items-start gap-3">
                                <Check size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                                <p className="text-gray-300">
                                    Lleva tu licencia de conducir vigente para la prueba de manejo.
                                </p>
                            </div>
                            <div className="flex items-start gap-3">
                                <Check size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                                <p className="text-gray-300">
                                    El servicio a domicilio está disponible en un radio de 30 km.
                                </p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3">
                                <AlertCircle size={16} className="text-yellow-400 mt-0.5 flex-shrink-0" />
                                <p className="text-gray-300">
                                    Puedes reagendar o cancelar tu cita con 24 horas de anticipación.
                                </p>
                            </div>
                            <div className="flex items-start gap-3">
                                <AlertCircle size={16} className="text-yellow-400 mt-0.5 flex-shrink-0" />
                                <p className="text-gray-300">
                                    Los domingos no tenemos servicio disponible.
                                </p>
                            </div>
                            <div className="flex items-start gap-3">
                                <Phone size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
                                <p className="text-gray-300">
                                    Para dudas llama al: <span className="text-blue-400">+52 492 123 4567</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Modal de Login */}
            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
                onLogin={handleLogin}
            />
        </div>
    )
}