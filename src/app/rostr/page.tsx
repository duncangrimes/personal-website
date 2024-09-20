import React from 'react';
import { NextPage } from 'next';
import background from '~/public/images/rostr-home/landing-bg.png';
import duncan from '~/public/images/rostr-home/duncan.jpeg';
import will from '~/public/images/rostr-home/will.jpeg';
import graphic from '~/public/images/rostr-home/section-seperator.svg';
import Image from 'next/image';
import Link from 'next/link';

const HomePage: NextPage = () => {

  const whatWeDo = <>
  Rostr is a recruiting platform with a diverse talent pool of former athletes, giving employers a competitive edge.
   Collegiate athletes are recognized by Forbes to be big winners in the business world for their ability to overcome challenges, love of competition, and strong interpersonal skills.
     Our platform makes the hiring process FAST and AFFORDABLE by sourcing and screening quality candidates for you.
      Our tech enables you to make hires without any recruiting fees or working with outside recruiters.

  </>

  const subtitle = <>Unleash your athletic skills in the business world.
   Rostr is here to connect elite companies with hard working, team-oriented talent.
    Athletes and employers, drive your success together and click below.
</>
   
  const quote = <>At Rostr, we lead with experience and empathy.
   As a former athlete, I know firsthand the struggle that comes with hanging up your cleats.
    It&apos;s a unique challenge that should never be taken on alone.
     Our mission is to guide athletes as they navigate the transition from sports to a new career path.
      We&apos;re here to ensure that each athlete finds their stride as they set forth on the next chapter of their life.
</>

  const duncanBio = <> Duncan is the lead engineer behind the technology that powers Rostr. 
  He is a full stack software developer with experience engineering at Connexity&mdash;a Taboola company. 
  Duncan is a double applied mathematics and computer science major at Vanderbilt University. 
  Outside of tech, Duncan has a passion for sports and serves as the President and outside hitter of the Vanderbilt Men&apos;s Club Volleyball team.</>

    const willBio = <>Will brings more than 4 years of experience in the collegiate athletic industry.
     Prior to Founding Rostr in 2024, Will played Linebacker for the University of Notre Dame and was a 4-star recruit per On3.
      After a career-ending injury in 2022, Will has devoted himself to helping student-athletes get prepared for their life after sports.
       He has a proven track record in Athlete Career Development, working as an Associate Player Development Officer and helping build the TranceND program at Notre Dame.
       Will holds a degree in Business Management from the University of Notre Dame.
</>

  return (
    <div className='bg-gradient-to-r from-rostr-bg-dark to-[#3D2456] pb-40'>
      {/* Header */}
      <header className="mt-10 landscape:h-[120vh] md:landscape:h-[70vh] relative sm:h-[70vh] h-[80vh] w-full">
        <Image
        priority
        src={background}
        alt="Background Image"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="sm:bg-white/10 bg-rostr-bg-dark sm:backdrop-filter sm:backdrop-blur-md 
                            px-6 py-8 mt-14 md:landscape:bg-rostr-bg-dark lg:landscape:bg-white/10 rounded-xl w-4/5 max-w-[700px]">
            <h1 className="text-white md:text-4xl text-3xl font-title">
              <b>BALLERS TO <span className='text-rostr-green-normal-reg'>BUSINESS LEADERS</span></b>
            </h1>
            <p className="text-white mt-4 text-lg font-subtitle">
              {subtitle}
            </p>
            <div className="flex justify-center mt-4 space-x-2">
              <button className="bg-rostr-green-normal-reg font-bold text-green-900 text-subtitle border-2 border-purple-600 hover:border-purple-400 hover:text-purple-400 px-4 sm:px-16 py-2 rounded-lg transition duration-300 ease-in-out hover:bg-green-700">
                <Link href="/rostr/demo">
                Demo Rostr recruitment software
                </Link>
              </button>
              {/* <button className="bg-rostr-purple text-black px-4 py-2 rounded-lg transition duration-300 ease-in-out hover:bg-purple-700">
              <Link href="/employer">
                I am an employer
                </Link>
              </button> */}
            </div>

          </div>
        </div>
      </header>

      {/* What We Do */}
      <section className="pt-20 pb-10 sm:mx-8 md:ml-20 lg:ml-40 mx-8 flex flex-col items-center sm:items-start text-center sm:text-left">
        <h2 className="text-3xl pb-4 text-rostr-green-normal-reg text-[40px] font-title">WHAT WE DO</h2>
        <div className=' mt-9 text-white text-lg md:w-[80%] '>
          <span className='leading-6 tracking-wide md:leading-8 py-5'>{whatWeDo}</span>
        </div>

      </section>

      {/* Will's Quote */}
      <section className="py-20 mx-4 sm:ml-8 text-center sm:text-right flex flex-col sm:items-end md:mr-20 lg:mr-32">
        <div className="flex flex-col sm:items-end sm:pr-[54px]">
          <h2 className="text-3xl pb-4 text-rostr-purple text-[40px] sm:pr-7 font-title">WHO WE ARE</h2>
          <div className="text-white mt-4 lg:max-w-[80%] text-lg justify-center leading-8 flex flex-row">
            <span className="self-start pr-2 text-[#574686] text-5xl" style={{ fontFamily: 'Times New Roman, Times, serif' }}>{`"`}</span>
           <span className='tracking-wide leading-6 md:leading-8 py-5'>{quote}</span>
           <span className="self-end pl-2 leading-4 text-[#574686] text-5xl" style={{ fontFamily: 'Times New Roman, Times, serif' }}>{`"`}</span>
          </div>
          <p><span className="text-2xl text-rostr-purple pr-4 sm:pr-10">-<i>Will Schweitzer</i></span></p>
        </div>
        <div className="flex flex-row justify-center sm:justify-end pt-8">
          <Image 
            src={graphic}
            alt="Founder's Profile"
            className="h-10 sm:h-14 w-auto "
          />
        </div>
      </section>

      {/* Founder's Profile */}
      <section className="py-10">
        <div className="container mx-auto max-w-[85%]">
          <h2 className="text-4xl text-center text-rostr-green-normal-reg font-title">MEET THE TEAM</h2>

          <div className="space-y-16 mt-16">
            {/* First Card */}
            <div className="lg:w-2/3 w-full sm:flex sm:items-center sm:justify-between p-8 rounded-lg bg-gray-950">
              <div className="sm:w-1/3 w-full">
                  <div className="relative w-full h-48 sm:h-80 mx-auto">
                    <Image
                      src={will}
                      alt="Will"
                      className="rounded-lg object-cover h-full w-full"
                      style={{ objectPosition: 'top' }}
                    />
                  </div>
                  
                </div>
              <div className="sm:ml-6 mt-4 sm:mt-0 flex-1 text-left">
                <h3 className="text-xl font-subtitle text-center sm:text-left text-rostr-purple">Will Schweitzer</h3>
                <p className="text-sm font-subtitle text-center sm:text-left text-gray-300">Co-Founder | CEO</p>
                <p className="text-gray-200 mt-4 leading-6 sm:leading-7">
                  {willBio}</p>
              </div>
            </div>

            {/* Second Card */}
            <div className="lg:w-2/3 w-full sm:ml-auto sm:flex sm:items-center sm:justify-between p-8 rounded-lg bg-gray-950 mt-6">
              <div className="flex-1 text-left">
                <h3 className="text-xl font-subtitle text-center sm:text-left text-rostr-green-normal-reg">Duncan Grimes</h3>
                <p className="text-sm font-subtitle text-center sm:text-left text-gray-300">Co-Founder | CTO</p>
                <p className="text-gray-200 leading-6 sm:leading-7 mt-4">
                  {duncanBio}</p>
              </div>
              <div className="sm:w-1/3 w-full mt-4 sm:mt-0 sm:ml-6">
              <div className="relative h-64 mx-auto">
                <Image
                  src={duncan}
                  alt="Founder 2"
                  className="rounded-lg object-cover h-full w-full"
                  style={{ objectPosition: 'top' }}
                />
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;