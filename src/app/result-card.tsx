import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

export function ResultCard({
  children,
  className,
}: {
  children?: ReactNode
  className?: string
}) {
  return (
    <Card
      className={cn(
        className,
        'w-full max-w-[640px] aspect-video overflow-hidden',
      )}
    >
      {children}
    </Card>
  )
}
