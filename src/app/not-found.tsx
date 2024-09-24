import Link from "next/link";

export default function NotFoundPage() {
    return (<>
      <main className="grid min-h-full place-items-center bg-gradient-to-r from-rostr-bg-dark to-purple-800 px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="font-subtitle text-rostr-purple">404</p>
            <h1 className="mt-4 text-4xl font-title tracking-tight text-white">PAGE NOT FOUND</h1>
            <p className="mt-6 text-base leading-7 text-gray-400">Sorry, we couldn’t find the page you’re looking for.</p>
            <div className="mt-10 flex justify-center">
            <Link href="/" className="text-sm font-semibold text-gray-300 hover:text-white
                                rounded-md px-3 py-2 hover:bg-[#70429E]">
              <span aria-hidden="true">&larr;</span> Back to home
            </Link>
          </div>
          </div>
        </main>
      </>)
  }