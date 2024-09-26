import { type Metadata } from 'next'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/tailwindui/Layout'

import '@/styles/tailwind.css'

export const metadata: Metadata = {
  title:
      'Duncan Grimes',
  description: '',
  alternates: {
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex h-full bg-black">
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
      </body>
    </html>
  )
}
