import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ADD_REACTION, REMOVE_REACTION } from '@/graphql/mutations/reactions';

interface LikeButtonProps {
    postId: string;
    initialCount: number;
    isLiked: boolean;
}

export function LikeButton({ postId, initialCount, isLiked: initialIsLiked }: LikeButtonProps) {
    const [isLiked, setIsLiked] = useState(initialIsLiked);
    const [count, setCount] = useState(initialCount);

    const [addReaction] = useMutation(ADD_REACTION);
    const [removeReaction] = useMutation(REMOVE_REACTION);

    const handleClick = async () => {
        try {
            if (isLiked) {
                await removeReaction({ variables: { postId, reaction: 'like' } });
                setCount(prev => prev - 1);
            } else {
                await addReaction({ variables: { postId, reaction: 'like' } });
                setCount(prev => prev + 1);
            }
            setIsLiked(!isLiked);
        } catch (error) {
            console.error('Error toggling reaction:', error);
        }
    };

    return (
        <Button
            variant="ghost"
            onClick={handleClick}
            className="flex items-center gap-2 hover:text-red-600 transition-colors"
        >
            <Heart
                className={`w-5 h-5 transition-colors ${isLiked ? 'fill-red-500 text-red-500' : ''
                    }`}
            />
            <span>{count} likes</span>
        </Button>
    );
}
