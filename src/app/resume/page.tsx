import { SimpleLayout } from "@/components/tailwindui/SimpleLayout";



export default function ResumePage(){
    return <SimpleLayout title={'Resume'} intro={''}>
            <iframe src={process.env.RESUME_URL} className="w-full h-screen">
            </iframe>
    </SimpleLayout>
}