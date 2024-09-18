'use client'

import { Button, Dialog, DialogPanel, DialogTitle,
    Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions,
    Field, Input, Label

} from '@headlessui/react'
import clsx from 'clsx'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'


import { useEffect, useState, useTransition } from 'react'
import searchLocationOptions from '@/utils/search/searchLocationOptions'
import createAdminRecruitRostr from '@/actions/admin/recruit-rostrs/createAdminRecruitRostr'
import toast from 'react-hot-toast'
import LoadingDots from '@/components/ui/LoadingDots'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { fetchedAdminRecruitRostrsAtom, adminRecruitRostrAtom, dialogOpenAtomFamily, totalResultsAtom } from '@/lib/state'
import updateAdminRecruitRostr from '@/actions/admin/recruit-rostrs/updateAdminRecruitRostr'
import getAdminRecruitRostrs from '@/actions/admin/recruit-rostrs/getAdminRecruitRostrs'
import countAdminRecruitRostrs from '@/actions/admin/recruit-rostrs/countAdminRecruitRostrs'
import locationToString from '@/utils/locationToString'

export default function AdminRostrModal () {
    const rostr = useRecoilValue(adminRecruitRostrAtom);
    const setCurrentViewingRostrs = useSetRecoilState(fetchedAdminRecruitRostrsAtom);

    const setTotalRostrCount = useSetRecoilState(totalResultsAtom);
    const [dialogOpen, setDialagOpen] = useRecoilState(dialogOpenAtomFamily('recruit-rostr-dialog'));
    const [locations, setLocations] = useState<string[]>([]);
    const [query, setQuery] = useState('');
    const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();


    const [formData, setFormData] = useState({
        position: '',
        companyName: '',
        location: '',
        notes: '',
    });

    // Function to handle fetching cities
    const fetchLocations = async (query: string) => {
        const result = await searchLocationOptions(query);
        const fetchedLocations = result.map((location) => locationToString(location));
        setLocations(fetchedLocations);
    };

    useEffect(() => {
        if (rostr) {
            setFormData({
                position: rostr.position || '',
                companyName: rostr.companyName || '',
                location: rostr.location || '',
                notes: rostr.notes || '',
            });

            if (rostr.location) {
                setSelectedLocation(rostr.location);
                setQuery(rostr.location);
            }
        }
        else {
            setFormData({
                position: '',
                companyName: '',
                location: '',
                notes: '',
            });
            setSelectedLocation(null);
            setQuery('');
        }
    }, [dialogOpen]);

    // Update the cities whenever the query changes
    useEffect(() => {
        if (query.length > 0) {
            fetchLocations(query);
        } else {
            fetchLocations('');
        }
    }, [query]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        startTransition(async () => {
            const form = new FormData();
            form.append('position', formData.position);
            form.append('companyName', formData.companyName);
            form.append('location', selectedLocation ? selectedLocation : '');
            if (formData.notes !== ''){
                form.append('notes', formData.notes);
            }
        
            try {
                let result;
                if (rostr){
                    result = await updateAdminRecruitRostr(rostr.id, form);
                }
                else{
                    result = await createAdminRecruitRostr(form);
                }
                const rostrs = await getAdminRecruitRostrs();
                setCurrentViewingRostrs(rostrs);
                const rostrCount = await countAdminRecruitRostrs();
                setTotalRostrCount(rostrCount);
                close();
            } catch (error) {
            toast.error('Failed to update recruit rostr');
            }
        });
    };
    

    function open() {
        setDialagOpen(true)
    }

    function close() {
        setDialagOpen(false)
    }

    return (<Dialog open={dialogOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-xl rounded-xl justify-center bg-gray-900/60 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                            >
                            <DialogTitle as="h3" className="text-base/8 font-medium text-white mb-2">
                                {(rostr) ? 'Edit Rostr' : 'Create Rostr'}
                            </DialogTitle>
                            <form className='flex flex-col' onSubmit={handleSubmit} id='create-admin-recruit-rostr'>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                                    <Field>
                                        <Label htmlFor="position" className="text-sm/6 font-medium text-white">Position</Label>
                                        <Input
                                        id="position"
                                        name="position"
                                        value={formData.position}
                                        required
                                        onChange={handleChange}
                                        className={clsx(
                                            'mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                                        )}
                                        />
                                    </Field>
                                    <Field>
                                        <Label htmlFor="companyName" className="text-sm/6 font-medium text-white">Company Name</Label>
                                        <Input
                                        id="companyName"
                                        name="companyName"
                                        value={formData.companyName}
                                        onChange={handleChange}
                                        className={clsx(
                                            'mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                                            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                                        )}
                                        />
                                    </Field>
                                    <Field>
                                        <Label className="text-sm/6 font-medium text-white">Location</Label>
                                        <Combobox value={selectedLocation} onChange={(value) => setSelectedLocation(value)} onClose={() => setQuery('')}>
                                            <div className="relative">
                                            <ComboboxInput
                                                onClick={() => setQuery('')}
                                                className={clsx(
                                                'w-full mt-3 rounded-lg border-none bg-white/5 py-1.5 pr-8 pl-3 text-sm/6 text-white',
                                                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                                                )}
                                                displayValue={(location: string | null) => location || ''}
                                                onChange={(event) => setQuery(event.target.value)}
                                            />
                                            <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5 pt-2">
                                                <ChevronDownIcon className="size-4 fill-white/60 group-data-[hover]:fill-white group-data-[open]:rotate-180" />
                                            </ComboboxButton>
                                            </div>

                                            <ComboboxOptions
                                            anchor={'bottom'}
                                            transition
                                            className={clsx(
                                                'w-[var(--input-width)] z-50 rounded-xl border border-white/5 bg-black/80 p-1 [--anchor-gap:var(--spacing-1)] max-h-40 overflow-y-auto empty:invisible',
                                                'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
                                            )}
                                            >
                                            {locations.map((location, idx) => (
                                                <ComboboxOption
                                                key={idx}
                                                value={location}
                                                className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
                                                >
                                                <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                                                <div className="text-sm/6 text-white">{location}</div>
                                                </ComboboxOption>
                                            ))}
                                            </ComboboxOptions>
                                        </Combobox>
                                    </Field>
                                </div>
                                <Field>
                                    <Label htmlFor='notes'
                                    className="text-sm/6 font-medium text-white">Notes</Label>
                                    <textarea
                                        id="notes"
                                        name="notes"
                                        value={formData.notes}
                                        onChange={handleChange}
                                        className={clsx(
                                        'mt-3 block w-full min-h-10 rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white',
                                        'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
                                        )}
                                        rows={5} // Adjust the number of rows as needed
                                    />
                                </Field>
                                <Button
                                className="inline-flex mt-4 self-center items-center gap-2 min-h-8 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                                type={'submit'}
                                >
                                {isPending ? <LoadingDots color="#808080" /> : 'Submit'}
                                </Button>
                            </form>
    
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
    )
}