import { LoginForm } from "@/components/auth/login-form"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-background to-secondary/20 p-4">
      <div className="absolute top-4 right-4 flex gap-2">
        <LanguageToggle />
        <ThemeToggle />
      </div>
      <LoginForm />
      
    </div>
  )
}
