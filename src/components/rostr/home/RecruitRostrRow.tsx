import countAdminRecruitRostrs from "@/actions/recruit-rostrs/countAdminRecruitRostrs";
import deleteAdminRecruitRostr from "@/actions/recruit-rostrs/deleteAdminRecruitRostr";
import getAdminRecruitRostrs from "@/actions/recruit-rostrs/getAdminRecruitRostrs";
import { fetchedAdminRecruitRostrsAtom, adminRecruitRostrAtom, dialogOpenAtomFamily, totalResultsAtom, athleteCountAtomFamily } from "@/lib/state";
import { AdminRecruitRostr } from "@/types/definitions";
import { Button, Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Fragment, useEffect, useState } from 'react'
import Link from "next/link";
import getAthletesOnRostr from "@/actions/recruit-rostrs/getAthletesOnRostr";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


export default function RecruitRostrRow({rostr}: {rostr: AdminRecruitRostr}) {
    const router = useRouter();
    const setRostrToEdit = useSetRecoilState(adminRecruitRostrAtom);
    const setTotalRostrCount = useSetRecoilState(totalResultsAtom);
    const setViewingRostrs = useSetRecoilState(fetchedAdminRecruitRostrsAtom);
    const setModalOpen = useSetRecoilState(dialogOpenAtomFamily('recruit-rostr-dialog'));
    const [athleteCount, setAthleteCount] = useRecoilState(athleteCountAtomFamily(rostr.id));

    const deleteAndRefresh = async (id: string) => {
        await deleteAdminRecruitRostr(id);
        const rostrs = await getAdminRecruitRostrs();
        const rostrCount = await countAdminRecruitRostrs();
        setViewingRostrs(rostrs);
        setTotalRostrCount(rostrCount);
    }

    useEffect(() => {
        async function getAthleteCount () {
            const athletes = await getAthletesOnRostr(rostr.id);
            const count = athletes.length;
            setAthleteCount(count);
        }
        getAthleteCount();
    }, [])

    return (
        <div className='flex flex-row justify-between  bg-gray-300 text-black  p-4'>
            <div className='flex flex-col item-start justify-start max-w-[70%]'>
                <div className='flex flex-row items-end space-x-4'>
                    <h2 className='text-2xl font-bold mb-2'>{rostr.position}</h2>
                </div>
                <div className="flex-inline flex items-end">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`size-5 mr-1 mb-1`}>
                      <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                    </svg>

                     
                    <p className={`text-base font-extralight`}>{athleteCount} {(athleteCount === 1) ? 'recruit' : 'recruits'}</p>




                </div>
                {<div className="flex-inline flex items-end">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 mr-1 mb-1">
                     <path fillRule="evenodd" d="M1 2.75A.75.75 0 0 1 1.75 2h10.5a.75.75 0 0 1 0 1.5H12v13.75a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1-.75-.75v-2.5a.75.75 0 0 0-.75-.75h-2.5a.75.75 0 0 0-.75.75v2.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5H2v-13h-.25A.75.75 0 0 1 1 2.75ZM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM4.5 9a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1ZM8 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM8.5 9a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1ZM14.25 6a.75.75 0 0 0-.75.75V17a1 1 0 0 0 1 1h3.75a.75.75 0 0 0 0-1.5H18v-9h.25a.75.75 0 0 0 0-1.5h-4Zm.5 3.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm.5 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Z" clipRule="evenodd" />
                    </svg>
                    <p className='text-base font-extralight'> {rostr.companyName ? rostr.companyName : '---'}</p>
                </div>}
                {<div className="flex-inline flex items-end">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4 mb-1 mr-2">
                        <path fillRule="evenodd" d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" clipRule="evenodd" />
                    </svg>
                    <p className='text-base font-extralight'> {rostr.location ? rostr.location : '---'}</p>
                </div>}
                {<Disclosure as="div" className="">
                    <DisclosureButton className="group  inline-flex w-full text-end items-end justify-start text-black ">
                        <ChevronDownIcon className="size-5 mr-1 mb-[1px] fill-black/60 -rotate-90 group-data-[hover]:fill-black/50 group-data-[open]:rotate-0" />
                        <p className="text-base font-extralight text-black group-data-[hover]:text-black/80">
                        Notes
                        </p>
                    </DisclosureButton>
                    {rostr.notes ? <DisclosurePanel className="mt-2 ml-6 text-sm/5 text-purple-950">
                    {rostr.notes}
                    </DisclosurePanel>: null}
                </Disclosure>}
                <div className='mt-2 flex flex-row items-center space-x-4'>
                    <Button
                    onClick={() => {
                        setRostrToEdit(rostr);
                        setModalOpen(true);}
                    }
                    className='text-green-800 hover:text-green-600 text-base/2 items-center rounded-md flex flex-inline'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 mr-1">
                            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                        </svg>
                        <span>Edit</span>
                    </Button>
                        <Menu as="div" className="relative inline-block text-left">
                            <MenuButton data-autofocus className="text-red-800 hover:text-red-600 text-base items-center rounded-md flex flex-inline">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 mr-1">
                                <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                                </svg>
                                <span>Delete</span>
                            </MenuButton>
                            <MenuItems
                            anchor={'bottom'}
                                className="absolute z-20 right-0 mt-2 w-44 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg outline-none">
                                <div className="py-1 flex justify-between px-2">
                            <MenuItem as={Fragment}>
                                {({ focus }) => (
                                <button
                                    className={`${
                                    focus ? 'bg-gray-300 text-gray-900' : 'text-gray-800'
                                    } group flex rounded-md items-center px-4 py-2 text-base`}
                                >
                                    Cancel
                                </button>
                                )}
                            </MenuItem>
                            <MenuItem as={Fragment}>
                                {({ focus }) => (
                                <button
                                    onClick={() => deleteAndRefresh(rostr.id)}
                                    className={`${
                                        focus ? 'bg-red-600 text-white' : 'text-red-800'
                                    } group flex rounded-md items-center px-4 py-2 text-base focus:text-red-900`}
                                >
                                    Delete
                                </button>
                                )}
                            </MenuItem>
                        </div>
                        </MenuItems>
                    </Menu>
                </div>
            </div>
            <div className='flex flex-col text-center justify-center gap-4'>
                <Link href={`/rostr/athlete-search/?rostrId=${rostr.id}`}className={`w-40 text-white bg-rostr-purple hover:bg-rostr-purple-hover text-center rounded-xl px-3 py-2`}>
                    Add Candidates
                </Link>
                {(athleteCount > 0 ) ? <Button onClick={() => router.push(`rostr/${rostr.id}`)}className={`w-40 text-center rounded-xl px-3 py-2
                    text-white bg-rostr-green-normal-reg hover:bg-rostr-green-normal-hover
                }`}
                    >
                    Export Rostr
                </Button> :
                <div onClick={() => toast.error('Add candidates first to export a Rostr')} className={`w-40 text-whte text-center rounded-xl px-3 py-2
                    text-white bg-gray-400 cursor-not-allowed`}
                        >
                        Export Rostr
                    </div>
                }
            </div>
        </div>
    )
}