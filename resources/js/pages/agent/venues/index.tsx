import AppLayout from '@/layouts/app-layout';

export default function AgentVenuesIndex({ venues }: { venues: { data: Array<{ id: number; title: string; approval_status: string }> } }) {
  return (
    <AppLayout>
      <div className="mx-auto max-w-5xl space-y-4 p-6">
        <h1 className="text-2xl font-semibold">My Listings</h1>
        <a className="inline-block rounded bg-black px-4 py-2 text-white" href="/agent/venues/create">Add Venue</a>
        <div className="space-y-2">
          {venues.data.map((venue) => (
            <div key={venue.id} className="rounded border p-4">
              <div className="font-medium">{venue.title}</div>
              <div className="text-sm text-gray-500">Status: {venue.approval_status}</div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
