'use server'
import { env } from '@/lib/env'
import { defaultProps, schema } from '@/video/schema'

import { getRenderProgress, renderMediaOnLambda } from '@remotion/lambda/client'

export async function generateVideo(inputProps: unknown) {
  'use server'
  const props = schema.parse(
    typeof inputProps === 'object' ? { ...defaultProps, ...inputProps } : {},
  )
  const { renderId, bucketName } = await renderMediaOnLambda({
    region: 'us-east-1',
    functionName: env.REMOTION_AWS_FUNCTION_NAME,
    serveUrl: env.REMOTION_SERVE_URL,
    composition: 'GitHubStars',
    inputProps: props,
    codec: 'h264',
  })
  return { renderId, bucketName }
}

export async function getVideoGenerationProgress(
  renderId: string,
  bucketName: string,
) {
  'use server'
  const { done, errors, outputFile } = await getRenderProgress({
    region: 'us-east-1',
    functionName: env.REMOTION_AWS_FUNCTION_NAME,
    renderId,
    bucketName,
  })
  if (errors) {
    for (const error of errors) {
      console.error(error)
    }
  }
  return { done, error: errors.length > 0, outputFile: outputFile }
}
