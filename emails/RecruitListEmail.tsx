import React, { ReactNode } from "react";

import { AdminRecruitRostr, AthleteAfterSignup } from "@/types/definitions"
import { Body, Head, Html, Preview, Tailwind, Container, Hr, Text, Row, Column, Section, Img, Link } from "@react-email/components"

interface OrderedAthlete {
    athlete: AthleteAfterSignup,
    index: number
}

interface RecruitListEmailProps{
    orderedAthletes: OrderedAthlete[],
    rostr: AdminRecruitRostr,
    email: string
}

const RecruitListEmail: React.FC<RecruitListEmailProps> = ({ orderedAthletes, rostr, email }) => {
    

    const sortedAthletes = orderedAthletes.sort((a, b) => a.index - b.index);

    const previewText = sortedAthletes.map(({ athlete }) => `${athlete.firstName} ${athlete.lastName}`).join(', ');
    
    return <Html>
    <Tailwind>
        <Head />
        <Preview>
        {previewText}
        </Preview>
                <Body className="bg-white font-sans">
                    <Container className="mx-auto py-5">
                        {sortedAthletes.map(({ athlete }, idx) => (
                            <Section key={idx} className='w-full border-b-[20px] border-gray-800'>

                                {/* Mobile Image */}
                                <Row className='sm:hidden block'>
                                    <Img src={athlete.image} width='80' className="rounded-full mx-auto sm:hidden block"></Img>
                                </Row>


                                <Row className='block px-[8px]'>
                                    {/* Desktop Image */}
                                    <Column className="w-[100px] align-top sm:block hidden">
                                        <Img src={athlete.image} width='80' className="rounded-full sm:block hidden"></Img>
                                    </Column>
                                    {/* Main Content */}
                                    <Column className = 'align-top'>
                                        {/* Name */}
                                        <Row className="block flex-row w-full">
                                            <Column className='w-full'>
                                                <span className="font-bold text-start leading-6 text-xl">{`${athlete.firstName} ${athlete.lastName}`}</span>
                                            </Column>
                                         
                                        </Row>
                                        
                                        {/* University and Sport */}
                                        <Row className="w-full">
                                            <Column className="w-full">
                                                <span className="text-base ">{athlete.university}<span className="italic">{` - ${athlete.sport}`}</span></span>
                                            </Column>
                                        
                                        </Row>

                                        {/* LinkedIn and Resume and GPA*/}
                                        {(athlete.resume || athlete.linkedIn || athlete.gpa) && <Row className="w-full mt-[4px] block flex-row justify-start">
                                            {athlete.gpa &&
                                            <Column className={`align-top pt-[2px]`}>
                                                <span className="text-sm">GPA: <span className="font-extralight">{athlete.gpa}</span></span>
                                            </Column>}
                                            
                                            {athlete.resume &&
                                            <Column className={`text-sm align-top pt-[2px] ${athlete.gpa && 'pl-[40px]'}`}>
                                                <Link href={athlete.resume} className="underline text-start">Resume</Link>
                                            </Column>}
                                            {athlete.linkedIn && <Column className={`align-top pt-[4px] w-[16px] ${(athlete.resume || athlete.gpa) && 'pl-[40px]'}`}>
                                                <Link className='w-[16px]' href={athlete.linkedIn}>
                                                    <Img alt='LinkedIn' src="https://www.joinrostr.com/images/linkedin.png" width='16' ></Img>
                                                </Link>   
                                            </Column>}
                                            
                                            
                                            
                                        </Row>}
                                        
                                        <Row>
                                            <Column className="h-[8px]"></Column>
                                        </Row>

                                        {/* Majors */}
                                        <Row>
                                            {athlete.majors.length > 1 ? (
                                            <span className="text-sm">Majors: <span className="font-extralight">{athlete.majors.join(', ')}</span></span>
                                            ) : (
                                            <span className="text-sm">Major: <span className="font-extralight">{athlete.majors.join(', ')}</span></span>
                                            )}
                                        </Row>

                                        {/* Minors */}
                                        <Row>
                                            {athlete.minors.length === 0 ? null : athlete.minors.length === 1 ? (
                                            <span className="text-sm">Minor: <span className="font-extralight">{athlete.minors.join(', ')}</span></span>
                                            ) : (
                                            <span className="text-sm">Minors: <span className="font-extralight">{athlete.minors.join(', ')}</span></span>
                                            )}
                                        </Row>
                                        
                                        <Row>
                                            <Column className="h-[8px]"></Column>
                                        </Row>

                                        <Row>
                                            <Column className="">
                                                {(athlete.gradYear && athlete.gradYear!= 'Other') && <Row>
                                                    <span className="text-sm">{`Graduation:`} <span className="font-extralight">{`${athlete.gradMonth} ${athlete.gradYear}`}</span></span>
                                                </Row>}
                                            </Column>
                                        </Row>
                                        <Row>
                                            <Column>
                                                <span className="text-sm">Hometown: <span className="font-extralight">{athlete.hometown}</span></span>
                                            </Column>
                                        </Row>
                                    </Column>
                                </Row>
                                
                                
                                {idx < sortedAthletes.length - 1 && 
                                <Row className="w-full my-[20px]">
                                    <Column className='h-[2px] bg-black '></Column>
                                    </Row>}
                            </Section>
                        ))}
                    </Container>
                </Body>
        </Tailwind>
    </Html>
}

export default RecruitListEmail;
