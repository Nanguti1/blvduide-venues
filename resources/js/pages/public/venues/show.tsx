import AppLayout from '@/layouts/app-layout';

export default function PublicVenueShow({ venue }: { venue: { title: string; description: string } }) {
  return (
    <AppLayout>
      <div className="mx-auto max-w-4xl space-y-4 p-6">
        <h1 className="text-3xl font-semibold">{venue.title}</h1>
        <p className="text-gray-700">{venue.description}</p>
      </div>
    </AppLayout>
  );
}
