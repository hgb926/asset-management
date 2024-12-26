import React from 'react';
import styles from '../../../styles/challenge/Boards.module.scss';

const Boards = () => {
    const DUMMY_DATA = [
        {id: 38, title: '한 달 50만원 저축하기 도전!', author: 'admin', date: '2022-12-14 15시42분'},
        {id: 29, title: '식비 한 달 20만원 이하로!', author: 'admin', date: '2022-12-11 20시19분'},
        {id: 28, title: '커피값 아끼기 챌린지 ☕️', author: 'admin', date: '2022-12-11 20시19분'},
        {id: 27, title: '주말에 외식 한 번만 하기!', author: 'admin', date: '2022-12-11 20시19분'},
        {id: 26, title: '30일 동안 쇼핑 금지 🔒', author: 'admin', date: '2022-12-11 20시19분'},
        {id: 25, title: '매일 가계부 작성하기 📖', author: 'admin', date: '2022-12-11 20시19분'},
        {id: 24, title: '목표 저축액 달성하기 🏦', author: 'admin', date: '2022-12-11 20시19분'},
        {id: 23, title: '불필요한 구독 서비스 취소', author: 'admin', date: '2022-12-11 20시19분'},
        {id: 22, title: '외식비 절약하기 💸', author: 'admin', date: '2022-12-11 20시19분'},
        {id: 21, title: '주간 예산 관리하기 📊', author: 'admin', date: '2022-12-11 20시19분'},
    ];

    return (
        <>
            <div className={styles.boardWrap}>
                <h1 className={styles.title}>💰 수입/지출 챌린지 게시판</h1>
                <p className={styles.description}>
                    다양한 수입/지출 챌린지에 도전하고, 경험을 공유해보세요!<br/>
                    작은 습관이 큰 변화를 만듭니다.
                </p>
                <div className={styles.boardList}>
                    <div className={styles.header}>
                        <span>번호</span>
                        <span>챌린지 제목</span>
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
            <button className={styles.writeButton}>+</button>
        </>
    );
};

export default Boards;