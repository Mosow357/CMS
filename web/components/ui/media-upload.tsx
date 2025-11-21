"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

type MediaUploadProps = {
  id: string
  label: string
  description?: string
  accept?: string
  variant?: "logo" | "image"
  previewUrl?: string | null
  onChange?: (file: File | null) => void
  emptyState?: string
}

export function MediaUpload({
  id,
  label,
  description,
  accept = "image/*",
  variant = "image",
  previewUrl,
  onChange,
  emptyState = "No se ha seleccionado ningún archivo",
}: MediaUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [objectUrl, setObjectUrl] = React.useState<string | null>(null)
  const [localPreview, setLocalPreview] = React.useState<string | null>(
    previewUrl ?? null
  )

  React.useEffect(() => {
    setLocalPreview(previewUrl ?? null)
  }, [previewUrl])

  React.useEffect(() => {
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl)
      }
    }
  }, [objectUrl])

  function handleSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null

    if (file) {
      const url = URL.createObjectURL(file)
      setLocalPreview(url)
      setObjectUrl((prev) => {
        if (prev) {
          URL.revokeObjectURL(prev)
        }
        return url
      })
    } else {
      setLocalPreview(previewUrl ?? null)
    }

    onChange?.(file)
  }

  return (
    <div className="rounded-lg border bg-card/50 p-4 shadow-xs">
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-sm font-medium">{label}</p>
          {description ? (
            <p className="text-xs text-muted-foreground">{description}</p>
          ) : null}
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => inputRef.current?.click()}
        >
          Subir archivo
        </Button>
      </div>

      <div
        className={cn(
          "mt-4 flex min-h-24 items-center justify-center rounded-md border border-dashed bg-background/40 px-4 py-6 text-center",
          variant === "logo" && "min-h-0 py-4"
        )}
      >
        {variant === "logo" ? (
          <Avatar className="size-16 border shadow-sm">
            {localPreview ? (
              <AvatarImage src={localPreview} alt={`Logo for ${label}`} />
            ) : (
              <AvatarFallback>LG</AvatarFallback>
            )}
          </Avatar>
        ) : localPreview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={localPreview}
            alt={`Vista previa de ${label}`}
            className="max-h-40 w-full rounded-md object-cover"
          />
        ) : (
          <p className="text-sm text-muted-foreground">{emptyState}</p>
        )}
      </div>

      <input
        ref={inputRef}
        id={id}
        name={id}
        type="file"
        accept={accept}
        className="sr-only"
        onChange={handleSelect}
      />
    </div>
  )
}

