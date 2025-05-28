import { Container } from '@/components/tailwindui/Container'

export default function FireDetection() {
  return (
    <Container className="mt-16 sm:mt-20">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl">
        Fire Detection AI/ML Project        </h1>
        <div className="mt-8 aspect-[4/3] w-full">
          <iframe
            src="/fire-detection-poster.pdf"
            className="h-full w-full rounded-lg border border-zinc-700/40"
            title="Fire Detection Poster"
          />
        </div>
      </div>
    </Container>
  )
} 