"use client";

import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import {
    Car,
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Edit3,
    Save,
    LogOut,
    Shield,
    Camera,
    CreditCard,
    Heart,
    Settings,
    ArrowLeft,
    CheckCircle,
    AlertCircle
} from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
    const { data: session, status, update } = useSession();

    const [profileData, setProfileData] = useState({
        nombre: session?.user?.nombre || "",
        email: session?.user?.email || "",


        // telefono: session?.user?.telefono || "",
        // direccion: session?.user?.direccion || "",
        // ciudad: session?.user?.ciudad || "",
        // codigoPostal: session?.user?.codigoPostal || "",
        // fechaNacimiento: session?.user?.fechaNacimiento || "",
        // profesion: session?.user?.profesion || "",
        // intereses: session?.user?.intereses || "",
        // marcaFavorita: session?.user?.marcaFavorita || "",


    });

    const [loading, setLoading] = useState(false);
    const [mensaje, setMensaje] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState('personal');

    if (status === "loading") {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white text-lg">Cargando perfil...</p>
                </div>
            </div>
        );
    }

    if (!session || !session.user) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <Shield className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-white mb-2">Acceso Requerido</h2>
                    <p className="text-gray-400 mb-6">Necesitas iniciar sesión para acceder a tu perfil</p>
                    <Link href="/auth/signin" className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold py-3 px-6 rounded-lg hover:from-yellow-500 hover:to-yellow-700 transition-all">
                        Iniciar Sesión
                    </Link>
                </div>
            </div>
        );
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setProfileData({
            ...profileData,
            [e.target.name]: e.target.value
        });
    };

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
                    body: JSON.stringify(profileData),
                }
            );

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Error al actualizar usuario");
            }

            const updatedUser = await res.json();

            await update({
                ...session,
                user: {
                    ...session.user,
                    ...updatedUser,
                },
            });

            setMensaje("Perfil actualizado correctamente.");
        } catch (error: any) {
            setMensaje(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const tabs = [
        { id: 'personal', label: 'Información Personal', icon: User },
        { id: 'contacto', label: 'Contacto', icon: Mail },
        { id: 'preferencias', label: 'Preferencias', icon: Heart },
    ];

    const marcasFavoritas = [
        'Ferrari', 'Lamborghini', 'Porsche', 'McLaren', 'Aston Martin',
        'Bentley', 'Rolls-Royce', 'Bugatti', 'Koenigsegg', 'Pagani'
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,215,0,0.1),transparent)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,215,0,0.05),transparent)]"></div>

            {/* Navigation */}
            <div className="relative z-10 p-6">
                <Link href="/" className="flex items-center gap-2 text-gray-300 hover:text-yellow-400 transition-colors group">
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Volver al inicio
                </Link>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 pb-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                            <Car className="w-6 h-6 text-black" />
                        </div>
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-white bg-clip-text text-transparent">
                            GROVE CUSTOM CARS
                        </h1>
                    </div>
                    <h2 className="text-4xl font-bold text-white mb-2">Mi Perfil Exclusivo</h2>
                    <p className="text-gray-400">Gestiona tu información personal y preferencias</p>
                </div>

                {/* Profile Header */}
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 mb-8">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="relative">
                            <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                                <User className="w-12 h-12 text-black" />
                            </div>
                            <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center hover:bg-yellow-500 transition-colors">
                                <Camera className="w-4 h-4 text-black" />
                            </button>
                        </div>
                        <div className="text-center md:text-left">
                            <h3 className="text-2xl font-bold text-white mb-1">
                                {profileData.nombre || 'Usuario Grove'}
                            </h3>
                            <p className="text-gray-400 mb-2">{profileData.email}</p>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Shield className="w-4 h-4" />
                                Miembro desde {new Date().toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Success/Error Message */}
                {mensaje && (
                    <div className={`mb-6 p-4 rounded-lg border ${mensaje.startsWith("Error")
                        ? "bg-red-500/10 border-red-500/30 text-red-400"
                        : "bg-green-500/10 border-green-500/30 text-green-400"
                        }`}>
                        <div className="flex items-center gap-2">
                            {mensaje.startsWith("Error") ?
                                <AlertCircle className="w-5 h-5" /> :
                                <CheckCircle className="w-5 h-5" />
                            }
                            <p>{mensaje}</p>
                        </div>
                    </div>
                )}

                {/* Tabs */}
                <div className="mb-8">
                    <div className="flex flex-wrap gap-2">
                        {tabs.map((tab) => {
                            const IconComponent = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${activeTab === tab.id
                                        ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black'
                                        : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white'
                                        }`}
                                >
                                    <IconComponent className="w-4 h-4" />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Form */}
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Personal Information Tab */}
                        {activeTab === 'personal' && (
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                    <User className="w-6 h-6 text-yellow-400" />
                                    Información Personal
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-white font-semibold mb-2">Nombre Completo</label>
                                        <input
                                            type="text"
                                            name="nombre"
                                            value={profileData.nombre}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all"
                                            placeholder="Tu nombre completo"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-white font-semibold mb-2">Fecha de Nacimiento</label>
                                        <input
                                            type="date"
                                            name="fechaNacimiento"
                                            //value={profileData.fechaNacimiento}
                                            onChange={handleInputChange}
                                            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-white font-semibold mb-2">Profesión</label>
                                        <input
                                            type="text"
                                            name="profesion"
                                            //value={profileData.profesion}
                                            onChange={handleInputChange}
                                            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all"
                                            placeholder="¿A qué te dedicas?"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Contact Information Tab */}
                        {activeTab === 'contacto' && (
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                    <Mail className="w-6 h-6 text-yellow-400" />
                                    Información de Contacto
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-white font-semibold mb-2">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={profileData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all"
                                            placeholder="tu@email.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-white font-semibold mb-2">Teléfono</label>
                                        <input
                                            type="tel"
                                            name="telefono"
                                            //value={profileData.telefono}
                                            onChange={handleInputChange}
                                            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all"
                                            placeholder="+1 (555) 123-4567"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-white font-semibold mb-2">Dirección</label>
                                        <input
                                            type="text"
                                            name="direccion"
                                            //value={profileData.direccion}
                                            onChange={handleInputChange}
                                            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all"
                                            placeholder="123 Luxury Avenue"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-white font-semibold mb-2">Ciudad</label>
                                        <input
                                            type="text"
                                            name="ciudad"
                                            //value={profileData.ciudad}
                                            onChange={handleInputChange}
                                            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all"
                                            placeholder="Beverly Hills"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-white font-semibold mb-2">Código Postal</label>
                                        <input
                                            type="text"
                                            name="codigoPostal"
                                            //value={profileData.codigoPostal}
                                            onChange={handleInputChange}
                                            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all"
                                            placeholder="90210"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Preferences Tab */}
                        {activeTab === 'preferencias' && (
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                                    <Heart className="w-6 h-6 text-yellow-400" />
                                    Preferencias Automotrices
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-white font-semibold mb-2">Marca Favorita</label>
                                        <select
                                            name="marcaFavorita"
                                            //value={profileData.marcaFavorita}
                                            onChange={handleInputChange}
                                            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all"
                                        >
                                            <option value="">Selecciona una marca</option>
                                            {marcasFavoritas.map((marca) => (
                                                <option key={marca} value={marca}>{marca}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-white font-semibold mb-2">Intereses Automotrices</label>
                                        <textarea
                                            name="intereses"
                                            //value={profileData.intereses}
                                            onChange={handleInputChange}
                                            rows={4}
                                            className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 transition-all resize-none"
                                            placeholder="Cuéntanos sobre tus gustos automotrices, tipos de vehículos preferidos, características que más valoras, etc."
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-700">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 py-4 px-6 rounded-lg font-bold text-black bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin"></div>
                                        Guardando...
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        <Save className="w-5 h-5" />
                                        Guardar Cambios
                                    </span>
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={() => signOut()}
                                className="flex-1 sm:flex-none py-4 px-6 rounded-lg font-bold text-white bg-red-600 hover:bg-red-700 transition-all duration-300 transform hover:scale-105"
                            >
                                <span className="flex items-center justify-center gap-2">
                                    <LogOut className="w-5 h-5" />
                                    Cerrar Sesión
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}