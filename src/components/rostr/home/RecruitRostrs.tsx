'use client'

import countAdminRecruitRostrs from "@/actions/recruit-rostrs/countAdminRecruitRostrs"
import getAdminRecruitRostrs from "@/actions/recruit-rostrs/getAdminRecruitRostrs"
import { fetchedAdminRecruitRostrsAtom, adminRecruitRostrAtom, dialogOpenAtomFamily, totalResultsAtom } from "@/lib/state"
import { useEffect } from "react"
import { useRecoilState, useSetRecoilState } from "recoil"
import RecruitRostrRow from "./RecruitRostrRow"

export default function RecruitRostrs() {
    const [rostrs, setRostrs] = useRecoilState(fetchedAdminRecruitRostrsAtom);
    const [totalRostrCount, setTotalRostrCount] = useRecoilState(totalResultsAtom);
    const setRostrToEdit = useSetRecoilState(adminRecruitRostrAtom);
    const setDialagOpen = useSetRecoilState(dialogOpenAtomFamily('recruit-rostr-dialog'));

    useEffect(() => {
        const fetchRecruitRostrs = async () => {
            const numRostrs = await countAdminRecruitRostrs();
            const fetchedRostrs = await getAdminRecruitRostrs();
            setRostrs(fetchedRostrs);
            setTotalRostrCount(numRostrs);
        }
        fetchRecruitRostrs();
    }, [])
    return (
        <div>
            <button className='text-gray-400 inline-flex items-center justify-start hover:text-white text-xl mb-8'
             onClick={() => {
            setRostrToEdit(null);
            setDialagOpen(true)}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span className='ml-2'>Add new posting</span>
        </button>
            <div className={`flex flex-row ${(rostrs.length > 0) && 'border-white border-2'} bg-gray-600`}>
                <div className={`flex h-full flex-col w-full`}>
                    {rostrs.map((rostr, idx) => (
                        <div className={`w-full ${(idx < rostrs.length - 1 ) && 'border-b-2'} border-gray-500`}>
                        <RecruitRostrRow rostr={rostr} key={rostr.id} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}