interface GeocodingResult {
    place_id: number;
    licence: string;
    osm_type: string;
    osm_id: number;
    lat: string;
    lon: string;
    display_name: string;
    address: {
        house_number?: string;
        road?: string;
        city?: string;
        town?: string;
        village?: string;
        county?: string;
        state?: string;
        postcode?: string;
        country?: string;
        country_code?: string;
    };
}

interface ReverseGeocodingResult {
    address: {
        house_number?: string;
        road?: string;
        city?: string;
        town?: string;
        village?: string;
        county?: string;
        state?: string;
        postcode?: string;
        country?: string;
        country_code?: string;
    };
    display_name: string;
    lat: string;
    lon: string;
}

/**
 * Reverse geocode coordinates to get address information
 * Uses OpenStreetMap's Nominatim API (free, rate-limited)
 */
export async function reverseGeocode(
    lat: number,
    lng: number
): Promise<ReverseGeocodingResult | null> {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
            {
                headers: {
                    'User-Agent': 'BLVD-Guide-Venue-App', // Required by Nominatim policy
                },
            }
        );

        if (!response.ok) {
            throw new Error('Geocoding request failed');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Reverse geocoding error:', error);
        return null;
    }
}

/**
 * Forward geocode address to get coordinates
 * Uses OpenStreetMap's Nominatim API (free, rate-limited to 1 req/sec)
 */
export async function forwardGeocode(query: string): Promise<GeocodingResult[] | null> {
    try {
        // Add rate limiting to respect Nominatim's usage policy
        await new Promise(resolve => setTimeout(resolve, 1000));

        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`,
            {
                headers: {
                    'User-Agent': 'BLVD-Guide-Venue-App',
                },
            }
        );

        if (!response.ok) {
            throw new Error('Geocoding request failed');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Forward geocoding error:', error);
        return null;
    }
}

/**
 * Format geocoding result into a simplified address object
 */
export function formatAddress(result: ReverseGeocodingResult | GeocodingResult) {
    const address = result.address;
    
    return {
        fullAddress: result.display_name,
        street: address.road || '',
        city: address.city || address.town || address.village || '',
        county: address.county || '',
        state: address.state || '',
        postcode: address.postcode || '',
        country: address.country || '',
        countryCode: address.country_code || '',
    };
}