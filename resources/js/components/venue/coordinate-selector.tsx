import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { useState } from 'react';

// Fix for default marker icons in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface CoordinateSelectorProps {
    latitude: number | null;
    longitude: number | null;
    onCoordinatesChange: (lat: number, lng: number) => void;
    className?: string;
    defaultLat?: number;
    defaultLng?: number;
}

function MapClickHandler({ onCoordinatesChange }: { onCoordinatesChange: (lat: number, lng: number) => void }) {
    useMapEvents({
        click(e) {
            onCoordinatesChange(e.latlng.lat, e.latlng.lng);
        },
    });
    return null;
}

export default function CoordinateSelector({
    latitude,
    longitude,
    onCoordinatesChange,
    className = 'map-container-sm',
    defaultLat = 0,
    defaultLng = 0,
}: CoordinateSelectorProps) {
    const [position, setPosition] = useState<[number, number]>(
        latitude && longitude ? [latitude, longitude] : [defaultLat, defaultLng]
    );

    const handleMapClick = (lat: number, lng: number) => {
        setPosition([lat, lng]);
        onCoordinatesChange(lat, lng);
    };

    const handleManualInput = (field: 'lat' | 'lng', value: string) => {
        const numValue = parseFloat(value);
        if (!isNaN(numValue)) {
            const newPosition = field === 'lat' ? [numValue, position[1]] : [position[0], numValue];
            setPosition(newPosition as [number, number]);
            onCoordinatesChange(newPosition[0], newPosition[1]);
        }
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Latitude
                    </label>
                    <input
                        type="number"
                        step="any"
                        value={latitude ?? ''}
                        onChange={(e) => handleManualInput('lat', e.target.value)}
                        placeholder="Click map or enter manually"
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                        Longitude
                    </label>
                    <input
                        type="number"
                        step="any"
                        value={longitude ?? ''}
                        onChange={(e) => handleManualInput('lng', e.target.value)}
                        placeholder="Click map or enter manually"
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                    />
                </div>
            </div>

            <div className={className}>
                <MapContainer
                    center={position}
                    zoom={13}
                    className="h-full w-full"
                    scrollWheelZoom={false}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {latitude && longitude && (
                        <Marker position={[latitude, longitude]} />
                    )}
                    <MapClickHandler onCoordinatesChange={handleMapClick} />
                </MapContainer>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
                Click on the map to set the venue location, or enter coordinates manually.
            </p>
        </div>
    );
}