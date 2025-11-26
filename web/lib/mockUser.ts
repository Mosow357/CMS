// Mock de usuario actual con rol
export type UserRole = 'admin' | 'editor'

export interface MockUser {
    id: string
    email: string
    username: string
    name: string
    role: UserRole
    organizationId: string
}

// Usuario mock - cambiar el rol aquí para probar diferentes permisos
export const mockCurrentUser: MockUser = {
    id: 'user-1',
    email: 'admin@example.com',
    username: 'admin',
    name: 'Admin User',
    role: 'editor', // Cambiar a 'editor' para probar permisos de editor
    organizationId: 'org-techstart'
}

// Helper para verificar permisos
export const canApprove = (role: UserRole) => true // Ambos roles pueden aprobar
export const canReject = (role: UserRole) => true // Ambos roles pueden rechazar
export const canPublish = (role: UserRole) => role === 'admin' // Solo admin puede publicar
export const canUnpublish = (role: UserRole) => role === 'admin' // Solo admin puede despublicar
export const canDelete = (role: UserRole) => role === 'admin' // Solo admin puede eliminar

// Nadie puede volver un testimonio a "pending" - ese estado es solo para nuevos testimonios
export const canSetPending = () => false
