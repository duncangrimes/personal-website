'use client'

import React, { Suspense } from 'react';
import Filters from '@/components/rostr/athlete-search/filters/Filters'
import MatchingProfiles from '@/components/rostr/athlete-search/MatchingProfiles';
import PageNumbers from '@/components/rostr/athlete-search/PageNumbers';
import { useSearchParams } from 'next/navigation';
import ResumeModal from '@/components/rostr/athlete-search/AthleteResumeModal';
import { Container } from '@/components/tailwindui/Container';

function Content() {
    const searchParams = useSearchParams();
    const rostrId = searchParams.get('rostrId');
    console.log('rostrId', rostrId);

    return (
        <Container className='w-full h-full flex flex-col'>
            <ResumeModal />
            <Filters defaultRostrId={rostrId ? rostrId : undefined} />
            <div className='pt-10'>
                <MatchingProfiles />
            </div>
            <PageNumbers />
        </Container>
    )
}

export default function AthleteSearchPage() {

    return (
        <>
        <div className="flex flex-col min-h-screen pt-20 w-full">
                {/* <h1 className="text-white text-center text-6xl font-title mb-8">ATHLETE SEARCH</h1> */}
                <Suspense fallback={<div>Loading...</div>}>
                    <Content/>
                </Suspense>
        </div>
        </>
    );
}