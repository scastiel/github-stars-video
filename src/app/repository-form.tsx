'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { usePlausible } from 'next-plausible'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function RepositoryForm({
  initialRepository,
}: {
  initialRepository: string
}) {
  const router = useRouter()
  const plausible = usePlausible()
  const [repository, setRepository] = useState(initialRepository)

  return (
    <form
      className="flex flex-col gap-2 w-full max-w-sm"
      onSubmit={(event) => {
        event.preventDefault()
        plausible('Change repository', { props: { repository } })
        router.push(`/?repository=${repository}`)
      }}
    >
      <Label htmlFor="repository">Repository</Label>
      <div className="flex-1 flex gap-2">
        <Input
          id="repository"
          name="repository"
          placeholder="e.g. facebook/react"
          className="text-[1rem] flex-1"
          autoCapitalize="no"
          autoComplete="no"
          autoCorrect="no"
          enterKeyHint="go"
          required
          value={repository}
          onChange={(event) => setRepository(event.target.value)}
        />
        <Button variant="outline" type="submit">
          Submit
        </Button>
      </div>
      <div className="text-sm text-muted-foreground [&_a]:underline">
        Try with{' '}
        <Link
          href="?repository=vercel/next.js"
          onClick={() => setRepository('vercel/next.js')}
        >
          vercel/next.js
        </Link>{' '}
        or{' '}
        <Link
          href="?repository=facebook/react"
          onClick={() => setRepository('facebook/react')}
        >
          facebook/react
        </Link>
      </div>
    </form>
  )
}
