import { CompositionPlayer } from '@/app/composition-player'
import { RepositoryForm } from '@/app/repository-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Props } from '@/video/composition'
import { Octokit } from '@octokit/rest'

export default async function Home({
  searchParams,
}: {
  searchParams: { repository?: string }
}) {
  const inputProps = searchParams.repository
    ? await getGithubStarsInfo(searchParams.repository)
    : undefined

  return (
    <main className="flex-1 flex flex-col gap-8 justify-center items-center p-4">
      <RepositoryForm initialRepository={searchParams.repository} />
      <Card className="w-full max-w-[640px] aspect-video overflow-hidden">
        {inputProps === null ? (
          <>
            <CardHeader>
              <CardTitle>Error</CardTitle>
              <CardDescription>Repository not found</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                It looks like the repository you entered (
                <strong>{searchParams.repository}</strong>) does not exist.
              </p>
            </CardContent>
          </>
        ) : (
          <CompositionPlayer
            fps={60}
            durationInFrames={180}
            inputProps={inputProps}
          />
        )}
      </Card>
    </main>
  )
}

async function getGithubStarsInfo(
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
