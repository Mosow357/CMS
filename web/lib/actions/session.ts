'use server'

import { cache } from 'react'
import { cookies } from 'next/headers'
import { createApiClient } from '@/lib/api/client'

export type UserRole = 'ADMINISTRATOR' | 'EDITOR' | 'VISITOR'

export interface SessionUser {
    id: string
    username: string
    email: string
    name?: string
    lastname?: string
    role: UserRole
}

export interface Session {
    user: SessionUser | null
    token: string | null
    isValid: boolean
}

/**
 * Getter de sesión cacheada
 */
export const getSession = cache(async (): Promise<Session> => {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('auth_token')?.value
        const userCookie = cookieStore.get('user')?.value

        // Sin token => no hay sesión
        if (!token) {
            return {
                user: null,
                token: null,
                isValid: false,
            }
        }

        // Intentar parsear el usuario cacheado desde la cookie
        let user: SessionUser | null = null
        if (userCookie) {
            try {
                user = JSON.parse(userCookie) as SessionUser
            } catch {
                // Cookie de usuario inválida, se validará con la API
            }
        }

        // Validar el token con el backend
        const apiClient = createApiClient(token)

        try {
            // Usar el endpoint validate-token para verificar si el token sigue siendo válido
            await apiClient.auth.authControllerValidateToken({
                format: 'json',
            })

            // El token es válido, retornar el usuario cacheado
            if (user) {
                return {
                    user,
                    token,
                    isValid: true,
                }
            }
        } catch (error) {
            // Token inválido o expirado, limpiar cookies
            cookieStore.delete('auth_token')
            cookieStore.delete('user')

            return {
                user: null,
                token: null,
                isValid: false,
            }
        }

        // Si tenemos un token pero no usuario
        if (!user && token) {
            // TODO: obtener información del usuario
            return {
                user: null,
                token,
                isValid: false,
            }
        }

        return {
            user,
            token,
            isValid: true,
        }
    } catch (error) {
        console.error('Error obteniendo la sesión:', error)
        return {
            user: null,
            token: null,
            isValid: false,
        }
    }
})

/**
 * Obtiene el usuario actual
 */
export async function getCurrentUser(): Promise<SessionUser | null> {
    const session = await getSession()
    return session.user
}

/**
 * Verifica si el usuario tiene el rol requerido
 */
export async function hasRole(requiredRole: UserRole | UserRole[]): Promise<boolean> {
    const session = await getSession()
    if (!session.user) return false

    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole]
    return roles.includes(session.user.role)
}

/**
 * Verifica si el usuario está autenticado
 */
export async function isAuthenticated(): Promise<boolean> {
    const session = await getSession()
    return session.isValid && session.user !== null
}

/**
 * Chequeo de jerarquía de roles (ADMINISTRATOR > EDITOR > VISITOR)
 */
const roleHierarchy: Record<UserRole, number> = {
    ADMINISTRATOR: 3,
    EDITOR: 2,
    VISITOR: 1,
}

export async function hasMinimumRole(minimumRole: UserRole): Promise<boolean> {
    const session = await getSession()
    if (!session.user) return false

    return roleHierarchy[session.user.role] >= roleHierarchy[minimumRole]
}

