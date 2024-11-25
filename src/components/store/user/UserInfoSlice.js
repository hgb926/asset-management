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
        },
    },
});

export const userInfoActions = userInfoSlice.actions;
export default userInfoSlice.reducer;