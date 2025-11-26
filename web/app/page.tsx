"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { TestimonialsGrid } from "@/components/landingpage/testimonials";
import LandingSection from "@/components/landingpage/landing-section";
import TestimonialBlock from "@/components/landingpage/testimonialblock";
import { useTranslation } from "@/components/providers/translation-provider";
import Navbar from "@/components/landingpage/navbar";

/* ---------------------------
   Small UI helpers
   ---------------------------*/

type FancyButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

function FancyButton({ children, variant = "primary", onClick }: FancyButtonProps) {
  const base =
    "relative overflow-hidden px-6 py-3 rounded-lg font-semibold transition-all focus:outline-none";
  const primary = "bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.99]";
  const ghost = "border border-border text-foreground hover:bg-muted/5 dark:hover:bg-muted/10";

  const classes = `${base} ${variant === "ghost" ? ghost : primary}`;

  return (
    <button className={classes} onClick={onClick}>
      {children}
      {/* Optional shine element */}
      <span className="absolute inset-0 pointer-events-none" aria-hidden />
    </button>
  );
}

/* ---------------------------
   Animation variants
   ---------------------------*/
const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

// Use a numeric bezier easing array to satisfy framer-motion types
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

// Card hover: lift slightly, add a soft primary-colored glow and border on hover
const cardHover =
  "transition-all duration-350 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(102,249,196,0.16)] hover:border-4 hover:border-primary/40 hover:bg-[rgba(102,249,196,0.02)]";

/* ---------------------------
   Main component
   ---------------------------*/
export default function Home() {
  type Locale = "es" | "en";

  // Use a flexible translations type (all values are strings).
  // This avoids listing every key while still keeping t strongly-typed as an object of strings.
  const { t, locale } = useTranslation();

  // Parallax: useScroll + useTransform
  const refParallax = useRef(null);
  const { scrollY } = useScroll({ target: refParallax });
  // small parallax transforms (these values son ajustables)
  const parallaxY = useTransform(scrollY, [0, 500], [0, -40]);
  const parallaxYmedium = useTransform(scrollY, [0, 700], [0, -90]);

  // Landing section editable objects (edit here to change content per section)
  const ls1 = {
    tag: (t.ls1_tag as string) || "Configuración rápida",
    title: (t.ls1_title as string) || "Una página de destino específica",
    description:
      (t.ls1_desc as string) ||
      "Crea una página de destino exclusiva para tu negocio. Comparte fácilmente el enlace por correo electrónico, redes sociales o incluso SMS.",
    buttonText: (t.ls1_button as string) || "Comenzar ahora",
    image: "/img-landing-section.jpg",
    cardTitle: (t.ls1_cardTitle as string) || "¿Querés dejar tu opinión?",
    cardSubtitle: (t.ls1_cardSubtitle as string) || "Tu feedback nos ayuda a mejorar",
    cardButton1: (t.ls1_cardButton1 as string) || "Enviar video",
    cardButton2: (t.ls1_cardButton2 as string) || "Enviar mensaje",
    showCardButton1: true,
    showCardButton2: true,
    reverse: false,
    i18nPrefix: "ls1",
  } as any;

  const ls2 = {
    tag: (t.ls2_tag as string) || "Fácil de gestionar",
    title: (t.ls2_title as string) || "Un panel de control para gestionar todos los testimonios",
    description: (t.ls2_desc as string) || "Nuestra nueva herramienta acelera tu flujo de trabajo.",
    buttonText: (t.ls2_button as string) || "Pruébalo Gratis!",
    image: "/panel-landing-section.png",
    reverse: true,
    i18nPrefix: "ls2",
  } as any;

  const ls3 = {
    tag: (t.ls3_tag as string) || "Seguimiento de las métricas",
    title: (t.ls3_title as string) || "Comprende el rendimiento de los testimonios en vídeo.",
    description:
      (t.ls3_desc as string) ||
      "Realiza un seguimiento de las métricas, ayuda a tu equipo a analizar el rendimiento y destaca los mejores videos.",
    buttonText: (t.ls3_button as string) || "Ver métricas",
    image: "/overview-landing-section.png",
    reverse: false,
    i18nPrefix: "ls3",
  } as any;

  const ls4 = {
    tag: (t.ls4_tag as string) || "Más pruebas sociales",
    title: (t.ls4_title as string) || "No solo testimonios en texto y vídeo",
    description:
      (t.ls4_desc as string) ||
      "Trae testimonios desde redes sociales, plataformas de vídeo y sitios de reseñas.",
    buttonText: (t.ls4_button as string) || "Descubrir",
    image: "/social-media-landing-section.png",
    reverse: true,
    i18nPrefix: "ls4",
  } as any;

  return (
    <main ref={refParallax} className="relative min-h-screen text-center overflow-y-auto bg-background text-foreground">
      {/* NAVBAR STICKY BLUR */}
       <Navbar />

      {/* HERO */}
      <section className="relative pt-36 pb-20 px-6">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-4xl mx-auto"
        >
            <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl font-extrabold leading-tight mb-6 text-foreground">
            {(t.title as string) || ""}
          </motion.h1>

          <motion.p variants={fadeUp} className="text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
            {(t.description as string) || ""}
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="group">
              <FancyButton variant="primary">{(t.tryFree as string) || ""}</FancyButton>
            </div>
            <div>
              <FancyButton variant="ghost">{(t.contact as string) || ""}</FancyButton>
            </div>
          </motion.div>

          {/* subtle decorative gradient / animated blob */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ background: 'linear-gradient(45deg, var(--color-primary) 0%, var(--color-primary-foreground) 100%)' }}
            className="pointer-events-none absolute -right-24 -top-12 w-72 h-72 rounded-full blur-3xl opacity-10 mix-blend-screen"
          />
        </motion.div>
      </section>

      <hr className="w-full border-t border-gray-300/60 my-10" />

      {/* VIDEO + PARALLAX IMAGE */}
      <section className="w-full flex justify-center mb-16 px-6">
        <motion.div
          className={`w-full max-w-4xl rounded-xl overflow-hidden ${cardHover}`}
          whileHover={{ scale: 1.01 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.video
            src="/video.mp4"
            autoPlay
            loop
            controls
            muted
            className="w-full h-auto rounded-xl"
          />
        </motion.div>
      </section>

      <section className="max-w-3xl mx-auto text-center mb-12 px-6">
          <motion.h3 initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl font-bold mb-4 text-foreground">
          {(t.afterVideoTitle as string) || ""}
        </motion.h3>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-foreground/80">
          {(t.afterVideoDescription as string) || ""}
        </motion.p>
      </section>

      <hr className="w-full border-t border-gray-300/60 my-10" />

      {/* TESTIMONIALS GRID with stagger */}
      <section className="px-6 mb-12">
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.div variants={fadeUp} className="max-w-4xl mx-auto mb-6">
            <h4 className="text-2xl font-bold text-foreground">{(t.testimonials_title as string) || ""}</h4>
            <p className="text-foreground/80">{(t.testimonials_subtitle as string) || ""}</p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <TestimonialsGrid />
          </motion.div>
        </motion.div>
      </section>

      <hr className="w-full border-t border-gray-300/60 my-10" />

      {/* LANDING SECTIONS: four editable sections — alternate `reverse` to swap columns */}
      <section className="w-full bg-background py-8 px-6">
        <div className="max-w-6xl mx-auto grid gap-10">
          <LandingSection {...ls1} />
          <LandingSection {...ls2} />
          <LandingSection {...ls3} />
          <LandingSection {...ls4} />
        </div>
      </section>

      <hr className="w-full border-t border-[#BFC4CC33] my-10" />

      <TestimonialBlock />

      <hr className="w-full border-t border-[#BFC4CC33] my-10" />

      {/* FINAL CTA */}
      <section className="w-screen py-24 px-6" style={{ background: 'linear-gradient(45deg, var(--color-primary) 0%, var(--color-primary-foreground) 100%)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl font-bold mb-4 text-white drop-shadow-[0_6px_12px_rgba(0,0,0,0.25)]">{(t.cta_headline as string) || ""}</motion.h2>

          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.08 }} className="text-foreground/80 max-w-2xl mx-auto">{(t.cta_paragraph as string) || ""}</motion.p>

          <motion.div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <FancyButton variant="primary">{(t.cta_start_free as string) || ""}</FancyButton>
            <FancyButton variant="ghost">{(t.cta_talk_us as string) || ""}</FancyButton>
          </motion.div>

          <div className="mt-6 text-sm text-foreground/80">
            <a href="#precios" className="underline">{(t.cta_pricing_link as string) || ""}</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full bg-background border-t border-border/30 py-16 px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-4 gap-10 text-left">
          <div>
            <h3 className="text-xl font-bold flex items-center gap-2">
              <span className="text-2xl" style={{ color: 'var(--color-primary)' }}>👍</span>
              Testimonial
            </h3>
            <p className="text-foreground/80 mt-2">{(t.footer_desc as string) || ""}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-3 text-foreground">Recursos</h4>
            <ul className="space-y-2 text-foreground/80">
              <li>{(t.footer_resources_centro as string) || ""}</li>
              <li>{(t.footer_resources_blog as string) || ""}</li>
              <li>{(t.footer_resources_stories as string) || ""}</li>
              <li>{(t.footer_resources_privacy as string) || ""}</li>
            </ul>
          </div>

          <div className="col-span-1 sm:col-span-2 text-right sm:text-left">
            <p className="text-sm text-foreground/80">© {new Date().getFullYear()} Testimonial — All rights reserved</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
