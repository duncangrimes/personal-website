'use server'

// import { auth } from '@/lib/auth';
import { Location } from '@/types/definitions';
import { ServerError } from '@/types/exceptions';


export default async function searchLocationOptions(query: string): Promise<Location[]> {
    // const session = await auth();
    // if (!session?.user.id) {
    //     throw new ServerError('Unauthorized');
    // }
    const blobUrl = 'https://isieuvdfysya85mr.public.blob.vercel-storage.com/lists/us-cities-s6nbuZ5oSl7bqG7wgJ3FVP7OyKmgHD.json';
    const response = await fetch(blobUrl);
    
    if (!response.ok) {
        throw new ServerError('Failed to fetch location data');
    }
    
    const locations: Location[] = await response.json();

    if (!query) return locations.slice(0, 20);
    
    const searchTerm = query.toLowerCase();
    const filteredLocations = locations.filter(location => {
        const locationString = `${location.city}, ${location.state}`;
        return locationString.toLowerCase().includes(searchTerm)}
    ).slice(0, 20);
    
    return filteredLocations;
}
