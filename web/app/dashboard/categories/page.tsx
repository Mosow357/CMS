'use client'

import { mockDashboardTestimonials } from '@/lib/mockDashboardTestimonials'
import { Package, Calendar, Users, Building2, FileText, Video, Image as ImageIcon } from 'lucide-react'

export default function CategoriesPage() {
    // Categorías temáticas predefinidas
    const thematicCategories = [
        {
            id: 'cat-producto',
            name: 'Producto',
            icon: Package,
            color: 'from-blue-500 to-blue-600',
            textColor: 'text-blue-600 dark:text-blue-400',
            bgColor: 'bg-blue-100 dark:bg-blue-900/30',
            count: mockDashboardTestimonials.filter(t => t.category.name === 'Producto').length
        },
        {
            id: 'cat-evento',
            name: 'Evento',
            icon: Calendar,
            color: 'from-purple-500 to-purple-600',
            textColor: 'text-purple-600 dark:text-purple-400',
            bgColor: 'bg-purple-100 dark:bg-purple-900/30',
            count: mockDashboardTestimonials.filter(t => t.category.name === 'Evento').length
        },
        {
            id: 'cat-cliente',
            name: 'Cliente',
            icon: Users,
            color: 'from-green-500 to-green-600',
            textColor: 'text-green-600 dark:text-green-400',
            bgColor: 'bg-green-100 dark:bg-green-900/30',
            count: mockDashboardTestimonials.filter(t => t.category.name === 'Cliente').length
        },
        {
            id: 'cat-industria',
            name: 'Industria',
            icon: Building2,
            color: 'from-orange-500 to-orange-600',
            textColor: 'text-orange-600 dark:text-orange-400',
            bgColor: 'bg-orange-100 dark:bg-orange-900/30',
            count: mockDashboardTestimonials.filter(t => t.category.name === 'Industria').length
        }
    ]

    // Tipos de medios
    const mediaTypes = [
        {
            id: 'text',
            name: 'TEXTO',
            icon: FileText,
            count: mockDashboardTestimonials.filter(t => t.media_type === 'text').length,
            color: 'from-slate-500 to-slate-600',
            textColor: 'text-slate-600 dark:text-slate-400',
            bgColor: 'bg-slate-100 dark:bg-slate-900/30'
        },
        {
            id: 'video',
            name: 'VIDEO',
            icon: Video,
            count: mockDashboardTestimonials.filter(t => t.media_type === 'video').length,
            color: 'from-red-500 to-red-600',
            textColor: 'text-red-600 dark:text-red-400',
            bgColor: 'bg-red-100 dark:bg-red-900/30'
        },
        {
            id: 'image',
            name: 'IMAGEN',
            icon: ImageIcon,
            count: mockDashboardTestimonials.filter(t => t.media_type === 'image').length,
            color: 'from-cyan-500 to-cyan-600',
            textColor: 'text-cyan-600 dark:text-cyan-400',
            bgColor: 'bg-cyan-100 dark:bg-cyan-900/30'
        }
    ]

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Categorías y Clasificación</h1>
                <p className="text-muted-foreground">
                    Organización de testimonios por categoría temática y tipo de medio
                </p>
            </div>

            {/* Categorías Temáticas */}
            <div className="mb-10">
                <h2 className="text-xl font-semibold mb-4">Categorías Temáticas</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {thematicCategories.map((category, index) => {
                        const Icon = category.icon
                        return (
                            <div
                                key={category.id}
                                className="group relative overflow-hidden rounded-xl border bg-card hover:shadow-xl transition-all duration-300 hover:scale-105"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Gradient background on hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                                <div className="relative p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`p-3 rounded-lg bg-gradient-to-br ${category.color} text-white shadow-lg group-hover:scale-110 transition-transform`}>
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <div className="text-right">
                                            <div className="text-3xl font-bold">{category.count}</div>
                                            <div className="text-xs text-muted-foreground mt-1">
                                                testimonios
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-semibold mb-1">{category.name}</h3>
                                    <p className="text-sm text-muted-foreground">
                                        {category.count} {category.count === 1 ? 'testimonio' : 'testimonios'}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Tipos de Medios */}
            <div className="mb-10">
                <h2 className="text-xl font-semibold mb-4">Tipos de Medios</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {mediaTypes.map((type, index) => {
                        const Icon = type.icon
                        return (
                            <div
                                key={type.id}
                                className="group relative overflow-hidden rounded-xl border bg-card hover:shadow-xl transition-all duration-300 hover:scale-105"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Gradient background on hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${type.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                                <div className="relative p-6 flex items-center gap-4">
                                    <div className={`p-3 rounded-lg bg-gradient-to-br ${type.color} text-white shadow-lg group-hover:scale-110 transition-transform`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold mb-1">{type.name}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            {type.count} {type.count === 1 ? 'testimonio' : 'testimonios'}
                                        </p>
                                    </div>
                                    <div className="text-3xl font-bold">{type.count}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Distribución */}
            <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
                <div className="border-b bg-muted/50 px-6 py-4">
                    <h2 className="text-xl font-semibold">Distribución por Tipo de Medio</h2>
                </div>
                <div className="p-6 space-y-4">
                    {mediaTypes.map((type) => {
                        const percentage = mockDashboardTestimonials.length > 0
                            ? Math.round((type.count / mockDashboardTestimonials.length) * 100)
                            : 0

                        return (
                            <div key={type.id}>
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${type.color}`} />
                                        <span className="text-sm font-medium">{type.name}</span>
                                    </div>
                                    <span className="text-sm text-muted-foreground font-medium">{percentage}%</span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                                    <div
                                        className={`h-2.5 rounded-full bg-gradient-to-r ${type.color} transition-all duration-500`}
                                        style={{ width: `${percentage}%` }}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
