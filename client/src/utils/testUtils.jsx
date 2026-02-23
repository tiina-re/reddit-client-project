import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import redditReducer from '../features/posts/redditSlice';
import subredditsReducer from '../features/subreddits/subredditsSlice';

/**
 * Custom render function that wraps components in a Redux Provider.
 * This allows you to test components that use hooks like useSelector or useDispatch.
 */
export function renderWithProviders(
  ui,
  {
    // You can pass an initial state here to test specific scenarios
    preloadedState = {},
    // Create a fresh store for every test to avoid state leaking between tests
    store = configureStore({
      reducer: {
        reddit: redditReducer,
        subreddits: subredditsReducer,
      },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <MemoryRouter>
          {children}
        </MemoryRouter>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}