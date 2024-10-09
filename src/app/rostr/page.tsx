'use server';

// import authenticateAdmin from "@/actions/auth/authenticateAdmin";
import AdminRostrModal from "@/components/rostr/home/AdminRostrModal";
import PageNumbers from "@/components/rostr/home/PageNumbers";
import RecruitRostrs from "@/components/rostr/home/RecruitRostrs";
import { Container } from "@/components/tailwindui/Container";
import RostrLogo from "@/components/ui/RostrLogo";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

export default async function AdminPage (){
    // await authenticateAdmin();
    
    const description = <p>
    I co-founded Rostr in the summer of 2024 with my friend and business partner, Will Schweitzer, a former linebacker for the University of Notre Dame.
    <br/><br/>
  
    We observed that <span className="text-rostr-purple">66% </span> of student-athletes across the US
    graduated college without a job and wouldn&#39;t find one for at least a year. We saw this as a largely untapped market by recruiters,
    as many collegiate athletes possess great communication skills, a strong work ethic, and they thrive in team-oriented settings.
    The mission behind Rostr was to <span className="text-rostr-purple"> connect student-athletes with employers</span>, specifically focusing on roles in sales.
  
    <br/><br/>
  
    I took on the role of <span className="text-rostr-purple">CTO and lead engineer</span>, and Rostr was accepted into the <Link href={'https://ideacenter.nd.edu/se/opportunities/race-to-revenue/'}
      className="text-rostr-purple underline hover:text-rostr-purple-hover">Race to Revenue</Link> accelerator program at the University of Notre Dame.
    Throughought this 12 week program, I supervised a team of four interns&mdash;two designers and two developers. We built an application that enables student-athletes to create profiles and upload their resumes,
    then the Rostr team could filter these candidates and send matches to employers for interviews.
    <br/><br/>
    When I went back to Vanderbilt in the fall of 2024, Will and I decided to pursue other interests and move on from Rostr. Since then, I have
    repurposed the Rostr platform and added it to my personal website.
  </p>
  

    return (<>
          <Container className="mt-16 lg:mt-32">
            <div className="flex justify-center flex-col">
                <RostrLogo type="full" className="w-80 mb-8 self-center"/>
                <div className="mx-auto w-full max-w-lg divide-y divide-white/5 rounded-xl bg-white/5">
        
            </div>
            <Disclosure as="div" className="" defaultOpen={true}>
                <DisclosureButton className="group flex pr-6 py-2 justify-start items-center">
                    <span className="font-medium mr-4 text-zinc-200 group-data-[hover]:text-zinc-200/80">
                    Learn about Rostr
                    </span>
                    <ChevronDownIcon className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180" />
                </DisclosureButton>
                <DisclosurePanel className="">
                    <div className="mt-6 text-base text-zinc-400 leading-6">
                        {description}
                    </div>
                </DisclosurePanel>
                </Disclosure>

                    <div className="mt-6 text-base text-zinc-200 leading-6">
                    <span className="font-medium">Please enjoy this demo, where you can play the role of a Rostr recruiter:</span>
                    <br/>
                        <ul className="list-decimal mt-2 text-zinc-400 ml-6">
                            <li><span className="text-rostr-purple">Create </span> a new Rostr&mdash;an open position an employer wants to fill with a student-athlete.</li>
                            <li><span className="text-rostr-purple">Filter </span> athletes and add them to your Rostr.</li>
                            <li><span className="text-rostr-purple">Send </span> your Rostr to the employer&#39;s email inbox.</li>
                        </ul>
                    </div>
                
                
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