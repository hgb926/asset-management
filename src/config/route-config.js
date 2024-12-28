import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import SignUp from "../components/auth/signup/SignUp.js";
import LoginForm from "../components/auth/login/LoginForm.js";
import Analysis from "../components/main/analysis/Analysis.js";
import Goal from "../components/main/goal/Goal";
import Board from "../components/main/board/Board";
import WriteForm from "../components/main/board/WriteForm";
import BoardDetail from "../components/main/board/BoardDetail";

export const router = createBrowserRouter([
    {
        path: "/login", // localhost:3000/login
        element: <LoginForm />,
    },
    {
        path: "/signup", // localhost:3000/signup
        element: <SignUp />,
    },
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                path: "analysis",
                element: <Analysis />,
            },
            {
                path: "goal",
                element: <Goal />,
            },
            {
                path: "board",
                element: <Board />,
                children: [
                    {
                        path: "write",
                        element: <WriteForm />,
                    },
                    {
                        path: ":id",
                        element: <BoardDetail />,
                    },
                ],
            },
        ],
    },
]);