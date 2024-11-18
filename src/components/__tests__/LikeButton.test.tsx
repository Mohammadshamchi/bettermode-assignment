import { render, fireEvent, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { LikeButton } from '../ui/LikeButton';
import { ADD_REACTION, REMOVE_REACTION } from '@/graphql/mutations/reactions';

const mocks = [
    {
        request: {
            query: ADD_REACTION,
            variables: { postId: '1', reaction: 'like' },
        },
        result: {
            data: {
                addReaction: {
                    id: '1',
                    reactionsCount: 1,
                    reactions: [{ reaction: 'like', count: 1 }],
                },
            },
        },
    },
];

describe('LikeButton', () => {
    it('toggles like state on click', async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <LikeButton postId="1" initialCount={0} isLiked={false} />
            </MockedProvider>
        );

        const button = screen.getByRole('button');
        await fireEvent.click(button);

        expect(screen.getByText('1 likes')).toBeInTheDocument();
    });
});
