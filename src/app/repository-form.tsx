'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'

export function RepositoryForm({
  initialRepository,
}: {
  initialRepository: string
}) {
  const router = useRouter()

  return (
    <form
      className="flex items-end gap-2 w-full max-w-sm"
      onSubmit={(event) => {
        event.preventDefault()
        const formData = new FormData(event.target as HTMLFormElement)
        router.push(`/?repository=${formData.get('repository')}`)
      }}
    >
      <div className="flex-1 flex flex-col gap-2">
        <Label htmlFor="repository">Repository</Label>
        <Input
          defaultValue={initialRepository}
          id="repository"
          name="repository"
          placeholder="e.g. facebook/react"
          className="text-[1rem]"
          autoCapitalize="no"
          autoComplete="no"
          autoCorrect="no"
          enterKeyHint="go"
          required
        />
      </div>
      <div className="flex justify-center">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  )
}
