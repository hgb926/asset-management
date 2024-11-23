import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Auth from "../pages/Auth";
import SignUp from "../components/auth/signup/SignUp.js";
import LoginForm from "../components/auth/login/LoginForm.js";

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
            }
        ]
    }
]);