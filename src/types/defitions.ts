import * as Prisma from '@prisma/client'

export type User = Prisma.User;
export type Athlete = Prisma.Athlete & { image?: string };

export type AthleteAfterSignup = {
    id: string;
    email?: string;
    firstName: string;
    lastName: string;
    image: string;
    university?: string;
    sport?: string;
    gradYear?: string;
    gradMonth?: string;
    resume?: string;
    linkedIn?: string;
    phone?: string;
    gpa?: number;
    ethnicity: string;
    majors: string[];
    minors: string[];
    hometown: string;
    desiredLocations: string[];
}

export type Employer = Prisma.Employer & { image?: string };

export const Role = Prisma.Role;

export type Major = Prisma.Major;
export type Minor = Prisma.Minor;
export type Subject = Prisma.Subject;

export type Sport = Prisma.Sport;

export type DesiredLocation = Prisma.DesiredLocation;
export type Hometown = Prisma.Hometown;

export interface Founder {
    name: string;
    email: string;
}

export type InterestedAthlete = Prisma.InterestedAthlete;
export type InterestedEmployer = Prisma.InterestedEmployer;


export type AdminRecruitRostr = Prisma.AdminRecruitRostr;
export type AdminRecruit = Prisma.AdminRecruit;
export type AdminRostrWithAthleteIds = AdminRecruitRostr & {
    recruits: {
        athlete: {
            id: string;
        };
    }[];
};

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

export interface Location {
    city: string;
    state: string;
    country?: string;
}

export interface University {
    name: string;
    state: string;
}