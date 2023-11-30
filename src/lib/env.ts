import { z } from 'zod'

const envSchema = z.object({
  REMOTION_AWS_ACCESS_KEY_ID: z.string().min(1),
  REMOTION_AWS_SECRET_ACCESS_KEY: z.string().min(1),
  REMOTION_AWS_REGION: z.string().min(1),
  REMOTION_AWS_FUNCTION_NAME: z.string().min(1),
  REMOTION_SERVE_URL: z.string().min(1),
  GITHUB_ACCESS_TOKEN: z.string().min(1),
  NEXT_PUBLIC_BASE_URL: z.string().min(1),
})

export const env = envSchema.parse(process.env)
