import glob from 'fast-glob'

export interface ArticleInfo {
  title: string
  description: string
  date: string
  image?: string,
  href: string,
}

export const articleList: ArticleInfo[] = [
  {
    title: 'Vanderbilt Fusion Project',
    description: `
    I worked as a Control Systems Engineer with the VBF, designing the digital controls for a soccer ball-sized nuclear fusion reactor.
    Through this project I expanded my knowledge of systems design, negotiated with part distributors, and collobarated with a talented team of undergraduate engineers.`,
    date: '2022-09-01',
    href: 'https://www.vanderbiltfusion.org/',
  },
  {
    title: 'ratAItoille',
    description: `I created an experimental random recipe generator with some of my friends and classmates.
    We used a dataset of 5,000 recipes to train a series of ML models to generate a random dish, determine the ingredients for that recipe,
    and then generate an image of the finished product.`,
    date: '2024-02-01',
    href: 'https://medium.com/@carmiles/rat-ai-touille-an-experimental-recipe-generator-fd7bc85389d9',
  },
  {
    title: 'Rostr',
    description: `I co-founded Rostr in the summer of 2024, with the mission to connect student-athletes with employers.
    Please enjoy this demo, where you can play the role of a Rostr recruiter.`,
    date: '2024-03-01',
    href: '/rostr',
  },
  {
    title: 'Fire Detection AI/ML',
    description: 'For my culminating project at Vanderbilt, I tested and improved a binary classification model for detecting wildfires in an image. The model proved to be highly effective at detecting wildfires in low light conditions (at night), but struggled to detect fires in daylight.',
    date: '2025-05-01',
    href: '/fire-detection',
  },
].sort((a, z) => +new Date(z.date) - +new Date(a.date))







// export interface ArticleWithSlug extends Article {
//   slug: string
// }

// async function importArticle(
//   articleFilename: string,
// ): Promise<ArticleWithSlug> {
//   let { article } = (await import(`../app/articles/${articleFilename}`)) as {
//     default: React.ComponentType
//     article: Article
//   }

//   return {
//     slug: articleFilename.replace(/(\/page)?\.mdx$/, ''),
//     ...article,
//   }
// }

// export async function getAllArticles() {
//   let articleFilenames = await glob('*/page.mdx', {
//     cwd: './src/app/articles',
//   })

//   let articles = await Promise.all(articleFilenames.map(importArticle))

//   return articles.sort((a, z) => +new Date(z.date) - +new Date(a.date))
// }
