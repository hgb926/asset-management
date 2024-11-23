import React, { useRef, useEffect, useState } from "react";
import styles from "../styles/auth/SignUpModal.module.scss";

const SignUpModal = ({ message, targetRef, isVisible }) => {
    const [position, setPosition] = useState({ top: 0, left: 0 });
    const modalRef = useRef(null);

    useEffect(() => {
        if (targetRef?.current && isVisible) {
            const rect = targetRef.current.getBoundingClientRect();
            setPosition({
                top: rect.bottom + window.scrollY + 5, // input 바로 아래에 위치
                left: rect.left + window.scrollX,
            });
        }
    }, [targetRef, isVisible]);

    if (!isVisible) return null;

    return (
        <div
            ref={modalRef}
            className={styles.modal}
            style={{
                position: "absolute",
                top: position.top,
                left: position.left,
                zIndex: 1000,
            }}
        >
            <p className={styles.message}>{message}</p>
        </div>
    );
};

export default SignUpModal;