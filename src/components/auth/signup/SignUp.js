import React, { useState, useRef } from "react";
import styles from "../../../styles/auth/SignUp.module.scss";
import SignUpModal from "../../../modal/SignUpModal";
import { Link } from "react-router-dom";

const SignUp = () => {
    const [formValues, setFormValues] = useState({
        email: "",
        code: "",
        password: "",
        passwordCheck: "",
        nickname: "",
    });

    const [activeField, setActiveField] = useState(null);
    const [fieldValidations, setFieldValidations] = useState({
        email: [false],
        code: [false, false],
        password: [false, false, false],
        passwordCheck: [false],
        nickname: [false, false],
    });

    const inputRefs = {
        email: useRef(null),
        code: useRef(null),
        password: useRef(null),
        passwordCheck: useRef(null),
        nickname: useRef(null),
    };

    const messagesMap = {
        email: ["이메일 형식이 올바른지 확인하세요."],
        code: ["4자리 인증코드 입력", "숫자만 입력 가능"],
        password: [
            "8자 이상 16자 이하",
            "숫자, 특수문자 포함",
            "사용불가 문자 제외 (공백 등)",
        ],
        passwordCheck: ["비밀번호가 일치해야 합니다."],
        nickname: ["2~16자 입력", "특수문자 및 공백 제외"],
    };

    const validateField = (field, value) => {
        const newValidations = [...fieldValidations[field]];
        switch (field) {
            case "email":
                newValidations[0] = value.includes("@") && value.includes(".");
                break;
            case "code":
                newValidations[0] = value.length === 6;
                newValidations[1] = /^\d+$/.test(value);
                break;
            case "password":
                newValidations[0] = value.length >= 8 && value.length <= 16;
                newValidations[1] =
                    /[A-Za-z]/.test(value) && /[0-9]/.test(value) && /[!@#$%^&*]/.test(value);
                newValidations[2] = !/\s/.test(value);
                break;
            case "passwordCheck":
                newValidations[0] = value === formValues.password;
                break;
            case "nickname":
                newValidations[0] = value.length >= 2 && value.length <= 16;
                newValidations[1] = /^[a-zA-Z0-9가-힣]+$/.test(value);
                break;
            default:
                break;
        }
        return newValidations;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });

        // 실시간 검증 업데이트
        const newValidations = validateField(name, value);
        setFieldValidations({ ...fieldValidations, [name]: newValidations });
    };

    const handleFocus = (field) => {
        setActiveField(field);
    };

    const handleBlur = () => {
        setActiveField(null);
    };

    const handleSendCode = () => {
        if (fieldValidations.email[0]) {
            alert("인증번호가 발송되었습니다.");
        } else {
            alert("올바른 이메일 형식을 입력해주세요.");
        }
    };

    return (
        <div className={styles.wrap}>
            <h1 className={styles.h1}>회원가입</h1>
            <form className={styles.form}>
                <div className={styles.inputWrap}>
                    <label className={styles.label}>이메일</label>
                    <div className={styles.emailVerification}>
                        <input
                            ref={inputRefs.email}
                            className={styles.input}
                            type="email"
                            name="email"
                            value={formValues.email}
                            placeholder="이메일을 입력하세요"
                            onChange={handleInputChange}
                            onFocus={() => handleFocus("email")}
                            onBlur={handleBlur}
                        />
                        <button
                            type="button"
                            className={styles.verifyButton}
                            onClick={handleSendCode}
                        >
                            인증번호 전송
                        </button>
                    </div>
                </div>
                <div className={styles.inputWrap}>
                    <label className={styles.label}>인증코드</label>
                    <input
                        ref={inputRefs.code}
                        className={styles.input}
                        type="text"
                        name="code"
                        value={formValues.code}
                        placeholder="인증코드를 입력하세요"
                        onChange={handleInputChange}
                        onFocus={() => handleFocus("code")}
                        onBlur={handleBlur}
                    />
                </div>
                <div className={styles.inputWrap}>
                    <label className={styles.label}>비밀번호</label>
                    <input
                        ref={inputRefs.password}
                        className={styles.input}
                        type="password"
                        name="password"
                        value={formValues.password}
                        placeholder="비밀번호를 입력하세요"
                        onChange={handleInputChange}
                        onFocus={() => handleFocus("password")}
                        onBlur={handleBlur}
                    />
                </div>
                <div className={styles.inputWrap}>
                    <label className={styles.label}>비밀번호 확인</label>
                    <input
                        ref={inputRefs.passwordCheck}
                        className={styles.input}
                        type="password"
                        name="passwordCheck"
                        value={formValues.passwordCheck}
                        placeholder="비밀번호를 다시 입력하세요"
                        onChange={handleInputChange}
                        onFocus={() => handleFocus("passwordCheck")}
                        onBlur={handleBlur}
                    />
                </div>
                <div className={styles.inputWrap}>
                    <label className={styles.label}>닉네임</label>
                    <input
                        ref={inputRefs.nickname}
                        className={styles.input}
                        type="text"
                        name="nickname"
                        value={formValues.nickname}
                        placeholder="닉네임을 입력하세요"
                        onChange={handleInputChange}
                        onFocus={() => handleFocus("nickname")}
                        onBlur={handleBlur}
                    />
                </div>
                <div className={styles.buttons}>
                    <button type="submit" className={styles.submitButton}>
                        회원가입
                    </button>
                    <Link to={"/login"} className={styles.cancelButton}>
                        취소
                    </Link>
                </div>
            </form>
            {activeField && (
                <SignUpModal
                    messages={messagesMap[activeField]}
                    validations={fieldValidations[activeField]}
                    targetRef={inputRefs[activeField]}
                    isVisible={!!activeField}
                />
            )}
        </div>
    );
};

export default SignUp;