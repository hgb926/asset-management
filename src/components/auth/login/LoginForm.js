import React from 'react';
import styles from '../../../styles/auth/LoginForm.module.scss';
import {Link} from "react-router-dom";

const LoginForm = () => {
    return (
        <div className={styles.wrap}>
            <h1 className={styles.h1}>Asset Management</h1>
            <form className={styles.form}>
                <div className={styles.inputWrap}>
                    <label className={styles.label}>이메일</label>
                    <input className={styles.input} type="email" placeholder="이메일을 입력하세요" />
                </div>
                <div className={styles.inputWrap}>
                    <label className={styles.label}>비밀번호</label>
                    <input className={styles.input} type="password" placeholder="비밀번호를 입력하세요" />
                </div>
                {/*<p className={styles.message}>비밀번호가 올바르지 않습니다.</p>*/}
                <div className={styles.buttons}>
                    <button className={styles.loginButton} type="submit">로그인</button>
                    <Link className={styles.signupButton} to={"/signup"}>회원가입</Link>
                </div>
            </form>
            <p className={styles.findPw}>비밀번호 찾기</p>
        </div>
    );
};

export default LoginForm;