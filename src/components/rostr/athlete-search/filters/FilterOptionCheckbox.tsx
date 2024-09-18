'use client'

import { filterOptionAtomFamily } from "@/lib/state";
import { FilterOption } from "@/types/defitions";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export default function FilterOptionCheckbox({
    option
  }: {
    option: FilterOption,
  }) {

    const [filterOption, setFilterOption] = useRecoilState(filterOptionAtomFamily(option.id));

    const handleChange = () => {
      setFilterOption((prev: FilterOption) => ({ ...prev, checked: !prev.checked }));
    };
  
    return (
      <div key={option.id} className="flex items-center">
        <input
          defaultValue={option.id}
          checked={filterOption.checked}
          id={`filter-${option.id}`}
          name={`${option.filterId}[]`}
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          onChange={handleChange}
        />
        <label
          htmlFor={`filter-${option.id}`}
          className="ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-900"
        >
          {option.label}
        </label>
      </div>
    );
  }
  