'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getSession } from '@/lib/actions/session'

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    const redirectToUserDashboard = async () => {
      try {
        const session = await getSession()
        
        // Si no hay sesión válida, redirigir al login
        if (!session.isValid || !session.user) {
          router.replace('/login')
          return
        }

        // Redirigir según el rol del usuario
        switch (session.user.role) {
          case 'ADMINISTRATOR':
            router.replace('/dashboard/admin')
            break
          case 'EDITOR':
            router.replace('/dashboard/editor')
            break
          case 'VISITOR':
            router.replace('/dashboard/visitor')
            break
          default:
            // Si el rol no es reconocido, redirigir al visitor por defecto
            router.replace('/dashboard/visitor')
        }
      } catch (error) {
        console.error('Error al obtener la sesión:', error)
        // En caso de error, redirigir al login
        router.replace('/login')
      }
    }

    redirectToUserDashboard()
  }, [router])

  // Mostrar un loading mientras se determina el rol
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Cargando dashboard...</p>
      </div>
    </div>
  )
}
