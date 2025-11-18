"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { LayoutDashboard, MessageCircle, Tag, BarChart2, Settings } from "lucide-react";

const links = [
  { href: "/dashboard", label: "Inicio", icon: LayoutDashboard },
  { href: "/dashboard/testimonials", label: "Testimonios", icon: MessageCircle },
  { href: "/dashboard/categories", label: "Categorías", icon: Tag },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart2 },
  { href: "/dashboard/settings", label: "Ajustes", icon: Settings },
];

export function NavLinks({ collapsed }: { collapsed: boolean }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1 mt-4">
      {links.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;

        return (
          <motion.div
            key={href}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.1 }}
          >
            <Link
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 mx-3 my-1 py-1 rounded-lg transition-colors",
                active
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted text-muted-foreground"
              )}
            >
              <motion.div
                initial={{ opacity: 0.6 }}
                animate={{ opacity: active ? 1 : 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <Icon className="h-5 w-5" />
              </motion.div>

              {!collapsed && <span>{label}</span>}
            </Link>
          </motion.div>
        );
      })}
    </nav>
  );
}
