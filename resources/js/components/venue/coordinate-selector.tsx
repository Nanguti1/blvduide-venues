import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { useState, useEffect, useCallback } from 'react';

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
    defaultLat = -1.2921, // Default to Nairobi
    defaultLng = 36.8219,
}: CoordinateSelectorProps) {
    const [position, setPosition] = useState<[number, number]>(
        latitude && longitude ? [latitude, longitude] : [defaultLat, defaultLng]
    );
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [searching, setSearching] = useState(false);
    const [debouncedQuery, setDebouncedQuery] = useState('');

    // Debounce search to avoid too many API calls
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 500); // 500ms delay

        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Trigger search when debounced query changes
    useEffect(() => {
        if (debouncedQuery) {
            handleAddressSearch(debouncedQuery);
        } else {
            setSearchResults([]);
        }
    }, [debouncedQuery]);

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

    const handleAddressSearch = useCallback(async (query: string) => {
        if (!query.trim() || query.length < 3) {
            setSearchResults([]);
            return;
        }

        setSearching(true);
        try {
            // Use Nominatim (OpenStreetMap) for free geocoding
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`,
                {
                    headers: {
                        'User-Agent': 'BLVD-Guide-Venue-App',
                    },
                }
            );
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.error('Geocoding error:', error);
        } finally {
            setSearching(false);
        }
    }, []);

    const handleSelectAddress = (result: any) => {
        const lat = parseFloat(result.lat);
        const lng = parseFloat(result.lon);
        setPosition([lat, lng]);
        onCoordinatesChange(lat, lng);
        setSearchResults([]);
        setSearchQuery(result.display_name);
    };

    return (
        <div className="space-y-4">
            {/* Address Search - Better for non-tech users */}
            <div className="relative">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Search Address
                </label>
                <div className="relative">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Enter address (e.g., Ruiru, Nairobi)"
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                        autoComplete="off"
                    />
                    {searching && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                        </div>
                    )}
                </div>
                
                {/* Search Results Dropdown */}
                {searchResults.length > 0 && (
                    <div className="absolute z-10 mt-1 w-full rounded-lg border border-slate-300 bg-white shadow-lg dark:border-slate-600 dark:bg-slate-800">
                        {searchResults.map((result, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => handleSelectAddress(result)}
                                className="w-full px-3 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-700 dark:text-white border-b border-slate-200 dark:border-slate-600 last:border-0"
                            >
                                {result.display_name}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Manual Coordinates - Still available for precision */}
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
                        placeholder="Auto-filled from search"
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
                        placeholder="Auto-filled from search"
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                    />
                </div>
            </div>

            {/* Interactive Map */}
            <div className={className}>
                <MapContainer
                    center={position}
                    zoom={13}
                    className="h-full w-full"
                    scrollWheelZoom={false}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
                        url={`https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=${import.meta.env.VITE_MAPTILER_API_KEY}`}
                    />
                    {latitude && longitude && (
                        <Marker position={[latitude, longitude]} icon={redMarkerIcon} />
                    )}
                    <MapClickHandler onCoordinatesChange={handleMapClick} />
                </MapContainer>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400">
                <strong>Easy:</strong> Start typing an address for autocomplete suggestions, or <strong>click on the map</strong> to set the location. Coordinates auto-fill.
            </p>
        </div>
    );
}