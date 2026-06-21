import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    stutas: false,
    userData: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.stutas = true;
            state.userData = action.payload.userData;
        },
        logout: (state) => {
            state.stutas = false;
            state.userData = null;
        }
    }
})

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;