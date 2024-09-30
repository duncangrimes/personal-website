'use client'

import { use, useEffect, useState } from 'react'
import {
  PopoverGroup,
} from '@headlessui/react'
import OneFilter from './OneFilter'
import { AthleteAfterSignup, Filter, FilterOption } from '@/types/definitions'
import { useRecoilCallback, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { filterOptionAtomFamily, activeFiltersSelector, allFilterKeysAtom, matchingAthletesAtomFamily, selectedAthleteAtom, totalResultsAtom, pageNumberAtom, isPendingAtomFamily } from '@/lib/state'
import ActiveFilters from './ActiveFilters'
import searchAthletes from '@/actions/athlete-search/searchAthletes'
import countFilteredAthleteResults from '@/actions/athlete-search/countFilteredAthleteResults'
import ActiveRostrCombobox from './ActiveRostrCombobox'
import getFilters from '@/actions/athlete-search/getFilters'

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
    <div className="w-full px-0">

      {/* Filters */}
      <section aria-labelledby="filter-heading">
        <h2 id="filter-heading" className="sr-only">
          Filters
        </h2>

        <div className="border-b border-black bg-gray-800 pb-4 items-center">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 pt-4 sm:px-6 lg:px-8">
            <div className='flex flex-row align-middle'>
              <ActiveRostrCombobox rostrId={defaultRostrId} />
            </div>

            <div className="hidden sm:flex w-full justify-end">
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
