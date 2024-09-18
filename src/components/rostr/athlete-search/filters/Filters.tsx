'use client'

import { use, useEffect, useState } from 'react'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import OneFilter from './OneFilter'
import { AthleteAfterSignup, Filter, FilterOption } from '@/types/definitions'
import { useRecoilCallback, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { filterOptionAtomFamily, activeFiltersSelector, allFilterKeysAtom, matchingAthletesAtomFamily, selectedAthleteAtom, totalResultsAtom, pageNumberAtom, isPendingAtomFamily } from '@/lib/state'
import toKebab from '@/utils/toKebab'
import ActiveFilters from './ActiveFilters'
import searchAthletes from '@/actions/admin/athlete-search/searchAthletes'
import countFilteredAthleteResults from '@/actions/admin/athlete-search/countFilteredAthleteResults'
import ActiveRostrCombobox from './ActiveRostrCombobox'
import getFilters from '@/actions/admin/athlete-search/getFilters'

export default function Filters({defaultRostrId}: {defaultRostrId?: string}) {

  const [filters, setFilters] = useState<Filter[]>([]);
  const setAllFilterKeys = useSetRecoilState(allFilterKeysAtom);
  const setMatchingAthletes = useSetRecoilState(matchingAthletesAtomFamily('athlete-search'));
  const setSelectedAthlete = useSetRecoilState(selectedAthleteAtom);
  const setTotalResults = useSetRecoilState(totalResultsAtom);
  const setPageNumber = useSetRecoilState(pageNumberAtom);
  const setIsPending = useSetRecoilState(isPendingAtomFamily('athlete-search-results'));
  const activeFilters = useRecoilValue(activeFiltersSelector);

  // Initialize all filters
  const initializeFilters = useRecoilCallback(({ set }) => async () => {
    setTotalResults(0);
    const fetchedFilters: Filter[] = await getFilters();
    setFilters(fetchedFilters);

    const ids: string[] = [];
    fetchedFilters.forEach((filter) => {
      filter.options.forEach((option: FilterOption) => {
        ids.push(option.id);
        set(filterOptionAtomFamily(option.id), { id: option.id, filterId: option.filterId, label: option.label, checked: false });
      });
    });
    setAllFilterKeys(ids);
  }, []);

  useEffect(() => {
    initializeFilters();
  }, []);
  
  // Fetch athletes when filters change
  useEffect(() => {
    const fetchAthletes = async () => {
        
        const totalMatches = await countFilteredAthleteResults(activeFilters);
        const athletes: AthleteAfterSignup[] = await searchAthletes(activeFilters);
        setTotalResults(totalMatches);
        setSelectedAthlete(null);
        setMatchingAthletes(athletes);
        setPageNumber(1);
    };
    setIsPending(true);
    fetchAthletes();
    setIsPending(false);
}, [activeFilters]);

  const [open, setOpen] = useState(false)
  return (
    <div className="fixed w-full z-10">

      {/* Filters */}
      <section aria-labelledby="filter-heading">
        <h2 id="filter-heading" className="sr-only">
          Filters
        </h2>

        <div className="border-b border-black bg-gray-800 pb-4 items-center">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 pt-4 sm:px-6 lg:px-8">
            <ActiveRostrCombobox rostrId={defaultRostrId} />

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-block text-sm font-medium text-gray-300 hover:text-gray-900 sm:hidden"
            >
              Filters
            </button>

            <div className="hidden sm:block">
              <div className="flow-root">
                <PopoverGroup className="-mx-4 flex items-center divide-x divide-gray-200">
                  {filters.map((filter) => (
                    <OneFilter key={filter.id} section={filter} activeFilters={activeFilters}/>
                  ))}
                </PopoverGroup>
              </div>
            </div>
          </div>
        </div>

        {/* Active filters */}
        <ActiveFilters activeFilters={activeFilters} />
      </section>
    </div>
  )
}
