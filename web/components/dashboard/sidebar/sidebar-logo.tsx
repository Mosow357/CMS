"use client"

import Image from "next/image"
import { useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils" // si ya tenés esta función para concatenar clases

interface SidebarLogoProps {
  src?: string
  alt?: string
  size?: number
}

export function SidebarLogo({
  src = "/logo.webp",
  alt = "CMS",
  size = 40,
}: SidebarLogoProps) {
  const { open } = useSidebar()

  return (
    <div
      className={cn(
        "flex items-center gap-2 p-2",
        open ? "mx-5 my-5" : "mx-0"
      )}
    >
      <div className="relative" style={{ width: size, height: size }}>
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          className="rounded-2xl object-cover"
        />
      </div>
      {open && (
        <span className="text-lg font-bold truncate">
          {alt}
        </span>
      )}
    </div>
  )
}
