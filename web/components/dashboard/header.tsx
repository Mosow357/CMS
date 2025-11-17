"use client";

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./sidebar";

export default function Header() {
    return (
        <header className="flex h-14 items-center border-b px-4 lg:px-6">
            {/* Botón móvil */}
            <Sheet>
                <SheetTrigger className="lg:hidden mr-2">
                    <Menu className="h-6 w-6" />
                </SheetTrigger>

                <SheetContent side="left" className="p-0">
                    <Sidebar open={true} setOpen={() => { }} isMobile />
                </SheetContent>
            </Sheet>

            <h1 className="text-lg font-semibold">Dashboard</h1>
        </header>
    );
}
