(function() {
    // Configuración desde el window object
    const config = window.testimonialConfig;
    
    if (!config || !config.sourceId) {
      console.error('Testimonial Embed: Configuración faltante');
      return;
    }

    // Nuevo manejo de tema
    const theme = config.theme || 'light'; // por defecto 'light'
  
    // Crear iframe
    const iframe = document.createElement('iframe');
    iframe.style.border = 'none';
    iframe.style.width = '100%';
    iframe.style.minHeight = '400px';
    iframe.style.borderRadius = '8px';
    
    // Determinar la URL según el tipo
    const baseUrl = 'http://localhost:3000'; // Desarrollo local
    // const baseUrl = 'https://testimonial-project-theta.vercel.app'; // Producción
    let embedUrl = '';
    
    if (config.type === 'form') {
      embedUrl = `${baseUrl}/embed/form/${config.sourceId}?theme=${theme}`;
      iframe.style.height = '600px';
    } else if (config.type === 'wall') {
      embedUrl = `${baseUrl}/embed/wall/${config.sourceId}?theme=${theme}`;
      iframe.style.height = '800px';
    } else {
      console.error('Testimonial Embed: Tipo no válido. Usa "form" o "wall"');
      return;
    }
  
    iframe.src = embedUrl;
  
    // Encontrar el script actual
    const currentScript = document.currentScript;
    
    // Insertar el iframe después del script
    if (currentScript && currentScript.parentNode) {
      currentScript.parentNode.insertBefore(iframe, currentScript.nextSibling);
    } else {
      document.body.appendChild(iframe);
    }
  
    console.log('Testimonial Embed: Widget cargado para', config.sourceId);
  })();