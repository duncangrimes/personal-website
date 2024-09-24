'use client'

import { matchingAthletesAtomFamily, selectedAthleteAtom } from "@/lib/state";
import { useRecoilState, useRecoilValue } from "recoil";
import ProfileRowOnRostr from "@/components/rostr/export-rostr/ProfileRowOnRostr";
import { useEffect } from "react";
import getAthletesOnRostr from "@/actions/recruit-rostrs/getAthletesOnRostr";

export default function ViewRecruits({rostrId}: {rostrId: string}) {
    const selectedAthlete = useRecoilValue(selectedAthleteAtom);
    const [athletes, setAthletes] = useRecoilState(matchingAthletesAtomFamily(`rostr-${rostrId}`));

    useEffect(() => {
        setAthletes([]);
        async function getRostr() {
            const fetchedAthletes = await getAthletesOnRostr(rostrId);
            setAthletes(fetchedAthletes);
        }
        getRostr();
    },[]);

    return (
        <div className='py-10'>
            <div className="inline-flex justify-between w-full">
                <h2 className="text-2xl text-gray-200 font-bold mb-8">{athletes.length} Recruits</h2>
                {selectedAthlete?.resume && <h2 id={'resume-header'} className="text-2xl text-end text-gray-200 font-bold mb-8">{`${selectedAthlete.firstName} ${selectedAthlete.lastName}`}</h2>}
            </div>
            {(athletes.length < 1) ?
            null
            :
            <div className='flex flex-row relative bg-red-50'>
                <div className={`flex overflow-y-auto flex-col ${selectedAthlete?.resume && 'md:w-1/2 md:h-[70vh] md:overflow-y-auto'} w-full`}>
                    {athletes.map(athlete => (
                        <ProfileRowOnRostr rostrId={rostrId} athlete={athlete} key={athlete.id} />
                    ))}
                </div>
                <div className={`${selectedAthlete?.resume ? 'md:flex flex-col items-center md:w-1/2 h-full ' : 'hidden'}`}>
                    {selectedAthlete?.resume && (
                        <>
                            <div className='w-full h-full hidden md:flex'>
                                <iframe src={selectedAthlete?.resume} className='w-full min-h-[70vh]' />
                            </div>
                        </>
                    )}
                </div>
            </div>}
        </div>
    )
}