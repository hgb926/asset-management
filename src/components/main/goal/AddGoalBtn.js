import React, {useState} from 'react';
import styles from '../../../styles/goal/AddGoalBtn.module.scss';
import AddGoalModal from "../../../modal/AddGoalModal";

const AddGoalBtn = () => {

    const [openModal, setOpenModal] = useState(false)

    const modalHandler = (flag) => {
        setOpenModal(flag)
    }

    // 전역적으로 모달 닫기, 오버레이
    return (
        <>
            <div className={styles.addGoalBtnWrap} onClick={() => setOpenModal(true)}>
                목표 추가하기
            </div>
            {openModal && <AddGoalModal modalHandler={modalHandler}/>}
        </>
    );
};

export default AddGoalBtn;