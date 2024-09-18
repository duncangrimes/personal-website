import { atom, selector } from 'recoil';
import { Role, AthleteAfterSignup, FilterOption, AdminRecruitRostr, AdminRostrWithAthleteIds, Location } from '@/types/defitions';
import { atomFamily } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { University } from '@/types/defitions';

const { persistAtom } = recoilPersist()

export const roleAtom = atom<keyof typeof Role>({
    key: 'role',
    default: Role.ATHLETE,
    effects_UNSTABLE: [persistAtom],
});

export const previewImageAtom = atom<string | null>({
  key: 'previewImage',
  default: null,
});

export const sliderValueAtom = atom<number>({
  key: 'sliderValue',
  default: 10
});

export const scaleValueSelector = selector({
    key: 'scaleValueSelector',
    get: ({ get }) => {
      const sliderValue = get(sliderValueAtom);
      return sliderValue / 10;
    },
});

export const completeProfileStepAtom = atom<number>({
    key: 'completeProfileStep',
    default: 1
});

export const dropdownAtomFamily = atomFamily<string, string>({
  key: 'dropdown',
  default: '',
});

export const tagsAtomFamily = atomFamily<string[], string>({
  key: 'tags',
  default: [],
});

export const matchingAthletesAtomFamily = atomFamily<AthleteAfterSignup[], string>({
  key: 'matchingAthletes',
  default: [],
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

export const selectedAthleteAtom = atom<AthleteAfterSignup | null>({
  key: 'selectedAthlete',
  default: null,
});

export const selectedUniversityAtomFamily = atomFamily<University | null, string>({
  key: 'selectedUniversity',
  default: null,
});

export const totalResultsAtom = atom<number>({
  key: 'totalResults',
  default: 0,
});

export const pageNumberAtom = atom<number>({
  key: 'page',
  default: 1,
});

export const fetchedAdminRecruitRostrsAtom = atom<AdminRecruitRostr[]>({
  key: 'fetchedAdminRecruitRostrs',
  default: [],
});

export const dialogOpenAtomFamily = atomFamily<boolean, string>({
  key: 'dialogOpen',
  default: false,
});

export const adminRecruitRostrAtom = atom<AdminRecruitRostr | null>({
  key: 'adminRecruitRostr',
  default: null,
});

export const adminRostrWithRecruitsAtom = atom<AdminRostrWithAthleteIds | null>({
  key: 'adminRostrWithRecruits',
  default: null,
});

// interface OrderedAthlete {
//   athlete: AthleteAfterSignup,
//   index: number
// }

// export const orderedAthletesAtom = atom<OrderedAthlete[]>({
//   key: 'orderedAthletes',
//   default: []
// })

export const textInputAtomFamily = atomFamily<string, string>({
  key: 'textInput',
  default: '',
});

export const selectedLocationsAtomFamily = atomFamily<Location[], string>({
  key: 'selectedLocations',
  default: []
});

export const selectedLocationAtomFamily = atomFamily<Location | null, string>({
  key: 'selectedLocations',
  default: null
});

export const selectedComboboxOptionsAtomFamily = atomFamily<string[], string>({
  key: 'comboxboxOptions',
  default: []
});

export const isPendingAtomFamily = atomFamily<boolean, string>({
  key: 'isPending',
  default: false
});