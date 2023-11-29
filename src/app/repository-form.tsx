import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function RepositoryForm({
  initialRepository,
}: {
  initialRepository?: string
}) {
  return (
    <form className="flex items-end gap-2">
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
