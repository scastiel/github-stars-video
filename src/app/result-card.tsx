import { GenerateButton } from '@/app/generate-button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Props } from '@/video/schema'
import { ReactNode } from 'react'

export function ResultCard({
  children,
  className,
  inputProps,
}: {
  children?: ReactNode
  className?: string
  inputProps?: Partial<Props>
}) {
  return (
    <>
      <div className="w-full max-w-[640px] aspect-video dark:p-[0.1rem] dark:bg-gradient-to-b from-slate-300 dark:from-slate-100 to-transparent rounded-[0.6rem]">
        <Card
          className={cn(
            className,
            'w-full h-full overflow-hidden bg-white text-black rounded-[0.5rem]',
          )}
        >
          {children}
        </Card>
      </div>
      <GenerateButton inputProps={inputProps} />
    </>
  )
}
