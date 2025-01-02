import React, {useState, useEffect} from 'react';
import styles from '../../../styles/board/BoardDetail.module.scss';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {BOARD_URL, REACTION_URL, REPLY_URL} from '../../../config/host-config';
import {formatRelativeTime} from "../../../util/timeFormater";
import ReplySection from "./ReplySection";
import {IoMdEye} from "react-icons/io";
import {AiOutlineDislike, AiOutlineLike} from "react-icons/ai";
import {useSelector} from "react-redux";
import {addNotice} from '../../../util/noticeUtil'
import ModifyForm from "./ModifyForm";

const BoardDetail = () => {
    const [boardData, setBoardData] = useState({replies: []}); // 초기값 설정
    const [like, setLike] = useState(0)
    const [dislike, setDislike] = useState(0)
    const [isActioned, setIsActioned] = useState(false)
    const [actionType, setActionType] = useState('')
    const [modifyMode, setModifyMode] = useState(false)
    const params = useParams();
    const boardId = params.id;
    const navi = useNavigate();
    const now = new Date();
    const {id, nickname} = useSelector(state => state.userInfo.userData);

    const getBoardDetail = async () => {
        try {
            const response = await fetch(`${BOARD_URL}/${boardId}`);

            if (!response.ok) {
                throw new Error('Failed to fetch board detail');
            }

            const data = await response.json();
            console.log('data: ', data)
            data.reactions.forEach(r => {
                if (r.userId === id) {
                    setIsActioned(true)
                    setActionType(r.reactionType)
                    return;
                }
            })
            setBoardData(data);
            setLike(data.likeCount)
            setDislike(data.dislikeCount)
        } catch (error) {
            console.error('Error fetching board detail:', error);
        }
    };

    useEffect(() => {
        getBoardDetail();
    }, [boardId]);


    const reactionHandler = async (type) => {
        if (isActioned) {
            setIsActioned(false)
            if (type === "LIKE") setLike(like - 1)
            else setDislike(dislike - 1)
        } else {
            setIsActioned(true)
            setActionType(type)
        }
        const payload = {
            boardId,
            replyId: 0,
            userId: id,
            reactionType: type,
            targetType: "BOARD"
        }
        const response = await fetch(`${REACTION_URL}`, {
            method: "POST",
            headers: {"Content-Type": "Application/json"},
            body: JSON.stringify(payload)
        });

        if (response.ok) {

            const result = (id !== boardData.authorId) ? addNotice(boardData.authorId, '커뮤니티', boardId, `${nickname}님께서 회원님의 게시글을 ${type === "LIKE" ? "좋아" : "싫어"}합니다.`) : undefined
            if (type === "LIKE") {
                setLike(prev => prev + 1)
            } else if (type === "DISLIKE") {

                setDislike(prev => prev + 1)

            }
        }

    }

    const deleteHandler = async (type, id, boardId) => {
        console.log(type, id)
        // let host = type === "board" ? BOARD_URL : REPLY_URL
        // await fetch(`${host}/${id}`, {
        //     method: 'DELETE'
        // })
        // alert("삭제되었습니다")
        // type === "board" ? navi(`/board`) : navi(`/board/${boardId}`)
    }

    const cancelHandler = () => {
        setModifyMode()
    }

    return (
        <>
            {!modifyMode ? (<div className={styles.detailWrap}>
                {/* 게시글 정보 */}
                <div className={styles.header}>
                    <h1 className={styles.title}>{boardData.title || '제목 없음'}</h1>
                    <div className={styles.info}>
                        <div>
                            <div className={styles.author}>글쓴이: {boardData.author || '알 수 없음'}</div>
                            <span>{formatRelativeTime(now - new Date(boardData.createdAt)) || '알 수 없음'}</span></div>
                        <span>{boardData.createdAt}</span>
                        <span><IoMdEye className={styles.eyes}/> {boardData.viewCount || 0}</span>
                    </div>
                </div>

                {/* 게시글 내용 */}
                <div className={styles.contentWrap}>
                    <div className={styles.modifyAndDelete}>
                        {boardData.modified ? <p className={styles.modified}>*{boardData.modifiedAt}에 수정</p> : <div></div>}
                        {boardData.authorId === id && <div>
                            <span
                                className={styles.modify}
                                onClick={() => setModifyMode(true)}
                            >
                            수정
                            </span>
                            <span
                                className={styles.delete}
                                onClick={() => deleteHandler("board", boardId)}
                            >
                            삭제
                            </span>
                        </div>}
                    </div>
                    <p className={styles.content}>{boardData.content}</p>
                </div>

                <div className={styles.reactionContainer}>
                    <div
                        className={`${styles.reactionGroup} ${(isActioned && actionType === "LIKE") ? styles.likeActive : ''}`}
                        onClick={() => reactionHandler('LIKE')}
                    >
                        <AiOutlineLike className={styles.reaction}/>
                        <span className={styles.count}>{like}</span>
                    </div>
                    <div
                        className={`${styles.reactionGroup} ${(isActioned && actionType === "DISLIKE") ? styles.dislikeActive : ''}`}
                        onClick={() => reactionHandler('DISLIKE')}
                    >
                        <AiOutlineDislike className={styles.reaction}/>
                        <span className={styles.count}>{dislike}</span>
                    </div>
                </div>
                {/* 댓글 섹션 */}
                <ReplySection
                    boardId={boardData.id}
                    replies={boardData.replies}
                    authorId={boardData.authorId} // 작성자 id
                    deleteHandler={deleteHandler}
                />
            </div>) : <ModifyForm
                cancelHandler={cancelHandler}
                data={boardData}
            />}
        </>
    );
};

export default BoardDetail;