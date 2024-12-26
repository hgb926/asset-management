import React, {useEffect, useState} from 'react';
import styles from '../../../styles/board/Board.module.scss';
import BoardHeader from "./BoardHeader";
import BoardList from "./BoardList";
import {useLocation} from "react-router-dom";
import WriteForm from "./WriteForm";

const Board = () => {

    const { pathname } = useLocation();

    const [currentLocation, setCurrentLocation] = useState('/board')
    useEffect(() => {
        setCurrentLocation(pathname)
    }, [pathname]);


    return (
        <div className={styles.wrap}>
            { currentLocation === '/board' &&
                <>
                    <BoardHeader/>
                    <BoardList/>
                </>
            }
            { currentLocation === '/board/write' && <WriteForm/> }
        </div>
    );
};

export default Board;