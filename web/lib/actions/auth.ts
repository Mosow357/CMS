'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { apiClient } from '@/lib/api/client'

export interface LoginCredentials {
  username: string
  password: string
}

export interface RegisterData {
  username: string
  email: string
  password: string
  name?: string
  lastname?: string
}

export interface AuthResponse {
  token: string
  expiredAt: Date
  redirectPath: string
  user: {
    id: string
    username: string
    email: string
    name?: string
    lastname?: string
    role: string
  }
}

export interface RegisterResponse {
  message: string
  success: boolean
}

export interface ActionResponse<T> {
  success: boolean
  data?: T
  error?: string
}

export async function loginAction(
  credentials: LoginCredentials
): Promise<ActionResponse<AuthResponse>> {
  try {
    const response = await apiClient.auth.authControllerLogin(
      credentials as any,
      { format: 'json' }
    )

    const data = response.data as unknown as AuthResponse

    // Guardar el token en cookies
    const cookieStore = await cookies()
    cookieStore.set('auth_token', data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 días
      path: '/',
    })

    // Guardar el usuario en cookies
    cookieStore.set('user', JSON.stringify(data.user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })

    // Revalida para limpiar cualquier dato de sesión cacheado
    revalidatePath('/', 'layout')

    // Determina la redirección según el rol
    const role = data.user.role
    const roleRedirects: Record<string, string> = {
      ADMINISTRATOR: '/admin',
      EDITOR: '/dashboard',
      VISITOR: '/dashboard',
    }
    const redirectPath = roleRedirects[role] || '/dashboard'

    return {
      success: true,
      data: {
        ...data,
        redirectPath, // Incluye la ruta de redirección en la respuesta
      },
    }
  } catch (error: any) {
    console.error('Login error:', error)

    // Extraer mensaje de error de la respuesta
    let errorMessage = 'Error de conexión. Por favor intenta nuevamente.'
    if (error?.error?.message) {
      errorMessage = error.error.message
    }

    return {
      success: false,
      error: errorMessage,
    }
  }
}

export async function registerAction(
  data: RegisterData
): Promise<ActionResponse<RegisterResponse>> {
  try {
    const response = await apiClient.auth.authControllerRegister(
      data as any,
      { format: 'json' }
    )

    const result = response.data as unknown as RegisterResponse

    return {
      success: true,
      data: result,
    }
  } catch (error: any) {
    console.error('Register error:', error)

    // Extraer mensaje de error de la respuesta
    let errorMessage = 'Error de conexión. Por favor intenta nuevamente.'
    if (error?.error?.message) {
      errorMessage = error.error.message
    }

    return {
      success: false,
      error: errorMessage,
    }
  }
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete('auth_token')
  cookieStore.delete('user')

  // Revalida para limpiar caché de sesión
  revalidatePath('/', 'layout')

  redirect('/login')
}
