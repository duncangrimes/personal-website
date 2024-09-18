'use client'

import { useRecoilState } from 'recoil';
import {
  Popover,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Filter, FilterOption } from '@/types/defitions';
import { filterOptionAtomFamily } from '@/lib/state';
import FilterOptionCheckbox from './FilterOptionCheckbox';

export default function OneFilter({ section, activeFilters }: { section: Filter, activeFilters: FilterOption[] }) {
  let count = 0;
  for (const activeFilter of activeFilters) {
    if (activeFilter.filterId === section.id) {
      count++;
    }
  }
  return (
    <Popover key={section.name} className="relative inline-block px-4 text-left">
      <PopoverButton className="group inline-flex justify-center text-sm font-medium text-gray-300 hover:text-gray-100">
        <span>{section.name}</span>
        {count !== 0 ? (
          <span className="ml-1.5 rounded bg-gray-300 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-gray-700">
            {count}
          </span>
        ) : null}
        
        <ChevronDownIcon
          aria-hidden="true"
          className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-300 group-hover:text-gray-100"
        />
      </PopoverButton>

      <PopoverPanel
        transition
        className="absolute  max-h-64 overflow-y-auto right-0 z-10 mt-2 origin-top-right rounded-md bg-white/80 p-4 shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <form className="space-y-4">
          {section.options.map((option: FilterOption) => {
           return (<FilterOptionCheckbox key={option.id} option={option}/>)
          })}
        </form>
      </PopoverPanel>
    </Popover>
  );
}
