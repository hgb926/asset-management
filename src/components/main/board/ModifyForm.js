import React, {useEffect, useRef, useState} from 'react';
import styles from "../../../styles/board/WriteForm.module.scss";


const ModifyForm = ({ cancelHandler, data }) => {
    const [category, setCategory] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (data) {
            setCategory(data.category || '');
            setTitle(data.title || '');
            setContent(data.content || '');
        }
    }, [data]);

    console.log(data)

    const boardModifyHandler = () => {

    }

    return (
        <div className={styles.writeFormWrap}>
            <h2 className={styles.title}>게시글 수정</h2>
            <form className={styles.form}>

                {/* 카테고리 선택 */}
                <div className={styles.formGroup}>
                    <label htmlFor="category">카테고리</label>
                    <select
                        id="category"
                        className={styles.select}
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="QNA">질문</option>
                        <option value="TIP">꿀팁</option>
                        <option value="INFO">정보</option>
                    </select>
                </div>

                {/* 제목 입력 */}
                <div className={styles.formGroup}>
                    <label htmlFor="title">제목</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="제목을 입력하세요"
                        className={styles.input}
                    />
                </div>
                {/* 내용 입력 */}
                <div className={styles.formGroup}>
                    <label htmlFor="content">내용</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
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