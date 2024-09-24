'use client'

import { adminRecruitRostrAtom, dialogOpenAtomFamily, fetchedAdminRecruitRostrsAtom, isPendingAtomFamily, matchingAthletesAtomFamily, selectedAthleteAtom } from "@/lib/state";
import { AdminRecruitRostr, AdminRostrWithAthleteIds, AthleteAfterSignup } from "@/types/definitions";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Button, Disclosure, DisclosureButton, DisclosurePanel, Field, Input, Label, Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment, use, useEffect, useState, useTransition } from 'react'
import deleteAdminRecruitRostr from "@/actions/recruit-rostrs/deleteAdminRecruitRostr";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import clsx from "clsx";
import LoadingDots from "@/components/ui/LoadingDots";
import getAdminRecruitRostr from "@/actions/recruit-rostrs/getAdminRecruitRostr";
import getAthletesOnRostr from "@/actions/recruit-rostrs/getAthletesOnRostr";
import Link from "next/link";
import sendRecruits from "@/actions/export-rostr/sendRecruits";
import getRostrWithAthleteIds from "@/actions/recruit-rostrs/getRostrWithAthleteIds";

interface OrderedAthlete {
    athlete: AthleteAfterSignup,
    index: number
  }

export default function ManageRostr({rostrId, adminEmail}: {rostrId: string, adminEmail: string}) {
    const setSelectedAthlete = useSetRecoilState(selectedAthleteAtom);
    const [rostr, setRostr] = useRecoilState(adminRecruitRostrAtom);
    const [reloadRostr, setRostrLoaded] = useRecoilState(isPendingAtomFamily('editing-rostr'))
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const setModalOpen = useSetRecoilState(dialogOpenAtomFamily('recruit-rostr-dialog'));
    const athletes = useRecoilValue(matchingAthletesAtomFamily(`rostr-${rostrId}`));

    useEffect(() => {
        setSelectedAthlete(null);
        async function getRostr() {
            const fetchedRostr = await getAdminRecruitRostr(rostrId)
            setRostr(fetchedRostr);
        }
        getRostr();
    },[]);

    useEffect(() => {
        setSelectedAthlete(null);
        async function getRostr() {
            const fetchedRostr = await getAdminRecruitRostr(rostrId);            
            setRostr(fetchedRostr);
            setRostrLoaded(false);
        }
        getRostr();
    },[reloadRostr]);

    
    const deleteAndReroute = async (id: string) => {
        const result = await deleteAdminRecruitRostr(id);
        if (result){
            router.push('/rostr');
        }
        else{
            toast.error('Failed to delete Rostr');
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        startTransition(() => {
            const form = e.currentTarget as HTMLFormElement;
            const formData = new FormData(form);
            const email = formData.get('email') as string;

            const convertToOrderedAthletes = (athletes: AthleteAfterSignup[]): OrderedAthlete[] => {
                return athletes.map((athlete, index) => ({
                  athlete,
                  index,
                }));
              };
            
            const orderedAthletes = convertToOrderedAthletes(athletes);
              
            const sendRostr = async () => {
                const result = (rostr) ? await sendRecruits({athletes: orderedAthletes, rostr, email})
                : {success: false}
                
                if (result.success){
                    toast.success(`Rostr sent to ${email}`);
                }
                else {
                    toast.error('Failed to send rostr')
                }
            }
            sendRostr();
        });
    }

    return (<div className="flex flex-col">
            <div className='flex flex-row justify-start items-end space-x-16'>
                <Link href="/rostr" className="text-gray-400 inline-flex items-center justify-start hover:text-white text-xl mb-8">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                    <span className='ml-2'>Back to Rostrs</span>
                </Link>
                <Link href={`/rostr/athlete-search${rostr ? `?rostrId=${rostr.id}` : null}`} className="text-gray-400 inline-flex items-center justify-start hover:text-white text-xl mb-8">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
                    </svg>
                    <span className='ml-2'>Add More Candidates</span>
                </Link>
            </div>
        {rostr ? <div className='flex flex-row justify-between border-y-2 text-gray-200 border-gray-500 p-4'>
            <div className='flex flex-col item-start max-w-[70%]'>
                <div className='flex flex-row items-end space-x-4'>
                    <h2 className='text-4xl font-title font-bold mb-2'>{rostr.position}</h2>
                </div>
                {rostr.companyName && <div className="flex-inline flex items-end">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 mr-1 mb-1">
                     <path fillRule="evenodd" d="M1 2.75A.75.75 0 0 1 1.75 2h10.5a.75.75 0 0 1 0 1.5H12v13.75a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1-.75-.75v-2.5a.75.75 0 0 0-.75-.75h-2.5a.75.75 0 0 0-.75.75v2.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5H2v-13h-.25A.75.75 0 0 1 1 2.75ZM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM4.5 9a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1ZM8 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1ZM8.5 9a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1ZM14.25 6a.75.75 0 0 0-.75.75V17a1 1 0 0 0 1 1h3.75a.75.75 0 0 0 0-1.5H18v-9h.25a.75.75 0 0 0 0-1.5h-4Zm.5 3.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm.5 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Z" clipRule="evenodd" />
                    </svg>
                    <p className='text-base font-extralight'> {rostr.companyName}</p>
                 </div>}
                {rostr.location && <div className="flex-inline flex items-end">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-4 mb-1 mr-2">
                        <path fillRule="evenodd" d="m9.69 18.933.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 0 0 .281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 1 0 3 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 0 0 2.273 1.765 11.842 11.842 0 0 0 .976.544l.062.029.018.008.006.003ZM10 11.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" clipRule="evenodd" />
                    </svg>
                    <p className='text-base font-extralight'> {rostr.location}</p>
                </div>}
                {rostr.notes && <Disclosure as="div" className="">
                    <DisclosureButton className="group  inline-flex w-full text-end items-end justify-start text-gray-200 ">
                        <ChevronDownIcon className="size-5 mr-1 mb-[1px] fill-gray-200 -rotate-90 group-data-[hover]:fill-gray-200/80 group-data-[open]:rotate-0" />
                        <p className="text-base font-extralight text-gray-200 group-data-[hover]:text-gray-200/80">
                        Notes
                        </p>
                    </DisclosureButton>
                    <DisclosurePanel className="mt-2 ml-6 text-sm/5 text-gray-300">
                    {rostr.notes}
                    </DisclosurePanel>
                </Disclosure>}
                <div className='mt-2 flex flex-row items-center space-x-4'>
                    <Button
                    onClick={() => {
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
                                    onClick={() => deleteAndReroute(rostr.id)}
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
            {(athletes.length > 0) && <div>
                <form className='flex flex-col w-80 pr-8' onSubmit={handleSubmit}>
                    <Field>
                        <Label htmlFor="email" className="text-sm/6 font-medium text-white">Send to:</Label>
                        <Input
                        id="email"
                        name="email"
                        defaultValue={adminEmail}
                        required
                        className={clsx(
                            'mt-3 block w-full rounded-lg border-none bg-white/20 py-1.5 px-3 text-sm/6 text-white',
                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                        )}
                        />
                    </Field>
                    <Button
                    disabled={isPending}
                    className="inline-flex mt-4 w-full justify-center text-center self-center items-center gap-2 min-h-8
                        rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner
                        shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                    type={'submit'}
                    >
                    {isPending ? <LoadingDots color="#808080" /> : 'Send Rostr'}
                    </Button>
                </form>
            </div>}
        </div> :
        <div className='flex-row text-center w-full'><LoadingDots color="#808080" height='40px'/></div>}
    </div>)
}