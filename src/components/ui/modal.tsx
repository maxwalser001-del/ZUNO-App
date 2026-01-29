'use client'

import { useEffect, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  className?: string
}

function Modal({ isOpen, onClose, children, className }: ModalProps) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={cn(
          'relative z-10 max-h-[90vh] w-full max-w-lg overflow-auto rounded-xl bg-white p-6 shadow-xl',
          className
        )}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </div>
  )
}

function ModalHeader({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('mb-4', className)}>
      <h2 className="text-lg font-semibold text-neutral-900">{children}</h2>
    </div>
  )
}

function ModalBody({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={cn('text-neutral-600', className)}>{children}</div>
}

function ModalFooter({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('mt-6 flex justify-end gap-3', className)}>
      {children}
    </div>
  )
}

export { Modal, ModalHeader, ModalBody, ModalFooter }
