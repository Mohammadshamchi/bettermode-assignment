import React from "react";

interface AvatarProps {
    src?: string;
    alt?: string;
    fallback?: string;
    className?: string;
}

export function Avatar({ src, alt, fallback, className = "" }: AvatarProps) {
    if (!src) {
        return (
            <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gray-100 ${className}`}>
                <span className="flex h-full w-full items-center justify-center font-medium text-gray-600">
                    {fallback?.[0] || "U"}
                </span>
            </div>
        );
    }

    return (
        <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}>
            <img src={src} alt={alt || ""} className="aspect-square h-full w-full" />
        </div>
    );
} 
