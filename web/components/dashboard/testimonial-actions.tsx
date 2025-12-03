"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MoreVertical, Check, X, Eye, EyeOff, Trash2, Maximize2 } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { TestimonialPreviewDialog } from "@/components/dashboard/testimonial-preview-dialog"
import { useUserRole } from "@/hooks/use-user-role"
import { useToast } from "@/hooks/use-toast"
import {
    approveTestimonialAction,
    rejectTestimonialAction,
    publishTestimonialAction,
    deleteTestimonialAction
} from "@/lib/actions/testimonials"

interface TestimonialActionsProps {
    testimonial: any
}

export function TestimonialActions({ testimonial }: TestimonialActionsProps) {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const [showPreview, setShowPreview] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)

    const { isAdmin, hasRole, isLoading } = useUserRole()
    const router = useRouter()
    const { toast } = useToast()

    const currentStatus = testimonial.status?.toUpperCase()

    const handleAction = async (action: string) => {
        if (action === 'view') {
            setShowPreview(true)
            return
        }

        if (action === 'delete') {
            setShowDeleteConfirm(true)
            return
        }

        setIsProcessing(true)
        let result

        try {
            switch (action) {
                case 'approve':
                    result = await approveTestimonialAction(testimonial.id)
                    break
                case 'reject':
                    result = await rejectTestimonialAction(testimonial.id)
                    break
                case 'publish':
                    result = await publishTestimonialAction(testimonial.id)
                    break
                case 'unpublish':
                    // Despublicar = volver a approved
                    result = await approveTestimonialAction(testimonial.id)
                    break
                default:
                    return
            }

            if (result.success) {
                toast({
                    title: "Éxito",
                    description: result.message,
                })
                setShowPreview(false)
                router.refresh() // Actualizar datos
            } else {
                toast({
                    title: "Error",
                    description: result.error,
                    variant: "destructive"
                })
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Ocurrió un error inesperado",
                variant: "destructive"
            })
        } finally {
            setIsProcessing(false)
        }
    }

    const handleConfirmDelete = async () => {
        setIsProcessing(true)

        try {
            const result = await deleteTestimonialAction(testimonial.id)

            if (result.success) {
                toast({
                    title: "Eliminado",
                    description: result.message,
                    variant: "destructive"
                })
                setShowDeleteConfirm(false)
                router.refresh()
            } else {
                toast({
                    title: "Error",
                    description: result.error,
                    variant: "destructive"
                })
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Ocurrió un error al eliminar",
                variant: "destructive"
            })
        } finally {
            setIsProcessing(false)
        }
    }

    // Determinar qué acciones mostrar según el estado actual y el rol
    const getAvailableActions = () => {
        const actions = []

        // Siempre mostrar opción de ver detalle
        actions.push({
            label: 'Ver Detalle',
            icon: Maximize2,
            action: 'view',
            variant: 'default' as const
        })

        // Desde PENDING: solo aprobar o rechazar (Editor y Admin)
        if (currentStatus === 'PENDING') {
            if (hasRole('editor')) {
                actions.push({
                    label: 'Aprobar',
                    icon: Check,
                    action: 'approve',
                    variant: 'default' as const
                })
                actions.push({
                    label: 'Rechazar',
                    icon: X,
                    action: 'reject',
                    variant: 'default' as const
                })
            }
        }

        // Desde APPROVED: publicar (solo Admin) o rechazar (Editor y Admin)
        if (currentStatus === 'APPROVED') {
            if (isAdmin) {
                actions.push({
                    label: 'Publicar',
                    icon: Eye,
                    action: 'publish',
                    variant: 'default' as const
                })
            }
            if (hasRole('editor')) {
                actions.push({
                    label: 'Rechazar',
                    icon: X,
                    action: 'reject',
                    variant: 'default' as const
                })
            }
        }

        // Desde PUBLISHED: solo admin puede despublicar o rechazar
        if (currentStatus === 'PUBLISHED') {
            if (isAdmin) {
                actions.push({
                    label: 'Despublicar',
                    icon: EyeOff,
                    action: 'unpublish',
                    variant: 'default' as const
                })
                actions.push({
                    label: 'Rechazar',
                    icon: X,
                    action: 'reject',
                    variant: 'default' as const
                })
            }
        }

        // Desde REJECTED: aprobar (Editor y Admin) o eliminar (solo Admin)
        if (currentStatus === 'REJECTED') {
            if (hasRole('editor')) {
                actions.push({
                    label: 'Aprobar',
                    icon: Check,
                    action: 'approve',
                    variant: 'default' as const
                })
            }
            if (isAdmin) {
                actions.push({
                    label: 'Eliminar',
                    icon: Trash2,
                    action: 'delete',
                    variant: 'destructive' as const
                })
            }
        }

        return actions
    }

    const availableActions = getAvailableActions()

    // Mostrar loading mientras se cargan los permisos
    if (isLoading) {
        return (
            <Button variant="ghost" size="sm" disabled>
                <MoreVertical className="h-4 w-4" />
            </Button>
        )
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" disabled={isProcessing}>
                        <MoreVertical className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {availableActions.map((action, index) => {
                        const Icon = action.icon
                        const isDestructive = action.variant === 'destructive'
                        // Separador antes de eliminar o después de Ver Detalle
                        const showSeparator = index === 1 || (index > 1 && isDestructive)

                        return (
                            <div key={action.action}>
                                {showSeparator && <DropdownMenuSeparator />}
                                <DropdownMenuItem
                                    onClick={() => handleAction(action.action)}
                                    className={isDestructive ? 'text-destructive focus:text-destructive' : ''}
                                    disabled={isProcessing}
                                >
                                    <Icon className="mr-2 h-4 w-4" />
                                    {action.label}
                                </DropdownMenuItem>
                            </div>
                        )
                    })}
                </DropdownMenuContent>
            </DropdownMenu>

            <ConfirmDialog
                open={showDeleteConfirm}
                onOpenChange={setShowDeleteConfirm}
                title="Eliminar Testimonio"
                description="¿Estás seguro de que deseas eliminar este testimonio? Esta acción no se puede deshacer."
                onConfirm={handleConfirmDelete}
                confirmText="Eliminar"
                cancelText="Cancelar"
                variant="destructive"
            />

            <TestimonialPreviewDialog
                open={showPreview}
                onOpenChange={setShowPreview}
                testimonial={testimonial}
                onAction={handleAction}
            />
        </>
    )
}
