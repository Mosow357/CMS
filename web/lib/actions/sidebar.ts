'use server'

import { cookies } from 'next/headers'
import { createApiClient } from '@/lib/api/client'

/**
 * Obtiene los datos del usuario actual desde las cookies
 */
export async function getCurrentUserData() {
    try {
        const cookieStore = await cookies()
        const userCookie = cookieStore.get('user')?.value

        if (!userCookie) {
            return null
        }

        const user = JSON.parse(userCookie)

        return {
            name: user.name || user.username,
            email: user.email,
            username: user.username,
            id: user.id,
        }
    } catch (error) {
        console.error('Error getting current user data:', error)
        return null
    }
}

/**
 * Obtiene las organizaciones del usuario desde las cookies
 */
export async function getUserOrganizations() {
    try {
        const cookieStore = await cookies()
        const userOrgsCookie = cookieStore.get('user_organizations')?.value

        if (!userOrgsCookie) {
            return []
        }

        const organizations = JSON.parse(userOrgsCookie)

        console.log('📦 Organizaciones desde cookies:', organizations)

        // El backend devuelve un array de organizaciones directamente
        // con userOrganizations anidado dentro de cada organización
        return organizations.map((org: any) => {
            // Buscar el rol del usuario en esta organización
            const userOrg = org.userOrganizations?.[0]

            return {
                id: org.id,
                name: org.name,
                description: org.description,
                logoUrl: org.logoUrl,
                role: userOrg?.role || 'editor',
            }
        })
    } catch (error) {
        console.error('Error getting user organizations:', error)
        return []
    }
}

/**
 * Obtiene la organización actual desde las cookies
 */
export async function getCurrentOrganization() {
    try {
        const cookieStore = await cookies()
        const currentOrgCookie = cookieStore.get('current_organization')?.value

        if (!currentOrgCookie) {
            return null
        }

        return JSON.parse(currentOrgCookie)
    } catch (error) {
        console.error('Error getting current organization:', error)
        return null
    }
}

/**
 * Cambia la organización actual
 */
export async function switchOrganizationAction(organizationId: string) {
    try {
        const cookieStore = await cookies()
        const userOrgsCookie = cookieStore.get('user_organizations')?.value

        if (!userOrgsCookie) {
            return { success: false, error: 'No se encontraron organizaciones' }
        }

        const userOrgs = JSON.parse(userOrgsCookie)

        // Buscar la organización seleccionada
        const selectedOrg = userOrgs.find(
            (org: any) => org.id === organizationId
        )

        if (!selectedOrg) {
            return { success: false, error: 'Organización no encontrada' }
        }

        // Actualizar la cookie de organización actual
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax' as const,
            path: '/',
        }

        cookieStore.set(
            'current_organization',
            JSON.stringify(selectedOrg),
            cookieOptions
        )

        return { success: true, data: selectedOrg }
    } catch (error: any) {
        console.error('Error switching organization:', error)
        return { success: false, error: error.message }
    }
}

/**
 * Obtiene las estadísticas de testimonios de la organización actual
 */
export async function getTestimonialStatsAction() {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('auth_token')?.value
        const currentOrgCookie = cookieStore.get('current_organization')?.value

        if (!token || !currentOrgCookie) {
            return {
                total: 0,
                pending: 0,
                approved: 0,
                published: 0,
                rejected: 0,
            }
        }

        const currentOrg = JSON.parse(currentOrgCookie)
        const apiClient = createApiClient(token)

        // Obtener todos los testimonios de la organización
        const response = await apiClient.testimonials.testimonialsControllerFindAll(
            { organitationId: currentOrg.id },
            { format: 'json' }
        )

        const testimonials = response.data as unknown as any[]

        // Calcular estadísticas
        const stats = {
            total: testimonials.length,
            pending: testimonials.filter(t => t.status === 'PENDING').length,
            approved: testimonials.filter(t => t.status === 'APPROVED').length,
            published: testimonials.filter(t => t.status === 'PUBLISHED').length,
            rejected: testimonials.filter(t => t.status === 'REJECTED').length,
        }

        return stats
    } catch (error) {
        console.error('Error getting testimonial stats:', error)
        return {
            total: 0,
            pending: 0,
            approved: 0,
            published: 0,
            rejected: 0,
        }
    }
}
