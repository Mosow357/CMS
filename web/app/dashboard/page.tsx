import { getSession, hasRole, hasMinimumRole } from '@/lib/actions/session'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
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

    return <div>Welcome {session.user?.username}</div>
}