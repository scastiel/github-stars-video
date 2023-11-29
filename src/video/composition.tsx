import {
  AbsoluteFill,
  CalculateMetadataFunction,
  Easing,
  Img,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'
import { z } from 'zod'
import { bookPrStargazers } from './fixtures'

export const schema = z.object({
  animationDurationInSeconds: z.number(),
  fps: z.number(),
  stargazerAvatarSize: z.number(),
  stargazerAvatarGap: z.number(),
  starSize: z.number(),
  durationInSeconds: z.number(),
  videoWidth: z.number(),
  videoHeight: z.number(),
  user: z.string(),
  userAvatarUrl: z.string(),
  repository: z.string(),
  stars: z.number(),
  stargazers: z.array(z.string()),
})

export type Props = z.infer<typeof schema>

export const defaultProps: Props = {
  animationDurationInSeconds: 3,
  fps: 60,
  stargazerAvatarSize: 128,
  stargazerAvatarGap: 16,
  starSize: 32,
  durationInSeconds: 3,
  videoWidth: 1280,
  videoHeight: 720,
  user: 'scastiel',
  userAvatarUrl: 'https://avatars.githubusercontent.com/u/301948?v=4',
  repository: 'book-pr',
  stars: 143,
  stargazers: bookPrStargazers.slice(0, 20).map((sg) => sg.avatar_url),
}

export function GitHubStarsComposition({
  user,
  userAvatarUrl,
  repository,
  stargazers,
  stargazerAvatarGap,
  stargazerAvatarSize,
  stars,
  animationDurationInSeconds,
  starSize,
}: Props) {
  return (
    <AbsoluteFill className="bg-white">
      <RepositoryInformation
        user={user}
        userAvatarUrl={userAvatarUrl}
        repository={repository}
      />
      <UserAvatars
        stargazers={stargazers}
        stargazerAvatarGap={stargazerAvatarGap}
        stargazerAvatarSize={stargazerAvatarSize}
        animationDurationInSeconds={animationDurationInSeconds}
        starSize={starSize}
      />
      <StarCount
        stars={stars}
        stargazers={stargazers}
        animationDurationInSeconds={animationDurationInSeconds}
      />
    </AbsoluteFill>
  )
}

function useProps_(): Props {
  const { props } = useVideoConfig()
  console.log('props', props)
  return schema.parse({ ...defaultProps, ...props })
}

function StarCount({
  stars,
  stargazers,
  animationDurationInSeconds,
}: {
  stars: number
  stargazers: Props['stargazers']
  animationDurationInSeconds: number
}) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const starsToDisplay = Math.round(
    interpolate(
      frame,
      [0, animationDurationInSeconds * fps],
      [stars - stargazers.length, stars],
      {
        extrapolateRight: 'clamp',
        easing: Easing.bezier(0.5, 1, 0.5, 1),
      },
    ),
  )

  return (
    <div className="flex-1 text-right p-16 text-[128px]">
      <strong className="tabular-nums">
        {starsToDisplay.toLocaleString('en-US', { useGrouping: true })}
      </strong>
      &nbsp;stars
    </div>
  )
}

function UserAvatars({
  stargazerAvatarSize,
  stargazerAvatarGap,
  stargazers,
  animationDurationInSeconds,
  starSize,
}: {
  stargazerAvatarSize: number
  stargazerAvatarGap: number
  stargazers: Props['stargazers']
  animationDurationInSeconds: number
  starSize: number
}) {
  return (
    <div
      className="relative h-48"
      style={{
        width: stargazers.length * (stargazerAvatarSize + stargazerAvatarGap),
      }}
    >
      {stargazers.map((avatarUrl, index) => (
        <User
          key={index}
          avatarUrl={avatarUrl}
          index={index}
          animationDurationInSeconds={animationDurationInSeconds}
          stargazerAvatarGap={stargazerAvatarGap}
          stargazerAvatarSize={stargazerAvatarSize}
          stargazers={stargazers}
          starSize={starSize}
        />
      ))}
    </div>
  )
}

function RepositoryInformation({
  user,
  userAvatarUrl,
  repository,
}: {
  user: string
  userAvatarUrl: string
  repository: string
}) {
  return (
    <div className="p-16 text-[72px] flex items-center gap-8">
      <span className="flex items-center gap-6">
        <Img
          src={userAvatarUrl}
          alt={user}
          style={{ width: '1.2em', height: '1.2em' }}
          className="rounded-full"
        />
        {user}
      </span>
      <span className="opacity-30">/</span> <strong>{repository}</strong>
    </div>
  )
}

function User({
  avatarUrl,
  index,
  stargazerAvatarSize,
  stargazerAvatarGap,
  animationDurationInSeconds,
  stargazers,
  starSize,
}: {
  avatarUrl: string
  index: number
  stargazerAvatarSize: number
  stargazerAvatarGap: number
  animationDurationInSeconds: number
  starSize: number
  stargazers: Props['stargazers']
}) {
  const { fps, width } = useVideoConfig()
  const frame = useCurrentFrame()
  const offset =
    stargazerAvatarGap + index * (stargazerAvatarSize + stargazerAvatarGap)
  const left =
    offset +
    interpolate(
      frame,
      [0, animationDurationInSeconds * fps],
      [0, -stargazers.length * stargazerAvatarSize + (width * 2) / 3],
      { extrapolateRight: 'clamp', easing: Easing.elastic(1.5) },
    )
  return (
    <div className="absolute top-0 flex flex-col" style={{ left }}>
      <Sequence
        layout="none"
        from={interpolate(
          index,
          [0, stargazers.length],
          [-fps * 0.5, animationDurationInSeconds * fps - fps * 2],
        )}
      >
        <UserSequence
          avatarUrl={avatarUrl}
          stargazerAvatarSize={stargazerAvatarSize}
          starSize={starSize}
        />
      </Sequence>
    </div>
  )
}

export function UserSequence({
  avatarUrl,
  stargazerAvatarSize,
  starSize,
}: {
  avatarUrl: string
  stargazerAvatarSize: number
  starSize: number
}) {
  return (
    <>
      <AnimatedUserAvatar
        avatarUrl={avatarUrl}
        stargazerAvatarSize={stargazerAvatarSize}
      />
      <AnimatedStar starSize={starSize} />
    </>
  )
}

function AnimatedUserAvatar({
  avatarUrl,
  stargazerAvatarSize,
}: {
  avatarUrl: string
  stargazerAvatarSize: number
}) {
  const { fps } = useVideoConfig()
  const frame = useCurrentFrame()
  const size = Math.round(
    stargazerAvatarSize * spring({ fps, frame, config: { stiffness: 100 } }),
  )
  return (
    <div
      className="flex justify-center items-center"
      style={{ width: stargazerAvatarSize, height: stargazerAvatarSize }}
    >
      <Img
        className="shadow-xl rounded-full"
        src={avatarUrl}
        width={size}
        height={size}
      />
    </div>
  )
}

function AnimatedStar({ starSize }: { starSize: number }) {
  const { fps } = useVideoConfig()
  const frame = useCurrentFrame()
  const size = spring({ fps, frame, config: { stiffness: 100 } })
  return (
    <div
      className="flex justify-center mt-4"
      style={{ transform: `scale(${size})` }}
    >
      <Star starSize={starSize} />
    </div>
  )
}

function Star({ starSize }: { starSize: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={starSize}
      height={starSize}
      viewBox="0 0 24 24"
      fill="#fde047"
      stroke="#eab308"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-star"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

export const calculateMetadata: CalculateMetadataFunction<Props> = ({
  props: { durationInSeconds, videoWidth, videoHeight, fps },
}) => {
  return {
    durationInFrames: durationInSeconds * fps,
    width: videoWidth,
    height: videoHeight,
    fps,
  }
}
