"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/components/providers/translation-provider";

export default function EnvioDeTestimoniosPage() {
  const [testimonial, setTestimonial] = useState("");
  const [rating, setRating] = useState<number>(5);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  // ✅ LOGO RANDOM (tipo avatar)
  const randomLogos = [
    "https://picsum.photos/200?random=1",
    "https://picsum.photos/200?random=2",
    "https://picsum.photos/200?random=3",
  ];
  const logoUrl = randomLogos[Math.floor(Math.random() * randomLogos.length)];

  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = { testimonial, rating, name, email, title, file };
    console.log("Enviar testimonio:", payload);

    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    setSent(true);
  };

  return (
    <div className="mt-20">
    <div className="min-h-screen bg-background text-foreground flex items-start justify-center py-16 px-6 ">
      <div className="w-full max-w-3xl ">

       

        {/* ✅ FORMULARIO */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-card p-6 rounded-lg border-2 border-primary/30 shadow-lg"
        >
          <div>
             {/* ✅ AVATAR DECORATIVO ARRIBA */}
        <div className="flex justify-left mb-4">
          <img
            src={logoUrl}
            alt="Logo decorativo"
            className="w-12 h-12 rounded-full object-cover opacity-80"
          />
        </div>
            <Label className="text-left mb-2 text-primary uppercase font-semibold">
              {(t.envio_testimonial_label as string) || "Tu testimonio"}
            </Label>
            <textarea
              value={testimonial}
              onChange={(e) => setTestimonial(e.target.value)}
              placeholder={
                (t.envio_testimonial_placeholder as string) ||
                "Escribe tu experiencia aquí..."
              }
              className="w-full min-h-[140px] rounded-md border border-input bg-transparent px-3 py-2 text-base text-foreground placeholder:text-foreground/80 uppercase"
            />
          </div>

          <div>
            <Label className="text-left mb-2 text-primary uppercase font-semibold">
              {(t.envio_rating_label as string) || "Calificación"}
            </Label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  aria-label={`${n} estrellas`}
                  onClick={() => setRating(n)}
                  className={`text-2xl transition-colors ${
                    n <= rating ? "text-yellow-400" : "text-foreground/80"
                  }`}
                >
                  {n <= rating ? "★" : "☆"}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-left mb-2 text-primary uppercase font-semibold">
              {(t.envio_name_label as string) || "Tu nombre"}
            </Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={(t.envio_name_label as string) || "Tu nombre"}
            />
          </div>

          <div>
            <Label className="text-left mb-2 text-primary uppercase font-semibold">
              {(t.envio_email_label as string) || "Tu email"}
            </Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={(t.envio_email_label as string) || "tu@email.com"}
              type="email"
            />
          </div>

          <Label className="text-left mb-2 font-semibold uppercase text-primary">
            {t.envio_file_label}
          </Label>

          <label
            htmlFor="fileUpload"
            className="cursor-pointer w-full flex items-center justify-center py-3 rounded-md bg-primary text-primary-foreground font-semibold transition hover:opacity-90"
          >
            {t.envio_file_button}
          </label>

          <input
            id="fileUpload"
            type="file"
            accept="image/*,video/*"
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />

          {file && (
            <p className="text-sm text-foreground/70 mt-2">
              {t.envio_file_selected}: <strong>{file.name}</strong>
            </p>
          )}

          <div className="flex items-center justify-between">
            <div className="text-sm text-foreground/80">
              {sent
                ? (t.envio_sent_message as string) ||
                  "Gracias — tu testimonio fue enviado."
                : (t.envio_optional_note as string) ||
                  "Todos los campos son opcionales; usa un nombre si quieres aparecer públicamente."}
            </div>
            <Button type="submit" disabled={submitting}>
              {submitting
                ? "Enviando..."
                : (t.envio_submit as string) || "Enviar testimonio"}
            </Button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}
