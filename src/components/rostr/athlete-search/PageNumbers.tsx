'use client'

import searchAthletes from "@/actions/athlete-search/searchAthletes";
import { activeFiltersSelector, matchingAthletesAtomFamily, pageNumberAtom, selectedAthleteAtom, totalResultsAtom } from "@/lib/state"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"

export default function PageNumbers() {
    const RESULTS_PER_QUERY = parseInt(process.env.RESULTS_PER_QUERY || "10");

    const totalResults = useRecoilValue(totalResultsAtom);
    const [matchingAthletes, setMatchingAthletes] = useRecoilState(matchingAthletesAtomFamily('athlete-search'));
    const [pageNumber, setPageNumber] = useRecoilState(pageNumberAtom);
    const activeFilters = useRecoilValue(activeFiltersSelector);
    const setSelectedAthlete = useSetRecoilState(selectedAthleteAtom)

    const firstAthleteNumber = (pageNumber - 1) * RESULTS_PER_QUERY + 1;
    const lastAthleteNumber = firstAthleteNumber + matchingAthletes.length - 1;

    const handleNext = async () => {
        const nextPage = pageNumber + 1;
        const athletes = await searchAthletes(activeFilters, nextPage);
        setMatchingAthletes(athletes);
        setPageNumber(nextPage);
        setSelectedAthlete(null);
    }

    const handlePrevious = async () => {
        const previousPage = pageNumber - 1;
        const athletes = await searchAthletes(activeFilters, previousPage);
        setMatchingAthletes(athletes);
        setPageNumber(previousPage);
        setSelectedAthlete(null);
    }

    return ((totalResults > 0) && <div className="mt-4 mx-auto flex flex-row items-end justify-center space-x-4">
        <div className="hidden sm:block">
        <p className="text-sm text-gray-400">
          Showing <span className="font-medium">{firstAthleteNumber}</span> to <span className="font-medium">{lastAthleteNumber}</span> of{' '}
          <span className="font-medium">{totalResults}</span> results
        </p>
      </div>
      <div className="flex">
        <button
            onClick={handlePrevious}
            disabled={pageNumber <= 1}
          className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 disabled:opacity-50"
        >
          Previous
        </button>
        <button
          className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 disabled:opacity-50"
            onClick={handleNext}
            disabled={lastAthleteNumber >= totalResults}
        >
          Next
        </button>
      </div>
    </div>
    )
}