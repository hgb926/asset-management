import React from 'react';
import styles from '../../../styles/goal/GoalDescription.module.scss'

const GoalDescription = ({ currentGoal }) => {
    return (
        <div>
            {currentGoal.type}
        </div>
    );
};

export default GoalDescription;