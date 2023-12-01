import { Button } from '@/components/ui/button'
import { env } from '@/lib/env'
import { Code2, ExternalLink } from 'lucide-react'
import type { Metadata } from 'next'
import PlausibleProvider from 'next-plausible'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_BASE_URL),
  title: 'GitHub Stars Video',
  description:
    'Animate your GitHub Stars, boost engagement with your audience.',
  openGraph: {
    title: 'GitHub Stars Video',
    description:
      'Animate your GitHub Stars, boost engagement with your audience.',
    images: `/banner.png`,
    type: 'website',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@scastiel',
    site: '@scastiel',
    images: `/banner.png`,
    title: 'GitHub Stars Video',
    description:
      'Animate your GitHub Stars, boost engagement with your audience.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <PlausibleProvider
        domain="scastiel.dev/github-stars"
        trackOutboundLinks
      />
      <body className="min-h-[100dvh] flex flex-col">
        <header className="p-2 flex justify-end">
          <Button variant="ghost" asChild>
            <a
              href="https://github.com/scastiel/github-stars-video"
              target="_blank"
              rel="noreferrer noopener"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              GitHub
            </a>
          </Button>
        </header>
        {children}
        <div className="p-4 w-full max-w-md mx-auto">
          <a
            href="https://codebit.xyz?ref=github-stars"
            target="_blank"
            rel="noreferrer noopener"
            className="block rounded p-4 text-sm text-center text-slate-600 [&_strong]:text-black mb-12 border bg-gradient-to-br from-slate-100 to-slate-200"
          >
            Would you like to create animated code videos?
            <br />
            Check out our project{' '}
            <strong>
              <Code2 className="inline w-4 h-4 -mt-0.5" /> CodeBit
            </strong>
          </a>
        </div>
        <footer className="p-2 text-center text-sm [&_a]:underline">
          Created by{' '}
          <a
            href="https://scastiel.dev?ref=github-stars"
            target="_blank"
            rel="noreferrer noopener"
          >
            Sebastien Castiel
          </a>
          .<br />
          <small className="text-slate-400">
            Not endorsed or affiliated with GitHub.
          </small>
        </footer>
      </body>
    </html>
  )
}
