// Mock data para el dashboard - simula respuesta de la API con diferentes estados
// Basado en mockTestimonials.ts pero con variedad de estados para testing del dashboard

export type TestimonialStatus = 'pending' | 'approved' | 'rejected' | 'published'

export interface DashboardTestimonial {
    id: string
    title: string
    content: string
    stars_rating: number
    media_type: 'text' | 'image' | 'video'
    media_url: string | null
    status: TestimonialStatus
    created_at: string
    author: {
        name: string
        email: string
        title: string
    }
    category: {
        name: string
        id: string
    }
    tags: string[]
    organization_id: string
}

// Organización 1: TechStart (Startup tecnológica)
const techStartDashboardTestimonials: DashboardTestimonial[] = [
    {
        id: 'ts-1',
        title: 'Revolucionó nuestra startup',
        content: 'Como startup, necesitábamos una solución rápida y escalable. Esta plataforma nos permitió lanzar en tiempo récord.',
        stars_rating: 5,
        media_type: 'text',
        media_url: null,
        status: 'published',
        created_at: '2024-01-15T10:30:00Z',
        author: {
            name: 'Laura Chen',
            email: 'laura@techstart.io',
            title: 'Founder & CEO',
        },
        category: {
            name: 'Producto',
            id: 'cat-producto'
        },
        tags: ['innovación', 'velocidad'],
        organization_id: 'org-techstart'
    },
    {
        id: 'ts-2',
        title: 'Increíble soporte técnico',
        content: 'El equipo de soporte respondió todas nuestras dudas en menos de 2 horas. Impresionante nivel de servicio.',
        stars_rating: 5,
        media_type: 'image',
        media_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400',
        status: 'approved',
        created_at: '2024-02-01T14:20:00Z',
        author: {
            name: 'David Park',
            email: 'david@techstart.io',
            title: 'CTO',
        },
        category: {
            name: 'Cliente',
            id: 'cat-cliente'
        },
        tags: ['soporte', 'rápido'],
        organization_id: 'org-techstart'
    },
    {
        id: 'ts-3',
        title: 'Escalabilidad perfecta',
        content: 'Pasamos de 100 a 10,000 usuarios sin ningún problema. La infraestructura aguantó perfectamente.',
        stars_rating: 5,
        media_type: 'video',
        media_url: 'dQw4w9WgXcQ',
        status: 'pending',
        created_at: '2024-02-15T09:15:00Z',
        author: {
            name: 'Sofia Ramirez',
            email: 'sofia@techstart.io',
            title: 'Head of Engineering',
        },
        category: {
            name: 'Industria',
            id: 'cat-industria'
        },
        tags: ['escalabilidad', 'performance'],
        organization_id: 'org-techstart'
    },
    {
        id: 'ts-4',
        title: 'ROI en 3 meses',
        content: 'Recuperamos la inversión en solo 3 meses. Los resultados superaron nuestras proyecciones más optimistas.',
        stars_rating: 5,
        media_type: 'text',
        media_url: null,
        status: 'rejected',
        created_at: '2024-03-01T11:30:00Z',
        author: {
            name: 'Marcus Johnson',
            email: 'marcus@techstart.io',
            title: 'CFO',
        },
        category: {
            name: 'Producto',
            id: 'cat-producto'
        },
        tags: ['ROI', 'resultados'],
        organization_id: 'org-techstart'
    },
    {
        id: 'ts-5',
        title: 'Excelente experiencia de usuario',
        content: 'La interfaz es intuitiva y fácil de usar. Nuestro equipo se adaptó en cuestión de días.',
        stars_rating: 4,
        media_type: 'text',
        media_url: null,
        status: 'published',
        created_at: '2024-03-10T16:45:00Z',
        author: {
            name: 'Ana Silva',
            email: 'ana@techstart.io',
            title: 'Product Manager',
        },
        category: {
            name: 'Producto',
            id: 'cat-producto'
        },
        tags: ['usabilidad', 'diseño'],
        organization_id: 'org-techstart'
    },
    {
        id: 'ts-6',
        title: 'Necesita mejoras en la documentación',
        content: 'El producto es bueno pero la documentación técnica podría ser más completa.',
        stars_rating: 3,
        media_type: 'text',
        media_url: null,
        status: 'pending',
        created_at: '2024-03-15T11:20:00Z',
        author: {
            name: 'Roberto Gómez',
            email: 'roberto@techstart.io',
            title: 'Senior Developer',
        },
        category: {
            name: 'Producto',
            id: 'cat-producto'
        },
        tags: ['documentación', 'mejora'],
        organization_id: 'org-techstart'
    }
]

// Organización 2: EduLearn (Plataforma educativa)
const eduLearnDashboardTestimonials: DashboardTestimonial[] = [
    {
        id: 'el-1',
        title: 'Transformó nuestra forma de enseñar',
        content: 'Como profesora, esta herramienta me permitió conectar mejor con mis estudiantes y hacer las clases más interactivas.',
        stars_rating: 5,
        media_type: 'text',
        media_url: null,
        status: 'published',
        created_at: '2024-01-20T08:00:00Z',
        author: {
            name: 'Ana Martínez',
            email: 'ana@edulearn.com',
            title: 'Profesora de Matemáticas',
        },
        category: {
            name: 'Producto',
            id: 'cat-producto'
        },
        tags: ['enseñanza', 'innovación'],
        organization_id: 'org-edulearn'
    },
    {
        id: 'el-2',
        title: 'Mis hijos aprenden jugando',
        content: 'Como madre, estoy encantada. Mis hijos ahora disfrutan estudiar y sus calificaciones han mejorado notablemente.',
        stars_rating: 5,
        media_type: 'image',
        media_url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400',
        status: 'approved',
        created_at: '2024-02-05T16:45:00Z',
        author: {
            name: 'Carmen López',
            email: 'carmen@gmail.com',
            title: 'Madre de familia',
        },
        category: {
            name: 'Cliente',
            id: 'cat-cliente'
        },
        tags: ['familia', 'aprendizaje'],
        organization_id: 'org-edulearn'
    },
    {
        id: 'el-3',
        title: 'Aprendí programación desde cero',
        content: 'Nunca pensé que podría aprender a programar, pero con esta plataforma lo logré en 6 meses. ¡Ahora trabajo como desarrollador!',
        stars_rating: 5,
        media_type: 'video',
        media_url: 'jNQXAC9IVRw',
        status: 'published',
        created_at: '2024-02-20T10:30:00Z',
        author: {
            name: 'Roberto Sánchez',
            email: 'roberto@outlook.com',
            title: 'Estudiante → Developer',
        },
        category: {
            name: 'Cliente',
            id: 'cat-cliente'
        },
        tags: ['programación', 'éxito'],
        organization_id: 'org-edulearn'
    },
    {
        id: 'el-4',
        title: 'Excelente para clases remotas',
        content: 'Durante la pandemia, esta plataforma nos salvó. Pudimos continuar con las clases sin interrupciones.',
        stars_rating: 5,
        media_type: 'text',
        media_url: null,
        status: 'pending',
        created_at: '2024-03-10T13:00:00Z',
        author: {
            name: 'Dr. Miguel Torres',
            email: 'miguel@edulearn.com',
            title: 'Director Académico',
        },
        category: {
            name: 'Evento',
            id: 'cat-evento'
        },
        tags: ['remoto', 'educación'],
        organization_id: 'org-edulearn'
    },
    {
        id: 'el-5',
        title: 'Contenido inapropiado',
        content: 'Este testimonio contiene spam y no es relevante para nuestra plataforma.',
        stars_rating: 1,
        media_type: 'text',
        media_url: null,
        status: 'rejected',
        created_at: '2024-03-12T09:15:00Z',
        author: {
            name: 'Usuario Spam',
            email: 'spam@example.com',
            title: 'N/A',
        },
        category: {
            name: 'Producto',
            id: 'cat-producto'
        },
        tags: ['spam'],
        organization_id: 'org-edulearn'
    }
]

// Combinar todos los testimonios del dashboard
export const mockDashboardTestimonials = [
    ...techStartDashboardTestimonials,
    ...eduLearnDashboardTestimonials
]

// Función helper para filtrar por organización
export function getTestimonialsByOrganization(organizationId: string): DashboardTestimonial[] {
    return mockDashboardTestimonials.filter(t => t.organization_id === organizationId)
}

// Función helper para filtrar por status
export function getTestimonialsByStatus(status: TestimonialStatus): DashboardTestimonial[] {
    return mockDashboardTestimonials.filter(t => t.status === status)
}

// Función helper para filtrar por organización y status
export function getTestimonialsByOrgAndStatus(
    organizationId: string,
    status?: TestimonialStatus
): DashboardTestimonial[] {
    let filtered = getTestimonialsByOrganization(organizationId)

    if (status) {
        filtered = filtered.filter(t => t.status === status)
    }

    return filtered
}

// Estadísticas por organización
export function getTestimonialStats(organizationId?: string) {
    const testimonials = organizationId
        ? getTestimonialsByOrganization(organizationId)
        : mockDashboardTestimonials

    return {
        total: testimonials.length,
        pending: testimonials.filter(t => t.status === 'pending').length,
        approved: testimonials.filter(t => t.status === 'approved').length,
        published: testimonials.filter(t => t.status === 'published').length,
        rejected: testimonials.filter(t => t.status === 'rejected').length,
    }
}
