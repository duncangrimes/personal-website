'use server'

// import authenticateAdmin from "@/actions/auth/authenticateAdmin";
import prisma from "@/lib/prisma";
import { ServerError } from "@/types/exceptions";

export default async function removeRecruitFromRostr(athleteId: string, rostrId: string){
    // await authenticateAdmin();
    try {
        await prisma.$transaction([
            prisma.adminRecruit.delete({
                where: {
                    adminRostrId_athleteId: {
                        athleteId: athleteId,
                        adminRostrId: rostrId,
                    },
                }
            }),
            prisma.adminRecruitRostr.update({
                where: { id: rostrId },
                data: { updatedAt: new Date() },
            }),
        ]);
        

    } catch (error) {
        throw new ServerError("Failed to remove recruit from AdminRecruitRostr");
    }
}