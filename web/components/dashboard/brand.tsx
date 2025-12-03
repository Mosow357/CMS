"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface BrandProps {
  collapsed: boolean;
  logoSrc?: string;       // URL del logo, opcional
  name?: string;          // Nombre del sitio o empresa
  size?: number;          // Tamaño del logo, opcional
}

export function Brand({
  collapsed,
  logoSrc = "/logo.webp",
  name = "CMS",
  size = 40,
}: BrandProps) {
  return (
    <div
      className={`
        flex items-center gap-3 px-4 mb-10
        ${collapsed ? "mt-4 justify-center" : "mt-6"}
      `}
    >
      <motion.div
        animate={{ scale: collapsed ? 0.8 : 1 }}
        transition={{ duration: 0.25 }}
        className="shrink-0"
      >
        <Image
          src={logoSrc}
          width={size}
          height={size}
          alt="Logo"
          className="rounded-full"
        />
      </motion.div>

      {!collapsed && (
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-primary text-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
        >
          {name}
        </motion.span>
      )}
    </div>
  );
}
