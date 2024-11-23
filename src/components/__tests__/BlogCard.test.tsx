import { render, fireEvent, screen } from '@testing-library/react';
import { BlogCard } from '../blog/BlogCard';

const mockPost = {
    id: '1',
    title: 'Test Post',
    description: 'Test Description',
    shortContent: 'Test Content',
    createdAt: '2024-01-01',
    author: {
        name: 'Test Author',
        avatar: 'test-avatar.jpg'
    },
    space: {
        id: '1',
        name: 'Test Space'
    },
    imageUrl: 'test-image.jpg',
    reactionsCount: 0,
    commentsCount: 0,
    readTime: '5 min',
    categories: ['test'],
    fields: [],
    status: 'PUBLISHED' as const,
    url: 'https://example.com/test-post',
    relativeUrl: '/test-post',
    reactions: []
};

describe('BlogCard', () => {
    it('renders post information correctly', () => {
        const handleClick = jest.fn();
        render(<BlogCard post={mockPost} onClick={handleClick} />);

        expect(screen.getByText('Test Post')).toBeInTheDocument();
        expect(screen.getByText('Test Description')).toBeInTheDocument();
        expect(screen.getByText('Test Author')).toBeInTheDocument();
        expect(screen.getByTestId('reactions-count')).toHaveTextContent('0');
        expect(screen.getByTestId('comments-count')).toHaveTextContent('0');
    });

    it('handles click events correctly', () => {
        const handleClick = jest.fn();
        render(<BlogCard post={mockPost} onClick={handleClick} />);

        fireEvent.click(screen.getByText('Test Post'));
        expect(handleClick).toHaveBeenCalledWith('1');
    });

    it('handles share functionality', async () => {
        const handleClick = jest.fn();
        const mockShare = jest.fn();
        global.navigator.share = mockShare;

        render(<BlogCard post={mockPost} onClick={handleClick} />);

        const shareButton = screen.getByRole('button', { name: /share/i });
        await fireEvent.click(shareButton);

        expect(mockShare).toHaveBeenCalledWith({
            title: 'Test Post',
            text: 'Test Description',
            url: '/post/1'
        });
    });
});
