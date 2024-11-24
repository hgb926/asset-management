import {redirect} from "react-router-dom";


const getUserToken = () => {
    const user = localStorage.getItem("userData");
    return user ? JSON.parse(user.token) : null;
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

