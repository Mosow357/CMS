"use client";

import { useTranslation } from "@/components/providers/translation-provider";

export default function TestimonialBlock() {
  const { t } = useTranslation();

  return (
    <section className="w-full flex justify-center px-6 py-20">
      <div className="max-w-5xl w-full bg-[#f8f5e9] dark:bg-[#1e1e1e] text-black dark:text-white rounded-2xl p-10 shadow-md relative border border-black/10 dark:border-white/10">

        {/* Estrellas */}
        <div className="flex gap-1 text-indigo-600 dark:text-indigo-400">
          <span className="text-xl">★</span>
          <span className="text-xl">★</span>
          <span className="text-xl">★</span>
          <span className="text-xl">★</span>
          <span className="text-xl">★</span>
        </div>

        {/* Texto */}
        <p className="mt-6 text-xl leading-relaxed font-semibold">
          {(t.tb_text1 as string) || ""} {" "}
          <span className="bg-yellow-200/70 dark:bg-yellow-400/30 px-1">{(t.tb_highlight as string) || ""}</span>
        </p>

        {/* Usuario */}
        <div className="flex items-center gap-4 mt-10">
          <img
            src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=400"
            alt="avatar"
            className="w-14 h-14 rounded-full object-cover"
          />

          <div>
            <p className="font-bold text-lg">{(t.tb_name as string) || ""}</p>
            <p className="text-foreground/80 text-sm">{(t.tb_role as string) || ""}</p>
          </div>
        </div>

        {/* Badge */}
        <div className="absolute bottom-5 right-6 flex items-center gap-2 opacity-80">
          <span className="inline-flex items-center justify-center bg-indigo-600 dark:bg-indigo-500 text-white rounded-full w-5 h-5 text-xs">👍</span>
          <span className="text-sm font-medium">{(t.tb_badge as string) || ""}</span>
        </div>
      </div>
    </section>
  );
}
