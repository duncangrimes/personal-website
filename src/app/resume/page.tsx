import { SimpleLayout } from "@/components/tailwindui/SimpleLayout";



export default function ResumePage(){
    return <SimpleLayout title={'Resume'} intro={''}>
            <iframe src="data/resume.pdf" width="850" height="1100" seamless>
            </iframe>
    </SimpleLayout>
}