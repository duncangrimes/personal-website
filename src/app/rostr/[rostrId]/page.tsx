'use server'

import EditRostrModal from "@/components/rostr/export-rostr/EditRostrModal";
// import authenticateAdmin from "@/actions/auth/authenticateAdmin";
import ManageRostr from "@/components/rostr/export-rostr/ManageRostr";
import ViewRecruits from "@/components/rostr/export-rostr/ViewRecruits";


export default async function ManageRostrPage({ params }: { params: { rostrId: string } }) {
    const { rostrId } = params;
    // const session = await authenticateAdmin();
    return (
        <div className="min-h-full w-full pt-32 px-20 bg-black">
            <EditRostrModal />
            <ManageRostr rostrId={rostrId} adminEmail={''} />
            <ViewRecruits rostrId={rostrId} />
        </div>
    )
}