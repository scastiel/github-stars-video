'use client'
import { generateVideo, getVideoGenerationProgress } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { delay } from '@/lib/utils'
import { Props } from '@/video/schema'
import { Download, FileVideo, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type State =
  | { type: 'initial' }
  | { type: 'pending' }
  | { type: 'started'; renderId: string; bucketName: string }
  | { type: 'done'; renderId: string; bucketName: string }
  | { type: 'error' }

export function GenerateButton({ inputProps }: { inputProps: Partial<Props> }) {
  const [state, setState] = useState<State>({ type: 'initial' })
  const router = useRouter()

  if (state.type === 'done') {
    return (
      <form action="/download" method="GET">
        <input type="hidden" name="renderId" value={state.renderId} />
        <input type="hidden" name="bucketName" value={state.bucketName} />
        <input type="hidden" name="user" value={inputProps.user} />
        <input type="hidden" name="repository" value={inputProps.repository} />
        <Button type="submit">
          <Download className="w-4 h-4 mr-2" /> Download video
        </Button>
      </form>
    )
  }

  return (
    <Button
      onClick={async () => {
        try {
          setState({ type: 'pending' })
          const { renderId, bucketName } = await generateVideo(inputProps)
          setState({ type: 'started', renderId, bucketName })
          do {
            await delay(5000)
            const result = await getVideoGenerationProgress(
              renderId,
              bucketName,
            )
            if (result.done) {
              setState({ type: 'done', renderId, bucketName })
              router.push(
                `/download?renderId=${renderId}&bucketName=${bucketName}&user=${inputProps.user}&repository=${inputProps.repository}`,
              )
              break
            }
            if (result.error) {
              setState({ type: 'error' })
              break
            }
          } while (true)
        } catch (err) {
          console.error(err)
          setState({ type: 'error' })
        }
      }}
      disabled={state.type === 'pending' || state.type === 'started'}
    >
      {state.type === 'pending' || state.type === 'started' ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating video…
        </>
      ) : (
        <>
          <FileVideo className="w-4 h-4 mr-2" /> Export MP4 video
        </>
      )}
    </Button>
  )
}
