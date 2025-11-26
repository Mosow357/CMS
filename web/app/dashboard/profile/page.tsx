'use client'

import { useState } from 'react'
import { mockCurrentUser } from '@/lib/mockUser'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'

export default function ProfilePage() {
    const { toast } = useToast()
    const [formData, setFormData] = useState({
        name: mockCurrentUser.name,
        username: mockCurrentUser.username,
        email: mockCurrentUser.email,
    })
    const [isEditing, setIsEditing] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const handleSave = () => {
        // Aquí iría la llamada al API para guardar los cambios
        setIsEditing(false)
        toast({
            title: "Perfil actualizado",
            description: "Tus cambios han sido guardados correctamente",
        })
    }

    const handleCancel = () => {
        setFormData({
            name: mockCurrentUser.name,
            username: mockCurrentUser.username,
            email: mockCurrentUser.email,
        })
        setIsEditing(false)
    }

    return (
        <div className="p-0">
            <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">Perfil de Usuario</h1>
                <p className="text-muted-foreground">
                    Gestiona tu información personal y configuración de cuenta
                </p>
            </div>

            <div className="grid gap-6 max-w-2xl">
                {/* Información Personal */}
                <Card>
                    <CardHeader>
                        <CardTitle>Información Personal</CardTitle>
                        <CardDescription>
                            Actualiza tu información de perfil
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nombre Completo</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="username">Usuario</Label>
                            <Input
                                id="username"
                                value={formData.username}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Rol</Label>
                            <div className="flex items-center gap-2">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${mockCurrentUser.role === 'admin'
                                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
                                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                                    }`}>
                                    {mockCurrentUser.role === 'admin' ? 'Administrador' : 'Editor'}
                                </span>
                                <span className="text-sm text-muted-foreground">
                                    (No editable)
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-2 pt-4">
                            {!isEditing ? (
                                <Button onClick={() => setIsEditing(true)}>
                                    Editar Perfil
                                </Button>
                            ) : (
                                <>
                                    <Button onClick={handleSave}>
                                        Guardar Cambios
                                    </Button>
                                    <Button variant="outline" onClick={handleCancel}>
                                        Cancelar
                                    </Button>
                                </>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Seguridad */}
                <Card>
                    <CardHeader>
                        <CardTitle>Seguridad</CardTitle>
                        <CardDescription>
                            Gestiona la seguridad de tu cuenta
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Contraseña</Label>
                            <div className="flex items-center gap-2">
                                <Input
                                    type="password"
                                    value="••••••••"
                                    disabled
                                    className="max-w-xs"
                                />
                                <Button variant="outline" size="sm">
                                    Cambiar Contraseña
                                </Button>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Última actualización: Hace 30 días
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
