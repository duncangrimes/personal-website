'use server'

// import authenticateAdmin from "@/actions/auth/authenticateAdmin";
import prisma from "@/lib/prisma";

export default async function addAthleteToAdminRecruitRostr(athleteId: string, rostrId: string){
  // await authenticateAdmin();

  try {
        const existingRecruit = await prisma.adminRecruit.findUnique({
            where: {
              adminRostrId_athleteId: {
                adminRostrId: rostrId,
                athleteId: athleteId,
              },
            },
          });
      
          if (existingRecruit) {
            return {sucess: false};
          }

          const result = await prisma.$transaction([
            prisma.adminRecruit.create({
              data: {
                athleteId: athleteId,
                adminRostrId: rostrId,
              },
            }),
            prisma.adminRecruitRostr.update({
              where: { id: rostrId },
              data: { updatedAt: new Date() },
            }),
          ]);
      
          if (result) return {sucess: true};
          
          return {sucess: false};
          
      } catch (error) {
          return {sucess: false}
      }
}