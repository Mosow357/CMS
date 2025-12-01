"use client";

import React from "react";
import { useTranslations, useLocale } from "next-intl";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

type Testimonial = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  text: { es: string; en: string };
  date: string;
  rating?: number;

  // ✅ Agregado para imagen/video
  mediaUrl?: string;
  mediaType?: "image" | "video";
};

const sampleTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "María Gómez",
    role: "CEO · Startup XYZ",
    avatar: "https://i.pravatar.cc/120?img=12",
    text: {
      es: "Testimonial hizo que reunir feedback de nuestros clientes sea súper simple. En menos de 10 minutos teníamos 15 videos listos para publicar.",
      en: "Testimonial made gathering feedback from our clients super easy. In less than 10 minutes we had 15 videos ready to publish.",
    },
    date: "Jun 4, 2025",
    rating: 2,
    mediaUrl: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=800",
    mediaType: "image",
  },
  {
    id: "2",
    name: "Lucas Fernández",
    role: "Marketing · Tienda ABC",
    avatar: "https://picsum.photos/600/350",
    text: {
      es: "Me encanta la facilidad: le pasé el enlace a mis clientes y llegaron testimonios en texto y video sin contratiempos.",
      en: "I love the ease: I shared the link with my clients and testimonials came in text and video smoothly.",
    },
    date: "May 20, 2025",
    rating: 3,
    mediaUrl: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
    mediaType: "video",
  },
  {
    id: "3",
    name: "Sofía Ruiz",
    role: "Product Manager · Acme",
    avatar: "https://i.pravatar.cc/120?img=48",
    text: {
      es: "La interfaz es clara y las respuestas se ven profesionales. Ideal para mostrar en la landing y generar confianza.",
      en: "The interface is clear and responses look professional. Perfect to show on the landing page and build trust.",
    },
    date: "Apr 11, 2025",
    rating: 5,
    mediaUrl:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800",
    mediaType: "image",
  },
  {
    id: "4",
    name: "Javier Morales",
    role: "CTO · TechFlow",
    avatar: "https://i.pravatar.cc/120?img=3",
    text: {
      es: "Muy fácil de usar y excelente soporte.",
      en: "Very easy to use and excellent support.",
    },
    date: "Mar 15, 2025",
    rating: 4,
    mediaUrl: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=800",
    mediaType: "image",
  },
  {
    id: "5",
    name: "Ana López",
    role: "Founder · Creative Co",
    avatar: "https://i.pravatar.cc/120?img=61",
    text: {
      es: "Los clientes disfrutan dejando sus opiniones y se ven geniales.",
      en: "Customers enjoy leaving their feedback and it looks great.",
    },
    date: "Feb 28, 2025",
    rating: 2,
    mediaUrl: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
    mediaType: "video",
  },
  {
    id: "6",
    name: "Diego Fernández",
    role: "Marketing Lead · ShopMart",
    avatar: "https://i.pravatar.cc/120?img=10",
    text: {
      es: "Una herramienta simple.",
      en: "A simple tool.",
    },
    date: "Jan 22, 2025",
    rating: 1,
    mediaUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800",
    mediaType: "image",
  },
  {
    id: "7",
    name: "Lucía Torres",
    role: "Community Manager · SocialPro",
    avatar: "https://i.pravatar.cc/120?img=13",
    text: {
      es: "Recibimos comentarios valiosos que antes no capturábamos.",
      en: "We received valuable feedback that we didn’t capture before.",
    },
    date: "Dec 18, 2024",
    rating: 3,
    mediaUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800",
    mediaType: "image",
  },
  {
    id: "8",
    name: "Martín Vega",
    role: "CEO · FastApps",
    avatar: "https://i.pravatar.cc/120?img=24",
    text: {
      es: "El equipo está muy contento con la rapidez de los testimonios.",
      en: "The team is very happy with the speed of collecting testimonials.",
    },
    date: "Nov 30, 2024",
    rating: 4,
    mediaUrl: "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
    mediaType: "video",
  },
  {
    id: "9",
    name: "Clara Díaz",
    role: "Founder · Bright Ideas",
    avatar: "https://i.pravatar.cc/120?img=35",
    text: {
      es: "Perfecto para mostrar experiencias de clientes en nuestra web.",
      en: "Perfect for displaying customer experiences on our website.",
    },
    date: "Oct 14, 2024",
    rating: 2,
    mediaUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800",
    mediaType: "image",
  },
];

function Stars({ n = 5 }: { n?: number }) {
  const arr = Array.from({ length: 5 }, (_, i) => i + 1);
  return (
    <div className="flex items-center space-x-1">
      {arr.map((i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i <= n ? "text-yellow-400" : "text-foreground/80"}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.173c.969 0 1.371 1.24.588 1.81l-3.37 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.554 2.703c-.784.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.46 9.393c-.783-.57-.38-1.81.588-1.81h4.173a1 1 0 00.95-.69L9.05 2.927z" />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialsGrid() {
  const t = useTranslations("landing");
  const locale = useLocale() as "es" | "en";

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold">{t("testimonials_title")}</h2>
        <p className="text-foreground/80 mt-2">{t("testimonials_subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleTestimonials.map((testimonial) => (
          <Card
            key={testimonial.id}
            className="overflow-hidden rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 transition-all duration-350 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(102,249,196,0.16)] hover:border-4 hover:border-primary/40 hover:bg-[rgba(102,249,196,0.02)]"
          >
            <CardHeader className="flex items-center gap-4 px-6 py-4">
              <img
                src={testimonial.avatar}
                alt={`${testimonial.name} avatar`}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <CardTitle className="text-sm">{testimonial.name}</CardTitle>
                <CardDescription className="text-xs">{testimonial.role}</CardDescription>
              </div>
            </CardHeader>

            {/* ✅ Media agregada sin tocar estilos */}
            {testimonial.mediaUrl && (
              <div className="w-full h-48 bg-black rounded-md overflow-hidden mt-3">
                {testimonial.mediaType === "video" ? (
                  <video
                    src={testimonial.mediaUrl}
                    className="w-full h-full object-cover"
                    controls
                  />
                ) : (
                  <img
                    src={testimonial.mediaUrl}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            )}

            <CardContent className="px-6 py-4">
              <p className="text-sm text-foreground/90 leading-relaxed">
                {testimonial.text[locale]}
              </p>
            </CardContent>

            <CardFooter className="px-6 py-4">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <Stars n={testimonial.rating ?? 5} />
                  <span className="text-xs text-gray-400">{testimonial.date}</span>
                </div>
                <a
                  href="#"
                  className="text-sm font-semibold underline underline-offset-2"
                  onClick={(e) => e.preventDefault()}
                >
                  {t("testimonials_seeMore")}
                </a>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
