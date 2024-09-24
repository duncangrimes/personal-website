'use client'

import Link from 'next/link';

export default function ErrorPage({error, reset,}:
    {
    error: Error & { digest?: string }
    reset: () => void
  }) {
    return (
        <main className="grid min-h-[100vh] place-items-center px-g py-24 sm:py-32 lg:px-8 bg-gray-900">
            <div className="text-center">
                <p className="text-base font-semibold text-emerald-700">
                    There was a problem
                </p>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-50 ">
                    {error.message || 'Something went wrong'}
                </h1>
                <p className='mt -6 text-base leading-7 text-zinc-200'>
                    Please try again or contact support if the problem persists.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <button className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    onClick={reset}>
                        Try again
                    </button>
                    <Link className="rounded-md bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/2"
                    href="/">
                        Go back home
                    </Link>
                </div>
            </div>
        </main>
    );









    //   <div>
    //     <h2>Something went wrong!</h2>
    //     <button type="button"
    //             className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    //             onClick={() => reset()}>Try again</button>
    //   </div>
    // )
}