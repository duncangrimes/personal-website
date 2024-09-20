'use server'

// import authenticateAdmin from "@/actions/auth/authenticateAdmin";
import prisma from "@/lib/prisma";

export default async function countAdminRecruitRostrs(){
    // await authenticateAdmin();
    try {
        const count = await prisma.adminRecruitRostr.count();
        return count;
    } catch (error) {
        return 0;
    }
}