import { renderHook, act } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { useReactions } from '../../hooks/UseReactions';
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
    },
    {
        request: {
            query: REMOVE_REACTION,
            variables: { postId: '123', reaction: 'LIKE' }
        },
        result: {
            data: {
                removeReaction: {
                    id: '123',
                    reactionsCount: 0,
                    reactions: []
                }
            }
        }
    }
];

describe('useReactions', () => {
    it('should handle reaction toggle correctly', async () => {
        const wrapper = ({ children }: { children: React.ReactNode }) => (
            <MockedProvider mocks={mocks} addTypename={false}>
                {children}
            </MockedProvider>
        );

        const { result } = renderHook(() => useReactions({ postId: '123' }), { wrapper });

        expect(result.current.hasReacted).toBe(false);
        expect(result.current.loading).toBe(false);

        await act(async () => {
            await result.current.toggleReaction();
        });

        expect(result.current.hasReacted).toBe(true);

        await act(async () => {
            await result.current.toggleReaction();
        });

        expect(result.current.hasReacted).toBe(false);
    });
});
