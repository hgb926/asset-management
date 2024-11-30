import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData:
        JSON.parse(localStorage.getItem("userData")) ||
        JSON.parse(sessionStorage.getItem("userData")) ||
        { isEmpty: true },
};

const userInfoSlice = createSlice({
    name: "userInfo",
    initialState,
    reducers: {
        updateUser(state, action) {
            state.userData = action.payload;

            if (action.payload.autoLogin) {
                localStorage.setItem('userData', JSON.stringify(state.userData));
            } else if (!action.payload.autoLogin) {
                sessionStorage.setItem('userData', JSON.stringify(state.userData));
            }

        },
    },
});

export const userInfoActions = userInfoSlice.actions;
export default userInfoSlice.reducer;