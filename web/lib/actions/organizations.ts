'use server'

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

interface Organization {
    id: string
    createdAt: Date
    updatedAt: Date
    name: string
    description: string
    logoUrl: string | null
    questionText: string | null
}

interface UserOrganization {
    id: string
    createdAt: Date
    updatedAt: Date
    userId: string
    organizationId: string
    role: 'admin' | 'editor'
    organization: Organization
}

export interface CreateOrganizationData {
    name: string
    description?: string
    questionText?: string
}

export interface ActionResponse<T> {
    success: boolean
    data?: T
    error?: string
}

export async function createOrganizationAction(
    data: CreateOrganizationData
): Promise<ActionResponse<Organization>> {
    try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

        // Obtener token de las cookies
        const cookieStore = await cookies()
        const token = cookieStore.get('auth_token')?.value

        if (!token) {
            throw new Error('No autenticado')
        }

        const response = await fetch(`${API_URL}/organizations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            console.error('❌ Error creating organization:', errorData)
            throw new Error(errorData.message || 'Error al crear organización')
        }

        const newOrganization = (await response.json()) as Organization

        console.log('✅ Organización creada:', newOrganization)

        // Obtener las organizaciones del usuario actualizadas
        const userOrgsResponse = await fetch(`${API_URL}/organizations`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })

        if (userOrgsResponse.ok) {
            const organizations = (await userOrgsResponse.json()) as Organization[]

            // Actualizar cookies con las organizaciones
            const cookieOptions = {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax' as const,
                path: '/',
            }

            // Crear UserOrganizations simulados (el backend debería devolverlos así)
            const userOrganizations: UserOrganization[] = organizations.map(org => ({
                id: '', // El backend debería devolver esto
                createdAt: new Date(),
                updatedAt: new Date(),
                userId: '',
                organizationId: org.id,
                role: 'admin' as const,
                organization: org,
            }))

            cookieStore.set(
                'user_organizations',
                JSON.stringify(userOrganizations),
                cookieOptions
            )

            // Establecer la nueva organización como actual
            cookieStore.set(
                'current_organization',
                JSON.stringify(newOrganization),
                cookieOptions
            )

            console.log('🍪 Cookies actualizadas con nueva organización')
        }

        // Revalidar para limpiar caché
        revalidatePath('/', 'layout')

        return {
            success: true,
            data: newOrganization,
        }
    } catch (error: any) {
        console.error('❌ Error en createOrganizationAction:', error)

        return {
            success: false,
            error: error?.message || 'Error al crear organización',
        }
    }
}
