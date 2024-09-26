import Link from 'next/link'

import { ContainerInner, ContainerOuter } from '@/components/tailwindui/Container'

function NavLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="transition hover:text-teal-400"
    >
      {children}
    </Link>
  )
}

export function Footer() {
  return (
    <footer className="mt-32 flex-none">
      <ContainerOuter>
        <div className="border-t border-zinc-100 pb-16 pt-10 border-zinc-700/40">
          <ContainerInner>
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium  text-zinc-200">
                <NavLink href="/">Home</NavLink>
                <NavLink href="/resume">Resume</NavLink>
                <NavLink href="/rostr">Full Stack Demo</NavLink>
              </div>
              <p className="text-sm  text-zinc-500">
                &copy; {new Date().getFullYear()} Duncan Grimes. All rights
                reserved.
              </p>
            </div>
          </ContainerInner>
        </div>
      </ContainerOuter>
    </footer>
  )
}
