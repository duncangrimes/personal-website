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
    description: '',
    date: '2022-09-01',
    href: 'https://www.vanderbiltfusion.org/',
  },
  {
    title: 'ratAItoille',
    description: '',
    date: '2024-02-01',
    href: 'https://medium.com/@carmiles/rat-ai-touille-an-experimental-recipe-generator-fd7bc85389d9',
  },
  {
    title: 'Rostr',
    description: '',
    date: '2024-03-01',
    href: '/rostr',
  },
  {
    title: 'ML text-classification model',
    description: '',
    date: '2022-07-01',
    href: '/articles/vanderbilt-fusion-project',
  },
]







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
