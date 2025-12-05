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

        const userOrganizations = JSON.parse(userOrgsCookie)

        console.log('📦 UserOrganizations desde cookies:', userOrganizations)

        // El backend puede devolver dos formatos diferentes:
        // 1. Después de login: [{ id, userId, organizationId, role, organization: {...} }]
        // 2. Después de crear org: [{ id, name, description, ... }] (organización directa)

        return userOrganizations
            .filter((item: any) => {
                // Filtrar elementos válidos
                return item.organization || item.id // Tiene organization anidada O es una organización directa
            })
            .map((item: any) => {
                // Si tiene organization anidada (formato de login)
                if (item.organization) {
                    return {
                        userOrganizationId: item.id, // ID único de la relación user-org
                        id: item.organization.id,
                        name: item.organization.name,
                        description: item.organization.description,
                        logoUrl: item.organization.logoUrl,
                        questionText: item.organization.questionText,
                        role: item.role, // admin, editor, o viewer
                    }
                }

                // Si es organización directa (formato después de crear)
                // Necesitamos extraer el rol de userOrganizations anidado
                const userOrg = item.userOrganizations?.[0]
                return {
                    userOrganizationId: userOrg?.id || item.id, // ID único de la relación
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    logoUrl: item.logoUrl,
                    questionText: item.questionText,
                    role: userOrg?.role || 'admin', // Por defecto admin si no hay rol
                }
            })

        // Deduplicar organizaciones: si un usuario tiene la misma org con múltiples roles,
        // usar el rol más alto (admin > editor > viewer)
        const roleHierarchy: Record<string, number> = { admin: 3, editor: 2, viewer: 1 }
        const orgMap = new Map<string, any>()

        organizations.forEach((org: any) => {
            const existing = orgMap.get(org.id)
            if (!existing || roleHierarchy[org.role] > roleHierarchy[existing.role]) {
                orgMap.set(org.id, org)
            }
        })

        return Array.from(orgMap.values())
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
        // Puede estar en formato: { organization: {...} } o directamente { id, name, ... }
        const selectedUserOrg = userOrgs.find((item: any) => {
            if (item.organization) {
                return item.organization.id === organizationId
            }
            return item.id === organizationId
        })

        if (!selectedUserOrg) {
            return { success: false, error: 'Organización no encontrada' }
        }

        // Extraer la organización del formato correcto
        const selectedOrg = selectedUserOrg.organization || selectedUserOrg

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

        console.log('✅ Organización cambiada a:', selectedOrg.name)

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
            console.log('⚠️ No token or current organization found')
            return {
                total: 0,
                pending: 0,
                approved: 0,
                published: 0,
                rejected: 0,
            }
        }

        const currentOrg = JSON.parse(currentOrgCookie)
        console.log('📊 Fetching stats for organization:', currentOrg.id)

        const apiClient = createApiClient(token)

        // Obtener todos los testimonios de la organización
        const response = await apiClient.testimonials.testimonialsControllerFindAll(
            { organitationId: currentOrg.id },
            { format: 'json' }
        )

        console.log('📦 Response received:', {
            status: response.status,
            hasData: !!response.data,
            dataType: typeof response.data,
            isArray: Array.isArray(response.data)
        })

        // Asegurarse de que tenemos un array
        const testimonials = Array.isArray(response.data) ? response.data : []

        console.log(`✅ Found ${testimonials.length} testimonials`)

        // Log de ejemplo para ver el formato del status
        if (testimonials.length > 0) {
            console.log('📝 Ejemplo de testimonial:', {
                id: testimonials[0].id,
                status: testimonials[0].status,
                statusType: typeof testimonials[0].status
            })
        }

        // Calcular estadísticas - La API devuelve status en MAYÚSCULAS
        const stats = {
            total: testimonials.length,
            pending: testimonials.filter((t: any) => t.status?.toUpperCase() === 'PENDING').length,
            approved: testimonials.filter((t: any) => t.status?.toUpperCase() === 'APPROVED').length,
            published: testimonials.filter((t: any) => t.status?.toUpperCase() === 'PUBLISHED').length,
            rejected: testimonials.filter((t: any) => t.status?.toUpperCase() === 'REJECTED').length,
        }

        console.log('📈 Stats calculated:', stats)

        return stats
    } catch (error: any) {
        console.error('❌ Error getting testimonial stats:', {
            message: error.message,
            status: error.status,
            response: error.response,
            stack: error.stack
        })
        return {
            total: 0,
            pending: 0,
            approved: 0,
            published: 0,
            rejected: 0,
        }
    }
}

