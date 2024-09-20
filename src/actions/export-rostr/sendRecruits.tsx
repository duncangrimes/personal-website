'use server'

// import authenticateAdmin from "@/actions/auth/authenticateAdmin";
import sendEmail from "@/actions/export-rostr/sendEmail";
import { AdminRecruitRostr, AthleteAfterSignup } from "@/types/definitions"
import RecruitListEmail from "~/emails/RecruitListEmail";

interface OrderedAthlete {
    athlete: AthleteAfterSignup,
    index: number
}

interface SendRecruitsProps{
    athletes: OrderedAthlete[],
    rostr: AdminRecruitRostr,
    email: string
}

export default async function sendRecruits(props: SendRecruitsProps){
    // authenticateAdmin();

    const { athletes, rostr, email } = props;

    const react = RecruitListEmail({orderedAthletes: athletes, rostr, email});
    
    const result = await sendEmail({
        subject: `Recruits for ${rostr.position}`,
        from: 'recruiter@joinrostr.com',
        to: [email],
        text: 'Recruits List',
        react: react
    })

    return result;
}