import {configureStore} from "@reduxjs/toolkit";
import userInfoSlice from "./user/UserInfoSlice";

const store = configureStore({
    reducer: {
        userInfo:  userInfoSlice
    }

})

export default store;