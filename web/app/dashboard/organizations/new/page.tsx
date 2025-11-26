import { SpaceForm } from '@/components/forms/space-form'

export default function NewOrganizationPage() {
    return (
        <div className="p-0">
            {/* <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">Nueva Organización</h1>
                <p className="text-muted-foreground">
                    Completa el formulario para agregar una nueva organización
                </p>
            </div> */}

            <SpaceForm />
        </div>
    )
}
