'use server'

import { AthleteAfterSignup } from "@/types/definitions";
import prisma from '@/lib/prisma';
import { ServerError } from "@/types/exceptions";
// import authenticateAdmin from "@/actions/auth/authenticateAdmin";
import locationToString from "@/utils/locationToString";

export default async function getAthletesOnRostr(rostrId: string) {
  // authenticateAdmin();

  try{
        const recruits = await prisma.adminRecruit.findMany({
          where: {
            adminRostrId: rostrId,
          },
          include: {
            athlete: {
              include: {
                user: true,
                university: true,
                sport: true,
                majors: {
                  include: {
                    subject: true,
                  },
                },
                minors: {
                  include: {
                    subject: true,
                  },
                },
                hometown: {
                  include: {
                    location: true,
                  },
                },
                desiredLocations: {
                  include: {
                    location: true,
                  },
                },
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        });
      
        if (recruits.length === 0) {
          return [];
        }
      
        const athletes = recruits.map(recruit => recruit.athlete);
      
        return athletes.map(athlete => ({
            id: athlete.id,
            firstName: athlete.user.firstName as string,
            lastName: athlete.user.lastName as string,
            image: athlete.user.image as string,
            university: athlete.university?.name || null,
            sport: athlete.sport?.name || null,
            gradYear: athlete.gradYear || null,
            gradMonth: athlete.gradMonth || null,
            resume: athlete.resume || null,
            gpa: athlete.gpa,
            majors: athlete.majors.map(major => major.subject.name),
            minors: athlete.minors.map(minor => minor.subject.name),
            hometown: (athlete.hometown?.location) ? locationToString(athlete.hometown.location) : '',
            linkedIn: athlete.linkedIn as string|undefined,
            desiredLocations: athlete.desiredLocations.map(desiredLocation => (locationToString(desiredLocation.location))) as string[],
        } as AthleteAfterSignup));
    } catch (error) {
        throw new ServerError('Failed to get athletes on rostr');
    }
}
    