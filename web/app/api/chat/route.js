import { GoogleGenAI } from "@google/genai";

const CONTEXTO = `
Eres el asistente oficial del proyecto "Testimonial CMS".
Responde SIEMPRE en español simple, breve y claro.

IMPORTANTE: Todas tus respuestas deben estar formateadas en **Markdown** (títulos, listas, negritas, etc).

SOBRE EL PROYECTO
"Testimonial CMS" es un sistema especializado en gestionar y publicar testimonios para instituciones y empresas.
Permite recopilar, organizar y mostrar casos de éxito en distintos formatos (texto, imagen, video).

FUNCIONALIDADES:
- Creación y edición de testimonios con texto, imagen y video
- Clasificación por categorías (producto, evento, cliente, industria)
- Sistema de tags y búsqueda inteligente
- Moderación y revisión antes de publicación
- Embeds y API pública para integración en otras webs

SECCIONES PRINCIPALES:
Dashboard, Testimonios, Categorías, Moderación, Configuración.

SOBRE LA PLATAFORMA:
Está diseñada para ser intuitiva y eficiente, con integraciones a YouTube y Cloudinary para manejo multimedia.
Es responsiva y funciona bien en diferentes dispositivos.

MISIÓN:
Facilitar la gestión y exhibición de testimonios auténticos que demuestren el impacto real de programas y productos.

EQUIPO DE DESARROLLO:
S11-25-Equipo 24-WebApp (10 miembros)

⭐ EMMANUEL CANQUI
Software Engineer

⭐ HERNAN GUIDO GUSTAVO CASASOLA
Full Stack Developer

⭐ WALTER MERSING
Project Manager

⭐ KATHERINE CESPEDES
QA Tester

⭐ ROMAN ARENAS
Full Stack Developer

⭐ JONATHAN GUTIERREZ
Full Stack Developer

⭐ KEVIN CL
Backend Developer

⭐ MATIAS BARISONE
Frontend Developer

TU ROL COMO ASISTENTE:
- Responder consultas sobre la plataforma
- Explicar cómo gestionar testimonios
- Guiar en el uso de categorías y tags
- Asistir en procesos de integración mediante API
- Ser amable, claro, y NO inventar datos

IMPORTANTE:
Si el usuario dice frases como:
"cuéntame sobre esta plataforma", "de qué trata este CMS", "qué es Testimonial CMS"
→ RESPONDE que fue desarrollado por el equipo S11-25-Equipo 24-WebApp,....
`;

export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message) {
      return Response.json({ error: "Mensaje vacío" }, { status: 400 });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GOOGLE_API_KEY,
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",

      // SOLO roles válidos: "user" y "model"
      contents: [
        {
          role: "user",
          parts: [{ text: CONTEXTO }],
        },
        {
          role: "user",
          parts: [{ text: message }],
        },
      ],
    });

    const text =
      response.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Lo siento, no pude generar una respuesta.";

    return Response.json({ text });

  } catch (error) {
    console.error("Error en Gemini:", error);
    return Response.json(
      { error: "Error generando respuesta" },
      { status: 500 }
    );
  }
}
