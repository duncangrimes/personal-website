'use server'

// import authenticateAdmin from '@/actions/auth/authenticateAdmin';
import prisma from '@/lib/prisma';
import { AthleteAfterSignup, FilterOption } from '@/types/definitions';
import { ServerError } from '@/types/exceptions';
import locationToString from '@/utils/locationToString';


async function searchAthletes(filters: FilterOption[], page: number = 1): Promise<AthleteAfterSignup[]> {
  // await authenticateAdmin();

  try {
      const k = parseInt(process.env.RESULTS_PER_QUERY as string);

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

      // Query the athletes with the constructed conditions
      const athletes = await prisma.athlete.findMany({
        where: {
          ...(conditions.length > 0 ? { AND: conditions } : {}),
          user: {
            athlete: {
              hometown: {
                isNot: null
              }
            }
          },
        },
        skip: (page - 1) * k,
        take: k,
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              image: true,
              phone: true,
            }
          },
          majors: {
            select: {
              subject: {
                select: {
                  name: true,
                }
              }
            }
          },
          minors: {
            select: {
              subject: {
                select: {
                  name: true,
                }
              }
            }
          },
          university: {
            select: {
              name: true,
            }
          },
          sport: {
            select: {
              name: true,
            }
          },
          hometown: {
            select: {
              location: {
                select: {
                  city: true,
                  state: true,
                  country: true,
                }
              }
            }
          },
          desiredLocations: {
            select: {
              location: {
                select: {
                  city: true,
                  state: true,
                  country: true,
                }
              }
            }
          }
        },
        orderBy: {
          createdAt: 'desc', // Order by createdAt date in descending order
        },
      });
      
      return athletes.map(athlete => ({
        id: athlete.id,
        firstName: athlete.user.firstName as string,
        lastName: athlete.user.lastName as string,
        image: athlete.user.image as string,
        university: athlete.university?.name as string,
        sport: athlete.sport?.name as string,
        gradYear: athlete.gradYear as string,
        gradMonth: athlete.gradMonth as string,
        phone: athlete.user.phone,
        resume: athlete.resume as string,
        gpa: athlete.gpa as number|undefined,
        majors: athlete.majors.map(major => major.subject.name) as string[],
        minors: athlete.minors.map(minor => minor.subject.name) as string[],
        hometown: (athlete.hometown?.location) ? locationToString(athlete.hometown.location) : '',
        linkedIn: athlete.linkedIn as string|undefined,
        desiredLocations: athlete.desiredLocations.map(desiredLocation => (locationToString(desiredLocation.location))) as string[],
    } ) as AthleteAfterSignup);
  }
  catch(error){
    throw new ServerError('Failed to search athletes')
  }
}
export default searchAthletes;