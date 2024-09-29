'use server';

// import authenticateAdmin from "@/actions/auth/authenticateAdmin";
import AdminRostrModal from "@/components/rostr/home/AdminRostrModal";
import PageNumbers from "@/components/rostr/home/PageNumbers";
import RecruitRostrs from "@/components/rostr/home/RecruitRostrs";
import { Container } from "@/components/tailwindui/Container";

export default async function AdminPage (){
    // await authenticateAdmin();
    
    return (<>
          <Container className="mt-9">

        <h1 className="text-white text-center text-6xl font-rostrTitle mb-8">ROSTR</h1>
            <AdminRostrModal />
            <RecruitRostrs />
            <PageNumbers />
        </Container>
    </>
    )
}