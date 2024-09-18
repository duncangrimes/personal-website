'use client'

import React, { Suspense } from 'react';
import Filters from '@/components/rostr/athlete-search/filters/Filters'
import MatchingProfiles from '@/components/rostr/athlete-search/MatchingProfiles';
import PageNumbers from '@/components/rostr/athlete-search/PageNumbers';
import { useSearchParams } from 'next/navigation';

export default function AthleteSearchPage() {
    const searchParams = useSearchParams();
    const rostrId = searchParams.get('rostrId');    

    return (
        <div className="flex flex-col min-h-full bg-black pt-16 pb-20 w-full">
                {/* <h1 className="text-white text-center text-6xl font-title mb-8">ATHLETE SEARCH</h1> */}
                <Suspense fallback={<div>Loading...</div>}>
                    <Filters defaultRostrId={rostrId ? rostrId : undefined} />
                    <div className='px-8'>
                        <MatchingProfiles />
                        <PageNumbers />
                    </div>
                </Suspense>
        </div>
    );
}