import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-neutral-200 bg-white shadow-sm',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function CardHeader({ className, children, ...props }: CardProps) {
  return (
    <div className={cn('px-6 py-4', className)} {...props}>
      {children}
    </div>
  )
}

function CardTitle({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement> & { children: ReactNode }) {
  return (
    <h3
      className={cn('text-lg font-semibold text-neutral-900', className)}
      {...props}
    >
      {children}
    </h3>
  )
}

function CardDescription({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLParagraphElement> & { children: ReactNode }) {
  return (
    <p className={cn('text-sm text-neutral-500', className)} {...props}>
      {children}
    </p>
  )
}

function CardContent({ className, children, ...props }: CardProps) {
  return (
    <div className={cn('px-6 py-4', className)} {...props}>
      {children}
    </div>
  )
}

function CardFooter({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn('border-t border-neutral-200 px-6 py-4', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
