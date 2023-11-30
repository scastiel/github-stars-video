import { CompositionPlayer } from '@/app/composition-player'
import { GenerateButton } from '@/app/generate-button'
import { RepositoryForm } from '@/app/repository-form'
import { ResultCard } from '@/app/result-card'
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
import { Suspense } from 'react'
import { getGithubStarsInfo } from '../lib/github-stars-info'

export default async function Home({
  searchParams,
}: {
  searchParams: { repository?: string }
}) {
  const repository = searchParams.repository ?? 'remotion-dev/remotion'

  return (
    <main className="flex-1 flex flex-col gap-8 justify-center items-center p-4">
      <RepositoryForm initialRepository={repository} />
      <Suspense
        key={repository}
        fallback={
          <ResultCard>
            <div className="w-full h-full flex items-center justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <div>Loading…</div>
            </div>
          </ResultCard>
        }
      >
        <RepositoryResult repository={repository} />
      </Suspense>
    </main>
  )
}

async function RepositoryResult({ repository }: { repository: string }) {
  const inputProps = await getGithubStarsInfo(repository)

  return (
    <>
      {inputProps === null ? (
        <ResultCard>
          <CardHeader>
            <CardTitle>Error</CardTitle>
            <CardDescription>Repository not found</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              It looks like the repository you entered (
              <strong>{repository}</strong>) does not exist.
            </p>
          </CardContent>
        </ResultCard>
      ) : (
        <>
          <ResultCard>
            <CompositionPlayer inputProps={inputProps} />
          </ResultCard>
          <GenerateButton inputProps={inputProps} />
        </>
      )}
    </>
  )
}
