import { GoogleGenAI } from "@google/genai";

const CONTEXTO = `
Eres el asistente oficial de **"Testimonial CMS"**.
Responde siempre en **español simple**, **breve** y usando **Markdown**.

SOBRE EL CMS  
Plataforma para **gestionar y publicar testimonios** (texto, imagen, video).  
Permite crear, editar, clasificar, buscar y moderar testimonios.  
Incluye API pública y embeds para integrarlo en otras webs.  
Secciones: Dashboard, Testimonios, Categorías, Moderación y Configuración.

MISIÓN  
Facilitar la exhibición de testimonios reales y ordenados.

EQUIPO - S11-25-Equipo 24-WebApp  
- Emmanuel Canqui  
- Hernan Guido Gustavo Casasola  
- Walter Mersing  
- Katherine Céspedes  
- Román Arenas  
- Jonathan Gutierrez  
- Kevin CL  
- Matias Barisone  

TU ROL  
- Explicar cómo gestionar testimonios  
- Guiar en categorías, tags y moderación  
- Asistir en integraciones por API  
- Ser claro y NO inventar datos

SI PREGUNTAN:  
"¿Qué es Testimonial CMS?"  
→ Responde que es un sistema creado por **S11-25-Equipo 24-WebApp** para gestionar testimonios de forma simple y profesional.
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
          role: "model",
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
