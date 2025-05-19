'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Camera, Video, Car, Gauge, Fuel, Settings, Ruler, Tag, Star, Award, Crown, Zap } from 'lucide-react'

// Categorías de vehículos de lujo predefinidas
const categorias = [
    { value: 'supercar', label: 'Supercar', icon: <Zap className="text-red-500" /> },
    { value: 'hypercar', label: 'Hypercar', icon: <Crown className="text-purple-500" /> },
    { value: 'luxury-sedan', label: 'Sedán de Lujo', icon: <Star className="text-blue-500" /> },
    { value: 'luxury-suv', label: 'SUV de Lujo', icon: <Award className="text-green-500" /> },
    { value: 'convertible', label: 'Convertible', icon: <Car className="text-yellow-500" /> },
    { value: 'coupe-gran-turismo', label: 'Coupé Gran Turismo', icon: <Gauge className="text-orange-500" /> },
    { value: 'deportivo-clasico', label: 'Deportivo Clásico', icon: <Settings className="text-indigo-500" /> }
]

export default function NuevoAutoPage() {
    const [auto, setAuto] = useState({
        marca: '',
        modelo: '',
        año: '',
        precio: '',
        descripcion: '',
        potencia: '',
        caballosFuerza: '',
        cilindrada: '',
        tamanoMotor: '',
        transmision: '',
        tipoCombustible: '',
        categoria: '',
        imagenes: [] as string[],
        videos: [] as string[]
    })

    const [loading, setLoading] = useState(false)
    const [uploadingMedia, setUploadingMedia] = useState(false)
    const router = useRouter()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setAuto(prev => ({ ...prev, [name]: value }))
    }

    const handleUpload = async (file: File, type: 'image' | 'video') => {
        setUploadingMedia(true)
        try {
            const formData = new FormData()
            formData.append('file', file)
            formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!)
            const resourceType = type === 'video' ? 'video' : 'image'

            const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`, {
                method: 'POST',
                body: formData,
            })

            const data = await res.json()
            if (type === 'image') {
                setAuto(prev => ({ ...prev, imagenes: [...prev.imagenes, data.secure_url] }))
            } else {
                setAuto(prev => ({ ...prev, videos: [...prev.videos, data.secure_url] }))
            }
        } catch (error) {
            alert('Error al subir archivo')
        } finally {
            setUploadingMedia(false)
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
        const files = Array.from(e.target.files || [])
        files.forEach(file => handleUpload(file, type))
    }

    const removeImage = (index: number) => {
        setAuto(prev => ({
            ...prev,
            imagenes: prev.imagenes.filter((_, i) => i !== index)
        }))
    }

    const removeVideo = (index: number) => {
        setAuto(prev => ({
            ...prev,
            videos: prev.videos.filter((_, i) => i !== index)
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch('http://localhost:5000/api/autos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...auto,
                    año: parseInt(auto.año),
                    precio: parseFloat(auto.precio),
                    caballosFuerza: parseInt(auto.caballosFuerza),
                }),
            })

            if (res.ok) {
                router.push('/autos')
            } else {
                alert('Error al crear auto')
            }
        } catch (error) {
            alert('Error de conexión')
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
            <div className="max-w-6xl mx-auto px-6 py-12">
                {/* Header mejorado */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-4">
                        Agregar Vehículo de Lujo
                    </h1>
                    <p className="text-gray-400 text-lg">Registra tu vehículo exclusivo en nuestra colección</p>
                    <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mt-4"></div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Grid de información básica */}
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
                        <h2 className="text-2xl font-semibold text-yellow-400 mb-6 flex items-center gap-3">
                            <Car className="text-yellow-400" />
                            Información Básica
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <InputWithIcon icon={<Car />} name="marca" placeholder="Marca (ej: Ferrari, Lamborghini)" value={auto.marca} onChange={handleChange} required />
                            <InputWithIcon icon={<Car />} name="modelo" placeholder="Modelo" value={auto.modelo} onChange={handleChange} required />
                            <InputWithIcon icon={<Gauge />} name="año" placeholder="Año" type="number" value={auto.año} onChange={handleChange} required />
                            <div className="relative">
                                <div className="flex items-center gap-2 bg-gray-700/50 rounded-xl px-4 py-3 border border-gray-600 focus-within:border-yellow-400 transition-colors">
                                    <Fuel className="text-yellow-400" />
                                    <span className="text-gray-400">$</span>
                                    <input
                                        name="precio"
                                        placeholder="Precio"
                                        type="number"
                                        value={auto.precio}
                                        onChange={handleChange}
                                        required
                                        className="bg-transparent w-full outline-none text-white placeholder-gray-400"
                                    />
                                </div>
                            </div>

                            {/* Selector de categoría mejorado */}
                            <div className="md:col-span-2">
                                <div className="flex items-center gap-2 bg-gray-700/50 rounded-xl px-4 py-3 border border-gray-600 focus-within:border-yellow-400 transition-colors">
                                    <Tag className="text-yellow-400" />
                                    <select
                                        name="categoria"
                                        value={auto.categoria}
                                        onChange={handleChange}
                                        required
                                        className="bg-transparent w-full outline-none text-white cursor-pointer"
                                    >
                                        <option value="" className="bg-gray-800">Seleccionar categoría</option>
                                        {categorias.map((cat) => (
                                            <option key={cat.value} value={cat.value} className="bg-gray-800 py-2">
                                                {cat.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {auto.categoria && (
                                    <div className="mt-3 flex items-center gap-2 text-sm text-gray-400">
                                        {categorias.find(cat => cat.value === auto.categoria)?.icon}
                                        <span>Categoría: {categorias.find(cat => cat.value === auto.categoria)?.label}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Especificaciones técnicas */}
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
                        <h2 className="text-2xl font-semibold text-yellow-400 mb-6 flex items-center gap-3">
                            <Settings className="text-yellow-400" />
                            Especificaciones Técnicas
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <InputWithIcon icon={<Gauge />} name="potencia" placeholder="Potencia (ej: 150 HP)" value={auto.potencia} onChange={handleChange} />
                            <InputWithIcon icon={<Zap />} name="caballosFuerza" placeholder="Caballos de fuerza" type="number" value={auto.caballosFuerza} onChange={handleChange} />
                            <InputWithIcon icon={<Settings />} name="cilindrada" placeholder="Cilindrada (ej: 2.0L)" value={auto.cilindrada} onChange={handleChange} />
                            <InputWithIcon icon={<Ruler />} name="tamanoMotor" placeholder="Tamaño del motor" value={auto.tamanoMotor} onChange={handleChange} />
                            <InputWithIcon icon={<Settings />} name="transmision" placeholder="Transmisión" value={auto.transmision} onChange={handleChange} />
                            <InputWithIcon icon={<Fuel />} name="tipoCombustible" placeholder="Tipo de combustible" value={auto.tipoCombustible} onChange={handleChange} />
                        </div>
                    </div>

                    {/* Descripción */}
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
                        <h2 className="text-2xl font-semibold text-yellow-400 mb-6">Descripción</h2>
                        <textarea
                            name="descripcion"
                            placeholder="Describe las características especiales, historia y detalles únicos de este vehículo..."
                            onChange={handleChange}
                            required
                            rows={5}
                            className="w-full bg-gray-700/50 rounded-xl p-4 border border-gray-600 focus:border-yellow-400 outline-none text-white placeholder-gray-400 resize-none transition-colors"
                        />
                    </div>

                    {/* Media Upload */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Imágenes */}
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
                            <label className="block mb-6">
                                <h3 className="text-xl font-semibold text-yellow-400 flex items-center gap-3 mb-4">
                                    <Camera className="text-yellow-400" />
                                    Galería de Imágenes
                                </h3>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={(e) => handleFileChange(e, 'image')}
                                    className="w-full text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-yellow-400 file:text-black file:font-medium hover:file:bg-yellow-500 cursor-pointer"
                                />
                            </label>
                            {uploadingMedia && <p className="text-yellow-400 mb-4">Subiendo imagen...</p>}
                            <div className="grid grid-cols-2 gap-4">
                                {auto.imagenes.map((img, i) => (
                                    <div key={i} className="relative group">
                                        <Image src={img} alt={`Imagen ${i + 1}`} width={200} height={120} className="rounded-lg shadow-lg w-full h-32 object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(i)}
                                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Videos */}
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
                            <label className="block mb-6">
                                <h3 className="text-xl font-semibold text-yellow-400 flex items-center gap-3 mb-4">
                                    <Video className="text-yellow-400" />
                                    Videos del Vehículo
                                </h3>
                                <input
                                    type="file"
                                    accept="video/*"
                                    multiple
                                    onChange={(e) => handleFileChange(e, 'video')}
                                    className="w-full text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-yellow-400 file:text-black file:font-medium hover:file:bg-yellow-500 cursor-pointer"
                                />
                            </label>
                            {uploadingMedia && <p className="text-yellow-400 mb-4">Subiendo video...</p>}
                            <div className="space-y-4">
                                {auto.videos.map((vid, i) => (
                                    <div key={i} className="relative group">
                                        <video src={vid} controls className="rounded-lg w-full h-40 object-cover shadow-lg" />
                                        <button
                                            type="button"
                                            onClick={() => removeVideo(i)}
                                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Botón de envío */}
                    <div className="text-center pt-8">
                        <button
                            type="submit"
                            disabled={loading || uploadingMedia}
                            className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold px-12 py-4 rounded-xl hover:from-yellow-500 hover:to-yellow-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg text-lg"
                        >
                            {loading ? 'Guardando...' : 'Registrar Vehículo de Lujo'}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    )
}

// Componente reutilizable con ícono mejorado
function InputWithIcon({
    icon,
    ...props
}: {
    icon: React.ReactNode
} & React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <div className="flex items-center gap-3 bg-gray-700/50 rounded-xl px-4 py-3 border border-gray-600 focus-within:border-yellow-400 transition-colors group">
            <span className="text-yellow-400 group-focus-within:text-yellow-300 transition-colors">
                {icon}
            </span>
            <input
                {...props}
                className="bg-transparent w-full outline-none text-white placeholder-gray-400"
            />
        </div>
    )
}