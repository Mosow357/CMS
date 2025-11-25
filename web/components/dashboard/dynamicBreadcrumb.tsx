"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function DynamicBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const items: React.ReactNode[] = [];

  segments.forEach((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const isLast = index === segments.length - 1;
    const label = segment.replace(/-/g, " ");

    items.push(
      <BreadcrumbItem key={href}>
        {isLast ? (
          <BreadcrumbPage className="capitalize">
            {label}
          </BreadcrumbPage>
        ) : (
          <BreadcrumbLink href={href} className="capitalize">
            {label}
          </BreadcrumbLink>
        )}
      </BreadcrumbItem>
    );

    // Agregar separador excepto en el último
    if (!isLast) {
      items.push(
        <BreadcrumbSeparator key={`sep-${href}`} />
      );
    }
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>{items}</BreadcrumbList>
    </Breadcrumb>
  );
}
