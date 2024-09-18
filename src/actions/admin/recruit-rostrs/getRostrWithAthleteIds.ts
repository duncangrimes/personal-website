'use server'
// import authenticateAdmin from "@/actions/auth/authenticateAdmin";
import prisma from "@/lib/prisma";
import { AdminRostrWithAthleteIds } from "@/types/definitions";
import { ServerError } from "@/types/exceptions";

export default async function getRostrWithAthleteIds(id: string){
    // await authenticateAdmin();
    try {
        const rostr: AdminRostrWithAthleteIds | null = await prisma.adminRecruitRostr.findUnique({
            where: {id},
            select: {
                id: true,
                position: true,
                companyName: true,
                location: true,
                notes: true,
                createdAt: true,
                updatedAt: true,
                recruits: {
                    select: {
                        athlete: {
                            select: {
                                id: true,
                            }
                        }
                    }
                }

            }
        });
        return rostr;
    } catch (error) {
        throw new ServerError("Failed to get AdminRecruitRostrs");
    }
}