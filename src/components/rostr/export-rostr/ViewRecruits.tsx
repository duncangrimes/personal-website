'use client'

import { adminRecruitRostrAtom, adminRostrWithRecruitsAtom, isPendingAtomFamily, matchingAthletesAtomFamily, selectedAthleteAtom } from "@/lib/state";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { use, useEffect } from "react";
import getAthletesOnRostr from "@/actions/recruit-rostrs/getAthletesOnRostr";
import ProfileRow from "../athlete-search/ProfileRow";
import getRostrWithAthleteIds from "@/actions/recruit-rostrs/getRostrWithAthleteIds";

export default function ViewRecruits({rostrId}: {rostrId: string}) {
    const [athletes, setAthletes] = useRecoilState(matchingAthletesAtomFamily(`rostr-${rostrId}`));
    const rostr = useRecoilValue(adminRecruitRostrAtom);
    const setRostrWithAthletes = useSetRecoilState(adminRostrWithRecruitsAtom);

    const [reloadRostr, setReloadRostr] = useRecoilState(isPendingAtomFamily('export-rostr'));
    const [loadingRecruits, setLoadingRecruits] = useRecoilState(isPendingAtomFamily('loading-recruits'));


    async function getRostr() {
        setLoadingRecruits(true);
        const fetchedAthletes = await getAthletesOnRostr(rostrId);
        if (rostr){
            setAthletes([]);
            const athleteIds = fetchedAthletes.map(recruit => ({ athlete: { id: recruit.id } }));
            setRostrWithAthletes({...rostr, recruits: athleteIds});
            setAthletes(fetchedAthletes);
            setLoadingRecruits(false);
        }
    }

    useEffect(() => {
        console.log(athletes);
    }, [loadingRecruits]);

    useEffect(() => {
        getRostr();
    },[rostr]);

    useEffect(() => {
        setLoadingRecruits(true);
    },[]);

    useEffect(() => {
        
        if (reloadRostr){
            getRostr();
            setReloadRostr(false);
        }
    },[reloadRostr]);

    return (
        <div className='py-10'>
            <div className="inline-flex justify-between w-full">
                    <h2 className="text-2xl text-gray-200 font-bold mb-8">
                        {loadingRecruits ? <span>{`Loading Candidates...`}</span> :
                        <span>{athletes.length} Candidates</span>}
                    </h2>
            </div>
            {(athletes.length < 1) ?
            null
            :
            <div className='flex flex-row relative'>
                <div className={`flex flex-col w-full`}>
                    {athletes.map(athlete => (
                        <ProfileRow athlete={athlete} key={athlete.id} />
                    ))}
                </div> 
            </div>}
        </div>
    )
}