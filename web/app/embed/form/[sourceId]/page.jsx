'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function EmbedForm({ params }) {
  const [sourceId, setSourceId] = useState('');
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState('light');

  // Usar el hook useSearchParams
  const searchParams = useSearchParams();

  // Manejar params asíncronamente
  useEffect(() => {
    async function resolveParams() {
      try {
        const resolvedParams = await params;
        setSourceId(resolvedParams.sourceId);
        setIsLoading(false);
      } catch (error) {
        console.error('Error resolving params:', error);
        setIsLoading(false);
      }
    }
    
    resolveParams();
  }, [params]);

  // Manejar searchParams por separado
  useEffect(() => {
    if (searchParams) {
      const urlTheme = searchParams.get('theme') || 'light';
      // console.log('Theme from URL:', urlTheme);
      setTheme(urlTheme);
    }
  }, [searchParams]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!sourceId) {
      setMessage('Error: No se pudo cargar el formulario');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    const formData = new FormData(e.target);
    const data = {
      sourceId,
      content: formData.get('content'),
      rating: parseInt(formData.get('rating')),
      author: {
        name: formData.get('authorName'),
        email: formData.get('authorEmail'),
        title: formData.get('authorTitle')
      }
    };

    try {
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setMessage('¡Gracias por tu testimonio!');
        e.target.reset();
        setRating(0);
      } else {
        setMessage('Error: ' + result.error);
      }
    } catch (error) {
      setMessage('Error de conexión');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Clases CSS basadas en el tema
  const containerClass = `testimonial-form theme-${theme}`;
  const buttonClass = `submit-btn theme-${theme}`;

  if (isLoading) {
    return (
      <div className={containerClass}>
        <div style={{ 
          textAlign: 'center', 
          padding: '2rem',
          color: theme === 'dark' ? '#ccc' : '#666'
        }}>
          Cargando formulario...
        </div>
      </div>
    );
  }

  return (
    <div className={containerClass}>
      <h3 className=''>Comparte tu experiencia</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Tu testimonio *</label>
          <textarea 
            name="content" 
            required 
            placeholder="Cuéntanos tu experiencia..."
          />
        </div>

        <div className="form-group">
          <label>Calificación</label>
          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${star <= rating ? 'active' : ''}`}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </div>
          <input type="hidden" name="rating" value={rating} />
        </div>

        <div className="form-group">
          <label>Tu nombre *</label>
          <input 
            type="text" 
            name="authorName" 
            required 
            placeholder="Ej: María González"
          />
        </div>

        <div className="form-group">
          <label>Tu email</label>
          <input 
            type="email" 
            name="authorEmail" 
            placeholder="Ej: maria@ejemplo.com"
          />
        </div>

        <div className="form-group">
          <label>Tu título/empresa</label>
          <input 
            type="text" 
            name="authorTitle" 
            placeholder="Ej: Developer en TechCo"
          />
        </div>

        <button 
          type="submit" 
          className={buttonClass}
          disabled={isSubmitting || !sourceId}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar testimonio'}
        </button>

        {message && (
          <div className={`message theme-${theme}`} style={{ 
            marginTop: '1rem', 
            padding: '0.5rem',
            borderRadius: '4px',
            background: message.includes('Error') 
              ? (theme === 'dark' ? '#4a1c1c' : '#f8d7da')
              : (theme === 'dark' ? '#1a3a4a' : '#d1edff'),
            color: message.includes('Error') 
              ? (theme === 'dark' ? '#f8a5a5' : '#721c24')
              : (theme === 'dark' ? '#a5d8ff' : '#004085')
          }}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
}