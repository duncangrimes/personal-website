'use client'

import { filterOptionAtomFamily } from "@/lib/state";
import { FilterOption } from "@/types/definitions";
import { useRecoilCallback, useRecoilState } from "recoil";

export default function ActiveFilters({activeFilters}: {activeFilters: FilterOption[]}) {
    const removeFilter = useRecoilCallback(({ set }) => (id: string) => {
        set(filterOptionAtomFamily(id), (prev) => ({
          ...prev,
          checked: false,
        }));
      }, []);

    return (<div className="bg-gray-900 sm:block hidden">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:flex sm:items-center sm:px-6 lg:px-8">
          <h3 className="text-sm font-medium text-gray-200">
            Filters
            <span className="sr-only">, active</span>
          </h3>

          <div aria-hidden="true" className="hidden h-5 w-px bg-gray-200 sm:ml-4 sm:block" />

          <div className="mt-2 sm:ml-4 sm:mt-0">
            <div className="-m-1 flex flex-wrap items-center">
            {activeFilters.map((activeFilter) => (
                <span
                key={activeFilter.id}
                className="m-1 inline-flex items-center rounded-full border border-gray-800 bg-gray-500 py-1.5 pl-3 pr-2 text-sm font-medium text-gray-300"
                >
                <span>{activeFilter.label}</span>
                <button
                    type="button"
                    className="ml-1 inline-flex h-4 w-4 flex-shrink-0 rounded-full p-1 text-gray-200 hover:bg-gray-200 hover:text-gray-500"
                    onClick={() => removeFilter(activeFilter.id)}
                >
                    <span className="sr-only">Remove filter for {activeFilter.label}</span>
                    <svg fill="none" stroke="currentColor" viewBox="0 0 8 8" className="h-2 w-2">
                    <path d="M1 1l6 6m0-6L1 7" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                </button>
                </span>
            ))}
            </div>
          </div>
        </div>
      </div>
    )
}