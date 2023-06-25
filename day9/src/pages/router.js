import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./loginPage";
import Otp from "./otpPage";
import HomePage from "./homePage";
import ResumePage from "./resumePage";
import { useSelector } from "react-redux";
import TemplatePicker from "./templatePicker";
const RouterPage=()=>{
    const isAuth = useSelector((state) => state.auth.isAuth);
    const phonenumber = useSelector((state) => state.auth.phoneNumber);
    const publicRouter = [
        {
            path: "/",
            component: <LoginPage />,
        },
        {
            path: "/*",
            component: <LoginPage />,
        },
    ];
    const otpRouter = [
        {
            path: "/otp",
            component: <Otp />,
        },
    ];
    const privateRouter = [
        {
            path: "/home",
            component: <HomePage />,
        },
        {
            path: "/form",
            component: <ResumePage />,
        },
        {
            path: "/template",
            component: <TemplatePicker />,
        },
    ];
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {publicRouter.map((routerRoute) => { return <Route path={`${routerRoute.path}`} element={routerRoute.component} /> })}
                    {!isAuth&& phonenumber && otpRouter.map((otpRoute) => { return <Route path={`${otpRoute.path}`} element={otpRoute.component} /> })}
                    {isAuth && privateRouter.map((privateRoute) => { return <Route path={`${privateRoute.path}`} element={privateRoute.component} /> })}
                </Routes>
            </BrowserRouter>
        </>
    );
}
export default RouterPage;