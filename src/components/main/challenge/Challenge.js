import React from 'react';
import styles from '../../../styles/challenge/Challenge.module.scss';
import ChallengeHeader from "./ChallengeHeader";

const Challenge = () => {
    return (
        <div className={styles.wrap}>
            <ChallengeHeader/>
        </div>
    );
};

export default Challenge;