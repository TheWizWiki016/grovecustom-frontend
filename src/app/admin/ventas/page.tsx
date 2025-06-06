"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts"
import Image from "next/image"
import jsPDF from "jspdf"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import AdminGuard from "@/components/AdminGuard"

export default function VentasPage() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const [ventas, setVentas] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>("todas")

    useEffect(() => {
        const fetchVentas = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ventas`)
                const data = await res.json()
                setVentas(data)
            } catch (error) {
                console.error("Error al obtener ventas:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchVentas()
    }, [])

    // Filtrar ventas por categoría
    const ventasFiltradas =
        categoriaSeleccionada === "todas"
            ? ventas
            : ventas.filter((venta) => venta.autoId.categoria === categoriaSeleccionada)

    // Obtener categorías únicas
    const categorias = [...new Set(ventas.map((venta) => venta.autoId.categoria))].filter(Boolean)

    const resumen = ventasFiltradas.reduce(
        (acc, venta) => {
            const id = venta.autoId._id
            if (!acc[id]) {
                acc[id] = {
                    auto: venta.autoId,
                    ventas: 0,
                    ganancia: 0,
                }
            }
            acc[id].ventas += 1
            acc[id].ganancia += venta.monto
            return acc
        },
        {} as Record<string, { auto: any; ventas: number; ganancia: number }>,
    )

    const dataGrafica = (Object.values(resumen) as { auto: any; ventas: number; ganancia: number }[]).map(
        ({ auto, ventas, ganancia }) => ({
            nombre: `${auto.marca} ${auto.modelo}`,
            ventas,
            ganancia,
        }),
    )

    const exportarPDF = async () => {
        const pdf = new jsPDF("p", "mm", "a4")
        const pageWidth = pdf.internal.pageSize.getWidth()
        const pageHeight = pdf.internal.pageSize.getHeight()
        let yPosition = 20

        // Configurar fuentes
        pdf.setFont("helvetica", "normal")

        // Encabezado principal
        pdf.setFillColor(41, 37, 36) // Color gris oscuro
        pdf.rect(0, 0, pageWidth, 35, "F")

        pdf.setTextColor(255, 255, 255) // Texto blanco
        pdf.setFontSize(24)
        pdf.setFont("helvetica", "bold")
        pdf.text("REPORTE DE VENTAS", pageWidth / 2, 20, { align: "center" })

        pdf.setFontSize(12)
        pdf.setFont("helvetica", "normal")
        const fechaActual = new Date().toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
        })
        pdf.text(`Generado el ${fechaActual}`, pageWidth / 2, 28, { align: "center" })

        yPosition = 50

        // Resumen ejecutivo
        pdf.setTextColor(0, 0, 0) // Texto negro
        pdf.setFontSize(16)
        pdf.setFont("helvetica", "bold")
        pdf.text("RESUMEN EJECUTIVO", 20, yPosition)
        yPosition += 10

        // Línea decorativa
        pdf.setDrawColor(250, 204, 21) // Color amarillo
        pdf.setLineWidth(2)
        pdf.line(20, yPosition, pageWidth - 20, yPosition)
        yPosition += 15

        // Actualizar las estadísticas para usar datos filtrados
        const totalVentas = ventasFiltradas.length
        const totalGanancias = Object.values(resumen).reduce((sum, item) => sum + item.ganancia, 0)
        const modelosVendidos = Object.keys(resumen).length

        pdf.setFontSize(12)
        pdf.setFont("helvetica", "normal")

        const estadisticas = [
            `Total de ventas realizadas: ${totalVentas}`,
            `Modelos diferentes vendidos: ${modelosVendidos}`,
            `Venta promedio por modelo: ${totalVentas > 0 ? (totalVentas / modelosVendidos).toFixed(1) : 0} unidades`,
            `Categoría: ${categoriaSeleccionada === "todas" ? "Todas" : categoriaSeleccionada}`,
        ]

        estadisticas.forEach((stat, index) => {
            pdf.setFillColor(248, 250, 252) // Fondo gris claro
            pdf.rect(20, yPosition - 3, pageWidth - 40, 8, "F")
            pdf.text(stat, 25, yPosition + 2)
            yPosition += 12
        })

        yPosition += 10

        // Título de la tabla
        pdf.setFontSize(16)
        pdf.setFont("helvetica", "bold")
        pdf.text("DETALLE POR MODELO", 20, yPosition)
        yPosition += 15

        // Encabezados de la tabla
        const headers = ["Marca/Modelo", "Año", "Precio", "Ventas", "Ganancia Total"]
        const columnWidths = [50, 25, 35, 25, 35]
        let xPosition = 20

        // Fondo del encabezado
        pdf.setFillColor(41, 37, 36)
        pdf.rect(20, yPosition - 5, pageWidth - 40, 10, "F")

        pdf.setTextColor(255, 255, 255)
        pdf.setFontSize(10)
        pdf.setFont("helvetica", "bold")

        headers.forEach((header, index) => {
            pdf.text(header, xPosition + 2, yPosition)
            xPosition += columnWidths[index]
        })

        yPosition += 10
        pdf.setTextColor(0, 0, 0)
        pdf.setFont("helvetica", "normal")

        // Datos de la tabla
        Object.values(resumen).forEach((item, index) => {
            // Alternar colores de fila
            if (index % 2 === 0) {
                pdf.setFillColor(248, 250, 252)
                pdf.rect(20, yPosition - 3, pageWidth - 40, 8, "F")
            }

            xPosition = 20
            const rowData = [
                `${item.auto.marca} ${item.auto.modelo}`,
                item.auto.año?.toString() || "N/A",
                `$${item.auto.precio?.toLocaleString() || "0"}`,
                item.ventas.toString(),
                `$${item.ganancia.toLocaleString()}`,
            ]

            rowData.forEach((data, colIndex) => {
                // Truncar texto si es muy largo
                let displayText = data
                if (colIndex === 0 && data.length > 20) {
                    displayText = data.substring(0, 17) + "..."
                }

                pdf.text(displayText, xPosition + 2, yPosition + 2)
                xPosition += columnWidths[colIndex]
            })

            yPosition += 8

            // Nueva página si es necesario
            if (yPosition > pageHeight - 30) {
                pdf.addPage()
                yPosition = 30
            }
        })

        // Pie de página
        const addFooter = () => {
            pdf.setFontSize(8)
            pdf.setTextColor(128, 128, 128)
            pdf.setFont("helvetica", "italic")
            pdf.text(" Grove custom", pageWidth / 2, pageHeight - 10, {
                align: "center",
            })

            // Línea decorativa en el pie
            pdf.setDrawColor(250, 204, 21)
            pdf.setLineWidth(0.5)
            pdf.line(20, pageHeight - 15, pageWidth - 20, pageHeight - 15)
        }

        // Agregar pie de página a todas las páginas
        const totalPages = pdf.getNumberOfPages()
        for (let i = 1; i <= totalPages; i++) {
            pdf.setPage(i)
            addFooter()

            // Número de página
            pdf.setFontSize(8)
            pdf.setTextColor(128, 128, 128)
            pdf.text(`Página ${i} de ${totalPages}`, pageWidth - 20, pageHeight - 5, { align: "right" })
        }

        // Guardar el PDF
        pdf.save(`reporte-ventas-${new Date().toISOString().split("T")[0]}.pdf`)
    }

    return (
        <AdminGuard>
            <main className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <h1 className="text-4xl font-bold text-yellow-400 mb-8 text-center">Panel de Ventas</h1>

                    <div className="text-center mb-8">
                        <button
                            onClick={exportarPDF}
                            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 py-3 rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                            📄 Exportar Reporte en PDF
                        </button>
                    </div>

                    {loading ? (
                        <div className="text-center">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
                            <p className="text-yellow-400 mt-4">Cargando datos...</p>
                        </div>
                    ) : (
                        <div id="reporte-ventas">
                            {/* Filtro de categorías */}
                            <Card className="bg-gray-800 border-gray-700 mb-8">
                                <CardHeader>
                                    <CardTitle className="text-yellow-400 flex items-center gap-2">🔍 Filtros</CardTitle>
                                    <CardDescription className="text-gray-300">Filtra los datos por categoría de vehículo</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                                        <label className="text-white font-medium">Categoría:</label>
                                        <Select value={categoriaSeleccionada} onValueChange={setCategoriaSeleccionada}>
                                            <SelectTrigger className="w-full sm:w-64 bg-gray-700 border-gray-600 text-white">
                                                <SelectValue placeholder="Seleccionar categoría" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-gray-700 border-gray-600">
                                                <SelectItem value="todas" className="text-white hover:bg-gray-600">
                                                    📋 Todas las categorías
                                                </SelectItem>
                                                {categorias.map((categoria) => (
                                                    <SelectItem key={categoria} value={categoria} className="text-white hover:bg-gray-600">
                                                        🚗 {categoria}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {categoriaSeleccionada !== "todas" && (
                                            <button
                                                onClick={() => setCategoriaSeleccionada("todas")}
                                                className="text-yellow-400 hover:text-yellow-300 text-sm underline"
                                            >
                                                Limpiar filtro
                                            </button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Estadísticas rápidas */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                                <Card className="bg-gradient-to-br from-blue-600 to-blue-700 border-blue-500">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-blue-100 text-sm font-medium">Total Ventas</p>
                                                <p className="text-3xl font-bold text-white">{ventasFiltradas.length}</p>
                                            </div>
                                            <div className="text-blue-200 text-2xl">📊</div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-gradient-to-br from-green-600 to-green-700 border-green-500">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-green-100 text-sm font-medium">Ganancias Totales</p>
                                                <p className="text-3xl font-bold text-white">
                                                    $
                                                    {Object.values(resumen)
                                                        .reduce((sum, item) => sum + item.ganancia, 0)
                                                        .toLocaleString()}
                                                </p>
                                            </div>
                                            <div className="text-green-200 text-2xl">💰</div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-gradient-to-br from-purple-600 to-purple-700 border-purple-500">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-purple-100 text-sm font-medium">Modelos Vendidos</p>
                                                <p className="text-3xl font-bold text-white">{Object.keys(resumen).length}</p>
                                            </div>
                                            <div className="text-purple-200 text-2xl">🚗</div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-gradient-to-br from-yellow-600 to-yellow-700 border-yellow-500">
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-yellow-100 text-sm font-medium">Promedio por Venta</p>
                                                <p className="text-3xl font-bold text-white">
                                                    $
                                                    {ventasFiltradas.length > 0
                                                        ? Math.round(
                                                            Object.values(resumen).reduce((sum, item) => sum + item.ganancia, 0) /
                                                            ventasFiltradas.length,
                                                        ).toLocaleString()
                                                        : 0}
                                                </p>
                                            </div>
                                            <div className="text-yellow-200 text-2xl">📈</div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Gráficas mejoradas */}
                            <div className="mb-12">
                                {/* Gráfico de Ventas */}
                                <Card className="bg-gray-800 border-gray-700">
                                    <CardHeader>
                                        <CardTitle className="text-yellow-400 flex items-center gap-2">📊 Cantidad de Ventas</CardTitle>
                                        <CardDescription className="text-gray-300">Número de unidades vendidas por modelo</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ChartContainer
                                            config={{
                                                ventas: {
                                                    label: "Ventas",
                                                    color: "hsl(var(--chart-2))",
                                                },
                                            }}
                                            className="h-[300px]"
                                        >
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart data={dataGrafica} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                                    <XAxis
                                                        dataKey="nombre"
                                                        stroke="#9ca3af"
                                                        fontSize={12}
                                                        angle={-45}
                                                        textAnchor="end"
                                                        height={80}
                                                    />
                                                    <YAxis stroke="#9ca3af" fontSize={12} />
                                                    <ChartTooltip
                                                        content={<ChartTooltipContent />}
                                                        contentStyle={{
                                                            backgroundColor: "#1f2937",
                                                            border: "1px solid #374151",
                                                            borderRadius: "8px",
                                                            color: "#fff",
                                                        }}
                                                    />
                                                    <Bar dataKey="ventas" name="Ventas (unidades)" radius={[4, 4, 0, 0]}>
                                                        {dataGrafica.map((entry, index) => {
                                                            // Array de colores vibrantes para las barras
                                                            const colors = [
                                                                "#f97316", // naranja
                                                                "#3b82f6", // azul
                                                                "#10b981", // verde
                                                                "#8b5cf6", // morado
                                                                "#ec4899", // rosa
                                                                "#f59e0b", // ámbar
                                                                "#06b6d4", // cyan
                                                                "#ef4444", // rojo
                                                                "#84cc16", // lima
                                                                "#6366f1", // indigo
                                                            ]
                                                            return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                                        })}
                                                    </Bar>
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </ChartContainer>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Mensaje cuando no hay datos */}
                            {Object.keys(resumen).length === 0 ? (
                                <Card className="bg-gray-800 border-gray-700">
                                    <CardContent className="p-12 text-center">
                                        <div className="text-6xl mb-4">🔍</div>
                                        <h3 className="text-xl font-semibold text-white mb-2">No se encontraron ventas</h3>
                                        <p className="text-gray-400">
                                            {categoriaSeleccionada === "todas"
                                                ? "No hay ventas registradas en el sistema."
                                                : `No hay ventas registradas para la categoría "${categoriaSeleccionada}".`}
                                        </p>
                                        {categoriaSeleccionada !== "todas" && (
                                            <button
                                                onClick={() => setCategoriaSeleccionada("todas")}
                                                className="mt-4 text-yellow-400 hover:text-yellow-300 underline"
                                            >
                                                Ver todas las categorías
                                            </button>
                                        )}
                                    </CardContent>
                                </Card>
                            ) : (
                                /* Grid de tarjetas de autos */
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {Object.values(resumen).map(({ auto, ventas, ganancia }, index) => (
                                        <Card
                                            key={index}
                                            className="bg-gray-800 border-gray-700 hover:border-yellow-400 transition-all group"
                                        >
                                            <CardContent className="p-0">
                                                {auto.imagenes?.[0] && (
                                                    <div className="relative overflow-hidden rounded-t-lg">
                                                        <Image
                                                            src={auto.imagenes[0] || "/placeholder.svg"}
                                                            alt={auto.modelo}
                                                            width={400}
                                                            height={200}
                                                            className="object-cover h-48 w-full transition-transform group-hover:scale-105"
                                                        />
                                                        <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                                                            {auto.categoria}
                                                        </div>
                                                    </div>
                                                )}
                                                <div className="p-6">
                                                    <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                                                        {auto.marca} {auto.modelo}
                                                    </h3>
                                                    <p className="text-sm text-gray-400 mb-3">📅 Año: {auto.año}</p>
                                                    <p className="text-lg font-bold text-white mb-4">💰 ${auto.precio?.toLocaleString()}</p>

                                                    <div className="space-y-2">
                                                        <div className="flex justify-between items-center p-2 bg-gray-700 rounded">
                                                            <span className="text-sm text-gray-300">Ventas:</span>
                                                            <span className="font-bold text-blue-400">{ventas} unidades</span>
                                                        </div>
                                                        <div className="flex justify-between items-center p-2 bg-gray-700 rounded">
                                                            <span className="text-sm text-gray-300">Ganancia:</span>
                                                            <span className="font-bold text-green-400">${ganancia.toLocaleString()}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </AdminGuard>
    )
}
