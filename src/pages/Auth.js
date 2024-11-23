import React from 'react';
import SignUp from "../components/auth/signup/SignUp";
import LoginForm from "../components/auth/login/LoginForm";

// 로그인, 회원가입 등 권한관련된 일을 처리하는 메인 페이지
const Auth = () => {
    return (
        <div >
                <LoginForm/>
        </div>
    );
};

export default Auth;