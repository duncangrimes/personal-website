'use server'
// import authenticateAdmin from "@/actions/auth/authenticateAdmin";
import prisma from "@/lib/prisma";
import { ServerError } from "@/types/exceptions";

export default async function deleteAdminRecruitRostr(id: string){
    // await authenticateAdmin ();
    try {
        const deletedRostr = await prisma.adminRecruitRostr.delete({
            where: {
                id: id,
            },
        });
        return deletedRostr;
    } catch (error) {
        throw new ServerError("Failed to delete AdminRecruitRostr");
    }
}