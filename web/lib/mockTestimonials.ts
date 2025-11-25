// Mock data para testimonios - simula respuesta de la API
// Organización 1: TechStart (Startup tecnológica)
const techStartTestimonials = [
    {
        id: 'ts-1',
        title: 'Revolucionó nuestra startup',
        content: 'Como startup, necesitábamos una solución rápida y escalable. Esta plataforma nos permitió lanzar en tiempo récord.',
        stars_rating: 5,
        media_type: 'text' as const,
        media_url: null,
        status: 'published',
        created_at: '2024-01-15T10:30:00Z',
        author: {
            name: 'Laura Chen',
            email: 'laura@techstart.io',
            title: 'Founder & CEO',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Laura'
        },
        category: {
            name: 'Startup',
            id: 'cat-startup'
        },
        tags: ['innovación', 'velocidad']
    },
    {
        id: 'ts-2',
        title: 'Increíble soporte técnico',
        content: 'El equipo de soporte respondió todas nuestras dudas en menos de 2 horas. Impresionante nivel de servicio.',
        stars_rating: 5,
        media_type: 'image' as const,
        media_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400',
        status: 'published',
        created_at: '2024-02-01T14:20:00Z',
        author: {
            name: 'David Park',
            email: 'david@techstart.io',
            title: 'CTO',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David'
        },
        category: {
            name: 'Soporte',
            id: 'cat-support'
        },
        tags: ['soporte', 'rápido']
    },
    {
        id: 'ts-3',
        title: 'Escalabilidad perfecta',
        content: 'Pasamos de 100 a 10,000 usuarios sin ningún problema. La infraestructura aguantó perfectamente.',
        stars_rating: 5,
        media_type: 'video' as const,
        media_url: 'dQw4w9WgXcQ',
        status: 'published',
        created_at: '2024-02-15T09:15:00Z',
        author: {
            name: 'Sofia Ramirez',
            email: 'sofia@techstart.io',
            title: 'Head of Engineering',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia'
        },
        category: {
            name: 'Tecnología',
            id: 'cat-tech'
        },
        tags: ['escalabilidad', 'performance']
    },
    {
        id: 'ts-4',
        title: 'ROI en 3 meses',
        content: 'Recuperamos la inversión en solo 3 meses. Los resultados superaron nuestras proyecciones más optimistas.',
        stars_rating: 5,
        media_type: 'text' as const,
        media_url: null,
        status: 'published',
        created_at: '2024-03-01T11:30:00Z',
        author: {
            name: 'Marcus Johnson',
            email: 'marcus@techstart.io',
            title: 'CFO',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus'
        },
        category: {
            name: 'Finanzas',
            id: 'cat-finance'
        },
        tags: ['ROI', 'resultados']
    }
];

// Organización 2: EduLearn (Plataforma educativa)
const eduLearnTestimonials = [
    {
        id: 'el-1',
        title: 'Transformó nuestra forma de enseñar',
        content: 'Como profesora, esta herramienta me permitió conectar mejor con mis estudiantes y hacer las clases más interactivas.',
        stars_rating: 5,
        media_type: 'text' as const,
        media_url: null,
        status: 'published',
        created_at: '2024-01-20T08:00:00Z',
        author: {
            name: 'Ana Martínez',
            email: 'ana@edulearn.com',
            title: 'Profesora de Matemáticas',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=AnaMartinez'
        },
        category: {
            name: 'Educación',
            id: 'cat-education'
        },
        tags: ['enseñanza', 'innovación']
    },
    {
        id: 'el-2',
        title: 'Mis hijos aprenden jugando',
        content: 'Como madre, estoy encantada. Mis hijos ahora disfrutan estudiar y sus calificaciones han mejorado notablemente.',
        stars_rating: 5,
        media_type: 'image' as const,
        media_url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400',
        status: 'published',
        created_at: '2024-02-05T16:45:00Z',
        author: {
            name: 'Carmen López',
            email: 'carmen@gmail.com',
            title: 'Madre de familia',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carmen'
        },
        category: {
            name: 'Padres',
            id: 'cat-parents'
        },
        tags: ['familia', 'aprendizaje']
    },
    {
        id: 'el-3',
        title: 'Aprendí programación desde cero',
        content: 'Nunca pensé que podría aprender a programar, pero con esta plataforma lo logré en 6 meses. ¡Ahora trabajo como desarrollador!',
        stars_rating: 5,
        media_type: 'video' as const,
        media_url: 'jNQXAC9IVRw',
        status: 'published',
        created_at: '2024-02-20T10:30:00Z',
        author: {
            name: 'Roberto Sánchez',
            email: 'roberto@outlook.com',
            title: 'Estudiante → Developer',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Roberto'
        },
        category: {
            name: 'Estudiantes',
            id: 'cat-students'
        },
        tags: ['programación', 'éxito']
    },
    {
        id: 'el-4',
        title: 'Excelente para clases remotas',
        content: 'Durante la pandemia, esta plataforma nos salvó. Pudimos continuar con las clases sin interrupciones.',
        stars_rating: 5,
        media_type: 'text' as const,
        media_url: null,
        status: 'published',
        created_at: '2024-03-10T13:00:00Z',
        author: {
            name: 'Dr. Miguel Torres',
            email: 'miguel@edulearn.com',
            title: 'Director Académico',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Miguel'
        },
        category: {
            name: 'Instituciones',
            id: 'cat-institutions'
        },
        tags: ['remoto', 'educación']
    },
    {
        id: 'el-5',
        title: 'Interfaz muy intuitiva',
        content: 'Tengo 65 años y nunca había usado una plataforma así. Me sorprendió lo fácil que es de usar.',
        stars_rating: 4,
        media_type: 'image' as const,
        media_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400',
        status: 'published',
        created_at: '2024-03-15T15:20:00Z',
        author: {
            name: 'Elena Rodríguez',
            email: 'elena@gmail.com',
            title: 'Estudiante Senior',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena'
        },
        category: {
            name: 'Adultos Mayores',
            id: 'cat-seniors'
        },
        tags: ['usabilidad', 'accesible']
    }
];

// Mapeo de organizaciones a sus testimonios
const testimonialsByOrganization: Record<string, typeof techStartTestimonials> = {
    'techstart': techStartTestimonials,
    'edulearn': eduLearnTestimonials,
    // Fallback para IDs genéricos
    'org-123': techStartTestimonials,
    'org-456': eduLearnTestimonials,
};

// Función helper para obtener testimonios por organización
export function getTestimonialsByOrganization(organizationId: string) {
    return testimonialsByOrganization[organizationId] || techStartTestimonials;
}

// Exportar todos los testimonios (para compatibilidad)
export const mockTestimonials = [...techStartTestimonials, ...eduLearnTestimonials];

export type Testimonial = typeof techStartTestimonials[0];
