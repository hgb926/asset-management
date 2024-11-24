import React from 'react';
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/main/Header";
import Dashboard from "../components/main/Dashboard";
import styles from '../styles/main/RootLayout.module.scss';

const RootLayout = () => {
    const location = useLocation();
    const hideForPaths = ["/login", "/signup"];
    const hideHeaderAndDashboard = hideForPaths.includes(location.pathname);

    return (
        <div className={styles.container}>
            {/* 항상 Header를 위에 배치 */}
            {!hideHeaderAndDashboard && <Header />}
            <div className={styles.mainContent}>
                {/* Dashboard와 Outlet을 좌우로 배치 */}
                {!hideHeaderAndDashboard && <Dashboard />}
                <div className={styles.outlet}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default RootLayout;