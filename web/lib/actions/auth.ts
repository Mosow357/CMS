'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { apiClient } from '@/lib/api/client'

// Tipo que devuelve el backend en el login
interface RequestUser {
  id: string
  createdAt: Date
  updatedAt: Date
  email: string
  username: string
  role: string
  name: string
  token: string
  tokenExpiredAt: Date
}

export interface LoginCredentials {
  username: string
  password: string
  rememberMe?: boolean
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
    console.log('🔐 Intentando login con:', { username: credentials.username })

    const response = await apiClient.auth.authControllerLogin(
      { username: credentials.username, password: credentials.password },
      { format: 'json' }
    )
    const userData = response.data as unknown as RequestUser

    console.log('👤 Datos del usuario procesados:', {
      id: userData.id,
      username: userData.username,
      role: userData.role,
      hasToken: !!userData.token
    })

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      path: '/',
    }

    if (credentials.rememberMe) {
      (cookieOptions as any).maxAge = 60 * 60 * 24 * 7
    }

    // Guardar el token en cookies
    const cookieStore = await cookies()
    cookieStore.set('auth_token', userData.token, cookieOptions)

    // Guardar el usuario en cookies (sin el token por seguridad)
    const { token, tokenExpiredAt, ...userInfo } = userData
    cookieStore.set('user', JSON.stringify(userInfo), cookieOptions)

    console.log('🍪 Cookies guardadas correctamente')

    // Revalida para limpiar cualquier dato de sesión cacheado
    revalidatePath('/', 'layout')

    // Determina la redirección - siempre redirige al dashboard principal
    const redirectPath = '/dashboard'

    console.log('🎯 Redirigiendo a:', redirectPath)

    //debe dirigir a la ruta principal
    return {
      success: true,
      data: {
        token: userData.token,
        expiredAt: userData.tokenExpiredAt,
        user: userInfo,
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
