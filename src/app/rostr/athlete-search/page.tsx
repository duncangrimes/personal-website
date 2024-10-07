'use client'

import React, { Suspense } from 'react';
import Filters from '@/components/rostr/athlete-search/filters/Filters'
import MatchingProfiles from '@/components/rostr/athlete-search/MatchingProfiles';
import PageNumbers from '@/components/rostr/athlete-search/PageNumbers';
import { useSearchParams } from 'next/navigation';
import ResumeModal from '@/components/rostr/athlete-search/AthleteResumeModal';
import { Container } from '@/components/tailwindui/Container';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { adminRostrWithRecruitsAtom } from '@/lib/state';

function Content() {
    const searchParams = useSearchParams();
    const rostrId = searchParams.get('rostrId');
    const rostr = useRecoilValue(adminRostrWithRecruitsAtom);

    return (
        <Container className='w-full h-full flex flex-col'>
            <ResumeModal />
            <div className='flex flex-row mb-4 justify-between text-md md:justify-start gap-16'>
                <Link href='/rostr' className='text-slate-300 hover:text-slate-400 inline-flex gap-x-2 items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                    Back to Rostrs
                </Link>
                {Array.isArray(rostr?.recruits) && rostr.recruits.length > 0 && (
                <Link href={`/rostr/${rostr.id}`} className='text-slate-300 hover:text-slate-400 inline-flex gap-x-2 items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                       <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>
                    Export Rostr
                </Link>)}
            </div>
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