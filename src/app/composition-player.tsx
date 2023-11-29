'use client'
import {
  GitHubStarsComposition,
  Props,
  defaultProps,
  schema,
} from '@/video/composition'
import useSize from '@react-hook/size'
import { Player } from '@remotion/player'
import { useRef } from 'react'

export function CompositionPlayer({
  fps,
  durationInFrames,
  inputProps,
}: {
  fps: number
  durationInFrames: number
  inputProps?: Partial<Props>
}) {
  const divRef = useRef<HTMLDivElement>(null)
  const [width, height] = useSize(divRef)

  return (
    <div className="w-full h-full" ref={divRef}>
      {width !== 0 && height !== 0 && (
        <Player
          style={{ width: '100%', height: '100%' }}
          component={GitHubStarsComposition}
          compositionWidth={1280}
          compositionHeight={720}
          fps={fps}
          durationInFrames={durationInFrames}
          inputProps={{ ...defaultProps, ...inputProps }}
          schema={schema}
          controls
          loop
          showVolumeControls={false}
          allowFullscreen={false}
          autoPlay
        />
      )}
    </div>
  )
}
