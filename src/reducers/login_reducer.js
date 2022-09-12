import { createSlice } from "@reduxjs/toolkit";

const loginState = { loginStatus: false, token: null, name: "" };

const loginSlice = createSlice({
    name: 'loginProcess',
    initialState: loginState,
    reducers: {
        loginOK(state, action) {
            state.loginStatus = true;
            state.token = action.payload.token;
            state.name = action.payload.name;
        },
        logout(state, action) {
            state.loginStatus = false;
            state.token = null;
            state.name = null;
        }
    }
})

export const { loginOK, logout } = loginSlice.actions;

export default loginSlice;