"use client"

import * as React from "react"
import { ChevronsUpDown, Plus, UserCircle, Trash2 } from "lucide-react"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function EditorInvite({
    editors,
}: {
    editors?: {
        name: string
        email: string
        role: string
    }[]
}) {
    const { isMobile } = useSidebar()
    const [open, setOpen] = React.useState(false)
    const [email, setEmail] = React.useState("")
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [mounted, setMounted] = React.useState(false)
    const [editorToDelete, setEditorToDelete] = React.useState<string | null>(null)

    // Default editors if none provided
    const editorsList = editors || [
        { name: "Editor Principal", email: "editor@example.com", role: "Admin" },
        { name: "Editor Secundario", email: "editor2@example.com", role: "Editor" },
    ]

    React.useEffect(() => {
        setMounted(true)
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        // TODO: Implement the actual invitation logic here
        // For now, just simulate an API call
        await new Promise(resolve => setTimeout(resolve, 1000))

        console.log("Inviting editor:", email)

        // Reset form and close dialog
        setEmail("")
        setIsSubmitting(false)
        setOpen(false)
    }

    const handleDeleteEditor = async () => {
        if (!editorToDelete) return

        // TODO: Implement the actual delete logic here
        console.log("Deleting editor:", editorToDelete)

        // Close the alert dialog
        setEditorToDelete(null)
    }

    if (!mounted) {
        return (
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton size="lg">
                        <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                            <UserCircle className="size-4" />
                        </div>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-medium">Editores</span>
                            <span className="truncate text-xs">{editorsList.length} colaboradores</span>
                        </div>
                        <ChevronsUpDown className="ml-auto" />
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        )
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                <UserCircle className="size-4" />
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">Editores</span>
                                <span className="truncate text-xs">{editorsList.length} colaboradores</span>
                            </div>
                            <ChevronsUpDown className="ml-auto" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        align="start"
                        side={isMobile ? "bottom" : "right"}
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="text-muted-foreground text-xs">
                            Editores
                        </DropdownMenuLabel>
                        {editorsList.map((editor) => (
                            <DropdownMenuItem
                                key={editor.email}
                                className="gap-2 p-2 justify-between"
                                onSelect={(e) => e.preventDefault()}
                            >
                                <div className="flex items-center gap-2">
                                    <div className="flex size-6 items-center justify-center rounded-md border">
                                        <UserCircle className="size-3.5 shrink-0" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm">{editor.name}</span>
                                        <span className="text-xs text-muted-foreground">{editor.role}</span>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon-sm"
                                    className="h-6 w-6 text-muted-foreground hover:text-destructive"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setEditorToDelete(editor.email)
                                    }}
                                >
                                    <Trash2 className="size-3.5 hover:text-destructive hover:size-6" />
                                </Button>
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="gap-2 p-2"
                            onClick={() => setOpen(true)}
                        >
                            <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                                <Plus className="size-4" />
                            </div>
                            <div className="text-muted-foreground font-medium">Invitar</div>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Invitar Editor</DialogTitle>
                            <DialogDescription>
                                Ingresa el email del editor que deseas invitar a colaborar.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="editor@ejemplo.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setOpen(false)}
                                    disabled={isSubmitting}
                                >
                                    Cancelar
                                </Button>
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? "Enviando..." : "Enviar Invitación"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

                <AlertDialog open={!!editorToDelete} onOpenChange={() => setEditorToDelete(null)}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>¿Eliminar editor?</AlertDialogTitle>
                            <AlertDialogDescription>
                                Esta acción no se puede deshacer. El editor perderá acceso al sistema.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={handleDeleteEditor}
                                className="hover:bg-error hover:text-white"
                            >
                                Eliminar
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
