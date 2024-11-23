import React, { useEffect, useState } from "react";
import styles from "../styles/auth/SignUpModal.module.scss";

const SignUpModal = ({ messages, validations, targetRef, isVisible }) => {
    const [position, setPosition] = useState({ top: 0, left: 0 });

    useEffect(() => {
        if (targetRef?.current && isVisible) {
            const rect = targetRef.current.getBoundingClientRect();
            setPosition({
                top: rect.bottom + window.scrollY + 5,
                left: rect.left + window.scrollX,
            });
        }
    }, [targetRef, isVisible]);

    if (!isVisible) return null;

    return (
        <div
            className={styles.modal}
            style={{
                position: "absolute",
                top: position.top,
                left: position.left,
                zIndex: 1000,
            }}
        >
            {messages.map((message, index) => (
                <div
                    key={index}
                    className={`${styles.message} ${
                        validations[index] ? styles.valid : styles.invalid
                    }`}
                >
                    <span
                        className={`${styles.circle} ${
                            validations[index] ? styles.checked : ""
                        }`}
                    >
                        ✔
                    </span>
                    {message}
                </div>
            ))}
        </div>
    );
};

export default SignUpModal;