import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    error: null,
    warning: null,
    success: null
}

const uiSlice = createSlice({
    name: 'uiStatus',
    initialState: initialState,
    reducers: {
        showError: (state, payload) => {
            state.error = payload.payload;
        },
        showWarning: (state, payload) => {
            state.warning = payload.payload;
        },
        showSuccess: (state, payload) => {
            state.success = payload.payload;
        },
        clearMessages: (state) => {
            state.error = null;
            state.warning = null;
            state.success = null;
        }
    },
});

export const { showError, showWarning, showSuccess, clearMessages } = uiSlice.actions;
export default uiSlice.reducer;