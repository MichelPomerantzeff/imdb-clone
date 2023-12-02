import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import movieInfoReducer from './features/movieInfo'
import watchlistLengthReducer from './features/watchlistLength'
import watchedLengthReducer from './features/watchedLength'
import languageToggleReducer from './features/languageToggle'
import searchBarToggleReducer from './features/searchBarToggle'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient()

const store = configureStore({
  reducer: {
    languageToggle: languageToggleReducer,
    searchBarToggle: searchBarToggleReducer,
    movieInfo: movieInfoReducer,
    watchlistLength: watchlistLengthReducer,
    watchedLength: watchedLengthReducer,
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
        <ReactQueryDevtools />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
