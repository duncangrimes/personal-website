'use server'

// import { auth } from '@/lib/auth';
import { ServerError } from '@/types/exceptions';
import fs from 'fs';
import path from 'path';

export default async function searchSubjectOptions(query: string): Promise<string[]> {
    // const session = await auth();
    // if (!session?.user.id) {
    //     throw new ServerError('Unauthorized');
    // }
    const blobUrl = 'https://bslawdjccw8rwuod.public.blob.vercel-storage.com/subjects-dcNZEU4CngFzXVE5CMmNa82D0wTNYl.json';
    const response = await fetch(blobUrl);
    
    if (!response.ok) {
        throw new ServerError('Failed to fetch subject data');
    }
    
    const subjects = await response.json();

    if (!query) return subjects.slice(0, 20);
    
    const searchTerm = query.toLowerCase();
    const filteredLocations = subjects.filter((subject: string) => {
        return subject.toLowerCase().includes(searchTerm)}
    ).slice(0, 20);
    
    return filteredLocations;
}
