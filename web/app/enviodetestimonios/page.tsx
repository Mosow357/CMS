"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Navbar from "@/components/landingpage/navbar";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function EnvioDeTestimoniosPage() {
  const [testimonial, setTestimonial] = useState("");
  const [rating, setRating] = useState<number>(5);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [logoUrl, setLogoUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  // ✅ LOGO RANDOM (tipo avatar) - Moved to useEffect for hydration safety
  useEffect(() => {
    const randomLogos = [
      "https://picsum.photos/200?random=1",
      "https://picsum.photos/200?random=2",
      "https://picsum.photos/200?random=3",
    ];
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLogoUrl(randomLogos[Math.floor(Math.random() * randomLogos.length)]);
  }, []);

  const t = useTranslations("testimonialForm");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate required fields
    if (!testimonial || !rating || !name || !email) {
      setError(t("all_fields_required"));
      setSubmitting(false);
      return;
    }
    setError(null);
    setSubmitting(true);

    const payload = { testimonial, rating, name, email, file };
    console.log("Enviar testimonio:", payload);

    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    setSent(true);
  };

  return (
    <div className="mt-20">
      <Navbar simple={true} />
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
                {logoUrl && (
                  <img
                    src={logoUrl}
                    alt="Logo decorativo"
                    className="w-12 h-12 rounded-full object-cover opacity-80"
                  />
                )}
              </div>
              <Label className="text-left mb-2 text-primary uppercase font-semibold">
                {t("testimonial_label")}
              </Label>
              <textarea
                value={testimonial}
                onChange={(e) => setTestimonial(e.target.value)}
                placeholder={t("testimonial_placeholder")}
                className="w-full min-h-[140px] rounded-md border border-input bg-transparent px-3 py-2 text-base text-foreground placeholder:text-foreground/80 uppercase"
              />
            </div>

            <div>
              <Label className="text-left mb-2 text-primary uppercase font-semibold">
                {t("rating_label")}
              </Label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    aria-label={`${n} estrellas`}
                    onClick={() => setRating(n)}
                    className={`text-2xl transition-colors ${n <= rating ? "text-yellow-400" : "text-foreground/80"
                      }`}
                  >
                    {n <= rating ? "★" : "☆"}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-left mb-2 text-primary uppercase font-semibold">
                {t("name_label")}
              </Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("name_label")}
              />
            </div>

            <div>
              <Label className="text-left mb-2 text-primary uppercase font-semibold">
                {t("email_label")}
              </Label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("email_label")}
                type="email"
              />
            </div>

            <Label className="text-left mb-2 font-semibold uppercase text-primary">
              {t("file_label")}
            </Label>

            <label
              htmlFor="fileUpload"
              className="cursor-pointer w-full flex items-center justify-center py-3 rounded-md bg-primary text-primary-foreground font-semibold transition hover:opacity-90"
            >
              {t("file_button")}
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
                {t("file_selected")}: <strong>{file.name}</strong>
              </p>
            )}

            <div className="flex items-center justify-between">
              <div className="text-sm text-foreground/80">
                {t("optional_note")}
              </div>
              <Button type="submit" disabled={submitting}>
                {submitting
                  ? "Enviando..."
                  : t("submit")}
              </Button>
            </div>
          </form>
        </div>
      </div>

      <AlertDialog open={!!error} onOpenChange={() => setError(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Error</AlertDialogTitle>
            <AlertDialogDescription>{error}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setError(null)}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={sent} onOpenChange={() => setSent(false)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¡Gracias!</AlertDialogTitle>
            <AlertDialogDescription>{t("sent_message")}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => {
              setSent(false);
              setTestimonial("");
              setRating(5);
              setName("");
              setEmail("");
              setFile(null);
            }}>OK</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
