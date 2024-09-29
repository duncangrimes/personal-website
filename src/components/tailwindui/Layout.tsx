import { Footer } from '@/components/tailwindui/Footer'
import { Header } from '@/components/tailwindui/Header'
import { pt_sans, open_sans, cooper_hewitt } from "@/lib/fonts";


export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="fixed inset-0 flex justify-center sm:px-8">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="w-full ring-1 bg-zinc-900 ring-zinc-300/20" />
        </div>
      </div>
      <div className={`${pt_sans.variable} ${open_sans.variable} ${cooper_hewitt.variable}
                        relative flex w-full flex-col`}>
        <Header />
        <main className="flex-auto">{children}</main>
        <Footer />
      </div>
    </>
  )
}
