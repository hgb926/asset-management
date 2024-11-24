import {configureStore} from "@reduxjs/toolkit";
import userInfoSlice from "./user/UserInfoSlice";
import locationSlice from "./user/LocationSlice";

const store = configureStore({
    reducer: {
        userInfo:  userInfoSlice,
        location: locationSlice
    }

})

export default store;