import { createSlice } from "@reduxjs/toolkit";

export const languageToggleSlice = createSlice({
    name: 'languageToggle',
    initialState: { value: { language: 'en-US' } },
    reducers: {
        setLanguage: (state, action) => {
            state.value = action.payload;
        },
    }
})

export const { setLanguage } = languageToggleSlice.actions;

export default languageToggleSlice.reducer;