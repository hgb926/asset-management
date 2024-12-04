import React, { useState, useRef } from "react";
import styles from "../../../styles/auth/SignUp.module.scss";
import SignUpModal from "../../../modal/SignUpModal";
import { Link } from "react-router-dom";
import {debounce} from "lodash";
import {AUTH_URL} from "../../../config/host-config";

const SignUp = () => {

    const [email, setEmail] = useState("")
    const [emailValid, setEmailValid] = useState(false); // 검증 여부
    const [emailError, setEmailError] = useState(""); // 검증 에러 메시지
    const [emailSuccess, setEmailSuccess] = useState("")
    const [codeValid, setCodeValid] = useState(false); // 인증 코드 검증 결과
    const [codeError, setCodeError] = useState(""); // 인증 코드 검증 에러 메시지
    const [password, setPassword] = useState("")
    const [nickname, setNickname] = useState("")

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
                newValidations[0] = value.length === 4;
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
                if (newValidations[0]) setPassword(value);

                break;
            case "nickname":
                newValidations[0] = value.length >= 2 && value.length <= 16;
                newValidations[1] = /^[a-zA-Z0-9가-힣]+$/.test(value);
                if (newValidations.every(flag => flag)) setNickname(value)
                break;
            default:
                break;
        }
        return newValidations;
    };

    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });

        // 실시간 검증 업데이트
        const newValidations = validateField(name, value);
        setFieldValidations({ ...fieldValidations, [name]: newValidations });

        if (name === "code" && value.length === 4 && /^\d+$/.test(value)) {
            verifyCode(email, value);
        }
    };

    const verifyCode = debounce(async (email, code) => {
        try {
            const response = await fetch(`${AUTH_URL}/code?email=${email}&code=${code}`);
            const isValid = await response.json();

            if (isValid) {
                setCodeValid(true);
                setCodeError(""); // 에러 메시지 초기화
                const newValidations = [...fieldValidations.code];
                newValidations[0] = true; // 인증 성공
                setFieldValidations({ ...fieldValidations, code: newValidations });
            } else {
                setCodeValid(false);
                setCodeError("인증 코드가 올바르지 않습니다.");
                const newValidations = [...fieldValidations.code];
                newValidations[0] = false; // 인증 실패
                setFieldValidations({ ...fieldValidations, code: newValidations });
            }
        } catch (error) {
            console.error("Error verifying code:", error);
            setCodeError("서버 오류가 발생했습니다.");
        }
    }, 1000)

    const focusHandler = (field) => {
        setActiveField(field);
    };

    const blurHandler = () => {
        setActiveField(null);
    };

    const sendCodeHandler = () => {
        if (!fieldValidations.email[0]) {
            alert("올바른 이메일 형식을 입력해주세요.");
        } else {
            checkEmail(formValues.email)
        }
    };

    // 이메일 검증 처리
    const checkEmail = debounce(async (email) => {

        // 중복 검사
        const response = await fetch(`${AUTH_URL}/check-email?email=${email}`);
        const flag = await response.json();

        if (flag) {
            setEmailValid(false);
            setEmailError("이미 회원가입된 이메일입니다.");
            return;
        } else {
            setEmailValid(true);
            setEmail(email);
            setEmailSuccess("인증번호가 전송되었습니다.")
        }

        // 이메일 중복확인 끝
        setEmailValid(true);
    }, 1000);

    const joinHandler = async () => {
        if (email && password && nickname) {
            await fetch(`${AUTH_URL}/join`, {
                method: "POST",
                headers: {"Content-Type": "Application/json"},
                body: JSON.stringify({
                    email,
                    password,
                    nickname
                })
            });
            // const responseData = await response.json();
        }
    }



    return (
        <div className={styles.wrap}>
            <h1 className={styles.h1}>회원가입</h1>
            <form className={styles.form}>
                <div className={styles.inputWrap}>
                    <label className={styles.label}>이메일</label>
                    {emailValid ?
                        <p className={styles.successMessage}>{emailSuccess}</p> :
                        <p className={styles.errorMessage}>{emailError}</p>}

                    <div className={styles.emailVerification}>
                        <input
                            ref={inputRefs.email}
                            className={styles.input}
                            type="email"
                            name="email"
                            value={formValues.email}
                            placeholder="이메일을 입력하세요"
                            onChange={inputChangeHandler}
                            onFocus={() => focusHandler("email")}
                            onBlur={blurHandler}
                        />
                        <button
                            type="button"
                            className={styles.verifyButton}
                            onClick={sendCodeHandler}
                        >
                            인증번호 전송
                        </button>
                    </div>
                </div>
                <div className={styles.inputWrap}>
                    <label className={styles.label}>인증코드</label>
                    {codeValid ? (
                        <p className={styles.successMessage}>인증에 성공했습니다.</p>
                    ) : (
                        <p className={styles.errorMessage}>{codeError}</p>
                    )}
                    <input
                        ref={inputRefs.code}
                        className={styles.input}
                        type="text"
                        name="code"
                        value={formValues.code}
                        placeholder="인증코드를 입력하세요"
                        onChange={inputChangeHandler}
                        onFocus={() => focusHandler("code")}
                        onBlur={blurHandler}
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
                        onChange={inputChangeHandler}
                        onFocus={() => focusHandler("password")}
                        onBlur={blurHandler}
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
                        onChange={inputChangeHandler}
                        onFocus={() => focusHandler("passwordCheck")}
                        onBlur={blurHandler}
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
                        onChange={inputChangeHandler}
                        onFocus={() => focusHandler("nickname")}
                        onBlur={blurHandler}
                    />
                </div>
                <div className={styles.buttons}>
                    <Link
                        to={"/login"}
                        className={styles.submitButton}
                        onClick={joinHandler}
                    >
                        회원가입
                    </Link>
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