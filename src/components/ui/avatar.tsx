import type { ImgHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  size?: 'sm' | 'md' | 'lg'
  fallback?: string
}

function Avatar({ className, size = 'md', src, alt, fallback, ...props }: AvatarProps) {
  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
  }

  if (!src && fallback) {
    return (
      <div
        className={cn(
          'inline-flex items-center justify-center rounded-full bg-neutral-200 font-medium text-neutral-600',
          sizeClasses[size],
          className
        )}
      >
        {fallback}
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={cn('rounded-full object-cover', sizeClasses[size], className)}
      {...props}
    />
  )
}

export { Avatar }
