"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function EnvioDeTestimoniosPage() {
  const [testimonial, setTestimonial] = useState("");
  const [rating, setRating] = useState<number>(5);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [logo, setLogo] = useState<File | null>(null);
  const [useDefaultLogo, setUseDefaultLogo] = useState(true);

  const t = useTranslations("testimonialForm");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const payload = { testimonial, rating, name, email, title, file, logo };
    console.log("Enviar testimonio:", payload);

    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-start justify-center py-16 px-6">
      <div className="w-full max-w-3xl">
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-card p-6 rounded-lg border-2 border-primary/30 shadow-lg"
        >
          <div>
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
              {sent ? t("sent_message") : t("optional_note")}
            </div>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Enviando..." : t("submit")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
