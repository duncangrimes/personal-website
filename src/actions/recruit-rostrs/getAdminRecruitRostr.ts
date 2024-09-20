'use server'

// import authenticateAdmin from "@/actions/auth/authenticateAdmin";
import { AdminRecruitRostr } from "@/types/definitions";
import { ServerError } from "@/types/exceptions";
import prisma from "@/lib/prisma";


export default async function getAdminRecruitRostr(id: string){
    // await authenticateAdmin();
    if (!id) {
        throw new ServerError("Rostr ID is required");
      }
    try {
        const rostr: AdminRecruitRostr | null = await prisma.adminRecruitRostr.findUnique({
            where: {id}
        });
        if (!rostr) {
            throw new ServerError("Rostr not found");
        }       
        return rostr;
    } catch (error) {
        throw new ServerError("Failed to get AdminRecruitRostr");
    }
}