export default function EmbedPage() {
    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">Configuración del Muro</h1>
                <p className="text-muted-foreground">
                    Personaliza cómo se muestra el muro de testimonios en tu sitio web
                </p>
            </div>

            <div className="border rounded-lg p-6 bg-card">
                <h2 className="text-xl font-semibold mb-4">Código de Embed</h2>
                <p className="text-sm text-muted-foreground mb-4">
                    Copia y pega este código en tu sitio web para mostrar el muro de testimonios
                </p>

                <div className="bg-muted p-4 rounded-md font-mono text-sm overflow-x-auto">
                    <code>
                        {`<div id="testimonials-wall"></div>
<script src="/embed/widget.js"></script>
<script>
  TestimonialsWall.init({
    containerId: 'testimonials-wall',
    organizationId: 'your-org-id'
  });
</script>`}
                    </code>
                </div>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-3">Vista Previa</h3>
                    <div className="border rounded-lg p-4 bg-muted/30">
                        <p className="text-sm text-muted-foreground text-center py-8">
                            La vista previa del muro se mostrará aquí
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
