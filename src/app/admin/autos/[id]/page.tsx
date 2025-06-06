"use client"

import type React from "react"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
    Camera,
    Video,
    Car,
    Gauge,
    Settings,
    Tag,
    Zap,
    Crown,
    Star,
    Award,
    ArrowLeft,
    Save,
    Upload,
    X,
    Info,
    Palette,
    Bolt,
    Calendar,
    DollarSign,
    Fuel,
    Cog,
    Clock,
    CheckCircle,
    AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"

const categorias = [
    { value: "supercar", label: "Supercar", icon: <Zap className="text-red-400" />, color: "from-red-400 to-red-600" },
    { value: "hypercar", label: "Hypercar", icon: <Crown className="text-purple-400" />, color: "from-purple-400 to-purple-600" },
    { value: "luxury-sedan", label: "Sedán de Lujo", icon: <Star className="text-blue-400" />, color: "from-blue-400 to-blue-600" },
    { value: "luxury-suv", label: "SUV de Lujo", icon: <Award className="text-green-400" />, color: "from-green-400 to-green-600" },
    { value: "convertible", label: "Convertible", icon: <Car className="text-yellow-400" />, color: "from-yellow-400 to-yellow-600" },
    { value: "coupe-gran-turismo", label: "Coupé GT", icon: <Gauge className="text-orange-400" />, color: "from-orange-400 to-orange-600" },
    { value: "deportivo-clasico", label: "Clásico", icon: <Settings className="text-gray-400" />, color: "from-gray-400 to-gray-600" },
]

export default function EditarAutoPage() {
    const params = useParams()
    const id = Array.isArray(params?.id) ? params.id[0] : params?.id
    const router = useRouter()
    const [auto, setAuto] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [uploading, setUploading] = useState(false)
    const [saving, setSaving] = useState(false)
    const [activeTab, setActiveTab] = useState<'basic' | 'specs' | 'media'>('basic')

    useEffect(() => {
        if (!id) return
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/autos/${id}`)
            .then((res) => res.json())
            .then((data) => setAuto({ ...data, imagenes: data.imagenes ?? [], videos: data.videos ?? [] }))
            .catch(() => {
                toast({
                    title: "Error",
                    description: "No se pudo cargar el auto",
                    variant: "destructive",
                })
            })
            .finally(() => setLoading(false))
    }, [id])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setAuto((prev: any) => ({ ...prev, [name]: value }))
    }

    const uploadFile = async (file: File, type: "image" | "video") => {
        setUploading(true)
        try {
            const formData = new FormData()
            formData.append("file", file)
            formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!)
            const res = await fetch(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${type}/upload`,
                {
                    method: "POST",
                    body: formData,
                },
            )
            const data = await res.json()
            setAuto((prev: any) => ({
                ...prev,
                [type === "image" ? "imagenes" : "videos"]: [
                    ...(prev[type === "image" ? "imagenes" : "videos"] ?? []),
                    data.secure_url,
                ],
            }))
            toast({
                title: "Éxito",
                description: `${type === "image" ? "Imagen" : "Video"} subido correctamente`,
            })
        } catch (error) {
            toast({
                title: "Error",
                description: `No se pudo subir el ${type === "image" ? "imagen" : "video"}`,
                variant: "destructive",
            })
        } finally {
            setUploading(false)
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "image" | "video") => {
        const files = Array.from(e.target.files || [])
        files.forEach((file) => uploadFile(file, type))
    }

    const removeItem = (index: number, type: "imagenes" | "videos") => {
        setAuto((prev: any) => ({
            ...prev,
            [type]: prev[type].filter((_: any, i: number) => i !== index),
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/autos/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...auto,
                    año: Number.parseInt(auto.año),
                    precio: Number.parseFloat(auto.precio),
                    caballosFuerza: Number.parseInt(auto.caballosFuerza),
                }),
            })
            if (res.ok) {
                toast({
                    title: "Éxito",
                    description: "Auto actualizado correctamente",
                })
                router.push("/admin/autos")
            } else {
                throw new Error("Error al actualizar")
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "No se pudo actualizar el auto",
                variant: "destructive",
            })
        } finally {
            setSaving(false)
        }
    }

    if (!id) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
                <div className="text-center space-y-6 p-8 rounded-2xl bg-gradient-to-r from-red-500/10 to-red-600/10 border border-red-500/20 backdrop-blur-sm">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
                        <AlertCircle className="w-24 h-24 text-red-400 mx-auto relative z-10" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold text-white">ID de auto no válido</h2>
                        <p className="text-gray-400">El identificador proporcionado no es correcto</p>
                    </div>
                    <Button asChild className="bg-gradient-to-r from-amber-400 to-amber-600 text-black font-semibold hover:from-amber-500 hover:to-amber-700">
                        <Link href="/admin/autos" className="flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            Volver al panel
                        </Link>
                    </Button>
                </div>
            </div>
        )
    }

    if (loading || !auto) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
                <div className="text-center space-y-6">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
                        <div className="relative z-10 animate-spin rounded-full h-32 w-32 border-4 border-transparent bg-gradient-to-r from-amber-400 to-amber-600 rounded-full mx-auto">
                            <div className="absolute inset-2 bg-slate-900 rounded-full"></div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <p className="text-2xl font-semibold text-white">Cargando vehículo</p>
                        <p className="text-gray-400">Obteniendo información del auto...</p>
                    </div>
                </div>
            </div>
        )
    }

    const selectedCategory = categorias.find(c => c.value === auto.categoria)

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
            {/* Animated Background */}
            <div className="fixed inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            {/* Header */}
            <div className="relative z-10 border-b border-slate-700/50 bg-slate-800/30 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <Button
                                variant="outline"
                                size="lg"
                                asChild
                                className="border-slate-600 hover:bg-slate-700/50 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                            >
                                <Link href="/admin/autos" className="flex items-center gap-2">
                                    <ArrowLeft className="h-5 w-5" />
                                    Volver
                                </Link>
                            </Button>
                            <div className="space-y-2">
                                <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent">
                                    Editar Vehículo
                                </h1>
                                <div className="flex items-center gap-3">
                                    <p className="text-xl text-gray-300 font-semibold">
                                        {auto.marca} {auto.modelo}
                                    </p>
                                    <Badge className="bg-gradient-to-r from-slate-600 to-slate-700 text-white border-slate-500">
                                        {auto.año}
                                    </Badge>
                                    {selectedCategory && (
                                        <Badge className={`bg-gradient-to-r ${selectedCategory.color} text-white border-0`}>
                                            {selectedCategory.icon}
                                            <span className="ml-1">{selectedCategory.label}</span>
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Status Indicator */}
                        <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full">
                            <CheckCircle className="w-4 h-4 text-green-400" />
                            <span className="text-green-400 font-medium">Activo</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="relative z-10 border-b border-slate-700/50 bg-slate-800/20 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex space-x-8">
                        {[
                            { id: 'basic', label: 'Información Básica', icon: <Info className="w-4 h-4" /> },
                            { id: 'specs', label: 'Especificaciones', icon: <Bolt className="w-4 h-4" /> },
                            { id: 'media', label: 'Multimedia', icon: <Camera className="w-4 h-4" /> },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex items-center gap-2 px-4 py-4 border-b-2 font-medium transition-all duration-300 ${activeTab === tab.id
                                    ? 'border-amber-400 text-amber-400'
                                    : 'border-transparent text-gray-400 hover:text-white hover:border-gray-600'
                                    }`}
                            >
                                {tab.icon}
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Basic Information Tab */}
                    {activeTab === 'basic' && (
                        <div className="space-y-8 animate-in slide-in-from-right-5 duration-300">
                            <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border-slate-700/50 shadow-2xl">
                                <CardHeader className="pb-6">
                                    <CardTitle className="text-2xl font-bold text-amber-400 flex items-center gap-3">
                                        <div className="p-2 bg-amber-400/10 rounded-xl">
                                            <Car className="h-6 w-6" />
                                        </div>
                                        Información General
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        <FormField
                                            label="Marca"
                                            name="marca"
                                            value={auto.marca || ""}
                                            onChange={handleChange}
                                            placeholder="Ej: Ferrari"
                                            icon={<Palette className="w-4 h-4" />}
                                        />
                                        <FormField
                                            label="Modelo"
                                            name="modelo"
                                            value={auto.modelo || ""}
                                            onChange={handleChange}
                                            placeholder="Ej: 488 Spider"
                                            icon={<Tag className="w-4 h-4" />}
                                        />
                                        <FormField
                                            label="Año"
                                            name="año"
                                            value={auto.año || ""}
                                            onChange={handleChange}
                                            placeholder="2024"
                                            type="number"
                                            icon={<Calendar className="w-4 h-4" />}
                                        />
                                        <FormField
                                            label="Precio (USD)"
                                            name="precio"
                                            value={auto.precio || ""}
                                            onChange={handleChange}
                                            placeholder="250000"
                                            type="number"
                                            icon={<DollarSign className="w-4 h-4" />}
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                                            <Crown className="w-4 h-4 text-amber-400" />
                                            Categoría
                                        </label>
                                        <select
                                            name="categoria"
                                            value={auto.categoria || ""}
                                            onChange={handleChange}
                                            className="w-full p-4 bg-slate-700/50 border border-slate-600 rounded-xl text-white backdrop-blur-sm focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300"
                                        >
                                            <option value="">Selecciona una categoría</option>
                                            {categorias.map((c) => (
                                                <option key={c.value} value={c.value}>
                                                    {c.label}
                                                </option>
                                            ))}
                                        </select>
                                        {selectedCategory && (
                                            <div className="flex items-center gap-3 mt-3">
                                                <div className={`p-3 rounded-xl bg-gradient-to-r ${selectedCategory.color} bg-opacity-10 border border-current border-opacity-20`}>
                                                    {selectedCategory.icon}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-white">{selectedCategory.label}</p>
                                                    <p className="text-sm text-gray-400">Categoría seleccionada</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-3">
                                        <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                                            <Tag className="w-4 h-4 text-amber-400" />
                                            Descripción
                                        </label>
                                        <Textarea
                                            name="descripcion"
                                            value={auto.descripcion || ""}
                                            onChange={handleChange}
                                            rows={6}
                                            className="bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400 backdrop-blur-sm focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 resize-none"
                                            placeholder="Describe las características únicas de este vehículo, su historia, prestaciones destacadas y cualquier detalle relevante que lo haga especial..."
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* Specifications Tab */}
                    {activeTab === 'specs' && (
                        <div className="space-y-8 animate-in slide-in-from-right-5 duration-300">
                            <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border-slate-700/50 shadow-2xl">
                                <CardHeader className="pb-6">
                                    <CardTitle className="text-2xl font-bold text-amber-400 flex items-center gap-3">
                                        <div className="p-2 bg-amber-400/10 rounded-xl">
                                            <Bolt className="h-6 w-6" />
                                        </div>
                                        Especificaciones Técnicas
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        <FormField
                                            label="Potencia"
                                            name="potencia"
                                            value={auto.potencia || ""}
                                            onChange={handleChange}
                                            placeholder="Ej: 670 CV"
                                            icon={<Zap className="w-4 h-4" />}
                                        />
                                        <FormField
                                            label="Caballos de Fuerza"
                                            name="caballosFuerza"
                                            value={auto.caballosFuerza || ""}
                                            onChange={handleChange}
                                            placeholder="670"
                                            type="number"
                                            icon={<Gauge className="w-4 h-4" />}
                                        />
                                        <FormField
                                            label="Cilindrada"
                                            name="cilindrada"
                                            value={auto.cilindrada || ""}
                                            onChange={handleChange}
                                            placeholder="Ej: 3.9L"
                                            icon={<Settings className="w-4 h-4" />}
                                        />
                                        <FormField
                                            label="Tamaño del Motor"
                                            name="tamanoMotor"
                                            value={auto.tamanoMotor || ""}
                                            onChange={handleChange}
                                            placeholder="Ej: V8 Turbo"
                                            icon={<Bolt className="w-4 h-4" />}
                                        />
                                        <FormField
                                            label="Transmisión"
                                            name="transmision"
                                            value={auto.transmision || ""}
                                            onChange={handleChange}
                                            placeholder="Ej: Automática 8 vel."
                                            icon={<Cog className="w-4 h-4" />}
                                        />
                                        <FormField
                                            label="Tipo de Combustible"
                                            name="tipoCombustible"
                                            value={auto.tipoCombustible || ""}
                                            onChange={handleChange}
                                            placeholder="Ej: Gasolina Premium"
                                            icon={<Fuel className="w-4 h-4" />}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {/* Media Tab */}
                    {activeTab === 'media' && (
                        <div className="space-y-8 animate-in slide-in-from-right-5 duration-300">
                            {/* Images */}
                            {Array.isArray(auto.imagenes) && (
                                <EnhancedMediaUpload
                                    type="image"
                                    items={auto.imagenes}
                                    onFile={(e) => handleFileChange(e, "image")}
                                    onRemove={(i) => removeItem(i, "imagenes")}
                                    uploading={uploading}
                                    title="Galería de Imágenes"
                                    icon={<Camera className="h-6 w-6" />}
                                    description="Sube imágenes de alta calidad que muestren el vehículo desde diferentes ángulos"
                                />
                            )}

                            {/* Videos */}
                            {Array.isArray(auto.videos) && (
                                <EnhancedMediaUpload
                                    type="video"
                                    items={auto.videos}
                                    onFile={(e) => handleFileChange(e, "video")}
                                    onRemove={(i) => removeItem(i, "videos")}
                                    uploading={uploading}
                                    title="Videos del Vehículo"
                                    icon={<Video className="h-6 w-6" />}
                                    description="Sube videos que muestren el vehículo en movimiento o detalles especiales"
                                />
                            )}
                        </div>
                    )}

                    {/* Floating Save Button */}
                    <div className="fixed bottom-8 right-8 z-50">
                        <Button
                            type="submit"
                            disabled={uploading || saving}
                            className="bg-gradient-to-r from-amber-400 to-amber-600 text-black font-bold px-8 py-4 rounded-2xl hover:from-amber-500 hover:to-amber-700 transition-all duration-300 shadow-2xl hover:shadow-amber-500/25 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {saving ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-black mr-3"></div>
                                    Guardando...
                                </>
                            ) : (
                                <>
                                    <Save className="w-5 h-5 mr-3" />
                                    Guardar Cambios
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

function FormField({
    label,
    name,
    value,
    onChange,
    placeholder,
    type = "text",
    icon
}: {
    label: string
    name: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder: string
    type?: string
    icon: React.ReactNode
}) {
    return (
        <div className="space-y-3">
            <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                <span className="text-amber-400">{icon}</span>
                {label}
            </label>
            <div className="relative">
                <Input
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    type={type}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-400 backdrop-blur-sm focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 pl-4 pr-4 py-3 rounded-xl"
                />
            </div>
        </div>
    )
}

function EnhancedMediaUpload({
    type,
    items,
    onFile,
    onRemove,
    uploading,
    title,
    icon,
    description,
}: {
    type: "image" | "video"
    items: string[]
    onFile: (e: React.ChangeEvent<HTMLInputElement>) => void
    onRemove: (index: number) => void
    uploading: boolean
    title: string
    icon: React.ReactNode
    description: string
}) {
    return (
        <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border-slate-700/50 shadow-2xl">
            <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-bold text-amber-400 flex items-center gap-3">
                    <div className="p-2 bg-amber-400/10 rounded-xl">
                        {icon}
                    </div>
                    <div>
                        <div>{title}</div>
                        <p className="text-sm text-gray-400 font-normal mt-1">{description}</p>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                    <label className="cursor-pointer group">
                        <input type="file" accept={type + "/*"} multiple onChange={onFile} className="hidden" />
                        <div className="flex items-center gap-3 bg-gradient-to-r from-amber-400/10 to-amber-600/10 hover:from-amber-400/20 hover:to-amber-600/20 border border-amber-400/30 text-amber-400 py-3 px-6 rounded-xl font-semibold transition-all duration-300 group-hover:scale-105 backdrop-blur-sm">
                            <Upload className="h-5 w-5" />
                            Subir {type === "image" ? "Imágenes" : "Videos"}
                        </div>
                    </label>
                    {uploading && (
                        <div className="flex items-center gap-3 text-amber-400 bg-amber-400/10 px-4 py-2 rounded-xl border border-amber-400/20">
                            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-amber-400"></div>
                            <span className="font-medium">Subiendo archivo...</span>
                        </div>
                    )}
                </div>

                {items && items.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {items.map((src, i) => (
                            <div key={i} className="relative group bg-slate-700/30 rounded-2xl overflow-hidden border border-slate-600/50 hover:border-amber-400/50 transition-all duration-300 hover:scale-105">
                                {type === "image" ? (
                                    <Image
                                        src={src || "/placeholder.svg"}
                                        alt={`${title} ${i + 1}`}
                                        width={300}
                                        height={200}
                                        className="w-full h-48 object-cover"
                                    />
                                ) : (
                                    <video
                                        src={src}
                                        className="w-full h-48 object-cover"
                                        controls
                                        preload="metadata"
                                    />
                                )}

                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                                        <div className="text-white">
                                            <p className="font-semibold text-sm">
                                                {type === "image" ? "Imagen" : "Video"} {i + 1}
                                            </p>
                                            <p className="text-xs text-gray-300">
                                                {type === "image" ? "JPG/PNG" : "MP4/MOV"}
                                            </p>
                                        </div>
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => onRemove(i)}
                                            className="bg-red-500/80 hover:bg-red-600 text-white rounded-full p-2 backdrop-blur-sm"
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                {/* Preview overlay */}
                                <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                                    #{i + 1}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {(!items || items.length === 0) && (
                    <div className="text-center py-12 bg-slate-700/20 rounded-2xl border-2 border-dashed border-slate-600">
                        <div className="flex flex-col items-center gap-4">
                            <div className="p-4 bg-slate-600/30 rounded-full">
                                {type === "image" ? (
                                    <Camera className="h-8 w-8 text-gray-400" />
                                ) : (
                                    <Video className="h-8 w-8 text-gray-400" />
                                )}
                            </div>
                            <div className="space-y-2">
                                <p className="text-gray-400 font-medium">
                                    No hay {type === "image" ? "imágenes" : "videos"} cargados
                                </p>
                                <p className="text-sm text-gray-500">
                                    Sube archivos para comenzar
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}