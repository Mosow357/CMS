"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Mail } from 'lucide-react'
import ConfirmEmail from '@/components/ui/ConfirmEmail'
import { Button } from '@/components/ui/button'

export default function ConfirmEmailPageRoot() {
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
    <div className="min-h-[70vh] flex items-center justify-center p-6 bg-gradient-to-b from-background to-muted/10">
      <div className="max-w-xl w-full">
        <div className="rounded-2xl border bg-card p-8 shadow-md">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10">
              <Mail className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold">CONFIRMASTE TU EMAIL</h2>
              <p className="text-sm text-muted-foreground mt-1">Revisa tu bandeja de entrada y sigue el enlace para activar tu cuenta.</p>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm">Hemos enviado un correo con un enlace de verificación.</p>
            <p className="text-sm text-muted-foreground mt-2">Si no llega, revisá la carpeta de spam o intenta nuevamente.</p>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <Button onClick={() => router.push('/dashboard')}>Volver</Button>
            <div className="ml-auto text-sm text-muted-foreground">Redirigiendo en {count}s...</div>
          </div>
        </div>
      </div>
    </div>
  )
}
