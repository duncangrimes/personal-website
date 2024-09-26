'use client'

import { createContext, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { ThemeProvider, useTheme } from 'next-themes'
import { RecoilRoot } from 'recoil'
import { Toaster } from 'react-hot-toast'

function usePrevious<T>(value: T) {
  let ref = useRef<T>()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

export const AppContext = createContext<{ previousPathname?: string }>({})

export function Providers({ children }: { children: React.ReactNode }) {
  let pathname = usePathname()
  let previousPathname = usePrevious(pathname)

  return (
    <AppContext.Provider value={{ previousPathname }}>
      <RecoilRoot>
        <ThemeProvider defaultTheme='dark' attribute="class">
          <Toaster position="bottom-center" />
          {children}
      </ThemeProvider>
      </RecoilRoot>
    </AppContext.Provider>
  )
}
