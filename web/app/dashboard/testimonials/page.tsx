'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { mockDashboardTestimonials, DashboardTestimonial } from '@/lib/mockDashboardTestimonials'
import { TestimonialActions } from '@/components/dashboard/testimonial-actions'
import { UserAvatar } from '@/components/ui/user-avatar'
import { useToast } from '@/hooks/use-toast'
import { CheckCircle2, Clock, Eye, XCircle, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function TestimonialsContent() {
  const searchParams = useSearchParams()
  const status = searchParams.get('status')
  const { toast } = useToast()

  // Estado local para manejar los testimonios
  const [testimonials, setTestimonials] = useState<DashboardTestimonial[]>(mockDashboardTestimonials)
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [dateFrom, setDateFrom] = useState<string>('')
  const [dateTo, setDateTo] = useState<string>('')

  // Filtrar testimonios por status, rating y fecha
  const filteredTestimonials = testimonials.filter(t => {
    // Filtro por status
    if (status && t.status !== status) return false
    
    // Filtro por rating
    if (selectedRating !== null && t.stars_rating !== selectedRating) return false
    
    // Filtro por fecha
    const testimonialDate = new Date(t.created_at)
    if (dateFrom) {
      const fromDate = new Date(dateFrom)
      if (testimonialDate < fromDate) return false
    }
    if (dateTo) {
      const toDate = new Date(dateTo)
      toDate.setHours(23, 59, 59, 999) // Incluir todo el día
      if (testimonialDate > toDate) return false
    }
    
    return true
  })

  // Determinar el título según el filtro
  const getTitle = () => {
    if (!status) return 'Todos los Testimonios'
    switch (status) {
      case 'pending':
        return 'Testimonios Pendientes'
      case 'approved':
        return 'Testimonios Aprobados'
      case 'published':
        return 'Testimonios Publicados'
      case 'rejected':
        return 'Testimonios Rechazados'
      default:
        return 'Testimonios'
    }
  }

  // Función para obtener el color del badge según el status
  const getStatusBadgeColor = (testimonialStatus: string) => {
    switch (testimonialStatus) {
      case 'published':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
      case 'approved':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'rejected':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
    }
  }

  // Función para obtener el icono del status
  const getStatusIcon = (testimonialStatus: string) => {
    switch (testimonialStatus) {
      case 'published':
        return Eye
      case 'approved':
        return CheckCircle2
      case 'pending':
        return Clock
      case 'rejected':
        return XCircle
      default:
        return Clock
    }
  }

  // Función para obtener el texto del status en español
  const getStatusText = (testimonialStatus: string) => {
    switch (testimonialStatus) {
      case 'published':
        return 'Publicado'
      case 'approved':
        return 'Aprobado'
      case 'pending':
        return 'Pendiente'
      case 'rejected':
        return 'Rechazado'
      default:
        return testimonialStatus
    }
  }

  // Handler para cambiar el estado de un testimonio
  const handleStatusChange = (testimonialId: string, newStatus: string) => {
    setTestimonials(prev =>
      prev.map(t =>
        t.id === testimonialId ? { ...t, status: newStatus as any } : t
      )
    )

    toast({
      title: "Estado actualizado",
      description: `El testimonio ha sido marcado como "${getStatusText(newStatus)}"`,
    })
  }

  // Handler para eliminar un testimonio
  const handleDelete = (testimonialId: string) => {
    setTestimonials(prev => prev.filter(t => t.id !== testimonialId))

    toast({
      title: "Testimonio eliminado",
      description: "El testimonio ha sido eliminado correctamente",
      variant: "destructive"
    })
  }

  return (
    <div className="p-0">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">{getTitle()}</h1>
          <p className="text-muted-foreground">
            {status
              ? `Mostrando ${filteredTestimonials.length} testimonio(s) con estado "${getStatusText(status)}"`
              : `Mostrando todos los ${filteredTestimonials.length} testimonios`}
          </p>
        </div>

        <Button asChild variant="outline" className="gap-2">
          <Link href="/dashboard/embed" target="_blank">
            <ExternalLink className="w-4 h-4" />
            Ver mi Muro
          </Link>
        </Button>
      </div>

      {/* Filtros */}
      <div className="mb-6 p-4 bg-muted/30 rounded-lg border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Filtro por Rating */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Filtrar por Rating</label>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedRating === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedRating(null)}
                className="text-xs"
              >
                Todos
              </Button>
              {[5, 4, 3, 2, 1].map((rating) => (
                <Button
                  key={rating}
                  variant={selectedRating === rating ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedRating(rating)}
                  className="text-xs gap-1"
                >
                  <span>★</span> {rating}
                </Button>
              ))}
            </div>
          </div>

          {/* Filtro por Fecha - Desde */}
          <div className="flex flex-col gap-2">
            <label htmlFor="date-from" className="text-sm font-medium">Desde</label>
            <input
              id="date-from"
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="px-3 py-2 border rounded-md text-sm bg-background"
            />
          </div>

          {/* Filtro por Fecha - Hasta */}
          <div className="flex flex-col gap-2">
            <label htmlFor="date-to" className="text-sm font-medium">Hasta</label>
            <input
              id="date-to"
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="px-3 py-2 border rounded-md text-sm bg-background"
            />
          </div>
        </div>

        {/* Botón para limpiar filtros */}
        {(selectedRating !== null || dateFrom || dateTo) && (
          <div className="mt-4 pt-4 border-t">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedRating(null)
                setDateFrom('')
                setDateTo('')
              }}
              className="text-xs"
            >
              Limpiar filtros
            </Button>
          </div>
        )}
      </div>

      {filteredTestimonials.length === 0 ? (
        <div className="text-center py-12 bg-muted/50 rounded-lg">
          <p className="text-lg text-muted-foreground">
            No hay testimonios {status ? `con estado "${getStatusText(status)}"` : 'disponibles'}
          </p>
        </div>
      ) : (
        <div className="border rounded-xl overflow-hidden shadow-sm">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 font-semibold">Título</th>
                <th className="text-left p-4 font-semibold">Autor</th>
                <th className="text-left p-4 font-semibold">Categoría</th>
                <th className="text-left p-4 font-semibold">Rating</th>
                <th className="text-left p-4 font-semibold">Estado</th>
                <th className="text-left p-4 font-semibold">Fecha</th>
                <th className="text-left p-4 font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredTestimonials.map((testimonial, index) => {
                const StatusIcon = getStatusIcon(testimonial.status)
                return (
                  <tr
                    key={testimonial.id}
                    className={`border-b last:border-0 transition-colors hover:bg-muted/30 ${index % 2 === 0 ? 'bg-background' : 'bg-muted/10'
                      }`}
                  >

                    <td className="p-4">
                      <div>
                        <div className="font-medium text-xs">{testimonial.title}</div>
                        <div className="text-xs text-muted-foreground line-clamp-1">
                          {testimonial.content}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 mx-2">
                      <div className="flex items-center gap-3">
                        <UserAvatar name={testimonial.author.name} size="xs" />
                        <div>
                          <div className="text-xs font-medium">
                            {testimonial.author.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {testimonial.author.title}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-xs">{testimonial.category.name}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-xs font-medium">
                          {testimonial.stars_rating}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium ${getStatusBadgeColor(
                          testimonial.status
                        )}`}
                      >
                        <StatusIcon className="w-3.5 h-3.5" />
                        {getStatusText(testimonial.status)}
                      </span>
                    </td>
                    <td className="p-4">
                      {/* <span className="text-xs text-muted-foreground">
                        {new Date(testimonial.created_at).toLocaleDateString('es-ES', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span> */}
                      <span className="text-xs text-muted-foreground">
                        {new Date(testimonial.created_at).toLocaleDateString('es-ES', {
                          day: '2-digit',
                          month: '2-digit',
                          year: '2-digit',
                        })}
                      </span>
                    </td>
                    <td className="p-4">
                      <TestimonialActions
                        testimonial={testimonial}
                        onStatusChange={(newStatus) => handleStatusChange(testimonial.id, newStatus)}
                        onDelete={() => handleDelete(testimonial.id)}
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default function TestimonialsPage() {
  return (
    <Suspense fallback={<div>Cargando testimonios...</div>}>
      <TestimonialsContent />
    </Suspense>
  )
}