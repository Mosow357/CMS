import { getSession, hasRole, hasMinimumRole } from '@/lib/actions/session'
import { redirect } from 'next/navigation'
import { SpaceForm } from '@/components/forms/space-form'

export default async function Page() {
  const session = await getSession()

  // if (!session.isValid) {
  //   redirect('/login')
  // }

  //   const isAdmin = await hasRole('ADMINISTRATOR')
  //   if (!isAdmin) {
  //     redirect('/login')
  //   }

  //   const canEdit = await hasMinimumRole('EDITOR')
  //   if (!canEdit) {
  //     redirect('/login')
  //   }

  return (
    <>
      <div className="mb-8 space-y-2">
        <h2 className="text-2xl font-bold">Bienvenido {session.user?.username}</h2>
        <p className="text-muted-foreground">Este es tu panel principal.</p>
      </div>
      <SpaceForm />
    </>
  );
}
