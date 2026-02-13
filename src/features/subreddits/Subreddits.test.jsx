import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../utils/testUtils';
import Subreddits from './Subreddits';
import { expect, test } from 'vitest';

test('renders the subreddit section title', () => {
  renderWithProviders(<Subreddits />);
  
  // This should find the text "SUBREDDITS" in your h2
  const titleElement = screen.getByText(/SUBREDDITS/i);
  expect(titleElement).toBeInTheDocument();
});