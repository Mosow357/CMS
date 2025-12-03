import React from 'react'

interface ConfirmEmailProps {
  title?: string
  description?: string
  className?: string
}

export const ConfirmEmail: React.FC<ConfirmEmailProps> = ({
  title = 'CONFIRMASTE TU EMAIL',
  description = 'Hemos enviado un correo con un enlace para confirmar tu dirección de email. Revisa tu bandeja de entrada y sigue el enlace para activar tu cuenta.',
  className = ''
}) => {
  return (
    <div className={`rounded-lg border p-4 bg-card ${className}`}>
      <h3 className="text-lg font-semibold mb-2 text-primary">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

export default ConfirmEmail
