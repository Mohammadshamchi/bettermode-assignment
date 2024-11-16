import React from "react";
import { cn } from "@/lib/utils";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
    src?: string;
    alt?: string;
    fallback?: string;
}

interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
}

interface AvatarFallbackProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
    ({ className, src, alt, fallback, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
                    className
                )}
                {...props}
            >
                {src ? (
                    <img
                        src={src}
                        alt={alt || ""}
                        className="aspect-square h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-100">
                        <span className="font-medium text-gray-600">
                            {fallback?.[0] || "U"}
                        </span>
                    </div>
                )}
            </div>
        );
    }
);

const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
    ({ className, alt, ...props }, ref) => {
        return (
            <img
                ref={ref}
                className={cn("aspect-square h-full w-full object-cover", className)}
                alt={alt}
                {...props}
            />
        );
    }
);

const AvatarFallback = React.forwardRef<HTMLDivElement, AvatarFallbackProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "flex h-full w-full items-center justify-center bg-gray-100",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

// Add display names for better debugging
Avatar.displayName = "Avatar";
AvatarImage.displayName = "AvatarImage";
AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback };
