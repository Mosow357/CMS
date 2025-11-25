'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { TestimonialCard, CardLayout, FontSize } from '@/components/testimonial-card';
import { getTestimonialsByOrganization, Testimonial } from '@/lib/mockTestimonials';

interface EmbedWallProps {
    params: Promise<{ sourceId: string }>;
}

export default function EmbedWall({ params }: EmbedWallProps) {
    const [sourceId, setSourceId] = useState('');
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const searchParams = useSearchParams();

    // Opciones de personalización desde URL
    const theme = (searchParams?.get('theme') as 'light' | 'dark') || 'light';
    const cardLayout = (searchParams?.get('card') as CardLayout) || 'base';
    const fontSize = (searchParams?.get('fontSize') as FontSize) || 'medium';
    const primaryColor = searchParams?.get('color') || '#3b82f6';

    // Resolver params
    useEffect(() => {
        async function resolveParams() {
            try {
                const resolvedParams = await params;
                setSourceId(resolvedParams.sourceId);

                // TODO: Cuando esté listo el backend, hacer fetch real
                // const response = await fetch(`http://localhost:3001/testimonials?organizationId=${resolvedParams.sourceId}&status=published`);
                // const data = await response.json();
                // setTestimonials(data);

                // Por ahora usamos mock data filtrado por organización
                const orgTestimonials = getTestimonialsByOrganization(resolvedParams.sourceId);
                setTestimonials(orgTestimonials);
                setIsLoading(false);
            } catch (error) {
                console.error('Error loading testimonials:', error);
                // Fallback a testimonios de la primera organización
                setTestimonials(getTestimonialsByOrganization('techstart'));
                setIsLoading(false);
            }
        }

        resolveParams();
    }, [params]);

    // Auto-resize: Enviar altura al parent (widget)
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const sendHeight = () => {
            const height = document.documentElement.scrollHeight;

            // Enviar mensaje al parent window
            window.parent.postMessage({
                type: 'testimonial-wall-resize',
                height: height
            }, '*');
        };

        // Enviar altura inicial
        setTimeout(sendHeight, 100);

        // Observar cambios en el DOM
        const observer = new ResizeObserver(() => {
            sendHeight();
        });

        observer.observe(document.body);

        // Enviar altura periódicamente (fallback)
        const interval = setInterval(sendHeight, 1000);

        return () => {
            observer.disconnect();
            clearInterval(interval);
        };
    }, [testimonials, isLoading]);

    const isDark = theme === 'dark';

    if (isLoading) {
        return (
            <div className={`min-h-screen p-8 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <div className="max-w-7xl mx-auto">
                    <div className={`text-center ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        <div className="animate-pulse">Cargando testimonios...</div>
                    </div>
                </div>
            </div>
        );
    }

    if (testimonials.length === 0) {
        return (
            <div className={`min-h-screen p-8 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <div className="max-w-7xl mx-auto">
                    <div className={`text-center p-12 rounded-xl ${isDark ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600'
                        }`}>
                        <p className="text-xl mb-2">Aún no hay testimonios</p>
                        <p className="text-sm">¡Sé el primero en compartir tu experiencia!</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen p-2 sm:p-4 md:p-8 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <style jsx global>{`
        :root {
          --primary-color: ${primaryColor};
        }
        
        /* Ajustes para mobile */
        @media (max-width: 640px) {
          .testimonial-card {
            max-width: 100%;
          }
        }
      `}</style>

            <div className="max-w-7xl mx-auto">
                {/* Header opcional */}
                <div className="mb-6 md:mb-8 text-center px-2">
                    <h2 className={`text-2xl sm:text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Lo que dicen nuestros clientes
                    </h2>
                    <p className={`text-sm sm:text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {testimonials.length} testimonios
                    </p>
                </div>

                {/* Masonry Grid - Single column on mobile */}
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="break-inside-avoid">
                            <TestimonialCard
                                testimonial={testimonial}
                                layout={cardLayout}
                                fontSize={fontSize}
                                theme={theme}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
