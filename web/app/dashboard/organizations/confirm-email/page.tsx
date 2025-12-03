"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import ConfirmEmail from '@/components/ui/ConfirmEmail'
import { Button } from '@/components/ui/button'

export default function ConfirmEmailPage() {
  const router = useRouter()
  const [count, setCount] = useState(8)

  useEffect(() => {
    if (count <= 0) {
      router.push('/dashboard')
      return
    }
    const timer = setTimeout(() => setCount(c => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [count, router])

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <ConfirmEmail />

        <div className="mt-4 flex items-center gap-3">
          <Button onClick={() => router.push('/dashboard')}>
            Ir al Dashboard
          </Button>
          <Button variant="ghost" onClick={() => router.push('/dashboard/organizations/new')}>
            Ir a Organizaciones
          </Button>
          <div className="ml-auto text-sm text-muted-foreground">Redirigiendo en {count}s...</div>
        </div>
      </div>
    </div>
  )
}
