import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    auth: null,
    userProfile: {}
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        LogIn: (state, payload) => {
            state.auth = true;
            if (payload.payload.username === undefined) {
                state.userProfile.username = payload.payload.user.username;
            } else {
                state.userProfile.username = payload.payload.username;
            }
            state.userProfile.blogs = payload.payload.blogs;
        },
        LogOut: (state) => {
            state.auth = false;
            state.userProfile = {};
        }
    },
});

export const { LogIn, LogOut } = userSlice.actions;
export default userSlice.reducer;