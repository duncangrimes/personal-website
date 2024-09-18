'use server'

import { auth } from '@/lib/auth';
import { Location } from '@/types/definitions';
import { ServerError } from '@/types/exceptions';


export default async function searchLocationOptions(query: string): Promise<Location[]> {
    const session = await auth();
    if (!session?.user.id) {
        throw new ServerError('Unauthorized');
    }
    const blobUrl = 'https://bslawdjccw8rwuod.public.blob.vercel-storage.com/us-cities-ZM3jJrAR4HksgqlcYhQ8gE4RlBvC7V.json';
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
