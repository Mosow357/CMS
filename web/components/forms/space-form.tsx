"use client"

import * as React from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { MediaUpload } from "@/components/ui/media-upload"
import { cn } from "@/lib/utils"

type Step = {
  id: string
  title: string
  description: string
}

const steps: Step[] = [
  {
    id: "basics",
    title: "Datos básicos",
    description: "Nombre, descripción e identidad visual",
  },
  {
    id: "details",
    title: "Detalles",
    description: "Completa la información adicional",
  },
  {
    id: "review",
    title: "Revisión",
    description: "Confirma y envía tu registro",
  },
]

type FormData = {
  name: string
  description: string
  image: File | null
  logo: File | null
}

const initialData: FormData = {
  name: "",
  description: "",
  image: null,
  logo: null,
}

export function SpaceForm() {
  const [currentStep, setCurrentStep] = React.useState(0)
  const [formData, setFormData] = React.useState<FormData>(initialData)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  function handleFileChange(field: "image" | "logo", file: File | null) {
    setFormData((prev) => ({ ...prev, [field]: file }))
  }

  function handleNext() {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
  }

  function handleBack() {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (currentStep < steps.length - 1) {
      handleNext()
      return
    }

    try {
      setIsSubmitting(true)
      // Placeholder: replace with actual mutation/request when ready
      await new Promise((resolve) => setTimeout(resolve, 800))
      console.info("Space/company payload", formData)
    } finally {
      setIsSubmitting(false)
    }
  }

  function renderCurrentStep() {
    switch (steps[currentStep].id) {
      case "basics":
        return (
          <div className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre del espacio o compañía</Label>
              <Input
                id="name"
                name="name"
                placeholder="Ej. Estudio Creativo Aurora"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe brevemente el espacio, misión o servicios..."
                value={formData.description}
                onChange={handleInputChange}
                rows={5}
                required
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <MediaUpload
                id="coverImage"
                label="Imagen destacada"
                description="Sube una imagen para el encabezado del espacio."
                previewUrl={null}
                onChange={(file) => handleFileChange("image", file)}
                emptyState="Arrastra o selecciona una imagen (.jpg, .png)"
              />

              <MediaUpload
                id="logo"
                label="Logo"
                description="Formatos recomendados: PNG o SVG."
                variant="logo"
                previewUrl={null}
                onChange={(file) => handleFileChange("logo", file)}
                emptyState="Selecciona el logo principal"
              />
            </div>
          </div>
        )
      case "details":
        return (
          <div className="text-sm text-muted-foreground">
            Próximamente: campos adicionales para datos de contacto, redes,
            ubicación, etc.
          </div>
        )
      case "review":
        return (
          <div className="space-y-2 text-sm">
            <p className="text-muted-foreground">
              Revisa la información antes de enviar. Esta sección se puede
              extender con un resumen de todos los datos capturados.
            </p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <CardTitle>Registrar un nuevo espacio o compañía</CardTitle>
              <CardDescription>
                Completa el flujo para crear y personalizar tu espacio.
              </CardDescription>
            </div>
            <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Paso {currentStep + 1} de {steps.length}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Stepper currentStep={currentStep} />
          <Separator />
          {renderCurrentStep()}
        </CardContent>
        <CardFooter className="flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-muted-foreground">
            {steps[currentStep].description}
          </div>
          <div className="flex w-full gap-2 sm:w-auto">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0 || isSubmitting}
              className="flex-1 sm:flex-none"
            >
              Anterior
            </Button>
            <Button
              type="submit"
              className="flex-1 sm:flex-none"
              disabled={isSubmitting}
            >
              {currentStep < steps.length - 1
                ? "Continuar"
                : isSubmitting
                  ? "Enviando..."
                  : "Enviar"}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </form>
  )
}

type StepperProps = {
  currentStep: number
}

function Stepper({ currentStep }: StepperProps) {
  return (
    <ol className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep
        const isActive = index === currentStep
        return (
          <li key={step.id} className="flex items-center gap-3">
            <div
              className={cn(
                "flex size-8 items-center justify-center rounded-full border text-sm font-semibold transition-colors",
                isCompleted && "border-primary bg-primary text-primary-foreground",
                isActive &&
                  !isCompleted &&
                  "border-primary text-primary bg-primary/10",
                !isCompleted &&
                  !isActive &&
                  "border-muted-foreground/40 text-muted-foreground"
              )}
            >
              {index + 1}
            </div>
            <div className="space-y-0.5 text-sm">
              <p
                className={cn(
                  "font-medium",
                  isActive ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {step.title}
              </p>
              <p className="text-xs text-muted-foreground">{step.description}</p>
            </div>
          </li>
        )
      })}
    </ol>
  )
}

