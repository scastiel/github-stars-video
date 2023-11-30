import { Card } from '@/components/ui/card'
import { ReactNode } from 'react'

export function ResultCard({ children }: { children?: ReactNode }) {
  return (
    <Card className="w-full max-w-[640px] aspect-video overflow-hidden">
      {children}
    </Card>
  )
}
