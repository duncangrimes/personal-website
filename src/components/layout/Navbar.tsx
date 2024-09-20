'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {

    const pathname = usePathname();
    const [inRostr, setInRostr] = useState(false);

    useEffect(() => {
        setInRostr(pathname.includes('/rostr'));
    }, [pathname]);

     return (
              <div className="fixed top-0 left-0 right-0 z-50 h-16 px-4 sm:px-6 lg:px-8 lg:pr-16 bg-[#130C1C]
                              border-b border-[#452C63] text-gray-300">
                <div className='flex flex-row space-x-4 h-full items-center'>
                    <Link href="/" className={` hover:text-white ${inRostr ? '' : ''}
                            rounded-md px-3 h-10 items-center hover:bg-[#28183A] hidden sm:flex`}>
                     Home
                  </Link>
                  <Link href="/" className={` hover:text-white ${inRostr ? 'hidden' : 'flex'}
                            rounded-md px-3 h-10 items-center hover:bg-[#28183A]`}>
                     Rostr
                  </Link>
                  <Link href="/" className={` hover:text-white ${inRostr ? 'flex' : 'hidden'}
                            rounded-md px-3 h-10 items-center hover:bg-[#28183A]`}>
                     Rostrs
                  </Link>
                  <Link href="/" className={` hover:text-white ${inRostr ? 'flex' : 'hidden'}
                            rounded-md px-3 h-10 items-center hover:bg-[#28183A]`}>
                    Athletes
                  </Link>
                </div>
            </div>
    )
  }