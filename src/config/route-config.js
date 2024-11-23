import {createBrowserRouter} from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Auth from "../pages/Auth";
import SignUp from "../components/auth/signup/SignUp";


const authRouter = [
    {
        index: true,
        element: <SignUp/>
    }
]

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <RootLayout/>
        ),
        children: [
            {
                path: "",
                element: <Auth/>,
                children: authRouter
            }

        ]
    }
])