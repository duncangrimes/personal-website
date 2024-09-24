'use client'

import { isPendingAtomFamily, matchingAthletesAtomFamily, selectedAthleteAtom, totalResultsAtom } from "@/lib/state";
import { useRecoilValue } from "recoil";
import ProfileRow from "./ProfileRow";
import LoadingDots from "@/components/ui/LoadingDots";

export default function MatchingProfiles() {
    const matchingAthletes = useRecoilValue(matchingAthletesAtomFamily('athlete-search'));
    const totalResults = useRecoilValue(totalResultsAtom);
    const selectedAthlete = useRecoilValue(selectedAthleteAtom);
    const isPending = useRecoilValue(isPendingAtomFamily('athlete-search-results'));
    return (
        <div className='pb-10'>
            {isPending ? 
            <LoadingDots /> :
            <div>
            <div className="inline-flex justify-between w-full">
                <h2 className="text-2xl text-gray-200 font-bold mb-8 pt-60">{totalResults} Results</h2>
            </div>
            {(totalResults < 1) ?
            null
            :
            <div className='flex flex-row relative '>
                <div className={`flex overflow-y-auto flex-col overflow-y-auto'} w-full`}>
                    {matchingAthletes.map(athlete => (
                        <ProfileRow athlete={athlete} key={athlete.id} />
                    ))}
                </div>
            </div>}
            </div>}

        </div>
    )
}