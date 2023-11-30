import { Composition } from 'remotion'
import {
  GitHubStarsComposition,
  animationDurationInSeconds,
  fps,
  height,
  width,
} from './composition'
import { defaultProps, schema } from './schema'

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="GitHubStars"
        component={GitHubStarsComposition}
        fps={fps}
        width={width}
        height={height}
        durationInFrames={animationDurationInSeconds + fps}
        defaultProps={defaultProps}
        schema={schema}
      />
    </>
  )
}
