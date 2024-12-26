import React from 'react';
import styles from '../../../styles/board/BoardList.module.scss';
import {Link} from "react-router-dom";

const BoardList = () => {
    const DUMMY_DATA = [
        { id: 1, title: '연말정산 환급금 어떻게 신청하나요?', author: 'user1', date: '2024-11-30' }, // 질문
        { id: 2, title: '2024 연말정산 꿀팁! 꼭 챙겨야 할 항목들', author: 'admin', date: '2024-11-28' }, // 꿀팁
        { id: 3, title: '숨은 환급금 조회 사이트 믿을만한가요?', author: 'user2', date: '2024-11-25' }, // 질문
        { id: 4, title: '숨겨진 카드 혜택, 이걸로 연간 30만원 아꼈어요!', author: 'admin', date: '2024-11-20' }, // 꿀팁
        { id: 5, title: '적금 이율이 높은 은행 추천해주세요!', author: 'user3', date: '2024-11-18' }, // 질문
        { id: 6, title: '소비 패턴 분석으로 매달 20% 절약 성공 🛍️', author: 'admin', date: '2024-11-15' }, // 꿀팁
        { id: 7, title: '공과금 자동이체 할인 정말 이득인가요?', author: 'user4', date: '2024-11-10' }, // 질문
        { id: 8, title: '초보자를 위한 재테크 가이드 📚', author: 'admin', date: '2024-11-08' }, // 꿀팁
        { id: 9, title: '사회 초년생인데 어떤 재테크부터 시작해야 할까요?', author: 'user5', date: '2024-11-05' }, // 질문
        { id: 10, title: '신용카드 vs 체크카드, 어떤 게 더 유리할까요?', author: 'user6', date: '2024-11-02' }, // 질문
        { id: 11, title: '알뜰폰 요금제로 갈아타면 진짜 저렴한가요?', author: 'user7', date: '2024-10-30' }, // 질문
        { id: 12, title: '여행 경비 절약할 수 있는 방법 있을까요?', author: 'user8', date: '2024-10-25' }, // 질문
        { id: 13, title: '가계부 쓰기 좋은 앱 추천 부탁드립니다!', author: 'user9', date: '2024-10-22' }, // 질문
        { id: 14, title: '퇴직금 중간 정산은 어떻게 신청하나요?', author: 'user10', date: '2024-10-18' }, // 질문
        { id: 15, title: '투자 초보를 위한 펀드 추천 📈', author: 'admin', date: '2024-10-15' }, // 꿀팁
        { id: 16, title: '소비습관을 고치는 실용적인 방법이 있을까요?', author: 'user11', date: '2024-10-12' }, // 질문
        { id: 17, title: '중고거래로 수익 내는 법 아시는 분 계신가요?', author: 'user12', date: '2024-10-10' }, // 질문
        { id: 18, title: '신용점수 올리는 가장 빠른 방법은?', author: 'admin', date: '2024-10-08' }, // 꿀팁
        { id: 19, title: '자동차 유지비 절약 팁 있을까요?', author: 'user13', date: '2024-10-05' }, // 질문
        { id: 20, title: '공동구매로 절약 효과를 본 경험이 있나요?', author: 'user14', date: '2024-10-02' }, // 질문
    ];

    return (
        <>
            <div className={styles.boardWrap}>

                <div className={styles.boardList}>
                    <div className={styles.header}>
                        <span>번호</span>
                        <span>제목</span>
                        <span>작성자</span>
                        <span>작성일</span>
                    </div>
                    {DUMMY_DATA.map((item) => (
                        <div key={item.id} className={styles.boardItem}>
                            <span className={styles.itemId}>{item.id}</span>
                            <span className={styles.itemTitle}>{item.title}</span>
                            <span className={styles.itemAuthor}>{item.author}</span>
                            <span className={styles.itemDate}>{item.date}</span>
                        </div>
                    ))}
                </div>
                <div className={styles.footer}>
                    <div className={styles.btnWrap}>
                        <button className={styles.pageBtn}>1</button>
                        <button className={styles.pageBtn}>2</button>
                        <button className={styles.pageBtn}>3</button>
                    </div>
                </div>
            </div>
            <Link to={'write'} className={styles.writeButton}>+</Link>
        </>
    );
};

export default BoardList;