import React, { useState, useRef } from "react";
import styles from "../../../styles/auth/SignUp.module.scss";
import SignUpModal from "../../../modal/SignUpModal";

const SignUp = () => {
    const emailRef = useRef(null);
    const codeRef = useRef(null);
    const passwordRef = useRef(null);
    const passwordConfirmRef = useRef(null);
    const nicknameRef = useRef(null);

    const [currentRef, setCurrentRef] = useState(null);
    const [modalMessage, setModalMessage] = useState("");

    const handleFocus = (ref, message) => {
        setCurrentRef(ref);
        setModalMessage(message);
    };

    const handleBlur = () => {
        setCurrentRef(null); // 포커스 해제 시 모달 닫기
    };

    return (
        <div className={styles.wrap}>
            <h1 className={styles.h1}>회원가입</h1>
            <div className={styles.inputWrap}>
                {/* 이메일 */}
                <span className={styles.text}>이메일</span>
                <div className={styles.emailVerification}>
                    <input
                        ref={emailRef}
                        className={styles.input}
                        type="email"
                        placeholder="이메일을 입력하세요"
                        onFocus={() => handleFocus(emailRef, "올바른 이메일 형식을 입력하세요.")}
                        onBlur={handleBlur}
                    />
                    <button className={styles.button}>인증코드 전송</button>
                </div>

                {/* 인증코드 */}
                <span className={styles.text}>인증코드</span>
                <input
                    ref={codeRef}
                    className={styles.input}
                    type="text"
                    placeholder="인증코드를 입력하세요"
                    onFocus={() => handleFocus(codeRef, "발송된 인증코드를 입력하세요.")}
                    onBlur={handleBlur}
                />

                {/* 비밀번호 */}
                <span className={styles.text}>비밀번호</span>
                <input
                    ref={passwordRef}
                    className={styles.input}
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    onFocus={() =>
                        handleFocus(
                            passwordRef,
                            "8자 이상, 대문자, 소문자, 특수문자를 포함하세요."
                        )
                    }
                    onBlur={handleBlur}
                />

                {/* 비밀번호 확인 */}
                <span className={styles.text}>비밀번호 확인</span>
                <input
                    ref={passwordConfirmRef}
                    className={styles.input}
                    type="password"
                    placeholder="비밀번호를 다시 입력하세요"
                    onFocus={() =>
                        handleFocus(passwordConfirmRef, "비밀번호와 동일하게 입력하세요.")
                    }
                    onBlur={handleBlur}
                />

                {/* 닉네임 */}
                <span className={styles.text}>닉네임</span>
                <input
                    ref={nicknameRef}
                    className={styles.input}
                    type="text"
                    placeholder="닉네임을 입력하세요"
                    onFocus={() => handleFocus(nicknameRef, "2~15자로 설정하세요.")}
                    onBlur={handleBlur}
                />
            </div>

            <div className={styles.flex}>
                <button className={styles.submitButton}>회원가입</button>
                <button className={styles.cancelButton}>취소</button>
            </div>

            {/* 모달 */}
            <SignUpModal
                message={modalMessage}
                targetRef={currentRef}
                isVisible={!!currentRef}
            />
        </div>
    );
};

export default SignUp;