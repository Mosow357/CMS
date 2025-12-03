"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { registerAction } from "@/lib/actions/auth"
import { useToast } from "@/hooks/use-toast"

export function RegisterForm() {
  const t = useTranslations("auth.register")
  const commonT = useTranslations("common")
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    name: "",
    lastname: "",
  })
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validación básica
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: t("errors.passwordMismatch") || "Las contraseñas no coinciden",
        variant: "destructive",
      })
      return
    }

    // Front-end password rules: mínimo 8 caracteres y al menos una mayúscula
    const minLength = 8
    const hasUppercase = /[A-Z]/.test(formData.password)
    if (formData.password.length < minLength || !hasUppercase) {
      const msgs: string[] = []
      if (formData.password.length < minLength) msgs.push(`Mínimo ${minLength} caracteres`)
      if (!hasUppercase) msgs.push('Al menos una letra mayúscula')
      const message = msgs.join(' · ')
      setPasswordError(message)
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      })
      return
    }
    setPasswordError(null)

    setIsLoading(true)

    try {
      const result = await registerAction({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        name: formData.name,
        lastname: formData.lastname,
      })

      if (result.success) {
        toast({
          title: "¡Registro exitoso!",
          description: "Tu cuenta ha sido creada. Ahora puedes iniciar sesión.",
        })
        router.push("/login")
      } else {
        toast({
          title: "Error",
          description: result.error || "Error al registrar usuario",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Error de conexión. Por favor intenta nuevamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = {
      ...formData,
      [e.target.id]: e.target.value
    }
    setFormData(next)

    // Clear password error while user types
    if (e.target.id === 'password' || e.target.id === 'confirmPassword') {
      setPasswordError(null)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">{t("title")}</CardTitle>
        <CardDescription>{t("subtitle")}</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">{t("email")}</Label>
            <Input
              id="email"
              type="email"
              placeholder={t("emailPlaceholder")}
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          {/* Username */}
          <div className="space-y-2">
            <Label htmlFor="username">{t("username")}</Label>
            <Input
              id="username"
              type="text"
              placeholder={t("usernamePlaceholder")}
              value={formData.username}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          {/* Name y Lastname en grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t("name")}</Label>
              <Input
                id="name"
                type="text"
                placeholder={t("namePlaceholder")}
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastname">{t("lastname")}</Label>
              <Input
                id="lastname"
                type="text"
                placeholder={t("lastnamePlaceholder")}
                value={formData.lastname}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">{t("password")}</Label>
            <div className="flex items-center gap-2">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder={t("passwordPlaceholder")}
                value={formData.password}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowPassword(s => !s)}
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showPassword ? 'Ocultar' : 'Mostrar'}
              </Button>
            </div>

            {/* Validaciones por regla */}
            <ul className="mt-2 space-y-1 text-sm">
              <li className={formData.password.length >= 8 ? 'text-green-600' : 'text-destructive'}>
                {formData.password.length >= 8 ? '✓' : '✕'} Mínimo 8 caracteres
              </li>
              <li className={/[A-Z]/.test(formData.password) ? 'text-green-600' : 'text-destructive'}>
                {/[A-Z]/.test(formData.password) ? '✓' : '✕'} Al menos una letra mayúscula
              </li>
            </ul>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">{t("confirmPassword")}</Label>
            <div className="flex items-center gap-2">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder={t("confirmPasswordPlaceholder")}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowConfirmPassword(s => !s)}
                aria-label={showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                {showConfirmPassword ? 'Ocultar' : 'Mostrar'}
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 mt-4">
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? commonT("loading") : t("submit")}
          </Button>
          {/* Mostrar error de confirmación si no coinciden */}
          {formData.confirmPassword && formData.password !== formData.confirmPassword && (
            <p className="text-sm text-destructive text-center">Las contraseñas no coinciden</p>
          )}
          <p className="text-sm text-center text-muted-foreground">
            {t("haveAccount")}{" "}
            <a href="/login" className="text-primary hover:underline font-medium">
              {t("signIn")}
            </a>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}