import { useComments } from '@/hooks/useComments';
import { Button } from '@/components/ui/Button';
import { Comment } from './Comment';
import { CommentForm } from './CommentForm';
import { Spinner } from '@/components/ui/Spinner';

interface CommentSectionProps {
    postId: string;
}

export function CommentSection({ postId }: CommentSectionProps) {
    const {
        comments,
        loading,
        error,
        hasMore,
        loadMore,
        addComment,
        isReplying,
        setIsReplying
    } = useComments(postId);

    if (error) {
        return (
            <div className="text-red-500 p-4">
                Error loading comments. Please try again.
            </div>
        );
    }

    return (
        <div className="mt-8 space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">
                    Comments ({comments?.length || 0})
                </h3>
                <Button
                    variant="outline"
                    onClick={() => setIsReplying(true)}
                >
                    Add Comment
                </Button>
            </div>

            {isReplying && (
                <CommentForm
                    postId={postId}
                    onSubmit={addComment}
                    onCancel={() => setIsReplying(false)}
                />
            )}

            <div className="space-y-4">
                {comments?.map((comment) => (
                    <Comment
                        key={comment.id}
                        comment={comment}
                        postId={postId}
                    />
                ))}
            </div>

            {loading && (
                <div className="flex justify-center p-4">
                    <Spinner />
                </div>
            )}

            {hasMore && !loading && (
                <Button
                    variant="ghost"
                    className="w-full"
                    onClick={loadMore}
                >
                    Load More Comments
                </Button>
            )}
        </div>
    );
} 
