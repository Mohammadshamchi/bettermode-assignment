import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { PostLikeButton } from '../blog/PostLikeButton';
import { ADD_REACTION, REMOVE_REACTION } from '@/graphql/mutations/reactions';

const mocks = [
    {
        request: {
            query: ADD_REACTION,
            variables: { postId: '123', input: { type: 'LIKE' } }
        },
        result: {
            data: {
                addReaction: {
                    id: '123',
                    reactionsCount: 1,
                    reactions: [{ reaction: 'LIKE', count: 1 }]
                }
            }
        }
    }
];

describe('PostLikeButton', () => {
    it('renders with initial count', () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <PostLikeButton postId="123" initialCount={5} />
            </MockedProvider>
        );

        expect(screen.getByText('5 likes')).toBeInTheDocument();
    });

    it('updates count on click', async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <PostLikeButton postId="123" initialCount={0} />
            </MockedProvider>
        );

        const button = screen.getByRole('button');
        fireEvent.click(button);

        await waitFor(() => {
            expect(screen.getByText('1 likes')).toBeInTheDocument();
        });
    });

    it('handles error states', async () => {
        const errorMock = [
            {
                request: {
                    query: ADD_REACTION,
                    variables: { postId: '123', input: { type: 'LIKE' } }
                },
                error: new Error('Failed to like')
            }
        ];

        const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

        render(
            <MockedProvider mocks={errorMock} addTypename={false}>
                <PostLikeButton postId="123" initialCount={0} />
            </MockedProvider>
        );

        const button = screen.getByRole('button');
        fireEvent.click(button);

        await waitFor(() => {
            expect(consoleSpy).toHaveBeenCalled();
        });

        consoleSpy.mockRestore();
    });
});
