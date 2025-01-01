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

    // URL 쿼리 파라미터 추출
    const getQueryParam = (key) => {
        const queryParams = new URLSearchParams(location.search);
        return queryParams.get(key) || null;
    };

    // 게시글 목록을 가져오는 함수
    const fetchBoardList = async () => {
        const page = getQueryParam('page') || 0;
        const sort = getQueryParam('sort') || 'desc';
        const order = getQueryParam('order') || 'createdAt';
        const keyword = getQueryParam('keyword') || '';
        const searchType = getQueryParam('searchType') || 'title';

        try {
            const url = `${BOARD_URL}?page=${page}&size=10&sort=${sort}&order=${order}&keyword=${keyword}&searchType=${searchType}`;
            console.log(`Fetching: ${url}`);
            const response = await fetch(url);
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

    useEffect(() => {
        fetchBoardList();
    }, [location.search]);

    const changePage = (page) => {
        navigate(`?page=${page}&sort=${getQueryParam('sort') || 'desc'}&order=${getQueryParam('order') || 'createdAt'}`);
    };

    const sortHandler = (sort, order) => {
        navigate(`?page=0&sort=${sort}&order=${order}`);
    };

    const searchHandler = (keyword, searchType) => {
        navigate(`?page=0&sort=${getQueryParam('sort') || 'desc'}&order=${getQueryParam('order') || 'createdAt'}&keyword=${keyword}&searchType=${searchType}`);
    };

    return (
        <div className={styles.wrap}>
            <Routes>
                <Route index element={
                    <>
                        <BoardHeader sortHandler={sortHandler} searchHandler={searchHandler} />
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