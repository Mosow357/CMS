"use client"

import * as React from "react"
import { ChevronsUpDown, Plus } from "lucide-react"
import { useRouter } from "next/navigation"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

const DEFAULT_LOGO = "/logo-por-defecto.png"

type TeamLogo = React.ElementType | string

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string
    logo?: TeamLogo
    plan?: string
  }[]
}) {
  const { isMobile } = useSidebar()
  const [activeTeam, setActiveTeam] = React.useState(teams[0] || null)
  const router = useRouter()

  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Helper function to render logo
  const renderLogo = (logo: TeamLogo | undefined, size: "sm" | "md" = "md") => {
    const logoSize = size === "sm" ? "size-3.5" : "size-4"
    const containerSize = size === "sm" ? "size-6" : "size-8"

    if (!logo) {
      return (
        <div className={`${containerSize} flex items-center justify-center rounded-lg overflow-hidden bg-sidebar-primary`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={DEFAULT_LOGO}
            alt="Default logo"
            className="w-full h-full object-contain"
          />
        </div>
      )
    }

    if (typeof logo === "string") {
      return (
        <div className={`${containerSize} flex items-center justify-center rounded-lg overflow-hidden bg-sidebar-primary`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logo || DEFAULT_LOGO}
            alt="Logo"
            className="w-full h-full object-contain"
            onError={(e) => {
              // Fallback to default logo on error
              const target = e.target as HTMLImageElement
              if (target.src !== `${window.location.origin}${DEFAULT_LOGO}`) {
                target.src = DEFAULT_LOGO
              }
            }}
          />
        </div>
      )
    }

    // React component (icon)
    const LogoComponent = logo
    return (
      <div className={`bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square ${containerSize} items-center justify-center rounded-lg`}>
        <LogoComponent className={logoSize} />
      </div>
    )
  }

  if (!activeTeam || teams.length === 0) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" onClick={() => router.push('/dashboard/organizations/new')}>
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              <Plus className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">Agregar organización</span>
              <span className="truncate text-xs text-muted-foreground">Crea tu primera organización</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    )
  }

  if (!mounted) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg">
            {renderLogo(activeTeam.logo)}
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{activeTeam.name}</span>
              <span className="truncate text-xs">{activeTeam.plan || "Active"}</span>
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
              {renderLogo(activeTeam.logo)}
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{activeTeam.name}</span>
                <span className="truncate text-xs">{activeTeam.plan || "Active"}</span>
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
              Organizaciones
            </DropdownMenuLabel>
            {teams.map((team, index) => (
              <DropdownMenuItem
                key={team.name}
                onClick={() => setActiveTeam(team)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-md border overflow-hidden">
                  {renderLogo(team.logo, "sm")}
                </div>
                {team.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-2 p-2"
              onClick={() => router.push('/dashboard/organizations/new')}
            >
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <Plus className="size-4" />
              </div>
              <div className="text-muted-foreground font-medium">Agregar</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
