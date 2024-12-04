import React, {useEffect} from 'react';
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import Header from "../components/main/Header";
import Dashboard from "../components/main/Dashboard";
import styles from '../styles/main/RootLayout.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {userInfoActions} from "../components/store/user/UserInfoSlice";
import AccountBook from "../components/main/accountbook/AccountBook";
import Report from "../components/main/accountbook/Report";

const RootLayout = () => {
    const navi = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const hideForPaths = ["/login", "/signup"];
    const hideHeaderAndDashboard = hideForPaths.includes(location.pathname);

    const userData = useSelector(state => state.userInfo.userData);

    useEffect(() => {
        if (!userData || userData.isEmpty) {
            const storedUserData =
                JSON.parse(localStorage.getItem("userData")) ||
                JSON.parse(sessionStorage.getItem("userData"));

            if (storedUserData) {
                dispatch(userInfoActions.updateUser(storedUserData));
            } else {
                navi("/login");
            }
        }
    }, [userData, dispatch, navi]);

    return (
        <div className={styles.container}>
            {!hideHeaderAndDashboard && <Header/>}
            <div className={styles.mainContent}>
                {!hideHeaderAndDashboard && <Dashboard/>}
                <div className={styles.outlet}>
                    <Outlet/>
                    {location.pathname === "/"
                    && !hideHeaderAndDashboard
                        ?
                        <div className={styles.flex}>
                            <AccountBook/>
                            <Report/>
                        </div>
                        :
                        undefined}
                </div>
            </div>
        </div>
    );
};

export default RootLayout;