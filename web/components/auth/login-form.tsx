"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { loginAction } from "@/lib/actions/auth"
import { useToast } from "@/hooks/use-toast"

export function LoginForm() {
  const t = useTranslations("auth.login")
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await loginAction({
        username: formData.username,
        password: formData.password,
        rememberMe: formData.rememberMe,
      })

      if (result.success && result.data) {
        toast({
          title: "¡Bienvenido!",
          description: "Has iniciado sesión correctamente",
        })
        // Usar la ruta de redirección que viene en la respuesta
        router.push(result.data.redirectPath || "/dashboard")
      } else {
        toast({
          title: "Error",
          description: result.error || "Error al iniciar sesión",
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

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">{t("title")}</CardTitle>
        <CardDescription>{t("subtitle")}</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">{t("username") || "Usuario"}</Label>
            <Input
              id="username"
              type="text"
              placeholder={t("usernamePlaceholder") || "Ingresa tu usuario"}
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">{t("password")}</Label>
              <a
                href="#"
                className="text-sm text-primary hover:underline"
              >
                {t("forgotPassword")}
              </a>
            </div>
            <Input
              id="password"
              type="password"
              placeholder={t("passwordPlaceholder")}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              disabled={isLoading}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={formData.rememberMe}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, rememberMe: checked as boolean })
              }
              disabled={isLoading}
            />
            <Label
              htmlFor="remember"
              className="text-sm font-normal cursor-pointer"
            >
              {t("rememberMe")}
            </Label>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 mt-4">
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? t("common.loading") : t("submit")}
          </Button>
          <p className="text-sm text-center text-foreground/80">
            {t("noAccount")}{" "}
            <a href="/register" className="text-primary hover:underline font-medium">
              {t("signUp")}
            </a>
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}
