import { z } from 'zod'
import { bookPrStargazers } from './fixtures'

export const schema = z.object({
  user: z.string(),
  userAvatarUrl: z.string(),
  repository: z.string(),
  stars: z.number(),
  stargazers: z.array(z.string()),
})

export type Props = z.infer<typeof schema>

export const defaultProps: Props = {
  user: 'scastiel',
  userAvatarUrl: 'https://avatars.githubusercontent.com/u/301948?v=4',
  repository: 'book-pr',
  stars: 143,
  stargazers: bookPrStargazers.slice(0, 20).map((sg) => sg.avatar_url),
}
