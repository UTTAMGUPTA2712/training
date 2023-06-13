import Mainpage from "./pages/mainpage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import CompletedTaskPage from "./pages/completedItemPage";
import DeletedTaskPage from "./pages/deletedItemPage";
const App = () => {
    return (
        <>
            <div id="fullpage">
                <div className="mainpage">
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Mainpage />} />
                            <Route path="/complete" element={<CompletedTaskPage />} />
                            <Route path="/delete" element={<DeletedTaskPage />} />
                        </Routes>
                    </BrowserRouter>
                </div>
            </div>
        </>
    );
};
export default App;
