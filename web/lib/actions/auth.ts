'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
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
    })

    // Guardar el usuario en cookies
    cookieStore.set('user', JSON.stringify(data.user), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
    })

    return {
      success: true,
      data,
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
  redirect('/login')
}

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies()
    const userCookie = cookieStore.get('user')

    if (!userCookie) {
      return null
    }

    return JSON.parse(userCookie.value)
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

export async function getAuthToken(): Promise<string | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')
    return token?.value || null
  } catch (error) {
    console.error('Error getting auth token:', error)
    return null
  }
}
