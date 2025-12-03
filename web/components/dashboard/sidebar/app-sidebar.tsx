import * as React from "react"

import { NavMain } from "@/components/dashboard/sidebar/nav-main";
import { NavUser } from "@/components/dashboard/sidebar/nav-user";
import { TeamSwitcher } from "@/components/dashboard/sidebar/team-switcher";
import { EditorInvite } from "@/components/dashboard/sidebar/editor-invite";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import { SidebarLogo } from "@/components/dashboard/sidebar/sidebar-logo";
import {
  getCurrentUserData,
  getUserOrganizations,
  getCurrentOrganization,
  getTestimonialStatsAction
} from "@/lib/actions/sidebar";

export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Obtener datos reales del servidor
  const user = await getCurrentUserData()
  const organizations = await getUserOrganizations()
  const currentOrg = await getCurrentOrganization()
  const stats = await getTestimonialStatsAction()

  // Transformar organizaciones al formato que espera TeamSwitcher
  const teams = organizations.map((org: any) => ({
    id: org.id,
    name: org.name,
    logo: "GalleryVerticalEnd",
    plan: org.role === 'admin' ? 'Admin' : 'Editor',
  }))

  // Datos del usuario
  const userData = user ? {
    name: user.name,
    email: user.email,
  } : {
    name: "Usuario",
    email: "user@example.com",
  }

  const navMain = [
    {
      title: "Testimonios",
      url: "#",
      icon: "SquareTerminal",
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
      icon: "Settings2",
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
  ]

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teams} currentOrgId={currentOrg?.id} />
        <EditorInvite />
      </SidebarHeader>
      <SidebarContent>
        <SidebarLogo src="/logo.webp" alt="My CMS" />

        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
