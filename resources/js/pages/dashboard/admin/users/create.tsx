import { Head } from '@inertiajs/react';
import DashboardPageShell from '@/components/dashboard-page-shell';
import UserForm from './form';

export default function DashboardUsersCreate({ roles, statuses }: any) {
    return (
        <>
            <Head title="Create User" />
            <DashboardPageShell
                title="Create User"
                description="Add a new user account."
            >
                <UserForm
                    roles={roles}
                    statuses={statuses}
                    submitLabel="Create User"
                />
            </DashboardPageShell>
        </>
    );
}
