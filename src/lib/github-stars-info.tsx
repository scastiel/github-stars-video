import { Props } from '@/video/schema'
import { Octokit } from '@octokit/rest'

export async function getGithubStarsInfo(
  repository: string,
): Promise<Partial<Props> | null> {
  const octokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN! })
  const [user, repo] = repository.split('/')
  try {
    const {
      data: { avatar_url: userAvatarUrl },
    } = await octokit.users.getByUsername({ username: user })
    const {
      data: { stargazers_count: stars },
    } = await octokit.repos.get({ owner: user, repo })
    const {
      headers: { link },
    } = await octokit.rest.activity.listStargazersForRepo({
      owner: user,
      repo,
    })
    const lastPage =
      (link
        ?.split(/\s*,\s*/)
        .map((l) => l.match(/<.*?page=(\d+)>; rel="(.*)"/) ?? [])
        .filter(([_, _page, rel]) => rel === 'last')
        .map(([_, page]) => Number(page))[0] ?? 1) - 1
    const stargazers = [
      ...(lastPage > 1 ? await getStargazers(lastPage - 1) : []),
      ...(await getStargazers(lastPage)),
    ].slice(-50)
    return {
      user,
      userAvatarUrl,
      repository: repo,
      stars,
      stargazers: stargazers
        .map((sg) => ('avatar_url' in sg ? sg.avatar_url : null))
        .filter(Boolean),
    }
  } catch (err) {
    // console.error(err)
    return null
  }

  async function getStargazers(page: number) {
    const { data } = await octokit.rest.activity.listStargazersForRepo({
      owner: user,
      repo,
      page,
    })
    return data
  }
}
