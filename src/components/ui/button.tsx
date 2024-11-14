import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'primary' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    className,
    variant = 'default',
    size = 'md',
    children,
    ...props
}, ref) => {
    return (
        <button
            ref={ref}
            className={cn(
                'inline-flex items-center justify-center rounded-md font-medium transition-colors',
                'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500',
                'disabled:pointer-events-none disabled:opacity-50',
                {
                    'bg-blue-600 text-white hover:bg-blue-700': variant === 'primary',
                    'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50': variant === 'default',
                    'text-gray-900 hover:bg-gray-100': variant === 'ghost',
                    'px-3 py-1.5 text-sm': size === 'sm',
                    'px-4 py-2 text-base': size === 'md',
                    'px-6 py-3 text-lg': size === 'lg',
                },
                className
            )}
            {...props}
        >
            {children}
        </button>
    )
})

Button.displayName = 'Button'

export { Button }
