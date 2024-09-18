export interface Athlete {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    image: string;
    university: string;
    gradYear: string;
    gradMonth: string;
    hometown: string;
    resume?: string;
    linkedIn?: string;
    majors: string[];
    minors: string[];
    sport: string[];
    desiredLocations: string[];
    gpa: string;
}

export interface Rostr {
    id: string;
    position: string;
    companyName?: string;
    notes?: string;
    location?: string;
    createdAt: Date;
    updatedAt: Date;
    athletes: Athlete[];
}

export interface FilterOption {
    id: string;
    filterId: string;
    label: string;
    checked: boolean;
}
  
export interface Filter {
    id: string;
    name: string;
    options: FilterOption[];
}