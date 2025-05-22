'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Lock, User, Shield } from 'lucide-react'
import Image from 'next/image'

export default function LoginPage() {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setCredentials(prev => ({ ...prev, [name]: value }))
        setError('') // Limpiar errores al escribir
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            })

            const data = await res.json()

            if (res.ok) {
                // Guardar token en localStorage o cookies
                localStorage.setItem('authToken', data.token)
                router.push('/admin/dashboard')
            } else {
                setError(data.message || 'Credenciales inválidas')
            }
        } catch (error) {
            setError('Error de conexión. Intente nuevamente.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
            <div className="max-w-md w-full mx-auto p-8">
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 shadow-xl">
                    {/* Logo y título */}
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Shield className="text-black w-10 h-10" />
                        </div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                            Panel Administrativo
                        </h1>
                        <p className="text-gray-400 mt-2">Vehículos de Lujo</p>
                        <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mt-4"></div>
                    </div>

                    {/* Formulario */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Campo de email */}
                        <div className="relative">
                            <div className="flex items-center gap-3 bg-gray-700/50 rounded-xl px-4 py-3 border border-gray-600 focus-within:border-yellow-400 transition-colors group">
                                <span className="text-yellow-400 group-focus-within:text-yellow-300 transition-colors">
                                    <User size={20} />
                                </span>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email administrador"
                                    value={credentials.email}
                                    onChange={handleChange}
                                    required
                                    className="bg-transparent w-full outline-none text-white placeholder-gray-400"
                                />
                            </div>
                        </div>

                        {/* Campo de contraseña */}
                        <div className="relative">
                            <div className="flex items-center gap-3 bg-gray-700/50 rounded-xl px-4 py-3 border border-gray-600 focus-within:border-yellow-400 transition-colors group">
                                <span className="text-yellow-400 group-focus-within:text-yellow-300 transition-colors">
                                    <Lock size={20} />
                                </span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Contraseña"
                                    value={credentials.password}
                                    onChange={handleChange}
                                    required
                                    className="bg-transparent w-full outline-none text-white placeholder-gray-400"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Mensaje de error */}
                        {error && (
                            <div className="bg-red-900/30 border border-red-500 text-red-200 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        {/* Botón de acceso */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold py-3 rounded-xl hover:from-yellow-500 hover:to-yellow-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                        >
                            {loading ? 'Verificando...' : 'Acceder al Sistema'}
                        </button>

                        {/* Footer del formulario */}
                        <div className="text-center text-gray-500 text-sm mt-6">
                            <p>Acceso restringido solo para administradores</p>
                        </div>
                    </form>
                </div>

                {/* Decoración inferior */}
                <div className="mt-6 text-center">
                    <div className="flex justify-center space-x-3">
                        <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
                        <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse delay-100"></div>
                        <div className="w-2 h-2 rounded-full bg-yellow-300 animate-pulse delay-200"></div>
                    </div>
                </div>
            </div>
        </main>
    )
}