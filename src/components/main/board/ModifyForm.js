import React, {useRef} from 'react';
import styles from "../../../styles/board/WriteForm.module.scss";
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const ModifyForm = ({ cancelHandler }) => {
    let { id } = useSelector(state => state.userInfo.userData);
    const categoryRef = useRef();
    const titleRef = useRef();
    const contentRef = useRef();
    const navi = useNavigate();
    console.log("boardModify!")

    const boardModifyHandler = () => {

    }

    return (
        <div className={styles.writeFormWrap}>
            <h2 className={styles.title}>게시글 작성</h2>
            <form className={styles.form}>

                {/* 카테고리 선택 */}
                <div className={styles.formGroup}>
                    <label htmlFor="category">카테고리</label>
                    <select id="category" ref={categoryRef} className={styles.select}>
                        <option value="QNA">질문</option>
                        <option value="TIP">꿀팁</option>
                        <option value="INFO">정보</option>
                    </select>
                </div>

                {/* 제목 입력 */}
                <div className={styles.formGroup}>
                    <label htmlFor="title">제목</label>
                    <input
                        ref={titleRef}
                        type="text"
                        id="title"
                        placeholder="제목을 입력하세요"
                        className={styles.input}
                    />
                </div>
                {/* 내용 입력 */}
                <div className={styles.formGroup}>
                    <label htmlFor="content">내용</label>
                    <textarea
                        ref={contentRef}
                        id="content"
                        placeholder="내용을 입력하세요"
                        className={styles.textarea}
                    ></textarea>
                </div>

                {/* 버튼 그룹 */}
                <div className={styles.buttonGroup}>
                    <div
                        className={styles.submitBtn}
                        onClick={boardModifyHandler}
                    >
                        작성
                    </div>
                    <span className={styles.cancelBtn}
                    onClick={() => cancelHandler()}
                    >취소</span>
                </div>
            </form>
        </div>
    );
};

export default ModifyForm;