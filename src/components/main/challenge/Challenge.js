import React from 'react';
import styles from '../../../styles/challenge/Challenge.module.scss';
import ChallengeHeader from "./ChallengeHeader";
import Boards from "./Boards";

const Challenge = () => {
    return (
        <div className={styles.wrap}>
            <ChallengeHeader/>
            <Boards/>
        </div>
    );
};

export default Challenge;