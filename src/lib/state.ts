import { Athlete, Rostr, FilterOption } from '@/types/defitions';
import { atom, selector, atomFamily, selectorFamily } from 'recoil';

export const totalAthletesAtom = atom<Athlete[]>({
    key: 'totalAthletes',
    default: [],
})

export const matchingAthletesAtomFamily = atomFamily<Athlete[], string>({
    key: 'matchingAthletes',
    default: [],
})

export const matchingAthletesCountSelectorFamily = selectorFamily<number, string>({
    key: 'matchingAthletesCount',
    get: (id: string) => ({ get }) => {
        const athletes = get(matchingAthletesAtomFamily(id));
        return athletes.length;
    }
})

export const rostrsAtom = atom<Rostr[]>({
    key: 'rostrs',
    default: [],
})

export const selectedRostrAtom = atom<Rostr | null>({
    key: 'selectedRostr',
    default: null,
})

export const selectedAthleteAtom = atom<Athlete | null>({
    key: 'selectedAthlete',
    default: null,
})

export const isPendingAtomFamily = atomFamily<boolean, string>({
    key: 'isPending',
    default: false
});

export const filterOptionAtomFamily = atomFamily<FilterOption, string>({
    key: 'activeFilterOption',
    default: {id: '', filterId:'', label: '', checked: false},
  });
  
  export const allFilterKeysAtom = atom<string[]>({
    key: 'allFilterKeys',
    default: [],
  });
  
  // Selector to get the active filters
  export const activeFiltersSelector = selector({
    key: 'activeFiltersSelector',
    get: ({ get }) => {
      const allFilterKeys = get(allFilterKeysAtom);
      return allFilterKeys
        .map((key) => get(filterOptionAtomFamily(key)))
        .filter((filterOption) => filterOption.checked);
    },
  });