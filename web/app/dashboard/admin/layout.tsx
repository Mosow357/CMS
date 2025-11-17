"use client";

import Header from "@/components/dashboard/header";
import Sidebar from "@/components/dashboard/sidebar";
import { useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import Chatbot from "@/components/chatBotGemini"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  const pathname = usePathname(); 

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar desktop */}
      <div className="hidden lg:flex">
        <Sidebar open={open} setOpen={setOpen} />
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />

        {/* ⭐ Animación entre páginas */}
        <motion.main
          key={pathname} // <-- fuerza a framer a reanimar en cada cambio de ruta
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="flex-1 overflow-auto bg-background p-4 md:p-6 lg:p-8"
        >
          {children}
        </motion.main>
        <Chatbot /> 
      </div>
    </div>
  );
}
