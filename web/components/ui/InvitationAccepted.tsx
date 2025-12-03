import React from 'react'

interface InvitationAcceptedProps {
  title?: string
  description?: string
  className?: string
}

export const InvitationAccepted: React.FC<InvitationAcceptedProps> = ({
  title = 'ACEPTASTE LA INVITACIÓN!',
  description = 'Ya formas parte de la organización. Ahora puedes acceder a sus recursos y gestionar contenidos según tus permisos.',
  className = ''
}) => {
  return (
    <div className={`rounded-lg border p-4 bg-card ${className}`}>
      <h3 className="text-lg font-semibold mb-2 text-primary">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}

export default InvitationAccepted
