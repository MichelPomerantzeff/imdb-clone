import { createSlice } from "@reduxjs/toolkit";

export const searchBarToggleSlice = createSlice({
    name: 'searchBarToggle',
    initialState: { value: { searchMode: false } },
    reducers: {
        toggleSearchMode: (state, action) => {
            state.value = action.payload;
        },
    }
})

export const { toggleSearchMode } = searchBarToggleSlice.actions;

export default searchBarToggleSlice.reducer;