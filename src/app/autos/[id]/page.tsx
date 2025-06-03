'use client'

import { useParams } from 'next/navigation'
import Image from 'next/image'
import { useSession, signIn } from "next-auth/react";
import React, { useState, useEffect } from "react";






import {
    Car,
    Gauge,
    Fuel,
    Settings,
    Video,
    Camera,
    ChevronLeft,
    ChevronRight,
    X,
    Tag,
    Calendar,
    Phone,
    Mail,
    MapPin,
    Heart,
    Share2,
    Eye,
    Star,
    MessageCircle,
    Send,
    User,
    ThumbsUp,
    ThumbsDown,
    Flag,
    MoreVertical,
    Edit,
    Trash2,
    Reply
} from 'lucide-react'

interface Auto {
    _id: string
    marca: string
    modelo: string
    año: number
    precio: number
    descripcion: string
    categoria?: string
    potencia?: string
    caballosFuerza?: number
    cilindrada?: string
    tamanoMotor?: string
    transmision?: string
    tipoCombustible?: string
    imagenes?: string[]
    videos?: string[]
}

interface User {
    _id: string
    nombre: string
    email: string
    avatar?: string
}

interface Comment {
    _id: string
    autoId: string
    userId: string
    usuario: {
        nombre: string
        avatar?: string
    }
    contenido: string
    calificacion: number
    likes: number
    dislikes: number
    fechaCreacion: string
    fechaActualizacion?: string
    respuestas?: Comment[]
    parentId?: string
}

interface LoginModalProps {
    isOpen: boolean
    onClose: () => void
    onLogin: (user: User) => void
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
                const data = await response.json();

                // Si data NO tiene .user, entonces es el usuario directamente
                const userData = data.user ? data.user : data;

                // Normaliza el campo _id
                const userToSave = {
                    ...userData,
                    _id: userData._id || userData.id
                };

                if (typeof window !== 'undefined' && userToSave._id) {
                    sessionStorage.setItem('token', data.token || ''); // si no hay token, guarda string vacío
                    sessionStorage.setItem('user', JSON.stringify(userToSave));
                }

                onLogin(userToSave);
                onClose();
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
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 max-w-md w-full border border-gray-700 shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-white">
                        {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {error && (
                    <div className="bg-red-500/20 border border-red-500 text-red-400 p-3 rounded-lg mb-4">
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
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors"
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
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors"
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
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50"
                    >
                        {isLoading ? 'Procesando...' : (isLogin ? 'Iniciar Sesión' : 'Registrarse')}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-yellow-400 hover:text-yellow-300 transition-colors"
                    >
                        {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default function DetalleAutoPage() {
    const { id } = useParams()
    const [auto, setAuto] = useState<Auto | null>(null)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
    const [isImageModalOpen, setIsImageModalOpen] = useState(false)
    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
    const [modalImageIndex, setModalImageIndex] = useState(0)
    const [modalVideoIndex, setModalVideoIndex] = useState(0)
    const [isMobile, setIsMobile] = useState(false)
    const [isFavorite, setIsFavorite] = useState(false)
    const [viewCount, setViewCount] = useState(847)

    // Estados para comentarios y autenticación
    const { data: session, status } = useSession();
    const [comments, setComments] = useState<Comment[]>([])
    const [newComment, setNewComment] = useState('')
    const [newRating, setNewRating] = useState(5)
    const [isSubmittingComment, setIsSubmittingComment] = useState(false)
    const [replyingTo, setReplyingTo] = useState<string | null>(null)
    const [replyContent, setReplyContent] = useState('')

    // CAMBIO: Agregar estado para controlar si el componente está montado
    const [isMounted, setIsMounted] = useState(false)
    const [user, setUser] = useState<User | null>(null);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    useEffect(() => {
        const fetchAuto = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/autos/${id}`)
            const data = await res.json()
            setAuto(data)
        }
        fetchAuto()
    }, [id])

    // CAMBIO: Nuevo useEffect para manejar la verificación del usuario
    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const checkUserAuth = () => {
            if (typeof window !== 'undefined') {

                const token = sessionStorage.getItem('token') || localStorage.getItem('token')
                console.log('Token obtenido:', token)
                if (!token) {
                    console.log('No hay token, no se puede enviar comentario')
                    return
                }


                const userData = sessionStorage.getItem('user') || localStorage.getItem('user');

                if (token && userData) {
                    try {
                        const parsedUser = JSON.parse(userData);
                        setUser(parsedUser);
                        console.log('Usuario autenticado:', parsedUser); // Para debug
                    } catch (error) {
                        console.error('Error al parsear datos del usuario:', error);
                        // Limpiar datos corruptos
                        sessionStorage.removeItem('token');
                        sessionStorage.removeItem('user');
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                        setUser(null);
                    }
                } else {
                    setUser(null);
                }
            }
        };

        checkUserAuth();

        // CAMBIO: Escuchar cambios en sessionStorage/localStorage
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'user' || e.key === 'token') {
                checkUserAuth();
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    useEffect(() => {
        // Cargar comentarios
        const fetchComments = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comentarios/${id}`)
                if (response.ok) {
                    const data = await response.json()
                    setComments(data)
                }
            } catch (error) {
                console.error('Error al cargar comentarios:', error)
            }
        }

        if (id) {
            fetchComments()
        }
    }, [id])

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkIfMobile()
        window.addEventListener('resize', checkIfMobile)
        return () => window.removeEventListener('resize', checkIfMobile)
    }, [])

    const handleLogin = (userData: User) => {
        setUser(userData)
        setIsMounted(true)
        // Forzar recarga de usuario desde storage
        if (typeof window !== 'undefined') {
            const userData = sessionStorage.getItem('user') || localStorage.getItem('user');
            if (userData) {
                try {
                    setUser(JSON.parse(userData));
                } catch (e) {
                    setUser(userData as any);
                }
            }
        }
    }

    const handleLogout = () => {
        if (typeof window !== 'undefined') {
            sessionStorage.removeItem('token')
            sessionStorage.removeItem('user')
            localStorage.removeItem('token')
            localStorage.removeItem('user')
        }
        setUser(null)
    }

    const handleSubmitComment = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log('handleSubmitComment disparado');

        if (!user) {
            console.log('No hay usuario autenticado, se cancela submit')
            return
        }
        if (!newComment.trim()) {
            console.log('Comentario vacío, se cancela submit')
            return
        }
        if (!id) {
            console.log('ID de auto no definido')
            return
        }
        if (!user._id) {
            console.log('El usuario no tiene _id')
            return
        }

        setIsSubmittingComment(true)
        try {
            const token = sessionStorage.getItem('token') || localStorage.getItem('token')
            console.log('Token obtenido:', token)
            console.log('Datos enviados:', {
                autoId: id,
                usuarioId: user._id,
                contenido: newComment,
                calificacion: newRating
            });

            const response = await fetch('https://grovecustom-backend.onrender.com/api/comentarios', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    autoId: id,
                    usuarioId: user._id,
                    contenido: newComment,
                    calificacion: newRating
                })
            });

            console.log('Respuesta del servidor:', response.status)

            if (response.ok) {
                const newCommentData = await response.json()
                console.log('Comentario creado:', newCommentData)

                setComments([newCommentData, ...comments])
                setNewComment('')
                setNewRating(5)
            } else {
                const errorText = await response.text()
                console.error('Error al publicar comentario:', response.status, errorText)
                if (response.status === 401) {
                    console.log('Token expirado, cerrando sesión')
                    handleLogout()
                    setIsLoginModalOpen(true)
                }
            }

        } catch (error) {
            console.error('Error al enviar comentario:', error)
        } finally {
            setIsSubmittingComment(false)
        }
    }


    const handleSubmitReply = async (parentId: string) => {
        if (!user || !replyContent.trim()) return

        try {
            const token = sessionStorage.getItem('token') || localStorage.getItem('token')
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comentarios`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    autoId: id,
                    contenido: replyContent,
                    parentId: parentId
                })
            })

            if (response.ok) {
                const replyData = await response.json()
                // Actualizar los comentarios para incluir la respuesta
                setComments(comments.map(comment =>
                    comment._id === parentId
                        ? { ...comment, respuestas: [...(comment.respuestas || []), replyData] }
                        : comment
                ))
                setReplyContent('')
                setReplyingTo(null)
            } else {
                // CAMBIO: Manejar errores de autenticación
                if (response.status === 401) {
                    console.log('Token expirado, cerrando sesión')
                    handleLogout()
                    setIsLoginModalOpen(true)
                }
            }
        } catch (error) {
            console.error('Error al enviar respuesta:', error)
        }
    }

    const handleLikeComment = async (commentId: string, isLike: boolean) => {
        if (!user) return

        try {
            const token = sessionStorage.getItem('token') || localStorage.getItem('token')
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comentarios/${commentId}/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ isLike })
            })

            if (response.ok) {
                const updatedComment = await response.json()
                setComments(comments.map(comment =>
                    comment._id === commentId ? updatedComment : comment
                ))
            } else {
                // CAMBIO: Manejar errores de autenticación
                if (response.status === 401) {
                    console.log('Token expirado, cerrando sesión')
                    handleLogout()
                    setIsLoginModalOpen(true)
                }
            }
        } catch (error) {
            console.error('Error al dar like/dislike:', error)
        }
    }

    // Funciones existentes para el slider de imágenes
    const nextImage = () => {
        if (auto?.imagenes) {
            setCurrentImageIndex((prev) =>
                prev === auto.imagenes!.length - 1 ? 0 : prev + 1
            )
        }
    }

    const prevImage = () => {
        if (auto?.imagenes) {
            setCurrentImageIndex((prev) =>
                prev === 0 ? auto.imagenes!.length - 1 : prev - 1
            )
        }
    }

    // Funciones existentes para el slider de videos
    const nextVideo = () => {
        if (auto?.videos) {
            setCurrentVideoIndex((prev) =>
                prev === auto.videos!.length - 1 ? 0 : prev + 1
            )
        }
    }

    const prevVideo = () => {
        if (auto?.videos) {
            setCurrentVideoIndex((prev) =>
                prev === 0 ? auto.videos!.length - 1 : prev - 1
            )
        }
    }

    // Funciones existentes para modal
    const openImageModal = (index: number) => {
        if (!isMobile) {
            setModalImageIndex(index)
            setIsImageModalOpen(true)
        }
    }

    const openVideoModal = (index: number) => {
        if (!isMobile) {
            setModalVideoIndex(index)
            setIsVideoModalOpen(true)
        }
    }

    const closeModals = () => {
        setIsImageModalOpen(false)
        setIsVideoModalOpen(false)
    }

    // Función existente para obtener el color de la categoría
    const getCategoryColor = (categoria: string) => {
        const colors = {
            'SUV': 'bg-gradient-to-r from-blue-500 to-blue-600',
            'Sedán': 'bg-gradient-to-r from-green-500 to-green-600',
            'Sedan': 'bg-gradient-to-r from-green-500 to-green-600',
            'Hatchback': 'bg-gradient-to-r from-purple-500 to-purple-600',
            'Coupé': 'bg-gradient-to-r from-red-500 to-red-600',
            'Coupe': 'bg-gradient-to-r from-red-500 to-red-600',
            'Convertible': 'bg-gradient-to-r from-yellow-500 to-yellow-600',
            'Deportivo': 'bg-gradient-to-r from-orange-500 to-orange-600',
            'Pickup': 'bg-gradient-to-r from-gray-600 to-gray-700',
            'Camioneta': 'bg-gradient-to-r from-gray-600 to-gray-700',
            'Van': 'bg-gradient-to-r from-indigo-500 to-indigo-600',
            'Minivan': 'bg-gradient-to-r from-indigo-500 to-indigo-600',
            'Crossover': 'bg-gradient-to-r from-teal-500 to-teal-600',
            'Wagon': 'bg-gradient-to-r from-pink-500 to-pink-600',
            'Eléctrico': 'bg-gradient-to-r from-emerald-500 to-emerald-600',
            'Híbrido': 'bg-gradient-to-r from-lime-500 to-lime-600'
        }
        return colors[categoria as keyof typeof colors] || 'bg-gradient-to-r from-gray-500 to-gray-600'
    }

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${auto?.marca} ${auto?.modelo} ${auto?.año}`,
                    text: `Mira este increíble ${auto?.marca} ${auto?.modelo} por $${auto?.precio.toLocaleString()}`,
                    url: window.location.href,
                })
            } catch (err) {
                console.log('Error sharing:', err)
            }
        } else {
            navigator.clipboard.writeText(window.location.href)
            alert('Enlace copiado al portapapeles')
        }
    }

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite)
    }

    // Navegación del modal
    const nextModalImage = () => {
        if (auto?.imagenes) {
            setModalImageIndex((prev) =>
                prev === auto.imagenes!.length - 1 ? 0 : prev + 1
            )
        }
    }

    const prevModalImage = () => {
        if (auto?.imagenes) {
            setModalImageIndex((prev) =>
                prev === 0 ? auto.imagenes!.length - 1 : prev - 1
            )
        }
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const getAverageRating = () => {
        if (comments.length === 0) return 0
        const ratingsOnly = comments.filter(comment => comment.calificacion && !comment.parentId)
        if (ratingsOnly.length === 0) return 0
        const sum = ratingsOnly.reduce((acc, comment) => acc + comment.calificacion, 0)
        return (sum / ratingsOnly.length).toFixed(1)
    }

    // CAMBIO: Evitar renderizar hasta que el componente esté montado
    if (!isMounted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-32 w-32 border-4 border-yellow-500 border-t-transparent"></div>
                    <p className="text-white text-xl font-semibold mt-6">Cargando...</p>
                </div>
            </div>
        )
    }

    if (!auto)
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-32 w-32 border-4 border-yellow-500 border-t-transparent"></div>
                    <p className="text-white text-xl font-semibold mt-6">Cargando vehículo...</p>
                    <p className="text-gray-400 text-sm mt-2">Por favor espera un momento</p>
                </div>
            </div>
        )

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-white space-y-10">
                {/* Header con información principal mejorado */}
                <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 mb-8 shadow-2xl border border-gray-700 overflow-hidden animate-fade-in-down">
                    {/* Patrón de fondo decorativo */}
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 to-transparent"></div>

                    {/* Barra de usuario */}
                    <div className="absolute top-6 right-6 flex items-center gap-3">
                        {user ? (
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-600">
                                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center">
                                        <User size={16} className="text-white" />
                                    </div>
                                    <span className="text-white font-medium">{user.nombre}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="text-gray-400 hover:text-red-400 transition-colors text-sm"
                                >
                                    Salir
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsLoginModalOpen(true)}
                                className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold px-6 py-2 rounded-full transition-all duration-300"
                            >
                                Iniciar Sesión
                            </button>
                        )}

                        <button
                            onClick={toggleFavorite}
                            className={`p-3 rounded-full backdrop-blur-sm border transition-all duration-300 ${isFavorite
                                ? 'bg-red-500/20 border-red-500 text-red-400'
                                : 'bg-gray-800/50 border-gray-600 text-gray-400 hover:text-red-400 hover:border-red-500'
                                }`}
                        >
                            <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
                        </button>
                        <button
                            onClick={handleShare}
                            className="p-3 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-600 text-gray-400 hover:text-blue-400 hover:border-blue-500 transition-all duration-300"
                        >
                            <Share2 size={20} />
                        </button>
                    </div>

                    {/* Estadísticas de visualización mejoradas */}
                    <div className="flex items-center gap-2 mb-4 text-sm text-gray-400">
                        <Eye size={16} />
                        <span>{viewCount.toLocaleString()} visualizaciones</span>
                        <div className="flex items-center gap-1 ml-4">
                            <Star size={16} className="text-yellow-500" fill="currentColor" />
                            <span>{getAverageRating()} ({comments.filter(c => c.calificacion && !c.parentId).length} reseñas)</span>
                        </div>
                    </div>

                    {/* Resto del contenido existente del header */}
                    {auto.categoria && (
                        <div className="mb-6">
                            <span className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-bold text-sm ${getCategoryColor(auto.categoria)} shadow-lg transform hover:scale-105 transition-all duration-300`}>
                                <Tag size={18} />
                                {auto.categoria}
                            </span>
                        </div>
                    )}

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 mb-4 tracking-tight leading-tight">
                        {auto.marca} {auto.modelo}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        <p className="text-xl text-gray-300 bg-gray-800/50 px-4 py-2 rounded-full">
                            Año: <span className="font-bold text-white">{auto.año}</span>
                        </p>
                        <p className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-500">
                            ${auto.precio.toLocaleString()}
                        </p>
                    </div>

                    <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700 mb-8">
                        <p className="text-gray-300 text-lg leading-relaxed">
                            {auto.descripcion}
                        </p>
                    </div>

                    {/* Botones de acción mejorados */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 text-white font-bold py-4 px-8 rounded-full text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 min-w-64 group"
                            onClick={() => window.location.href = `/autos/AgendaCita/${auto._id}`}
                        >
                            <Calendar size={24} className="group-hover:animate-bounce" />
                            Agendar Cita
                        </button>


                    </div>
                </div>

                {/* Sección de imágenes mejorada */}
                {auto.imagenes && auto.imagenes.length > 0 && (
                    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-700 animate-fade-in-up">
                        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                            <Camera size={32} className="text-yellow-500" />
                            Galería de Imágenes
                            <span className="text-sm text-gray-400 bg-gray-800 px-3 py-1 rounded-full">
                                {auto.imagenes.length} fotos
                            </span>
                        </h2>
                        <div className="relative group">
                            <div className="aspect-video bg-gray-800 rounded-xl overflow-hidden mb-4 shadow-xl">
                                <Image
                                    src={auto.imagenes[currentImageIndex]}
                                    alt={`${auto.marca} ${auto.modelo} - Imagen ${currentImageIndex + 1}`}
                                    width={800}
                                    height={600}
                                    className="w-full h-full object-cover cursor-pointer transition-transform duration-500 group-hover:scale-105"
                                    onClick={() => openImageModal(currentImageIndex)}
                                />
                                {auto.imagenes.length > 1 && (
                                    <>
                                        <button
                                            onClick={prevImage}
                                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/70 transition-all duration-300 opacity-0 group-hover:opacity-100"
                                        >
                                            <ChevronLeft size={24} />
                                        </button>
                                        <button
                                            onClick={nextImage}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/70 transition-all duration-300 opacity-0 group-hover:opacity-100"
                                        >
                                            <ChevronRight size={24} />
                                        </button>
                                    </>
                                )}
                            </div>
                            {auto.imagenes.length > 1 && (
                                <div className="flex gap-2 overflow-x-auto pb-2">
                                    {auto.imagenes.map((imagen, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentImageIndex(index)}
                                            className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${index === currentImageIndex
                                                ? 'border-yellow-500 scale-105'
                                                : 'border-gray-600 hover:border-gray-500'
                                                }`}
                                        >
                                            <Image
                                                src={imagen}
                                                alt={`Miniatura ${index + 1}`}
                                                width={80}
                                                height={64}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Sección de videos mejorada */}
                {auto.videos && auto.videos.length > 0 && (
                    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-700 animate-fade-in-up">
                        <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                            <Video size={32} className="text-yellow-500" />
                            Videos
                            <span className="text-sm text-gray-400 bg-gray-800 px-3 py-1 rounded-full">
                                {auto.videos.length} videos
                            </span>
                        </h2>
                        <div className="relative group">
                            <div className="aspect-video bg-gray-800 rounded-xl overflow-hidden mb-4 shadow-xl">
                                <video
                                    src={auto.videos[currentVideoIndex]}
                                    controls
                                    className="w-full h-full object-cover cursor-pointer"
                                    onClick={() => openVideoModal(currentVideoIndex)}
                                />
                                {auto.videos.length > 1 && (
                                    <>
                                        <button
                                            onClick={prevVideo}
                                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/70 transition-all duration-300 opacity-0 group-hover:opacity-100"
                                        >
                                            <ChevronLeft size={24} />
                                        </button>
                                        <button
                                            onClick={nextVideo}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/70 transition-all duration-300 opacity-0 group-hover:opacity-100"
                                        >
                                            <ChevronRight size={24} />
                                        </button>
                                    </>
                                )}
                            </div>
                            {auto.videos.length > 1 && (
                                <div className="flex gap-2 overflow-x-auto pb-2">
                                    {auto.videos.map((video, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentVideoIndex(index)}
                                            className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 relative ${index === currentVideoIndex
                                                ? 'border-yellow-500 scale-105'
                                                : 'border-gray-600 hover:border-gray-500'
                                                }`}
                                        >
                                            <video
                                                src={video}
                                                className="w-full h-full object-cover"
                                                muted
                                            />
                                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                                <Video size={16} className="text-white" />
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Especificaciones técnicas mejoradas */}
                <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-700 animate-fade-in-up">
                    <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                        <Settings size={32} className="text-yellow-500" />
                        Especificaciones Técnicas
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {auto.potencia && (
                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-yellow-500 transition-all duration-300 hover:shadow-lg">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 bg-gradient-to-r from-red-500 to-red-600 rounded-lg">
                                        <Gauge size={24} className="text-white" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-white">Potencia</h3>
                                </div>
                                <p className="text-2xl font-bold text-yellow-400">{auto.potencia}</p>
                            </div>
                        )}
                        {auto.caballosFuerza && (
                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-yellow-500 transition-all duration-300 hover:shadow-lg">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg">
                                        <Car size={24} className="text-white" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-white">Caballos de Fuerza</h3>
                                </div>
                                <p className="text-2xl font-bold text-yellow-400">{auto.caballosFuerza} HP</p>
                            </div>
                        )}
                        {auto.cilindrada && (
                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-yellow-500 transition-all duration-300 hover:shadow-lg">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg">
                                        <Settings size={24} className="text-white" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-white">Cilindrada</h3>
                                </div>
                                <p className="text-2xl font-bold text-yellow-400">{auto.cilindrada}</p>
                            </div>
                        )}
                        {auto.tamanoMotor && (
                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-yellow-500 transition-all duration-300 hover:shadow-lg">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                                        <Settings size={24} className="text-white" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-white">Tamaño del Motor</h3>
                                </div>
                                <p className="text-2xl font-bold text-yellow-400">{auto.tamanoMotor}</p>
                            </div>
                        )}
                        {auto.transmision && (
                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-yellow-500 transition-all duration-300 hover:shadow-lg">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg">
                                        <Settings size={24} className="text-white" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-white">Transmisión</h3>
                                </div>
                                <p className="text-2xl font-bold text-yellow-400">{auto.transmision}</p>
                            </div>
                        )}
                        {auto.tipoCombustible && (
                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-yellow-500 transition-all duration-300 hover:shadow-lg">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="p-2 bg-gradient-to-r from-green-500 to-green-600 rounded-lg">
                                        <Fuel size={24} className="text-white" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-white">Combustible</h3>
                                </div>
                                <p className="text-2xl font-bold text-yellow-400">{auto.tipoCombustible}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sección de comentarios y reseñas */}
                <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-700 animate-fade-in-up">
                    <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                        <MessageCircle size={32} className="text-yellow-500" />
                        Comentarios y Reseñas
                        <span className="text-sm text-gray-400 bg-gray-800 px-3 py-1 rounded-full">
                            {comments.length} comentarios
                        </span>
                    </h2>

                    {/* Formulario para nuevo comentario */}
                    {status === "loading" ? (
                        <div className="text-center text-gray-400">Cargando...</div>
                    ) : user ? (
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 mb-8">
                            <h3 className="text-xl font-semibold text-white mb-4">Escribe una reseña</h3>
                            <form onSubmit={handleSubmitComment} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Calificación
                                    </label>
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4, 5].map((rating) => (
                                            <button
                                                key={rating}
                                                type="button"
                                                onClick={() => setNewRating(rating)}
                                                className={`p-1 transition-colors ${rating <= newRating ? 'text-yellow-500' : 'text-gray-600'
                                                    }`}
                                            >
                                                <Star size={24} fill={rating <= newRating ? 'currentColor' : 'none'} />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Comentario
                                    </label>
                                    <textarea
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder="Comparte tu experiencia con este vehículo..."
                                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors resize-none"
                                        rows={4}
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmittingComment || !newComment.trim()}
                                    className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50"
                                >
                                    {isSubmittingComment ? 'Publicando...' : 'Publicar Comentario'}
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 mb-8 text-center">
                            <p className="text-gray-300 mb-4">Inicia sesión para escribir una reseña</p>
                            <button
                                onClick={() => setIsLoginModalOpen(true)} // <-- Cambia esto
                                className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold py-3 px-6 rounded-lg transition-all duration-300"
                            >
                                Iniciar Sesión
                            </button>
                        </div>
                    )}

                    {/* Lista de comentarios */}
                    <div className="space-y-6">
                        {comments.map((comment) => (
                            <div key={comment._id} className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center">
                                            <User size={20} className="text-white" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-white">{comment.usuario.nombre}</h4>
                                            <p className="text-sm text-gray-400">{formatDate(comment.fechaCreacion)}</p>
                                        </div>
                                    </div>
                                    {comment.calificacion && (
                                        <div className="flex items-center gap-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star
                                                    key={star}
                                                    size={16}
                                                    className={star <= comment.calificacion ? 'text-yellow-500' : 'text-gray-600'}
                                                    fill={star <= comment.calificacion ? 'currentColor' : 'none'}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <p className="text-gray-300 mb-4">{comment.contenido}</p>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => handleLikeComment(comment._id, true)}
                                        className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors"
                                        disabled={!user}
                                    >
                                        <ThumbsUp size={16} />
                                        <span>{comment.likes || 0}</span>
                                    </button>
                                    <button
                                        onClick={() => handleLikeComment(comment._id, false)}
                                        className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors"
                                        disabled={!user}
                                    >
                                        <ThumbsDown size={16} />
                                        <span>{comment.dislikes || 0}</span>
                                    </button>
                                    <button
                                        onClick={() => setReplyingTo(replyingTo === comment._id ? null : comment._id)}
                                        className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors"
                                        disabled={!user}
                                    >
                                        <Reply size={16} />
                                        Responder
                                    </button>
                                </div>

                                {/* Formulario de respuesta */}
                                {replyingTo === comment._id && user && (
                                    <div className="mt-4 ml-4 border-l-2 border-gray-700 pl-4">
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={replyContent}
                                                onChange={(e) => setReplyContent(e.target.value)}
                                                placeholder="Escribe tu respuesta..."
                                                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors"
                                            />
                                            <button
                                                onClick={() => handleSubmitReply(comment._id)}
                                                disabled={!replyContent.trim()}
                                                className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold py-2 px-4 rounded-lg transition-all duration-300 disabled:opacity-50"
                                            >
                                                <Send size={16} />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Respuestas */}
                                {comment.respuestas && comment.respuestas.length > 0 && (
                                    <div className="mt-4 ml-4 border-l-2 border-gray-700 pl-4 space-y-4">
                                        {comment.respuestas.map((reply) => (
                                            <div key={reply._id} className="bg-gray-800/20 rounded-lg p-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className="w-6 h-6 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center">
                                                        <User size={12} className="text-white" />
                                                    </div>
                                                    <h5 className="font-medium text-white text-sm">{reply.usuario.nombre}</h5>
                                                    <span className="text-xs text-gray-400">{formatDate(reply.fechaCreacion)}</span>
                                                </div>
                                                <p className="text-gray-300 text-sm">{reply.contenido}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Modal de Login */}
            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
                onLogin={handleLogin}
            />

            {/* Modal de imagen */}
            {isImageModalOpen && auto?.imagenes && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="relative max-w-6xl max-h-full">
                        <button
                            onClick={closeModals}
                            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black/50 backdrop-blur-sm rounded-full p-2"
                        >
                            <X size={24} />
                        </button>
                        <div className="relative">
                            <Image
                                src={auto.imagenes[modalImageIndex]}
                                alt={`${auto.marca} ${auto.modelo} - Imagen ${modalImageIndex + 1}`}
                                width={1200}
                                height={800}
                                className="max-w-full max-h-[90vh] object-contain rounded-lg"
                            />
                            {auto.imagenes.length > 1 && (
                                <>
                                    <button
                                        onClick={prevModalImage}
                                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/70 transition-all duration-300"
                                    >
                                        <ChevronLeft size={24} />
                                    </button>
                                    <button
                                        onClick={nextModalImage}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/70 transition-all duration-300"
                                    >
                                        <ChevronRight size={24} />
                                    </button>
                                </>
                            )}
                        </div>
                        <div className="text-center mt-4">
                            <p className="text-white text-lg">
                                {modalImageIndex + 1} de {auto.imagenes.length}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de video */}
            {isVideoModalOpen && auto?.videos && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="relative max-w-6xl max-h-full">
                        <button
                            onClick={closeModals}
                            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black/50 backdrop-blur-sm rounded-full p-2"
                        >
                            <X size={24} />
                        </button>
                        <video
                            src={auto.videos[modalVideoIndex]}
                            controls
                            className="max-w-full max-h-[90vh] rounded-lg"
                            autoPlay
                        />
                        <div className="text-center mt-4">
                            <p className="text-white text-lg">
                                Video {modalVideoIndex + 1} de {auto.videos.length}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}