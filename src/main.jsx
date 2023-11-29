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
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
