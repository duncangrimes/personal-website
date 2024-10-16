import Image, { type ImageProps } from 'next/image'
import clsx from 'clsx'

import { Button } from '@/components/tailwindui/Button'
import { Card } from '@/components/tailwindui/Card'
import { Container } from '@/components/tailwindui/Container'
import {
  GitHubIcon,
  LinkedInIcon,
} from '@/components/tailwindui/SocialIcons'
import cnx from '~/public/images/logos/cnx.png'
import mastros from '~/public/images/logos/mastros.png'
import rostr from '~/public/images/logos/rostr.png'
import bc from '~/public/images/logos/bc.jpeg'
import { type ArticleInfo, articleList } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'
import Link from 'next/link'

function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 7.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className= "fill-zinc-100/10 stroke-zinc-500"
      />
      <path
        d="m4 6 6.024 5.479a2.915 2.915 0 0 0 3.952 0L20 6"
        className="stroke-zinc-500"
      />
    </svg>
  )
}

function BriefcaseIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M2.75 9.75a3 3 0 0 1 3-3h12.5a3 3 0 0 1 3 3v8.5a3 3 0 0 1-3 3H5.75a3 3 0 0 1-3-3v-8.5Z"
        className=" fill-zinc-100/10 stroke-zinc-500"
      />
      <path
        d="M3 14.25h6.249c.484 0 .952-.002 1.316.319l.777.682a.996.996 0 0 0 1.316 0l.777-.682c.364-.32.832-.319 1.316-.319H21M8.75 6.5V4.75a2 2 0 0 1 2-2h2.5a2 2 0 0 1 2 2V6.5"
        className=" stroke-zinc-500"
      />
    </svg>
  )
}

function ArrowDownIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4.75 8.75 8 12.25m0 0 3.25-3.5M8 12.25v-8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Article({ article }: { article: ArticleInfo }) {
  return (
    <Card as="article">
      <Card.Title href={article.href} newTab={article.href.includes('http')}>
        {article.title}
      </Card.Title>
      <Card.Eyebrow as="time" dateTime={article.date} decorate>
        {formatDate(article.date)}
      </Card.Eyebrow>
      <Card.Description>{article.description}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  )
}

function SocialLink({
  icon: Icon,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <Link className="group -m-1 p-1" {...props} target="_blank" rel="noopener noreferrer">
      <Icon className="h-6 w-6 transition  fill-zinc-400 group-hover:fill-zinc-300" />
    </Link>
  )
}

interface Role {
  company: string
  title: string
  logo: ImageProps['src']
  start: string | { label: string; dateTime: string }
  end: string | { label: string; dateTime: string }
}

function Role({ role }: { role: Role }) {
  let startLabel =
    typeof role.start === 'string' ? role.start : role.start.label
  let startDate =
    typeof role.start === 'string' ? role.start : role.start.dateTime

  let endLabel = typeof role.end === 'string' ? role.end : role.end.label
  let endDate = typeof role.end === 'string' ? role.end : role.end.dateTime

  return (
    <li className="flex gap-4">
      <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-zinc-900/5 border border-zinc-700/50 bg-zinc-800 ring-0">
          <Image src={role.logo} alt="" className={`h-7 w-7 ${role.company === 'q' ? '' : 'rounded-full'}`} unoptimized />
      </div>
      <dl className="flex flex-auto flex-wrap gap-x-2">
        <dt className="sr-only">Company</dt>
        <dd className="w-full flex-none text-sm font-medium  text-zinc-100">
          {role.company}
        </dd>
        <dt className="sr-only">Role</dt>
        <dd className="text-xs text-zinc-400">
          {role.title}
        </dd>
        <dt className="sr-only">Date</dt>
        <dd
          className="ml-auto text-xs  text-zinc-500"
          aria-label={`${startLabel} until ${endLabel}`}
        >
          <time dateTime={startDate}>{startLabel}</time>{' '}
          <span aria-hidden="true">—</span>{' '}
          <time dateTime={endDate}>{endLabel}</time>
        </dd>
      </dl>
    </li>
  )
}

function Resume() {
  let resume: Array<Role> = [
    {
      company: 'Connexity',
      title: 'Machine Learning Intern',
      logo: cnx,
      start: 'Jul 2022',
      end: 'Aug 2023',
    },
    {
      company: 'Rostr',
      title: 'CTO | Founding Engineer',
      logo: rostr,
      start: 'Mar 2024',
      end: 'Sep 2024',
    },
    {
      company: 'Connexity',
      title: 'Software Engineer Intern',
      logo: cnx,
      start: 'May 2023',
      end: 'Aug 2023',
    },
    {
      company: `Mastro's Ocean Club`,
      title: `Server's Assistant`,
      logo: mastros,
      start: 'May 2022',
      end: 'Aug 2022',
    },
    {
      company: 'Beach Camp',
      title: 'Coach',
      logo: bc,
      start: 'Jun 2020',
      end: 'Aug 2021',
    },
  ]

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 border-zinc-700/40">
      <h2 className="flex text-sm font-semibold  text-zinc-100">
        <BriefcaseIcon className="h-6 w-6 flex-none" />
        <span className="ml-3">Resume</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <Role key={roleIndex} role={role} />
        ))}
      </ol>
      <Button href="/resume" variant="secondary" className="group mt-6 w-full">
        View Full Resume
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>

      </Button>
    </div>
  )
}


export default async function Home() {
  // let articles = (await getAllArticles()).slice(0, 4)

  return (
    <>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-zinc-100">
             Entrepreneur, <br/> Full stack developer, <br/> Machine learning engineer.
          </h1>
          <p className="mt-6 text-base text-zinc-400">
            I&#39;m Duncan Grimes, a senior at Vanderbilt University graduating in Spring 2025.
            I will be graduating with majors in Applied Mathematics and Computer Science, as well as a minor in Business.
            <br/><br/>
            Please enjoy reading about some projects I&#39;ve worked on and&nbsp;
            <Link href={'/rostr'} className='underline text-zinc-300 hover:text-zinc-500'>try a demo</Link>
            &nbsp;of the Rostr platform I built in Summer 2024.
          </p>
          <div className="mt-6 flex gap-6">
            <SocialLink
              href="https://github.com/duncangrimes"
              aria-label="Follow on GitHub"
              icon={GitHubIcon}
            />
            <SocialLink
              href={process.env.LINKEDIN_URL || '#'}
              aria-label="Follow on LinkedIn"
              icon={LinkedInIcon}
            />
          </div>
        </div>
      </Container>
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {articleList.map((article) => (
              <Article key={article.title} article={article} />
            ))}
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Resume />
          </div>
        </div>
      </Container>
    </>
  )
}
