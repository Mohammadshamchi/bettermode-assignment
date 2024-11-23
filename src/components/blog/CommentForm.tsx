import { useState } from 'react';
import { Button } from '@/components/ui/button';
import type { CommentFormProps } from '@/types/comment.types';

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
            await onSubmit(content, parentId);
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
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Write a comment..."
                rows={4}
                disabled={isSubmitting}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="flex justify-end space-x-2">
                <Button
                    type="button"
                    variant="outline"
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
