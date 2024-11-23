import React from 'react';
import styles from '../../../styles/auth/SignUp.module.scss';

const SignUp = () => {
    return (
        <div className={styles.wrap}>
            <h1 className={styles.h1}>회원가입</h1>
            <div className={styles.inputWrap}>
                <p className={styles.text}>이메일</p>
                <div className={styles.emailVerification}>
                    <input className={styles.input} type="email" placeholder="이메일을 입력하세요" />
                    <button className={styles.button}>인증코드 전송</button>
                </div>
                <p className={styles.text}>인증코드</p>
                <input className={styles.input} type="text" placeholder="인증코드를 입력하세요" />
                <p className={styles.text}>비밀번호</p>
                <input className={styles.input} type="password" placeholder="비밀번호를 입력하세요" />
                <p className={styles.text}>비밀번호 확인</p>
                <input className={styles.input} type="password" placeholder="비밀번호를 다시 입력하세요" />
                <p className={styles.text}>닉네임</p>
                <input className={styles.input} type="text" placeholder="닉네임을 입력하세요" />
            </div>
            <div className={styles.flex}>
                <button className={styles.submitButton}>회원가입</button>
                <button className={styles.cancelButton}>취소</button>
            </div>
        </div>
    );
};

export default SignUp;