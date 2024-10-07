'use client'

import { isPendingAtomFamily, matchingAthletesAtomFamily, selectedAthleteAtom, totalResultsAtom } from "@/lib/state";
import { useRecoilValue } from "recoil";
import ProfileRow from "./ProfileRow";
import LoadingDots from "@/components/ui/LoadingDots";

export default function MatchingProfiles() {
    const matchingAthletes = useRecoilValue(matchingAthletesAtomFamily('athlete-search'));
    const totalResults = useRecoilValue(totalResultsAtom);
    const isPending = useRecoilValue(isPendingAtomFamily('athlete-search-results'));
    return (
        <div className=''>
            {isPending ? 
            <LoadingDots /> :
            <div>
            <div className="inline-flex justify-between w-full">
                <h2 className="text-2xl text-gray-200 font-bold mb-8">{totalResults} Results</h2>
            </div>
            {(totalResults < 1) ?
            null
            :
                <div className={`flex-1 max-h-[60vh] overflow-y-scroll flex-col w-full`}>
                    {matchingAthletes.map(athlete => (
                        <ProfileRow athlete={athlete} key={athlete.id} />
                    ))}
            </div>}
            </div>}

        </div>
    )
}