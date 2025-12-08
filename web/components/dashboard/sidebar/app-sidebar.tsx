"use client"

import * as React from "react"
import { useState } from "react"
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  MessageSquare,
  Settings2,
  SquareTerminal,
} from "lucide-react"
import { usePathname } from "next/navigation"

import { NavMain } from "@/components/dashboard/sidebar/nav-main";
import { NavUser } from "@/components/dashboard/sidebar/nav-user";
import { TeamSwitcher } from "@/components/dashboard/sidebar/team-switcher";
import { EditorInvite } from "@/components/dashboard/sidebar/editor-invite";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import { SidebarLogo } from "@/components/dashboard/sidebar/sidebar-logo";
import { getTestimonialStats } from "@/lib/mockDashboardTestimonials";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [emails, setEmails] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Parse emails separados por comas
    const emailArray = emails
      .split(',')
      .map((email) => email.trim())
      .filter((email) => email.length > 0)

    if (emailArray.length === 0) {
      alert('Por favor ingresa al menos un email')
      return
    }

    // Validar formato básico de emails
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const invalidEmails = emailArray.filter((email) => !emailRegex.test(email))
    if (invalidEmails.length > 0) {
      alert(`Emails inválidos: ${invalidEmails.join(', ')}`)
      return
    }

    // Enviar solicitud al backend
    fetch('/api/testimonials/invite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emails: emailArray }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(`Solicitud enviada: ${emailArray.length} email(s)`)
        setEmails("")
        setShowReviewForm(false)
      })
      .catch((error) => {
        alert(`Error: ${error.message}`)
      })
  }

  const stats = getTestimonialStats()
  const pathname = usePathname()

  const data = {
    user: {
      name: "Admin user",
      email: "m@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    teams: [
      {
        name: "Acme Inc",
        logo: GalleryVerticalEnd,
        plan: "Enterprise",
      },
      {
        name: "Acme Corp.",
        logo: AudioWaveform,
        plan: "Startup",
      },
      {
        name: "Evil Corp.",
        logo: Command,
        plan: "Free",
      },
    ],
    navMain: [
      {
        title: "Testimonios",
        url: "#",
        icon: SquareTerminal,
        isActive: pathname.startsWith("/dashboard/testimonials"),
        items: [
          {
            title: "Todos",
            url: "/dashboard/testimonials",
            badge: stats.total
          },
          {
            title: "Pendientes",
            url: "/dashboard/testimonials?status=pending",
            badge: stats.pending
          },
          {
            title: "Aprobados",
            url: "/dashboard/testimonials?status=approved",
            badge: stats.approved
          },
          {
            title: "Publicados",
            url: "/dashboard/testimonials?status=published",
            badge: stats.published
          },
          {
            title: "Rechazados",
            url: "/dashboard/testimonials?status=rejected",
            badge: stats.rejected
          },
        ],
      },
      {
        title: "Configuraciones",
        url: "#",
        icon: Settings2,
        isActive: pathname.startsWith("/dashboard/categories") || pathname.startsWith("/dashboard/embed"),
        items: [
          {
            title: "Categorias",
            url: "/dashboard/categories",
          },
          {
            title: "Muro",
            url: "/dashboard/embed",
          },
        ],
      },
    ],
  }

  return (
    <Sidebar
      collapsible="icon"
      {...props}
      style={{
        // Set sidebar accent/primary to landing primary (green)
        ["--sidebar-accent" as any]: "var(--primary)",
        ["--sidebar-accent-foreground" as any]: "var(--primary-foreground)",
        ["--sidebar-primary" as any]: "var(--primary)",
        ["--sidebar-primary-foreground" as any]: "var(--primary-foreground)",
      }}
    >
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
        
        {/* Botón Solicitud de Reviews (abre a la derecha) */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-full text-left px-3 py-2 rounded hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)] transition text-sm font-medium flex items-center gap-2">
              <span className="inline-flex items-center justify-center size-6 rounded-md bg-[var(--primary)] text-[var(--primary-foreground)]">
                <MessageSquare className="size-4" />
              </span>
              <span>Solicitud de Reviews</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="start" className="min-w-[20rem] p-3">
            <form onSubmit={handleSubmit}>
              <label className="text-xs text-muted-foreground block mb-2">Emails (separados por ,)</label>
              <textarea
                value={emails}
                onChange={(e) => setEmails(e.target.value)}
                placeholder="a@ejemplo.com, b@ejemplo.com, c@ejemplo.com"
                className="w-full px-2 py-1 border rounded bg-popover text-popover-foreground text-xs min-h-24 resize-none"
              />
              <div className="mt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className="px-2 py-1 rounded border text-xs hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  Cancelar
                </button>
                <button type="submit" className="px-2 py-1 rounded bg-primary text-primary-foreground text-xs">
                  Enviar
                </button>
              </div>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarHeader>
      <SidebarContent>
 
        <EditorInvite />
      </SidebarHeader>
      <SidebarContent>
        <SidebarLogo src="/logo.webp" alt="My CMS" />
        
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
