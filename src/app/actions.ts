'use server'
import { defaultProps, schema } from '@/video/schema'

import { getRenderProgress, renderMediaOnLambda } from '@remotion/lambda/client'
import { NextResponse } from 'next/server'

export async function generateVideo(inputProps: unknown) {
  'use server'
  const props = schema.parse(
    typeof inputProps === 'object' ? { ...defaultProps, ...inputProps } : {},
  )
  const { renderId, bucketName } = await renderMediaOnLambda({
    region: 'us-east-1',
    functionName: process.env.REMOTION_AWS_FUNCTION_NAME!,
    serveUrl: process.env.REMOTION_SERVE_URL!,
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
    functionName: process.env.REMOTION_AWS_FUNCTION_NAME!,
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

export async function downloadVideo(formData: FormData) {
  'use server'
  const user = String(formData.get('user'))
  const repository = String(formData.get('repository'))
  const renderId = String(formData.get('renderId'))
  const bucketName = String(formData.get('bucketName'))
  const { outputFile } = await getRenderProgress({
    region: 'us-east-1',
    functionName: process.env.REMOTION_AWS_FUNCTION_NAME!,
    renderId,
    bucketName,
  })
  if (!outputFile) throw new Error('Video is not ready for download')

  const response = await fetch(outputFile)

  return new NextResponse(response.body, {
    headers: {
      ...response.headers, // copy the previous headers
      'content-disposition': `attachment; filename="${user}-${repository}.mp4"`,
    },
  })
}
