import { Head } from '@inertiajs/react';
import DashboardPageShell from '@/components/dashboard-page-shell';
import UserForm from './form';

export default function DashboardUsersEdit({
    managedUser,
    roles,
    statuses,
}: any) {
    return (
        <>
            <Head title={`Edit ${managedUser.name}`} />
            <DashboardPageShell
                title={`Edit ${managedUser.name}`}
                description="Update user profile, role, status, or password."
            >
                <UserForm
                    user={managedUser}
                    roles={roles}
                    statuses={statuses}
                    submitLabel="Update User"
                />
            </DashboardPageShell>
        </>
    );
}
