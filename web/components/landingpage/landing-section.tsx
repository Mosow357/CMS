"use client";

import React from "react";
import { useTranslations } from "next-intl";

interface LandingProps {
  reverse?: boolean;
  tag?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  showMainButton?: boolean;
  image?: string;
  cardTitle?: string;
  cardSubtitle?: string;
  cardButton1?: string;
  cardButton2?: string;
  showCardButton1?: boolean;
  showCardButton2?: boolean;
  i18nPrefix?: string;
}

export default function LandingSection({
  reverse = false,
  tag,
  title,
  description,
  buttonText,
  showMainButton = true,
  image = "/img-landing-section.jpg",
  cardTitle,
  cardSubtitle,
  cardButton1,
  cardButton2,
  showCardButton1 = true,
  showCardButton2 = false,
  i18nPrefix,
}: LandingProps) {
  const t = useTranslations("landing");
  const prefix = i18nPrefix || "ls1";

  const V = (prop?: string, key?: string) => prop ?? (key ? t(key as any) : "");

  const textOrder = reverse ? "md:order-2" : "md:order-1";
  const cardOrder = reverse ? "md:order-1" : "md:order-2";

  const hover =
    "transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(102,249,196,0.12)] hover:border-4 hover:border-primary/30 hover:bg-[rgba(102,249,196,0.03)]";

  return (
    <section className="w-full text-foreground py-20 bg-background">
      <div className={`max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-stretch px-6`}>
        <div className={`text-left flex flex-col justify-center h-full ${textOrder}`}>
          <p className="text-primary font-semibold mb-2">{V(tag, `${prefix}_tag`)}</p>
          <h2 className="text-4xl font-bold mb-6">{V(title, `${prefix}_title`)}</h2>
          <p className="text-foreground/80 mb-8">{V(description, `${prefix}_desc`)}</p>
          {showMainButton && (
            <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold">{V(buttonText, `${prefix}_button`)}</button>
          )}
        </div>

        <div className={`${hover} bg-card text-card-foreground overflow-hidden rounded-xl p-8 border border-border h-full flex flex-col justify-center ${cardOrder}`}>
          <div className="relative rounded-xl overflow-hidden">
            <img src={image} alt={V(cardTitle, `${prefix}_cardTitle`) || "thumbnail"} className="w-full object-cover" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/90 dark:bg-black/70 p-3 rounded-full">▶</div>
            </div>
          </div>

          <h3 className="text-2xl font-bold mt-6">{V(cardTitle, `${prefix}_cardTitle`)}</h3>
          <p className="text-foreground/80 mt-2">{V(cardSubtitle, `${prefix}_cardSubtitle`)}</p>

          <div className="flex gap-4 mt-6">
            {showCardButton1 && <button className="flex-1 bg-primary text-primary-foreground px-4 py-3 rounded-lg font-semibold">{V(cardButton1, `${prefix}_cardButton1`)}</button>}
            {showCardButton2 && <button className="flex-1 bg-secondary text-secondary-foreground px-4 py-3 rounded-lg font-semibold">{V(cardButton2, `${prefix}_cardButton2`)}</button>}
          </div>
        </div>
      </div>
    </section>
  );
}
