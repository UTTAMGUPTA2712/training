import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/loginPage";
import Otp from "./pages/otpPage";
import HomePage from "./pages/homePage";
import ResumePage from "./pages/resumePage";
import { useSelector } from "react-redux";
const App = () => {
    const isAuth = useSelector((state) => state.isAuth);
    const phonenumber = useSelector((state) => state.phoneNumber);
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
            path: "/homepage",
            component: <HomePage />,
        },
        {
            path: "/form",
            component: <ResumePage />,
        },
    ];
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {publicRouter.map((routerRoute) => { console.log("xuasux"); return <Route path={`${routerRoute.path}`} element={routerRoute.component} /> })}
                    {!isAuth && phonenumber && otpRouter.map((otpRoute) => { return <Route path={`${otpRoute.path}`} element={otpRoute.component} /> })}
                    {!isAuth && !privateRouter.map((privateRoute) => { return <Route path={`${privateRoute.path}`} element={privateRoute.component} /> })}
                </Routes>
            </BrowserRouter>
        </>
    );
}
export default App;
