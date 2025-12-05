'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { createApiClient } from '@/lib/api/client'
import { isCurrentUserAdmin, hasRole } from '@/lib/utils/auth-utils'

/**
 * Obtiene la lista de testimonios con filtros opcionales
 */
export async function getTestimonialsAction(filters?: {
    status?: string
    categoryId?: string
    page?: number
    itemsPerPage?: number
}) {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('auth_token')?.value
        const currentOrgCookie = cookieStore.get('current_organization')?.value

        if (!token || !currentOrgCookie) {
            return { success: false, error: 'No autenticado', data: [] }
        }

        const currentOrg = JSON.parse(currentOrgCookie)
        const apiClient = createApiClient(token)

        const response = await apiClient.testimonials.testimonialsControllerFindAll(
            {
                organitationId: currentOrg.id,
                status: filters?.status,
                page: filters?.page || 1,
                itemsPerPage: filters?.itemsPerPage || 10,
            },
            { format: 'json' }
        )

        const testimonials = response.data as unknown as any[]

        // La API no devuelve metadata de paginación, así que calculamos el total
        // Nota: Esto es una limitación - idealmente la API debería devolver el total
        return {
            success: true,
            data: testimonials,
            pagination: {
                page: filters?.page || 1,
                itemsPerPage: filters?.itemsPerPage || 10,
                total: testimonials.length, // Esto solo muestra los items de la página actual
            }
        }
    } catch (error: any) {
        console.error('Error getting testimonials:', error)
        return {
            success: false,
            error: error.message || 'Error al obtener testimonios',
            data: []
        }
    }
}

/**
 * Obtiene un testimonio por ID
 */
export async function getTestimonialByIdAction(id: string) {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('auth_token')?.value

        if (!token) {
            return { success: false, error: 'No autenticado' }
        }

        const apiClient = createApiClient(token)

        const response = await apiClient.testimonials.testimonialsControllerFindOne(
            id,
            { format: 'json' }
        )

        return {
            success: true,
            data: response.data as unknown as any
        }
    } catch (error: any) {
        console.error('Error getting testimonial:', error)
        return {
            success: false,
            error: error.message || 'Error al obtener testimonio'
        }
    }
}

/**
 * Aprueba un testimonio pendiente (Editor y Admin)
 */
export async function approveTestimonialAction(testimonialId: string) {
    try {
        // Verificar permisos - Editor y Admin pueden aprobar
        const canApprove = await hasRole('editor')

        if (!canApprove) {
            return {
                success: false,
                error: 'No tienes permisos para aprobar testimonios'
            }
        }

        const cookieStore = await cookies()
        const token = cookieStore.get('auth_token')?.value

        if (!token) {
            return { success: false, error: 'No autenticado' }
        }

        const apiClient = createApiClient(token)

        // Actualizar estado a approved
        await apiClient.testimonials.testimonialsControllerUpdate(
            testimonialId,
            { status: 'approved' } as any,
            { format: 'json' }
        )

        // Revalidar rutas para actualizar datos
        revalidatePath('/dashboard/testimonials')
        revalidatePath('/dashboard')

        return { success: true, message: 'Testimonio aprobado exitosamente' }
    } catch (error: any) {
        console.error('Error approving testimonial:', error)
        return {
            success: false,
            error: error.message || 'Error al aprobar testimonio'
        }
    }
}

/**
 * Rechaza un testimonio pendiente (Editor y Admin)
 */
export async function rejectTestimonialAction(testimonialId: string) {
    try {
        // Verificar permisos - Editor y Admin pueden rechazar
        const canReject = await hasRole('editor')

        if (!canReject) {
            return {
                success: false,
                error: 'No tienes permisos para rechazar testimonios'
            }
        }

        const cookieStore = await cookies()
        const token = cookieStore.get('auth_token')?.value

        if (!token) {
            return { success: false, error: 'No autenticado' }
        }

        const apiClient = createApiClient(token)

        // Actualizar estado a rejected
        await apiClient.testimonials.testimonialsControllerUpdate(
            testimonialId,
            { status: 'rejected' } as any,
            { format: 'json' }
        )

        // Revalidar rutas
        revalidatePath('/dashboard/testimonials')
        revalidatePath('/dashboard')

        return { success: true, message: 'Testimonio rechazado' }
    } catch (error: any) {
        console.error('Error rejecting testimonial:', error)
        return {
            success: false,
            error: error.message || 'Error al rechazar testimonio'
        }
    }
}

/**
 * Publica un testimonio aprobado (Solo Admin)
 */
export async function publishTestimonialAction(testimonialId: string) {
    try {
        // Verificar permisos - Solo Admin puede publicar
        const isAdmin = await isCurrentUserAdmin()

        if (!isAdmin) {
            return {
                success: false,
                error: 'Solo los administradores pueden publicar testimonios'
            }
        }

        const cookieStore = await cookies()
        const token = cookieStore.get('auth_token')?.value

        if (!token) {
            return { success: false, error: 'No autenticado' }
        }

        const apiClient = createApiClient(token)

        // Actualizar estado a PUBLISHED
        await apiClient.testimonials.testimonialsControllerUpdate(
            testimonialId,
            { status: 'published' } as any,
            { format: 'json' }
        )

        // Revalidar rutas
        revalidatePath('/dashboard/testimonials')
        revalidatePath('/dashboard')

        return { success: true, message: 'Testimonio publicado exitosamente' }
    } catch (error: any) {
        console.error('Error publishing testimonial:', error)
        return {
            success: false,
            error: error.message || 'Error al publicar testimonio'
        }
    }
}

/**
 * Elimina un testimonio rechazado (Solo Admin)
 */
export async function deleteTestimonialAction(testimonialId: string) {
    try {
        // Verificar permisos - Solo Admin puede eliminar
        const isAdmin = await isCurrentUserAdmin()

        if (!isAdmin) {
            return {
                success: false,
                error: 'Solo los administradores pueden eliminar testimonios'
            }
        }

        const cookieStore = await cookies()
        const token = cookieStore.get('auth_token')?.value

        if (!token) {
            return { success: false, error: 'No autenticado' }
        }

        const apiClient = createApiClient(token)

        // Eliminar testimonio
        await apiClient.testimonials.testimonialsControllerRemove(testimonialId)

        // Revalidar rutas
        revalidatePath('/dashboard/testimonials')
        revalidatePath('/dashboard')

        return { success: true, message: 'Testimonio eliminado exitosamente' }
    } catch (error: any) {
        console.error('Error deleting testimonial:', error)
        return {
            success: false,
            error: error.message || 'Error al eliminar testimonio'
        }
    }
}

/**
 * Actualiza los datos de un testimonio
 */
export async function updateTestimonialAction(
    testimonialId: string,
    data: any
) {
    try {
        // Verificar permisos - Editor y Admin pueden actualizar
        const canUpdate = await hasRole('editor')

        if (!canUpdate) {
            return {
                success: false,
                error: 'No tienes permisos para actualizar testimonios'
            }
        }

        const cookieStore = await cookies()
        const token = cookieStore.get('auth_token')?.value

        if (!token) {
            return { success: false, error: 'No autenticado' }
        }

        const apiClient = createApiClient(token)

        // Actualizar testimonio
        await apiClient.testimonials.testimonialsControllerUpdate(
            testimonialId,
            data,
            { format: 'json' }
        )

        // Revalidar rutas
        revalidatePath('/dashboard/testimonials')
        revalidatePath('/dashboard')

        return { success: true, message: 'Testimonio actualizado exitosamente' }
    } catch (error: any) {
        console.error('Error updating testimonial:', error)
        return {
            success: false,
            error: error.message || 'Error al actualizar testimonio'
        }
    }
}
