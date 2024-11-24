import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    userData: []
}

const userInfoSlice = createSlice({
    name: "userInfo",
    initialState,
    reducers: {
        updateUser(state, action) {
            state.userData = action.payload;
        }
    }
})


export const userInfoActions = userInfoSlice.actions;
export default userInfoSlice.reducer;