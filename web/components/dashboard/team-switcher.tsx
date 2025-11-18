"use client";

import * as React from "react";
import { ChevronsUpDown, Plus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Team {
  name: string;
  logo: React.ElementType;
  plan: string;
}

export function TeamSwitcher({
  teams,
  collapsed
}: {
  teams: Team[];
  collapsed: boolean;
}) {
  const [activeTeam, setActiveTeam] = React.useState<Team>(teams[0]);

  if (!activeTeam) return null;

  return (
    <div className="px-3 mt-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full flex items-center justify-start gap-3",
              collapsed && "justify-center px-2"
            )}
          >
            {/* logo */}
            <div className="flex size-8 items-center justify-center rounded-lg bg-muted gap-2">
      
              <activeTeam.logo className="size-4" />
              
            </div>

            {/* info cuando NO está colapsado */}
            {!collapsed && (
              <div className="flex flex-col text-left">
                <span className="text-sm font-semibold">{activeTeam.name}</span>
                <span className="text-xs text-muted-foreground">
                  {activeTeam.plan}
                </span>
              </div>
            )}

            {/* icono mostrar menú */}
            {!collapsed && <ChevronsUpDown className="ml-auto size-4" />}
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="min-w-56"
          side={collapsed ? "right" : "bottom"}
          align={collapsed ? "start" : "center"}
        >
          <DropdownMenuLabel className="text-xs text-muted-foreground">
            Organizaciones
          </DropdownMenuLabel>

          {teams.map((team) => (
            <DropdownMenuItem
              key={team.name}
              onClick={() => setActiveTeam(team)}
              className="gap-2 p-2"
            >
              <div className="flex size-6 items-center justify-center rounded-md border">
                <team.logo className="size-3.5" />
              </div>
              {team.name}
            </DropdownMenuItem>
          ))}

          <DropdownMenuSeparator />

          <DropdownMenuItem className="gap-2 p-2">
            <div className="flex size-6 items-center justify-center rounded-md border">
              <Plus className="size-4" />
            </div>
            <span className="text-muted-foreground font-medium">
              Crear organización
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
