import addAthleteToAdminRecruitRostr from "@/actions/athlete-search/addAthleteToAdminRecruitRostr"
import getRostrWithAthleteIds from "@/actions/recruit-rostrs/getRostrWithAthleteIds"
import removeRecruitFromRostr from "@/actions/athlete-search/removeRecruitFromRostr"
import { adminRostrWithRecruitsAtom, athleteNameAtomFamily, athleteResumeAtomFamily, dialogOpenAtomFamily, isPendingAtomFamily, selectedAthleteAtom } from "@/lib/state"
import { AthleteAfterSignup, AdminRecruit } from "@/types/definitions"
import { Button, Disclosure, DisclosureButton, DisclosurePanel, } from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/20/solid"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState, useTransition } from "react"
import toast from "react-hot-toast"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import LoadingDots from "@/components/ui/LoadingDots"

export default function ProfileRow({ athlete }: {athlete: AthleteAfterSignup }) {
    const [selectedAthlete, setSelectedAthlete] = useRecoilState(selectedAthleteAtom);
    const [rostr, setRostr] = useRecoilState(adminRostrWithRecruitsAtom);
    const [onRostr, setOnRostr] = useState(false);
    const setAthleteResume = useSetRecoilState(athleteResumeAtomFamily('resume-dialog'));
    const setAthleteName = useSetRecoilState(athleteNameAtomFamily('athlete-resume-name'));
    const setResumeDialogOpen = useSetRecoilState(dialogOpenAtomFamily('resume-dialog'));
    const [isSelected, setIsSelected] = useState(false);
    const [isPending, startTransition] = useTransition();
    
    const setReloadRostr = useSetRecoilState(isPendingAtomFamily('export-rostr'));

    const onButtonClick = async () => {
        if (rostr){
            startTransition(() => {
                if (onRostr){
                    const removeAthleteFromRostr = async () => {
                        await removeRecruitFromRostr(athlete.id, rostr.id);
                        const updatedRostr = await getRostrWithAthleteIds(rostr.id);
                        setRostr(updatedRostr);
                    }
                    removeAthleteFromRostr();
                    setReloadRostr(true);
                    toast.success('Athlete removed from Rostr');
                }
                else{
                    const addAthleteToRostr = async () => {
                        await addAthleteToAdminRecruitRostr(athlete.id, rostr.id);
                        const updatedRostr = await getRostrWithAthleteIds(rostr.id);
                        setRostr(updatedRostr);
                    }
                    addAthleteToRostr();
                    toast.success('Athlete added to Rostr');
                }
            })
        }
        else {
            toast.error('Please select a Rostr');
        }
    }

    const onResumeClick = () => {
        if (athlete.resume){
            setAthleteResume(athlete.resume);
            setResumeDialogOpen(true);
            setAthleteName(`${athlete.firstName} ${athlete.lastName}`);
        }
    }

    useEffect(() => {
        if (rostr && athlete) {
        const isAthleteInRostr = rostr.recruits.some((recruit: any) => recruit.athlete.id === athlete.id);
        setOnRostr(isAthleteInRostr);
        } else {
        setOnRostr(true); 
        }
    }, [rostr]);

    return (
        <div
            key={athlete.id}
            className={`flex flex-row cursor-auto justify-between text-black items-start p-4 border-b border-black ${isSelected ? 'bg-green-100' : 'bg-gray-200'} cursor-pointer`} 
            onClick={() => setSelectedAthlete(athlete)}
        >
            <div className="flex sm:flex-row flex-col">
                <div className="flex flex-row justify-between">
                     <Image src={athlete.image} alt={athlete.firstName + " " + athlete.lastName} width={100} height={100} className="rounded-full mr-4 w-20 h-20 object-cover" />


                    {rostr && <Button onClick={onButtonClick}
                            disabled={isPending}
                            className={`rounded-lg text-white h-10 items-center justify-center font-medium min-w-28 text-base sm:hidden flex
                                        ${onRostr ? 'bg-red-500 hover:bg-red-700' : 'bg-rostr-purple hover:bg-rostr-purple-hover'} px-3`}>
                                {isPending ? <LoadingDots color="#808080"/> : onRostr ? 'Remove From Rostr' : 'Add to Rostr'}
                            </Button>}
                </div>
                <div className='flex flex-col'>
                    <div className="flex sm:flex-row items-start sm:items-end sm:space-x-4 flex-col">
                        <h3 className="text-2xl font-bold">{athlete.firstName + " " + athlete.lastName}</h3>

                        {athlete.linkedIn ? <Link href={athlete.linkedIn}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="#0077B5" width="20" height="20" viewBox="0 0 24 24" className="mb-[5px]">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                        </Link> : null}
                        {athlete.resume && <Button onClick={onResumeClick}>


                            <p className="text-base text-[#0000EE] font-bold underline pb-[3px]">Resume</p>
                        </Button>}
                    </div>
                    <p className="text-lg">{athlete.university} - <span className="font-bold italic">{athlete.sport}</span></p>
                    <div className="flex flex-row">
                        <div className="flex flex-col mr-4">
                            {athlete.gradYear !== 'Other' ? (
                            <p><span className="">Graduation:</span><span className=""> {athlete.gradMonth}, {athlete.gradYear}</span></p>
                            ) : null}
                            <p><span className="">Hometown:</span> {athlete.hometown}</p>
                            <Disclosure as="div" className="" defaultOpen={isSelected}>
                                <DisclosureButton className="group inline-flex min-w-24 text-start items-end justify-start text-purple-950 ">
                                    <ChevronDownIcon className="size-5 mb-[1px] fill-purple-950 -rotate-90 group-data-[hover]:fill-purple-950/50 group-data-[open]:mb-[2px] group-data-[open]:rotate-0" />

                                    <p className="text-base font-extralight text-purple-950 group-data-[hover]:text-purple-950/50">
                                    Desired Locations
                                    </p>
                                </DisclosureButton>
                                <DisclosurePanel className="ml-4 text-sm/5 flex flex-col text-purple-950">
                                {athlete.desiredLocations.map(location => <span key={location}>{location}</span>)}
                                    </DisclosurePanel>
                            </Disclosure>
                        </div>
                        <div className="flex flex-col">
                            {athlete.majors.length > 1 ? (
                            <p><span className="">Majors:</span> {athlete.majors.join(', ')}</p>
                            ) : (
                            <p><span className="">Major:</span> <span className=''>{athlete.majors[0]}</span></p>
                            )}
                            {athlete.minors.length === 0 ? null : athlete.minors.length === 1 ? (
                            <p><span className="">Minor:</span> {athlete.minors[0]}</p>
                            ) : (
                            <p><span className="">Minors:</span> {athlete.minors.join(', ')}</p>
                            )}
                            {athlete.gpa ? (
                            <p><span className="">GPA:</span> {athlete.gpa}</p>
                            ) : null}
                        </div>
                    </div>  
                </div>
            </div>
            {rostr && <Button onClick={onButtonClick}
                            disabled={isPending}
                            className={`rounded-lg text-white h-10 items-center justify-center font-medium min-w-28 text-base hidden sm:flex
                                        ${onRostr ? 'bg-red-500 hover:bg-red-700' : 'bg-rostr-purple hover:bg-rostr-purple-hover'} px-3 py-2`}>
                                {isPending ? <LoadingDots color="#808080"/> : onRostr ? 'Remove From Rostr' : 'Add to Rostr'}
                            </Button>}
        </div>
    )
}