"use client";

import Image from "next/image";
import { NavLinks } from "./nav-links";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

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

      {/* LOGO + NOMBRE */}
      <div
        className={`
          flex items-center gap-3 px-4 mb-10
          ${isMobile ? "mt-4" : "mt-6"}
        `}
      >
        {/* LOGO animado */}
        <motion.div
          animate={{ scale: open ? 1 : 0.8 }}
          transition={{ duration: 0.25 }}
          className="shrink-0"
        >
          <Image
            src="/logo.webp"
            width={open ? 40 : 40}
            height={open ? 40 : 40}
            alt="Logo"
            className="rounded-full"
          />
        </motion.div>

        {/* TEXTO visible solo si open = true */}
        {open && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-semibold"
          >
            CMS
          </motion.span>
        )}
      </div>

      <NavLinks collapsed={!open} />
    </motion.aside>
  );
}
