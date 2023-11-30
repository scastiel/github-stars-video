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
      className="flex items-end gap-2"
      onSubmit={(event) => {
        event.preventDefault()
        const formData = new FormData(event.target as HTMLFormElement)
        router.push(`/?repository=${formData.get('repository')}`)
      }}
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="repository">Repository</Label>
        <Input
          defaultValue={initialRepository}
          id="repository"
          name="repository"
          placeholder="e.g. facebook/react"
          required
        />
      </div>
      <div className="flex justify-center">
        <Button type="submit">Submit</Button>
      </div>
    </form>
  )
}
