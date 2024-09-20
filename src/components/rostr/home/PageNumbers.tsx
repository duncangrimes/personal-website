'use client'

import getAdminRecruitRostrs from "@/actions/recruit-rostrs/getAdminRecruitRostrs";
import { fetchedAdminRecruitRostrsAtom, pageNumberAtom, totalResultsAtom } from "@/lib/state"
import { useRecoilState, useRecoilValue } from "recoil"

export default function PageNumbers() {
    const RESULTS_PER_QUERY = parseInt(process.env.RESULTS_PER_QUERY || "10");

    const totalResults = useRecoilValue(totalResultsAtom);
    const [viewingRostrs, setViewingRostrs] = useRecoilState(fetchedAdminRecruitRostrsAtom);
    const [pageNumber, setPageNumber] = useRecoilState(pageNumberAtom);

    const firstRostrNumber = (pageNumber - 1) * RESULTS_PER_QUERY + 1;
    const lastRostrNumber = firstRostrNumber + viewingRostrs.length - 1;

    const handleNext = async () => {
        const nextPage = pageNumber + 1;
        const fetchedRostrs = await getAdminRecruitRostrs(nextPage);
        setViewingRostrs(fetchedRostrs);
        setPageNumber(nextPage);

    }

    const handlePrevious = async () => {
        const previousPage = pageNumber - 1;
        const fetchedRostrs = await getAdminRecruitRostrs(previousPage);
        setViewingRostrs(fetchedRostrs);
        setPageNumber(previousPage);
    }

    return ((totalResults > 0) && <div className="mt-4 mx-auto flex flex-row items-end justify-center pt-40 space-x-4">
        <div className="hidden sm:block">
        <p className="text-sm text-gray-400">
          Showing <span className="font-medium">{firstRostrNumber}</span> to <span className="font-medium">{lastRostrNumber}</span> of{' '}
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
            disabled={lastRostrNumber >= totalResults}
        >
          Next
        </button>
      </div>
    </div>
    )
}