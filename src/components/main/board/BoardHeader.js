import React, { useState } from 'react';
import styles from "../../../styles/board/BoardHeader.module.scss";

const BoardHeader = ({ sortHandler, searchHandler, categoryHandler }) => {
    const [keyword, setKeyword] = useState('');
    const [searchType, setSearchType] = useState('title');
    const [category, setCategory] = useState('');

    // 정렬 변경 핸들러
    const handleSortChange = (e) => {
        const value = e.target.value;
        switch (value) {
            case "latest":
                sortHandler("desc", "createdAt");
                break;
            case "oldest":
                sortHandler("asc", "createdAt");
                break;
            case "reply":
                sortHandler("desc", "replyCount");
                break;
            case "viewCount":
                sortHandler("desc", "viewCount");
                break;
            default:
                sortHandler("desc", "createdAt");
        }
    };

    // 검색 타입 변경 핸들러
    const handleSearchTypeChange = (e) => {
        setSearchType(e.target.value);
    };

    // 검색어 입력 핸들러
    const handleKeywordChange = (e) => {
        setKeyword(e.target.value);
    };

    // 검색 실행 핸들러
    const handleSearch = () => {
        searchHandler(keyword, searchType);
    };



    // 카테고리 변경 핸들러
    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        setCategory(selectedCategory);
        categoryHandler(selectedCategory);
    };

    const enterKeyHandler = (e) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }

    return (
        <>
            <h1 className={styles.h1}>💰 경제/재테크 커뮤니티</h1>
            <p className={styles.description}>
                경제 꿀팁을 공유하고 함께 성장해요!<br />
            </p>
            <div className={styles.header}>
                {/* 정렬 섹션 */}
                <div className={styles.sortSection}>
                    <div className={styles.dateSort}>
                        <p className={styles.text}>정렬</p>
                        <select className={styles.select} onChange={handleSortChange}>
                            <option value="latest">최신순</option>
                            <option value="oldest">오래된순</option>
                            <option value="reply">댓글 많은 순</option>
                            <option value="viewCount">조회수 많은 순</option>
                        </select>
                    </div>
                    {/* 카테고리 섹션 */}
                    <div className={styles.categorySort}>
                        <p className={styles.text}>카테고리</p>
                        <select className={styles.select} onChange={handleCategoryChange} value={category}>
                            <option value="">전체</option>
                            <option value="qna">질문</option>
                            <option value="tip">꿀팁</option>
                            <option value="info">정보</option>
                        </select>
                    </div>
                </div>

                {/* 검색 섹션 */}
                <div className={styles.searchSection}>
                    <div className={styles.categorySort}>
                        <select className={styles.select} onChange={handleSearchTypeChange}>
                            <option value="title">제목</option>
                            <option value="titleAndContent">제목+내용</option>
                            <option value="author">작성자</option>
                        </select>
                    </div>
                    <input
                        type="text"
                        className={styles.searchInput}
                        placeholder="검색어를 입력하세요"
                        value={keyword}
                        onChange={handleKeywordChange}
                        onKeyDown={enterKeyHandler}
                    />
                    <div className={styles.search} onClick={handleSearch}>검색</div>
                </div>
            </div>
        </>
    );
};

export default React.memo(BoardHeader);