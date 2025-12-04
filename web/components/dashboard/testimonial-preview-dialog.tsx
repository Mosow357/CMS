"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { UserAvatar } from "@/components/ui/user-avatar"
import { DashboardTestimonial } from "@/lib/mockDashboardTestimonials"
import { Check, X, Eye, EyeOff, Trash2, Calendar, Tag, ExternalLink } from "lucide-react"
import { canApprove, canReject, canPublish, canUnpublish, canDelete, mockCurrentUser } from "@/lib/mockUser"

interface TestimonialPreviewDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    testimonial: DashboardTestimonial
    onAction: (action: string) => void
}

export function TestimonialPreviewDialog({
    open,
    onOpenChange,
    testimonial,
    onAction
}: TestimonialPreviewDialogProps) {
    const userRole = mockCurrentUser.role

    // Helper para renderizar media
    const renderMedia = () => {
        if (testimonial.media_type === 'image' && testimonial.media_url) {
            return (
                <div className="rounded-lg overflow-hidden border bg-muted/20 mb-4">
                    <img
                        src={testimonial.media_url}
                        alt="Testimonial media"
                        className="w-full h-auto max-h-[400px] object-contain"
                    />
                </div>
            )
        }

        if (testimonial.media_type === 'video' && testimonial.media_url) {
            // Simple detección de YouTube para el ejemplo
            const isYouTube = testimonial.media_url.includes('youtube') || testimonial.media_url.length === 11 // ID length

            return (
                <div className="rounded-lg overflow-hidden border bg-black mb-4 aspect-video flex items-center justify-center relative">
                    {isYouTube ? (
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${testimonial.media_url}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    ) : (
                        <div className="text-white flex flex-col items-center">
                            <VideoIcon className="w-12 h-12 mb-2 opacity-50" />
                            <span className="text-sm opacity-75">Video Player Placeholder</span>
                        </div>
                    )}
                </div>
            )
        }

        return null
    }

    // Botones de acción según estado y rol (reutilizando lógica)
    const renderActions = () => {
        const actions = []
        const { status } = testimonial

        if (status === 'pending') {
            if (canApprove(userRole)) {
                actions.push(
                    <Button key="approve" onClick={() => onAction('approve')} className="bg-blue-600 hover:bg-blue-700">
                        <Check className="w-4 h-4 mr-2" /> Aprobar
                    </Button>
                )
            }
            if (canReject(userRole)) {
                actions.push(
                    <Button key="reject" variant="outline" onClick={() => onAction('reject')} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                        <X className="w-4 h-4 mr-2" /> Rechazar
                    </Button>
                )
            }
        }

        if (status === 'approved') {
            if (canPublish(userRole)) {
                actions.push(
                    <Button key="publish" onClick={() => onAction('publish')} className="bg-green-600 hover:bg-green-700">
                        <Eye className="w-4 h-4 mr-2" /> Publicar
                    </Button>
                )
            }
            if (canReject(userRole)) {
                actions.push(
                    <Button key="reject" variant="outline" onClick={() => onAction('reject')} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                        <X className="w-4 h-4 mr-2" /> Rechazar
                    </Button>
                )
            }
        }

        if (status === 'published') {
            if (canUnpublish(userRole)) {
                actions.push(
                    <Button key="unpublish" variant="secondary" onClick={() => onAction('unpublish')}>
                        <EyeOff className="w-4 h-4 mr-2" /> Despublicar
                    </Button>
                )
            }
            if (canReject(userRole)) {
                actions.push(
                    <Button key="reject" variant="outline" onClick={() => onAction('reject')} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                        <X className="w-4 h-4 mr-2" /> Rechazar
                    </Button>
                )
            }
        }

        if (status === 'rejected') {
            if (canApprove(userRole)) {
                actions.push(
                    <Button key="approve" variant="outline" onClick={() => onAction('approve')}>
                        <Check className="w-4 h-4 mr-2" /> Aprobar
                    </Button>
                )
            }
            if (canDelete(userRole)) {
                actions.push(
                    <Button key="delete" variant="destructive" onClick={() => onAction('delete')}>
                        <Trash2 className="w-4 h-4 mr-2" /> Eliminar
                    </Button>
                )
            }
        }

        return actions
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-3 text-xl">
                        <UserAvatar name={testimonial.author?.name || testimonial.client_name || 'Usuario'} />
                        <div className="flex flex-col">
                            <span>{testimonial.author?.name || testimonial.client_name || 'Usuario'}</span>
                            <span className="text-sm font-normal text-muted-foreground">
                                {testimonial.author?.title || testimonial.author?.email || testimonial.client_email || ''}
                            </span>
                        </div>
                    </DialogTitle>
                </DialogHeader>

                <ScrollArea className="flex-1 pr-4 -mr-4">
                    <div className="space-y-6 py-4">
                        {/* Rating y Fecha */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className={`text-lg ${i < testimonial.stars_rating ? 'text-yellow-500' : 'text-gray-300'}`}>
                                        ★
                                    </span>
                                ))}
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                                <Calendar className="w-4 h-4 mr-1" />
                                {new Date(testimonial.created_at || testimonial.createdAt || Date.now()).toLocaleDateString('es-ES', {
                                    year: 'numeric', month: 'long', day: 'numeric'
                                })}
                            </div>
                        </div>

                        {/* Título y Contenido */}
                        <div>
                            <h3 className="text-lg font-semibold mb-2">{testimonial.title}</h3>
                            <p className="text-base leading-relaxed whitespace-pre-wrap">
                                {testimonial.content}
                            </p>
                        </div>

                        {/* Media */}
                        {renderMedia()}

                        {/* Metadatos */}
                        <div className="flex flex-wrap gap-2 pt-2 border-t">
                            <Badge variant="secondary" className="flex items-center gap-1">
                                <Tag className="w-3 h-3" />
                                {testimonial.category?.name || testimonial.category_name || 'Sin categoría'}
                            </Badge>
                            {(testimonial.tags || testimonial.tagIds || []).map((tag: string, index: number) => (
                                <Badge key={tag || index} variant="outline" className="text-muted-foreground">
                                    #{tag}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </ScrollArea>

                <DialogFooter className="gap-2 sm:gap-0 mt-4 border-t pt-4">
                    <div className="flex w-full justify-between items-center">
                        <Button variant="ghost" onClick={() => onOpenChange(false)}>
                            Cerrar
                        </Button>
                        <div className="flex gap-2">
                            {renderActions()}
                        </div>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

function VideoIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="m22 8-6 4 6 4V8Z" />
            <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
        </svg>
    )
}
