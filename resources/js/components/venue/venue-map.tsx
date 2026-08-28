import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useEffect } from 'react';

// Create custom red marker icon using reliable CDN
const redMarkerIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
    className: 'red-marker'
});

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
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            <Marker position={[latitude, longitude]} icon={redMarkerIcon}>
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