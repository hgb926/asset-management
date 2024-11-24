import React, {useState} from "react";
import styles from "../../../styles/auth/LoginForm.module.scss";
import {Link, useNavigate} from "react-router-dom";
import {AUTH_URL} from "../../../config/host-config";

const LoginForm = () => {
    const navi = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [autoLogin, setAutoLogin] = useState(false);
    const [error, setError] = useState("")


    const loginHandler = async () => {
        const payload=  {
            email,
            password,
            autoLogin
        }
        const response = await fetch(`${AUTH_URL}/sign-in`, {
            method: "POST",
            headers: {"Content-Type": "Application/json"},
            body: JSON.stringify(payload)
        });

        // 이제 성공 시에 localStorage 저장하고 navi로 메인페이지 리다이렉트!
        const responseData = await response.text();
        if (response.status === 422) {
            setError(responseData)
        } else {
            localStorage.addItem(responseData)
            navi("/")
        }

    }

    return (
        <div className={styles.wrap}>
            <h1 className={styles.h1}>Asset Management</h1>
            <form className={styles.form}>
                <div className={styles.inputWrap}>
                    <label className={styles.label}>이메일</label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.input}
                        type="email"
                        placeholder="이메일을 입력하세요"
                    />
                </div>
                <div className={styles.inputWrap}>
                    <label className={styles.label}>비밀번호</label>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.input}
                        type="password"
                        placeholder="비밀번호를 입력하세요"
                    />
                </div>
                <div className={styles.inputWrap}>
                    <label className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            className={styles.checkbox}
                            checked={autoLogin}
                            onChange={(e) => setAutoLogin(e.target.checked)}
                        />
                        <span className={styles.customCheckbox}></span>
                        자동로그인
                    </label>
                </div>
                {error ? <p className={styles.message}>{error}</p> : undefined}
                <div className={styles.buttons}>
                <div
                        className={styles.loginButton}
                        onClick={loginHandler}
                    >
                        로그인
                    </div>
                    <Link className={styles.signupButton} to={"/signup"}>
                        회원가입
                    </Link>
                </div>
            </form>
            <p className={styles.findPw}>비밀번호 찾기</p>
        </div>
    );
};

export default LoginForm;