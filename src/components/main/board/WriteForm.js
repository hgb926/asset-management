import React from 'react';
import styles from '../../../styles/board/WriteForm.module.scss';

const WriteForm = () => {
    return (
        <div className={styles.writeFormWrap}>
            <h2 className={styles.title}>게시글 작성</h2>
            <form className={styles.form}>
                {/* 제목 입력 */}
                <div className={styles.formGroup}>
                    <label htmlFor="title">제목</label>
                    <input
                        type="text"
                        id="title"
                        placeholder="제목을 입력하세요"
                        className={styles.input}
                    />
                </div>

                {/* 카테고리 선택 */}
                <div className={styles.formGroup}>
                    <label htmlFor="category">카테고리</label>
                    <select id="category" className={styles.select}>
                        <option value="qna">질문</option>
                        <option value="tip">꿀팁</option>
                        <option value="info">정보</option>
                    </select>
                </div>

                {/* 내용 입력 */}
                <div className={styles.formGroup}>
                    <label htmlFor="content">내용</label>
                    <textarea
                        id="content"
                        placeholder="내용을 입력하세요"
                        className={styles.textarea}
                    ></textarea>
                </div>

                {/* 버튼 그룹 */}
                <div className={styles.buttonGroup}>
                    <div  className={styles.submitBtn}>작성</div>
                    <div  className={styles.cancelBtn}>취소</div>
                </div>
            </form>
        </div>
    );
};

export default WriteForm;