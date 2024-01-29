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
            if (payload.payload === "Unauthorized") {
                state.auth = false;
            } else if (payload.payload.username === undefined) {
                state.userProfile.username = payload.payload.user.username;
            } else {
                state.userProfile.username = payload.payload.username;
            }
        },
        LogOut: (state, payload) => {

        }
    },
});

export const { LogIn, LogOut } = userSlice.actions;
export default userSlice.reducer;