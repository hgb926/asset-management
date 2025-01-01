import React, { useEffect, useState } from 'react';
import styles from '../../../styles/board/Board.module.scss';
import BoardHeader from "./BoardHeader";
import BoardList from "./BoardList";
import WriteForm from "./WriteForm";
import BoardDetail from "./BoardDetail";
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { BOARD_URL } from "../../../config/host-config";

const Board = () => {
    const [boardList, setBoardList] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isLastPage, setIsLastPage] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // 현재 URL에서 페이지 번호 추출
    const getPageFromQuery = () => {
        const queryParams = new URLSearchParams(location.search);
        return parseInt(queryParams.get('page')) || 0;
    };

    // 게시글 목록을 가져오는 함수
    const fetchBoardList = async (page = 0) => {
        try {
            const response = await fetch(`${BOARD_URL}?page=${page}&size=10`);
            if (!response.ok) {
                throw new Error("Failed to fetch board list");
            }
            const data = await response.json();
            setBoardList(data.content);
            setCurrentPage(data.number);
            setTotalPages(data.totalPages);
            setIsLastPage(data.last);
        } catch (error) {
            console.error("Error fetching board list:", error);
        }
    };

    // 페이지 번호가 변경될 때마다 데이터 로드
    useEffect(() => {
        const page = getPageFromQuery();
        fetchBoardList(page);
    }, [location.search]);

    // 페이지 변경 핸들러
    const changePage = (page) => {
        if (page >= 0 && page < totalPages) {
            navigate(`?page=${page}`);
        }
    };

    return (
        <div className={styles.wrap}>
            <Routes>
                {/* 메인 게시판 화면 */}
                <Route index element={
                    <>
                        <BoardHeader boardList={boardList} />
                        <BoardList
                            boardList={boardList}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            isLastPage={isLastPage}
                            changePage={changePage}
                        />
                    </>
                } />
                <Route path="write" element={<WriteForm />} />
                <Route path=":id" element={<BoardDetail />} />
            </Routes>
        </div>
    );
};

export default React.memo(Board);