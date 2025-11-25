"use client";

import { NavLinks } from "./nav-links";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Building2 } from "lucide-react";
import { motion } from "framer-motion";
import { TeamSwitcher } from "./team-switcher";


interface SidebarProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  isMobile?: boolean;
}

export default function Sidebar({ open, setOpen, isMobile }: SidebarProps) {
  return (
    <motion.aside
      animate={{ width: open ? 240 : 64 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`
        bg-card border-r border-border h-full flex flex-col
        ${isMobile ? "fixed z-50 top-0 left-0 h-full" : "relative"}
      `}
    >
      {/* Collapse button ONLY on desktop */}
      {!isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="self-end m-2"
          onClick={() => setOpen(!open)}
        >
          {open ? <ChevronLeft /> : <ChevronRight />}
        </Button>
      )}
      
      {/* TEAM SWITCHER */}
      <TeamSwitcher
        collapsed={open}
        teams={[
          { name: "Organización Principal", logo: Building2, plan: "Pro" },
          { name: "Mi ONG", logo: Building2, plan: "Free" },
        ]}
      />

      <NavLinks collapsed={!open} />


    </motion.aside>
  );
}
