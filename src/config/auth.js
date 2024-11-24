import {redirect} from "react-router-dom";
import {AUTH_URL} from "./host-config";
import {userInfoActions} from "../components/store/user/UserInfoSlice";
import store from '../components/store/index'


const getUserToken = () => {
    const user = localStorage.getItem("userData");
    return user ? JSON.parse(user.token) : null;
}

export const saveUserInfo = async (userId) => {
    const response = await (await fetch(`${AUTH_URL}/${userId}`)).json();
    store.dispatch(userInfoActions.updateUser(response))
}


// 접근권한 확인 loader
export const authCheckLoader = () => {
    const token = getUserToken();
    if (!token) {
        alert("로그인이 필요한 서비스입니다.");
        return redirect("/")
    }
    return token;
}

