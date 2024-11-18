import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';

interface CommentFormProps {
    postId: string;
    parentId?: string;
    onSubmit: (variables: { postId: string; content: string; parentId?: string }) => Promise<any>;
    onCancel: () => void;
}

export function CommentForm({ postId, parentId, onSubmit, onCancel }: CommentFormProps) {
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!content.trim()) {
            setError('Comment cannot be empty');
            return;
        }

        try {
            setIsSubmitting(true);
            setError('');

            const htmlContent = `<p>${content}</p>`; // Basic HTML wrapping

            await onSubmit({
                postId,
                content: htmlContent,
                ...(parentId && { parentId })
            });

            setContent('');
            onCancel();
        } catch (err) {
            setError('Failed to post comment. Please try again.');
            console.error('Comment submission error:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write a comment..."
                className="min-h-[100px] w-full p-3 border rounded-md"
                disabled={isSubmitting}
            />

            {error && (
                <p className="text-sm text-red-500">{error}</p>
            )}

            <div className="flex justify-end space-x-2">
                <Button
                    type="button"
                    variant="ghost"
                    onClick={onCancel}
                    disabled={isSubmitting}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Posting...' : 'Post Comment'}
                </Button>
            </div>
        </form>
    );
} 
