import { getSession, hasRole, hasMinimumRole } from '@/lib/actions/session'
import { redirect } from 'next/navigation'

export default async function Page() {
  const session = await getSession()

  if (!session.isValid) {
    redirect('/login')
  }

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
      <h2 className="text-2xl font-bold mb-4">Bienvenido {session.user?.username}</h2>
      <p className="text-muted-foreground">Este es tu panel principal.</p>
    </>
  );
}
