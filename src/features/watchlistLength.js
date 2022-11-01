import { createSlice } from "@reduxjs/toolkit";

export const watchlistLengthSlice = createSlice({
    name: 'watchlistLength',
    initialState: { value: { length: 0, } },
    reducers: {
        getWatchlistLength: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { getWatchlistLength } = watchlistLengthSlice.actions;

export default watchlistLengthSlice.reducer;