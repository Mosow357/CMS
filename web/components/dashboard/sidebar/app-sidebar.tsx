"use client"

import * as React from "react"
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  Settings2,
  SquareTerminal,
} from "lucide-react"
import { usePathname } from "next/navigation"

import { NavMain } from "@/components/dashboard/sidebar/nav-main";
import { NavUser } from "@/components/dashboard/sidebar/nav-user";
import { TeamSwitcher } from "@/components/dashboard/sidebar/team-switcher";
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
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
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
