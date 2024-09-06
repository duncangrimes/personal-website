import { PT_Sans, Open_Sans } from "next/font/google";
import localFont from "next/font/local";


export const pt_sans = PT_Sans(
    {weight: '400',
      subsets: ['latin'],
      display: 'swap',
      variable: '--font-pt-sans'});
  
export const open_sans = Open_Sans(
    {weight: '300',
      subsets: ['latin'],
      display: 'swap',
      variable: '--font-open-sans'});
  
export const cooper_hewitt = localFont(
    {src: '../../public/fonts/CooperHewitt-Bold.ttf',
    display: 'swap',
    variable: '--font-cooper-hewitt'
})