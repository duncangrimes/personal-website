'use server'

// import { auth } from '@/lib/auth';
import { University } from '@/types/definitions';
import { ServerError } from '@/types/exceptions';

export default async function getUniversities(query: string): Promise<University[]> {
    // const session = await auth();
    // if (!session?.user.id) {
    //     throw new ServerError('Unauthorized');
    // }
    const blobUrl = 'https://bslawdjccw8rwuod.public.blob.vercel-storage.com/us-universities-65accT60z7Ne0U9uq01tQpeALwq1Wx.json';
    const response = await fetch(blobUrl);
    
    if (!response.ok) {
        throw new ServerError('Failed to fetch university data');
    }
    
    const universities: University[] = await response.json();
    
    if (!query) return universities.slice(0, 20);
    
    const searchTerm = query.toLowerCase();
    const filteredUniversities = universities.filter(university => 
        university.name.toLowerCase().includes(searchTerm) ||
        (searchTerm.length < 3 && university.state.toLowerCase().includes(searchTerm))
    ).slice(0, 20);
    
    return filteredUniversities;
}
