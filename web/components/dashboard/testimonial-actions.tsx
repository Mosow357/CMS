"use client"

import { useState } from "react"
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
import { mockCurrentUser, canApprove, canReject, canPublish, canUnpublish, canDelete } from "@/lib/mockUser"
import { DashboardTestimonial } from "@/lib/mockDashboardTestimonials"

interface TestimonialActionsProps {
    testimonial: DashboardTestimonial
    onStatusChange: (newStatus: string) => void
    onDelete: () => void
}

export function TestimonialActions({
    testimonial,
    onStatusChange,
    onDelete
}: TestimonialActionsProps) {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const [showPreview, setShowPreview] = useState(false)
    const userRole = mockCurrentUser.role
    const currentStatus = testimonial.status

    const handleAction = (action: string) => {
        switch (action) {
            case 'approve':
                onStatusChange('approved')
                setShowPreview(false)
                break
            case 'reject':
                onStatusChange('rejected')
                setShowPreview(false)
                break
            case 'publish':
                onStatusChange('published')
                setShowPreview(false)
                break
            case 'unpublish':
                onStatusChange('approved')
                setShowPreview(false)
                break
            case 'delete':
                setShowDeleteConfirm(true)
                setShowPreview(false)
                break
            case 'view':
                setShowPreview(true)
                break
        }
    }

    const handleConfirmDelete = () => {
        onDelete()
        setShowDeleteConfirm(false)
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

        // Desde PENDING: solo aprobar o rechazar
        if (currentStatus === 'pending') {
            if (canApprove(userRole)) {
                actions.push({
                    label: 'Aprobar',
                    icon: Check,
                    action: 'approve',
                    variant: 'default' as const
                })
            }
            if (canReject(userRole)) {
                actions.push({
                    label: 'Rechazar',
                    icon: X,
                    action: 'reject',
                    variant: 'default' as const
                })
            }
        }

        // Desde APPROVED: publicar (admin) o rechazar (ambos)
        if (currentStatus === 'approved') {
            if (canPublish(userRole)) {
                actions.push({
                    label: 'Publicar',
                    icon: Eye,
                    action: 'publish',
                    variant: 'default' as const
                })
            }
            if (canReject(userRole)) {
                actions.push({
                    label: 'Rechazar',
                    icon: X,
                    action: 'reject',
                    variant: 'default' as const
                })
            }
        }

        // Desde PUBLISHED: solo admin puede despublicar o rechazar
        if (currentStatus === 'published') {
            if (canUnpublish(userRole)) {
                actions.push({
                    label: 'Despublicar',
                    icon: EyeOff,
                    action: 'unpublish',
                    variant: 'default' as const
                })
            }
            if (canReject(userRole)) {
                actions.push({
                    label: 'Rechazar',
                    icon: X,
                    action: 'reject',
                    variant: 'default' as const
                })
            }
        }

        // Desde REJECTED: aprobar (ambos) o eliminar (solo admin)
        if (currentStatus === 'rejected') {
            if (canApprove(userRole)) {
                actions.push({
                    label: 'Aprobar',
                    icon: Check,
                    action: 'approve',
                    variant: 'default' as const
                })
            }
            if (canDelete(userRole)) {
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

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
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
