'use server'

import { Filter, FilterOption} from "@/types/defitions"
import toKebab from "@/utils/toKebab";
import prisma from "@/lib/prisma";
// import authenticateAdmin from "@/actions/auth/authenticateAdmin";
import { ServerError } from "@/types/exceptions";

export default async function getFilters(): Promise<Filter[]> {
    // await authenticateAdmin();

    try {
        const universities = await prisma.university.findMany({
            select: { name: true }
        });
        
        const subjects = await prisma.subject.findMany({
            select: { name: true }
        });

        const locations = await prisma.location.findMany({
            select: { city: true }
        });

        const sports = await prisma.sport.findMany({
            select: { name: true }
        });

        const subjectOptions = subjects.map(subject => subject.name);
        const locationOptions = locations.map(location => location.city);
        const universityOptions = universities.map(university => university.name);
        const sportOptions = sports.map(sport => sport.name);

        const sections = [
            {
            name: 'University',
            options: universityOptions,
            },
            {
                name: 'Subject',
                options: subjectOptions
            },
            {
            name: 'Sport',
            options: sportOptions,
            },
            {
                name: 'Location',
                options: locationOptions
            }
        ]

        const filters: Filter[] = sections.map((section) => {
            const id = toKebab(section.name);
            return {
                id,
                name: section.name,
                options: section.options.map((option) => {
                    return {
                        filterId: id,
                        id: `${id}-${toKebab(option)}`,
                        label: option,
                        checked: false
                    }
                })
            }
        }, [])
        return filters
    }
    catch (error){
        throw new ServerError('Failed to fetch filters')
    }
    
}