import { createSlice } from "@reduxjs/toolkit";

export const movieInfoSlice = createSlice({
    name: 'movieInfo',
    initialState: { value: { data: {}, type: '', display: false, scroll: true } },
    reducers: {
        displayMovieInfo: (state, action) => {
            state.value = action.payload;
        },
        closeMovieInfo: (state, action) => {
            state.value = action.payload;
        },
    }
})

export const { displayMovieInfo, closeMovieInfo } = movieInfoSlice.actions;

export default movieInfoSlice.reducer;