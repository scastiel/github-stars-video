import { Composition } from 'remotion'
import {
  GitHubStarsComposition,
  calculateMetadata,
  defaultProps,
  schema,
} from './composition'

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="GitHubStars"
        component={GitHubStarsComposition}
        calculateMetadata={calculateMetadata}
        defaultProps={defaultProps}
        schema={schema}
      />
    </>
  )
}
