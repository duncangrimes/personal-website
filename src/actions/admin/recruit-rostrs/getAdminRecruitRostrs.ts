'use server'

// import authenticateAdmin from "@/actions/auth/authenticateAdmin";
import prisma from "@/lib/prisma";
import { ServerError } from "@/types/exceptions";

export default async function getAdminRecruitRostrs(page: number = 1){
    // await authenticateAdmin();
    try {
        const k = parseInt(process.env.RESULTS_PER_QUERY as string);

        const rostrs = await prisma.adminRecruitRostr.findMany({
            skip: (page - 1) * k,
            take: k,
            orderBy: {updatedAt: 'desc'},
        });
        return rostrs;
    } catch (error) {
        throw new ServerError("Failed to get AdminRecruitRostrs");
}
}