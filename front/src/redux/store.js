import { configureStore } from '@reduxjs/toolkit';
import uiSlice from './slices/uiSlice';
import userSlice from './slices/userSlice';

const store = configureStore({
    reducer: {
        user: userSlice,
        ui: uiSlice
    },
});

export default store;