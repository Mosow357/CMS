import { cn } from "@/lib/utils"

interface UserAvatarProps {
    name: string
    className?: string
    size?: 'xs' | 'sm' | 'md' | 'lg'
}

// Función para obtener las iniciales de un nombre
function getInitials(name: string): string {
    const parts = name.trim().split(' ')
    if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    }
    return name.slice(0, 2).toUpperCase()
}

// Función para generar un color consistente basado en el nombre
function getColorFromName(name: string): string {
    const colors = [
        'bg-blue-500 text-white',
        'bg-purple-500 text-white',
        'bg-green-500 text-white',
        'bg-orange-500 text-white',
        'bg-pink-500 text-white',
        'bg-cyan-500 text-white',
        'bg-indigo-500 text-white',
        'bg-teal-500 text-white',
    ]

    // Generar un índice basado en el nombre
    let hash = 0
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }

    return colors[Math.abs(hash) % colors.length]
}

export function UserAvatar({ name, className, size = 'md' }: UserAvatarProps) {
    const initials = getInitials(name)
    const colorClass = getColorFromName(name)

    const sizeClasses = {
        xs: 'w-6 h-6 text-xs',
        sm: 'w-8 h-8 text-xs',
        md: 'w-10 h-10 text-sm',
        lg: 'w-12 h-12 text-base'
    }

    return (
        <div
            className={cn(
                'flex items-center justify-center rounded-full font-semibold',
                colorClass,
                sizeClasses[size],
                className
            )}
        >
            {initials}
        </div>
    )
}
