import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    userLocation: "accountBook"
}

const locationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {
        updateUserLocation(state, action) {
            state.userLocation = action.payload;
        }
    }
});

export const locationActions = locationSlice.actions;
export default locationSlice.reducer;