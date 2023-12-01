import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'
import { Props } from './schema'

export const animationDurationInSeconds = 3
export const width = 1280
export const height = 720
export const fps = 60
const stargazerAvatarSize = 128
const stargazerAvatarGap = 16
const starSize = 32

export function GitHubStarsComposition({
  user,
  userAvatarUrl,
  repository,
  stargazers,
  stars,
}: Props) {
  return (
    <AbsoluteFill className="bg-white">
      <RepositoryInformation
        user={user}
        userAvatarUrl={userAvatarUrl}
        repository={repository}
      />
      <UserAvatars stargazers={stargazers} />
      <StarCount stars={stars} />
    </AbsoluteFill>
  )
}

function StarCount({
  stars,
  startFrom = 0,
}: {
  stars: number
  startFrom?: number
}) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const starsToDisplay = Math.round(
    interpolate(
      frame,
      [0, animationDurationInSeconds * fps],
      [startFrom, stars],
      {
        extrapolateRight: 'clamp',
        easing: Easing.bezier(0.5, 1, 0.5, 1),
      },
    ),
  )

  return (
    <div className="text-right px-16 pb-16 text-[128px] text-black">
      <strong className="tabular-nums">
        {starsToDisplay.toLocaleString('en-US', { useGrouping: true })}
      </strong>
      &nbsp;stars
    </div>
  )
}

function UserAvatars({ stargazers }: { stargazers: Props['stargazers'] }) {
  return (
    <div className="relative flex-1">
      {stargazers.map((avatarUrl, index) => (
        <User
          key={index}
          avatarUrl={avatarUrl}
          index={index}
          stargazers={stargazers}
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
    <div className="p-16 text-[72px] whitespace-nowrap overflow-hidden text-ellipsis text-black">
      <span>
        <Img
          src={userAvatarUrl}
          alt={user}
          className="rounded-full inline mr-[0.25em] w-[1.2em] h-[1.2em] mb-3"
        />
        {user}
      </span>
      <span className="opacity-30 mx-[0.25em]">/</span>
      <strong>{repository}</strong>
    </div>
  )
}

function User({
  avatarUrl,
  index,
  stargazers,
}: {
  avatarUrl: string
  index: number
  stargazers: Props['stargazers']
}) {
  const { fps, width } = useVideoConfig()
  const frame = useCurrentFrame()
  const offset =
    stargazerAvatarGap + index * (stargazerAvatarSize + stargazerAvatarGap)
  const left = interpolate(
    frame,
    [0, animationDurationInSeconds * fps],
    [
      offset,
      offset -
        stargazers.length * (stargazerAvatarSize + stargazerAvatarGap) +
        (width * 3) / 4,
    ],
    { extrapolateRight: 'clamp', easing: Easing.elastic(1) },
  )
  return (
    <div className="absolute top-0 flex flex-col" style={{ left }}>
      <div
        className="flex justify-center items-center"
        style={{ width: stargazerAvatarSize, height: stargazerAvatarSize }}
      >
        <Img
          className="shadow-xl rounded-full"
          src={avatarUrl}
          width={stargazerAvatarSize}
          height={stargazerAvatarSize}
        />
      </div>
      <div className="flex justify-center mt-4">
        <Star starSize={starSize} />
      </div>
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
