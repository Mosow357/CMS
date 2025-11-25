// import { getTestimonialsBySource, getSourceInfo } from '../../../lib/data';
// import { generateStars, formatDate } from '../../../lib/utils';

// export default async function EmbedWall({ params, searchParams }) {
//   const { sourceId } = await params;
//   const theme = (await searchParams)?.theme || 'light';
  
//   const testimonials = await getTestimonialsBySource(sourceId);
//   const sourceInfo = getSourceInfo(sourceId);

//   // Clase CSS basada en el tema
//   const containerClass = `mansory-wall theme-${theme}`;
//   const cardClass = `testimonial-card theme-${theme}`;

//   if (testimonials.length === 0) {
//     return (
//       <div className={containerClass}>
//         <div className={cardClass}>
//           <p>Aún no hay testimonios para {sourceInfo.title}.</p>
//           <p>¡Sé el primero en compartir tu experiencia!</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={containerClass}>
//       {testimonials.map((testimonial) => (
//         <div key={testimonial.id} className={cardClass}>
//           <div className="testimonial-rating">
//             {generateStars(testimonial.rating)}
//           </div>
//           <div className="testimonial-content">
//             {testimonial.content}
//           </div>
//           <div className="testimonial-author">
//             <div className="author-avatar">
//               {testimonial.author.name.charAt(0).toUpperCase()}
//             </div>
//             <div className="author-info">
//               <h4>{testimonial.author.name}</h4>
//               <p>{testimonial.author.title}</p>
//             </div>
//           </div>
//           <div className="testimonial-date">
//             {formatDate(testimonial.createdAt)}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }


// LLEVAR A UTILS JS, o similar
// conectar con el get de testimonials (data.js)

// export function generateStars(rating) {
//   return Array.from({ length: 5 }, (_, i) => (
//     i < rating ? '★' : '☆'
//   )).join('');
// }

// export function formatDate(dateString) {
//   return new Date(dateString).toLocaleDateString('es-ES', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric'
//   });
// }

import React from 'react'

function page() {
  return (
    <div>En contruccion</div>
  )
}

export default page