"use client";

import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { LogOut } from "lucide-react";
import { logoutAction } from "@/lib/actions/auth";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function LogoutButton({ collapsed }: { collapsed: boolean }) {
  return (
    <form action={logoutAction} className="w-full">
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <Button
              type="submit"
              variant="outline"
              className="w-full justify-start h-10 overflow-hidden relative"
            >
              {/* ICONO CON ANIMACIÓN */}
              <motion.span
                initial={{ rotate: 0 }}
                whileHover={{ rotate: -15 }}
                transition={{ type: "spring", stiffness: 200 }}
                className={cn(!collapsed ? "mr-3" : "")}
              >
                <LogOut size={18} />
              </motion.span>

              {/* TEXTO ANIMADO */}
              <AnimatePresence initial={false}>
                {!collapsed && (
                  <motion.span
                    key="text"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.15 }}
                    className="whitespace-nowrap"
                  >
                    Cerrar sesión
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </TooltipTrigger>

          {collapsed && (
            <TooltipContent side="right">Cerrar sesión</TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </form>
  );
}
