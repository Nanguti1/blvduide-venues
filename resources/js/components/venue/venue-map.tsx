import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useEffect } from 'react';

// Fix for default marker icons in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface VenueMapProps {
    latitude: number | null;
    longitude: number | null;
    venueName: string;
    venueSlug: string;
    className?: string;
}

export default function VenueMap({
    latitude,
    longitude,
    venueName,
    venueSlug,
    className = 'map-container'
}: VenueMapProps) {
    // If no coordinates provided, show a message
    if (!latitude || !longitude) {
        return (
            <div className={`${className} flex items-center justify-center bg-muted`}>
                <p className="text-muted-foreground">Location coordinates not available</p>
            </div>
        );
    }

    return (
        <MapContainer
            center={[latitude, longitude]}
            zoom={15}
            className={className}
            scrollWheelZoom={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[latitude, longitude]}>
                <Popup>
                    <div className="p-2">
                        <h3 className="font-semibold text-sm">{venueName}</h3>
                        <a
                            href={`/venues/${venueSlug}`}
                            className="text-xs text-primary hover:underline mt-1 block"
                        >
                            View Details
                        </a>
                    </div>
                </Popup>
            </Marker>
        </MapContainer>
    );
}