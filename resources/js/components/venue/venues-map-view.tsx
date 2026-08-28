import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { Link } from '@inertiajs/react';
import MarkerClusterGroup from 'react-leaflet-cluster';

// Fix for default marker icons in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Venue {
    id: number;
    title: string;
    slug: string;
    latitude: number;
    longitude: number;
    price: number;
    average_rating: number;
    category?: { name: string };
}

interface VenuesMapViewProps {
    venues: Venue[];
    className?: string;
    onBoundsChange?: (bounds: { north: number; south: number; east: number; west: number }) => void;
}

// Component to handle map events and bounds changes
function MapBoundsHandler({ onBoundsChange }: { onBoundsChange?: (bounds: { north: number; south: number; east: number; west: number }) => void }) {
    const map = useMapEvents({
        moveend() {
            if (onBoundsChange) {
                const bounds = map.getBounds();
                onBoundsChange({
                    north: bounds.getNorth(),
                    south: bounds.getSouth(),
                    east: bounds.getEast(),
                    west: bounds.getWest(),
                });
            }
        },
    });

    return null;
}

export default function VenuesMapView({ venues, className = 'map-container-lg', onBoundsChange }: VenuesMapViewProps) {
    // Filter venues that have coordinates
    const venuesWithCoords = venues.filter(
        (venue) => venue.latitude && venue.longitude
    );

    // Calculate center point for map
    const mapCenter = venuesWithCoords.length > 0
        ? [
            venuesWithCoords.reduce((sum, venue) => sum + venue.latitude, 0) / venuesWithCoords.length,
            venuesWithCoords.reduce((sum, venue) => sum + venue.longitude, 0) / venuesWithCoords.length,
          ] as [number, number]
        : [0, 0] as [number, number];

    if (venuesWithCoords.length === 0) {
        return (
            <div className={`${className} flex items-center justify-center bg-muted`}>
                <p className="text-muted-foreground">No venues with location data to display on map</p>
            </div>
        );
    }

    return (
        <MapContainer
            center={mapCenter}
            zoom={10}
            className={className}
            scrollWheelZoom={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapBoundsHandler onBoundsChange={onBoundsChange} />
            <MarkerClusterGroup
                chunkedLoading
                maxClusterRadius={50}
                spiderfyOnMaxZoom={true}
                showCoverageOnHover={false}
                zoomToBoundsOnClick={true}
            >
                {venuesWithCoords.map((venue) => (
                    <Marker
                        key={venue.id}
                        position={[venue.latitude, venue.longitude]}
                    >
                        <Popup>
                            <div className="p-2 min-w-[200px]">
                                <h3 className="font-semibold text-sm mb-1">{venue.title}</h3>
                                {venue.category && (
                                    <p className="text-xs text-slate-500 mb-2">{venue.category.name}</p>
                                )}
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium">${venue.price}</span>
                                    <span className="text-xs text-slate-500">
                                        ★ {Number(venue.average_rating ?? 0).toFixed(1)}
                                    </span>
                                </div>
                                <Link
                                    href={`/venues/${venue.slug}`}
                                    className="text-xs text-primary hover:underline block"
                                >
                                    View Details
                                </Link>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MarkerClusterGroup>
        </MapContainer>
    );
}