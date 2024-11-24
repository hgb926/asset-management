import React from 'react';
import {Outlet} from "react-router-dom";
import {useSelector} from "react-redux";

const RootLayout = () => {

    const userData = useSelector((state) => state.userInfo.userData);
    console.log(userData)

    return (
        <div>
            <Outlet/>
        </div>
    );
};

export default RootLayout;