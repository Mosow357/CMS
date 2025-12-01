'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

// Tipo completo de Organization
interface Organization {
  id: string
  createdAt: Date
  updatedAt: Date
  name: string
  description: string
  logoUrl: string | null
  questionText: string | null
}

// Tipo completo de UserOrganization
interface UserOrganization {
  id: string
  createdAt: Date
  updatedAt: Date
  userId: string
  organizationId: string
  role: 'admin' | 'editor'
  organization: Organization
}

// Tipo que devuelve el backend en el login
interface RequestUser {
  id: string
  createdAt: Date
  updatedAt: Date
  email: string
  username: string
  name: string
  token: string
  tokenExpiredAt: Date
  userOrganizations: UserOrganization[]
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

    // Usar fetch directamente para evitar problemas con el API client
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: credentials.username,
        password: credentials.password,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || 'Error al iniciar sesión')
    }

    const userData = (await response.json()) as RequestUser

    if (!userData || !userData.id) {
      console.error('❌ Datos de usuario inválidos:', userData)
      throw new Error('Respuesta inválida del servidor')
    }

    console.log('👤 Datos del usuario procesados:', {
      id: userData.id,
      username: userData.username,
      hasToken: !!userData.token,
      hasOrganizations: !!userData.userOrganizations,
      orgCount: userData.userOrganizations?.length || 0,
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

    // Guardar organizaciones completas en cookies
    cookieStore.set(
      'user_organizations',
      JSON.stringify(userData.userOrganizations || []),
      cookieOptions
    )

    // Seleccionar organización por defecto (la primera)
    if (userData.userOrganizations && userData.userOrganizations.length > 0) {
      const defaultOrg = userData.userOrganizations[0].organization
      cookieStore.set(
        'current_organization',
        JSON.stringify(defaultOrg),
        cookieOptions
      )
      console.log('🏢 Organización por defecto:', defaultOrg.name)
    } else {
      console.log('⚠️ Usuario sin organizaciones')
    }

    console.log('🍪 Cookies guardadas correctamente')

    // Revalida para limpiar cualquier dato de sesión cacheado
    revalidatePath('/', 'layout')

    // Determina la redirección - siempre redirige al dashboard principal
    const redirectPath = '/dashboard'

    console.log('🎯 Redirigiendo a:', redirectPath)

    return {
      success: true,
      data: {
        token: userData.token,
        expiredAt: userData.tokenExpiredAt,
        user: userInfo,
        redirectPath,
      },
    }
  } catch (error: any) {
    console.error('❌ Login error:', error)

    // Extraer mensaje de error de la respuesta
    let errorMessage = 'Error de conexión. Por favor intenta nuevamente.'
    if (error?.message) {
      errorMessage = error.message
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
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

    // Concatenar name y lastname en un solo campo
    const fullName = data.lastname
      ? `${data.name} ${data.lastname}`.trim()
      : data.name || ''

    // Preparar datos sin lastname
    const requestData = {
      username: data.username,
      email: data.email,
      password: data.password,
      name: fullName,
    }

    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    })

    const contentType = response.headers.get('content-type')

    if (!response.ok) {
      // Intentar parsear como JSON si es posible
      if (contentType?.includes('application/json')) {
        const errorData = await response.json().catch(() => ({}))
        console.error('Backend error:', errorData)
        throw new Error(errorData.message || 'Error al registrar usuario')
      } else {
        const errorText = await response.text()
        console.error('Error response (not JSON):', errorText.substring(0, 200))
        throw new Error('Error al registrar usuario')
      }
    }

    // Verificar que la respuesta sea JSON
    if (!contentType?.includes('application/json')) {
      const responseText = await response.text()
      console.error('Expected JSON but got:', responseText.substring(0, 200))
      throw new Error('Respuesta inválida del servidor')
    }

    const result = (await response.json()) as RegisterResponse

    return {
      success: true,
      data: result,
    }
  } catch (error: any) {
    console.error('Register error:', error)

    let errorMessage = 'Error de conexión. Por favor intenta nuevamente.'
    if (error?.message) {
      errorMessage = error.message
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
  cookieStore.delete('user_organizations')
  cookieStore.delete('current_organization')

  // Revalida para limpiar caché de sesión
  revalidatePath('/', 'layout')

  redirect('/login')
}
