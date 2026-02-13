import { screen, cleanup, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../../utils/testUtils';
import Posts from './Posts';
import { expect, test, vi } from 'vitest';

// Mock react-redux to prevent the useEffect from actually dispatching
// This stops the app from flipping back to "loading" state
vi.mock('react-redux', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useDispatch: () => vi.fn(),
    };
});

const mockPosts = [
    {
        id: '1',
        title: 'Real Reddit Post',
        author: 'user1',
        ups: 100,
        subreddit: 'news',
        url: 'https://reddit.com/r/news',
        created_utc: 1676232000
    }
];

test('switches from loading skeletons to post content', async () => {
    // Render loading state
    renderWithProviders(<Posts />, {
        preloadedState: {
            reddit: {
                isLoading: true,
                posts: [],
                searchTerm: '',
                selectedSubreddit: '/r/popular',
                error: false
            }
        }
    });

    await waitFor(() => {
        expect(document.getElementsByClassName('post-skeleton-card').length).toBeGreaterThan(0);
    });

    // Reset DOM
    cleanup();

    // Render Success State
    renderWithProviders(<Posts />, {
        preloadedState: {
            reddit: {
                isLoading: false,
                error: false,
                posts: mockPosts,
                searchTerm: '',
                selectedSubreddit: '/r/popular'
            }
        }
    });

    // Check transition
    await waitFor(() => {
        expect(document.getElementsByClassName('post-skeleton-card').length).toBe(0);
    });

    expect(screen.getByText(/Real Reddit Post/i)).toBeInTheDocument();
});