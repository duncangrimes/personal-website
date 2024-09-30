'use server'

import EditRostrModal from "@/components/rostr/export-rostr/EditRostrModal";
// import authenticateAdmin from "@/actions/auth/authenticateAdmin";
import ManageRostr from "@/components/rostr/export-rostr/ManageRostr";
import ViewRecruits from "@/components/rostr/export-rostr/ViewRecruits";
import { Container } from "@/components/tailwindui/Container";


export default async function ManageRostrPage({ params }: { params: { rostrId: string } }) {
    const { rostrId } = params;
    // const session = await authenticateAdmin();
    return (
        <>
            <Container className="pt-20">
            <EditRostrModal />
            <ManageRostr rostrId={rostrId} adminEmail={''} />
            <ViewRecruits rostrId={rostrId} />
            </Container>
        </>
    )
}