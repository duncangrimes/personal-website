'use server';

// import authenticateAdmin from "@/actions/auth/authenticateAdmin";
import AdminRostrModal from "@/components/rostr/home/AdminRostrModal";
import PageNumbers from "@/components/rostr/home/PageNumbers";
import RecruitRostrs from "@/components/rostr/home/RecruitRostrs";
import { Container } from "@/components/tailwindui/Container";
import RostrLogo from "@/components/ui/RostrLogo";
import Link from "next/link";

export default async function AdminPage (){
    // await authenticateAdmin();
    
    const description = <>
        I co-founded Rostr in the summer of 2024 with my long-time friend and business partner, Will Schweitzer.
        {/* Will was a linebacker for the University of Notre Dame, but his career was cut short due to injury. */}
        <br/><br/>

        The mission behind Rostr was to create a platform to empower the <span className="text-rostr-purple font-bold">66% </span>
        of collegiate athletes who graduate without a job and won&#39;t find one for at least a year.
        
        <br/><br/>

        We were accepted into the <Link href={'https://ideacenter.nd.edu/se/opportunities/race-to-revenue/'}
            className="text-rostr-purple underline hover:text-rostr-purple-hover">Race to Revenue</Link> startup accelerator program at the University of Notre Dame
    </>

    return (<>
          <Container className="mt-16 lg:mt-32">
            <div className="flex justify-center flex-col">
                <RostrLogo type="full" className="w-80 mb-8 self-center"/>
                <p className="mt-6 text-base text-zinc-400">
                    {description}
                </p>
                <div className="mt-6">
                    <AdminRostrModal />
                    <RecruitRostrs />
                    <PageNumbers />
                </div>
            </div>
        </Container>
    </>
    )
}