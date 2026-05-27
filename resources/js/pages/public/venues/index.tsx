import AppLayout from '@/layouts/app-layout';

export default function PublicVenuesIndex({ venues }: { venues: { data: Array<{ id: number; title: string; slug: string; price: string | null }> } }) {
  return (
    <AppLayout>
      <div className="mx-auto max-w-5xl space-y-4 p-6">
        <h1 className="text-2xl font-semibold">All Venues</h1>
        <div className="grid gap-4 md:grid-cols-2">
          {venues.data.map((venue) => (
            <a key={venue.id} href={`/venues/${venue.slug}`} className="rounded border p-4 hover:bg-gray-50">
              <div className="font-medium">{venue.title}</div>
              <div className="text-sm text-gray-500">{venue.price ? `$${venue.price}` : 'Contact for pricing'}</div>
            </a>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
