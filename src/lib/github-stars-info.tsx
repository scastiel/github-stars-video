import { Props } from '@/video/schema'
import { Octokit } from '@octokit/rest'

export async function getGithubStarsInfo(
  repository: string,
): Promise<Partial<Props> | null> {
  try {
    const [user, repo] = repository.split('/')
    const octokit = new Octokit()
    const {
      data: { avatar_url: userAvatarUrl },
    } = await octokit.users.getByUsername({ username: user })
    const {
      data: { stargazers_count: stars },
    } = await octokit.repos.get({ owner: user, repo })
    const { data: stargazers } =
      await octokit.rest.activity.listStargazersForRepo({
        owner: user,
        repo,
      })
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
    return null
  }
}
