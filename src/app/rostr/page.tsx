'use server';

// import authenticateAdmin from "@/actions/auth/authenticateAdmin";
import AdminRostrModal from "@/components/rostr/home/AdminRostrModal";
import PageNumbers from "@/components/rostr/home/PageNumbers";
import RecruitRostrs from "@/components/rostr/home/RecruitRostrs";

export default async function AdminPage (){
    // await authenticateAdmin();
    
    return (<div className='flex flex-col min-h-full bg-black pt-40 px-8 pb-20 w-full'>
        <h1 className="text-white text-center text-6xl font-title mb-8">RECRUIT ROSTRS</h1>
        <AdminRostrModal />
        <RecruitRostrs />
        <PageNumbers />
    </div>
    )
}