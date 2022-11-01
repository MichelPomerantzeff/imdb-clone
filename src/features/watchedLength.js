import { createSlice } from "@reduxjs/toolkit";

export const watchedLengthSlice = createSlice({
    name: 'watchedLength',
    initialState: { value: { length: 0, } },
    reducers: {
        getWatchedLength: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { getWatchedLength } = watchedLengthSlice.actions;

export default watchedLengthSlice.reducer;