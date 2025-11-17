import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Definir rutas públicas que no requieren autenticación
const publicRoutes = ['/login', '/register']
const authRoutes = ['/login', '/register']

// Definir mapeos de rutas basadas en roles
const roleRoutes: Record<string, string[]> = {
    ADMINISTRATOR: ['/admin', '/dashboard', '/testimonials', '/users'],
    EDITOR: ['/dashboard', '/testimonials'],
    VISITOR: ['/dashboard'],
}

// Rutas predeterminadas de redirección para cada rol
const defaultRolePaths: Record<string, string> = {
    ADMINISTRATOR: '/admin',
    EDITOR: '/dashboard',
    VISITOR: '/dashboard',
}

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Obtener token y usuario de las cookies
    const token = request.cookies.get('auth_token')?.value
    const userCookie = request.cookies.get('user')?.value

    let user: { role: string } | null = null
    if (userCookie) {
        try {
            user = JSON.parse(userCookie)
        } catch {
            // Cookie de usuario inválida
        }
    }

    const isAuthenticated = !!token && !!user
    const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route))
    const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))

    // Si el usuario está autenticado e intenta acceder a rutas de autenticación, redirigir al dashboard
    if (isAuthenticated && isAuthRoute) {
        const role = user?.role as string
        const defaultPath = defaultRolePaths[role] || '/dashboard'
        return NextResponse.redirect(new URL(defaultPath, request.url))
    }

    // Si el usuario no está autenticado e intenta acceder a rutas protegidas
    if (!isAuthenticated && !isPublicRoute) {
        const loginUrl = new URL('/login', request.url)
        loginUrl.searchParams.set('callbackUrl', pathname)
        return NextResponse.redirect(loginUrl)
    }

    // Comprobar acceso basado en el rol
    if (isAuthenticated && user) {
        const userRole = user.role as string
        const allowedRoutes = roleRoutes[userRole] || []

        // Comprobar si la ruta actual requiere un rol específico
        const requiresAuth = !isPublicRoute
        const hasAccess = allowedRoutes.some((route) => pathname.startsWith(route)) ||
            isPublicRoute ||
            pathname === '/'

        if (requiresAuth && !hasAccess) {
            // El usuario no tiene acceso a esta ruta, redirigir a su ruta predeterminada
            const defaultPath = defaultRolePaths[userRole] || '/dashboard'
            return NextResponse.redirect(new URL(defaultPath, request.url))
        }
    }

    return NextResponse.next()
}

// Configurar en qué rutas se ejecuta el middleware
export const config = {
    matcher: [
        /*
         * Coincide con todas las rutas de solicitud excepto:
         * - api (rutas API)
         * - _next/static (archivos estáticos)
         * - _next/image (archivos de optimización de imágenes)
         * - favicon.ico (archivo favicon)
         * - carpeta public
         */
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
