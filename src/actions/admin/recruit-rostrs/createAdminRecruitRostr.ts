'use server'

import prisma from "@/lib/prisma";
// import authenticateAdmin from "@/actions/auth/authenticateAdmin";
import { ServerError } from "@/types/exceptions";

export default async function createAdminRecruitRostr(formData: FormData){
    // await authenticateAdmin();

    try {
        const position = formData.get('position')?.toString() as string;
        const companyName = formData.get('companyName')?.toString();
        const location = (formData.get('location')?.toString() === '') ? null : formData.get('location')?.toString();
        const notes = (formData.get('notes')?.toString() === '') ? null : formData.get('notes')?.toString();

        const newRecruitRostr = await prisma.adminRecruitRostr.create({
            data: {
                position: position,
                companyName: companyName,
                location: location,
                notes: notes,
            },
        });

        return newRecruitRostr;
    
    } catch (error) {
        throw new ServerError("Failed to create AdminRecruitRostr");
    }
}