import React, { useState } from "react";
import styles from "../../../styles/goal/AddGoalBtn.module.scss";
import AddGoalModal from "../../../modal/AddGoalModal";
import {useSelector} from "react-redux";



const AddGoalBtn = () => {
    const { goalList } = useSelector(state => state.userInfo.userData)
    const [openModal, setOpenModal] = useState(false);

    const modalHandler = (flag) => {
        setOpenModal(flag);
    };

    return (
        <>
            {
                goalList.length > 0 ? (
                    <div
                        className={styles.small}
                        onClick={() => setOpenModal(true)}
                    >
                        +
                    </div> )
                    :
                    (<div
                        className={styles.addGoalBtnWrap}
                        onClick={() => setOpenModal(true)}
                    >
                        목표 추가하기
                    </div> )
            }
            {openModal && <AddGoalModal modalHandler={modalHandler} />}

        </>
    );
};

export default AddGoalBtn;
