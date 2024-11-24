import React from 'react';
import {Outlet, useLocation} from "react-router-dom";
import Header from "../components/main/Header";
import Dashboard from "../components/main/Dashboard";
import styles from '../styles/main/RootLayout.module.scss'

const RootLayout = () => {

    const location = useLocation();
    const hideForPaths = ["/login", "/signup"]
    const hideHeaderAndDashboard = hideForPaths.includes(location.pathname);
    console.log(hideHeaderAndDashboard)

    return (
        <div>
            {!hideHeaderAndDashboard && <Header/>}
            <div className={styles.flex}>
                {!hideHeaderAndDashboard && <Dashboard/>}
                <Outlet/>
            </div>
        </div>
    );
};

export default RootLayout;