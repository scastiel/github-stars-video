import { Composition } from 'remotion'
import {
  GitHubStarsComposition,
  animationDurationInSeconds,
  defaultProps,
  fps,
  height,
  schema,
  width,
} from './composition'

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
