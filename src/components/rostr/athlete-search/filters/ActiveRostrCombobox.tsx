'use client'

import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { use, useEffect, useState } from 'react'
import { Rostr } from '@/types/defitions'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { selectedRostrAtom, rostrsAtom } from '@/lib/state'
import { defaultRostrs } from '~/public/data/rostrs'

export default function ActiveRostrCombobox({rostrId}: {rostrId?: string}) {
    
  const [query, setQuery] = useState('')
  const [selectedRostr, setSelectedRostr] = useRecoilState(selectedRostrAtom)
  const [rostrs, setRostrs] = useRecoilState(rostrsAtom)
  
  useEffect(() => {
    const fetchRostrs = async () => {
      try {
          setRostrs(defaultRostrs);
          
          // Set the default selected rostr if available
          if(rostrId) {
              const matchingRostr = rostrs.find((rostr) => rostr.id === rostrId);
              if (matchingRostr) {
                setSelectedRostr(matchingRostr);
              }
          }
          else if (!selectedRostr && rostrs.length > 0) {
            setSelectedRostr(rostrs[0]);
          }
      } catch (error) {
      }
    };
    fetchRostrs();
  }, []);

  const filteredRostrs =
    query === ''
      ? rostrs
      : rostrs.filter((rostr) => {
          return rostr.position.toLowerCase().includes(query.toLowerCase())
        })

  return (
      <Combobox value={selectedRostr} onChange={(value) => setSelectedRostr(value)} onClose={() => setQuery('')}>
        <div className="relative z-20">
          <ComboboxInput onClick={() => setQuery('')} placeholder="Select a Rostr"
            className={clsx(
              'w-80 rounded-lg border-none bg-white/20 py-1.5 pr-8 pl-3 text-sm/6 text-white',
              'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25'
            )}
            displayValue={(rostr: Rostr) => rostr?.position || ''}
            onChange={(event) => setQuery(event.target.value)}
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
            <ChevronDownIcon className="size-4 fill-white/60 group-data-[hover]:fill-white group-data-[open]:rotate-180" />
          </ComboboxButton>
        </div>

        <ComboboxOptions
          anchor="bottom"
          transition
          className={clsx(
            'w-[var(--input-width)] z-20 rounded-xl border border-white/5 bg-white/80 p-1 [--anchor-gap:var(--spacing-1)] empty:invisible',
            'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0'
          )}
        >
          {filteredRostrs.map((rostr) => (
            <ComboboxOption
              key={rostr.id}
              value={rostr}
              className="group flex cursor-default justify-between items-center rounded-lg py-1.5 px-3 select-none data-[focus]:bg-black/20"
            >
                <div className='inline-flex items-center max-w-[70%] overflow-hidden text-ellipsis whitespace-nowrap  gap-2'>
              <CheckIcon className="flex-shrink-0 invisible size-4 fill-black group-data-[selected]:visible" />
              <div className="text-sm/6 overflow-hidden text-ellipsis whitespace-nowrap text-black">{rostr.position}</div>
              </div>
              <div className="text-sm self-end max-w-[20%] overflow-hidden text-ellipsis whitespace-nowrap italic text-gray-900 pr-1">{rostr.companyName}</div>
              
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
  )
}
