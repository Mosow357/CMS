'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSession } from '@/lib/actions/session'

export default function DashboardPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const redirectToUserDashboard = async () => {
      try {
        console.log('🔍 Obteniendo sesión...')
        const session = await getSession()
        console.log('📋 Sesión obtenida:', { isValid: session.isValid, user: session.user })
        
        // Si no hay sesión válida, redirigir al login
        if (!session.isValid || !session.user) {
          console.log('❌ Sesión no válida, redirigiendo a login')
          router.replace('/login')
          return
        }

        console.log('👤 Rol del usuario:', session.user.role)

        // Redirigir según el rol del usuario
        switch (session.user.role) {
          case 'ADMINISTRATOR':
            console.log('🔄 Redirigiendo a /dashboard/admin')
            router.replace('/dashboard/admin')
            break
          case 'EDITOR':
            console.log('🔄 Redirigiendo a /dashboard/editor')
            router.replace('/dashboard/editor')
            break
          case 'VISITOR':
            console.log('🔄 Redirigiendo a /dashboard/visitor')
            router.replace('/dashboard/visitor')
            break
          default:
            // Si el rol no es reconocido, redirigir al visitor por defecto
            console.log('⚠️ Rol no reconocido, redirigiendo a /dashboard/visitor')
            router.replace('/dashboard/visitor')
        }
      } catch (error) {
        console.error('💥 Error al obtener la sesión:', error)
        // En caso de error, redirigir al login
        router.replace('/login')
      } finally {
        setIsLoading(false)
      }
    }

    redirectToUserDashboard()
  }, [router])

  // Mostrar un loading mientras se determina el rol
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando dashboard...</p>
        </div>
      </div>
    )
  }

  // Si llegamos aquí sin redirección, mostrar un mensaje de error
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <p className="text-muted-foreground">Error al cargar el dashboard</p>
      </div>
    </div>
  )
}
