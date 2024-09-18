'use server'

// import authenticateAdmin from "@/actions/auth/authenticateAdmin";
import prisma from "@/lib/prisma";
import { ServerError } from "@/types/exceptions";

export default async function getAllAdminRecruitRostrs(){
    // await authenticateAdmin();
    try {
        const rostrs = await prisma.adminRecruitRostr.findMany({
            orderBy: {updatedAt: 'desc'},
        });
        return rostrs;
    } catch (error) {
        throw new ServerError("Failed to get all AdminRecruitRostrs");
}
}