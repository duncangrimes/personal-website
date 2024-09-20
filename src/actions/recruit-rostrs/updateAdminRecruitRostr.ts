
'use server'

import prisma from "@/lib/prisma";
// import authenticateAdmin from "@/actions/auth/authenticateAdmin";

export default async function updateAdminRecruitRostr(id: string, formData: FormData){
    // await authenticateAdmin();

    try {
        const position = formData.get('position')?.toString() as string;
        const companyName = formData.get('companyName')?.toString();
        const location = (formData.get('location')?.toString() === '') ? null : formData.get('location')?.toString();
        const notes = (formData.get('notes')?.toString() === '') ? null : formData.get('notes')?.toString();

        const newRecruitRostr = await prisma.adminRecruitRostr.update({
            where: {
                id: id,
            },
            data: {
                position: position,
                companyName: companyName,
                location: location,
                notes: notes,
            },
        });

        return newRecruitRostr;
    } catch (error) {
        throw new Error("Failed to create AdminRecruitRostr");
    }
}