import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import SignUp from "../components/auth/signup/SignUp.js";
import LoginForm from "../components/auth/login/LoginForm.js";
import {authCheckLoader} from "./auth";
import Analysis from "../components/main/analysis/Analysis";
import Goal from "../components/main/goal/Goal";
import Challenge from "../components/main/challenge/Challenge";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                path: "login", // localhost:3000/login
                element: <LoginForm />
            },
            {
                path: "signup", // localhost:3000/signup
                element: <SignUp />
            },
            {
                path: "analysis",
                element: <Analysis/>
            },
            {
                path: "goal",
                element: <Goal/>
            },
            {
                path: "challenge",
                element: <Challenge/>
            },
        ]
    }
]);