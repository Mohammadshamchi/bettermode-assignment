import { useState } from 'react';
// import { formatDistanceToNow } from 'date-fns';
import { MessageSquare, Heart } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/Button';
import { CommentForm } from './CommentForm';
import type { Comment as CommentType } from '@/types/comment.types';
import { useComments } from '@/hooks/useComments';

interface CommentProps {
    comment: CommentType;
    postId: string;
}

export function Comment({ comment, postId }: CommentProps) {
    const [isReplying, setIsReplying] = useState(false);
    const { addComment } = useComments(postId);

    const content = comment.fields.find(field => field.key === 'content')?.value || '';
    const parsedContent = JSON.parse(content);

    return (
        <div className="flex space-x-4">
            <Avatar className="h-10 w-10">
                <AvatarImage
                    src={comment.owner.member.profilePicture?.urls?.thumb}
                    alt={comment.owner.member.name}
                />
                <AvatarFallback>
                    {comment.owner.member.name.charAt(0)}
                </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                    <div>
                        <h4 className="font-medium">
                            {comment.owner.member.displayName || comment.owner.member.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                            {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                        </p>
                    </div>
                </div>

                <div className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: parsedContent }}
                />

                <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="sm" className="space-x-2">
                        <Heart className="h-4 w-4" />
                        <span>{comment.reactionsCount}</span>
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="space-x-2"
                        onClick={() => setIsReplying(!isReplying)}
                    >
                        <MessageSquare className="h-4 w-4" />
                        <span>{comment.repliesCount}</span>
                    </Button>
                </div>

                {isReplying && (
                    <CommentForm
                        postId={postId}
                        parentId={comment.id}
                        onSubmit={addComment}
                        onCancel={() => setIsReplying(false)}
                    />
                )}

                {comment.replies?.nodes && comment.replies.nodes.length > 0 && (
                    <div className="ml-6 mt-4 space-y-4">
                        {comment.replies.nodes.map((reply) => (
                            <Comment key={reply.id} comment={reply} postId={postId} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
} 
