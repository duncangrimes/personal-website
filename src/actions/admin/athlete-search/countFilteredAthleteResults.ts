'use server'
import { FilterOption } from "@/types/definitions";
import prisma from "@/lib/prisma";
import {auth} from "@/lib/auth";
import authenticateAdmin from "@/actions/auth/authenticateAdmin";

export default async function countFilteredAthleteResults(filters: FilterOption[]){
    await authenticateAdmin();
    
    const conditions: any[] = [];
    const uniConditions: any[] = [];
    const sportsConditions: any[] = [];
    const locConditions: any[] = [];
    const subConditions: any[] = [];

    filters.map(filter => {
        if (filter.filterId === 'university') {
        uniConditions.push({ university: { name: filter.label } });
        }
        else if (filter.filterId === 'sport') {
        sportsConditions.push({ sport: { name: filter.label } });
        }
        else if (filter.filterId === 'location') {
            const [city] = filter.label.split(',');
            locConditions.push({
                OR: [
                { desiredLocations: { some: { location: { city: city } } } },
                { hometown: { location: { city: city } } }
                ]
            });
        }
        else if (filter.filterId === 'subject') {
        subConditions.push({
            OR: [
            { majors: { some: { subject: { name: filter.label } } } },
            { minors: { some: { subject: { name: filter.label } } } },
            ]
        });
        }
    })

    if (uniConditions.length > 0) {
        conditions.push({ OR: uniConditions });
    }
    if (sportsConditions.length > 0) {
        conditions.push({ OR: sportsConditions });
    }
    if (locConditions.length > 0) {
        conditions.push({ OR: locConditions });
    }
    if (subConditions.length > 0) {
        conditions.push({ OR: subConditions });
    }

    try {
        const total = await prisma.athlete.count({
            where: (conditions.length > 0) ? { AND: conditions } : undefined,
        });
        return total;
    }
    catch (error) {
        return 0;
    }
}