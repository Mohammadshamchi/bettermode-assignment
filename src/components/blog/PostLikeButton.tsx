import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useReactions } from '@/hooks/UseReactions';

interface PostLikeButtonProps {
    postId: string;
    initialCount: number;
    initialLiked?: boolean;
}

export function PostLikeButton({ postId, initialCount, initialLiked = false }: PostLikeButtonProps) {
    const [count, setCount] = useState(initialCount);
    const { hasReacted, toggleReaction } = useReactions(postId);
    const [isLiked, setIsLiked] = useState(initialLiked);

    const handleClick = async () => {
        try {
            await toggleReaction();
            setCount(prev => isLiked ? prev - 1 : prev + 1);
            setIsLiked(!isLiked);
        } catch (err) {
            console.error('Error toggling like:', err);
        }
    };

    return (
        <Button
            variant="ghost"
            className="flex items-center gap-2 hover:text-red-600 transition-colors"
            onClick={handleClick}
        >
            <Heart
                className={`w-5 h-5 transition-colors ${isLiked ? 'fill-red-500 text-red-500' : ''
                    }`}
            />
            <span>{count} likes</span>
        </Button>
    );
}
