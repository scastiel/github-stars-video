import { getRenderProgress } from '@remotion/lambda/client'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const user = String(searchParams.get('user'))
  const repository = String(searchParams.get('repository'))
  const renderId = String(searchParams.get('renderId'))
  const bucketName = String(searchParams.get('bucketName'))

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
