import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import "./App.css";
import store from "./redux/store/store";
import RouterPage from "./pages/router";
import Loading from "./component/loading";
import DownloadPdf from "./component/downloadPdf";
const App = () => {
    let persistor = persistStore(store);
    return (<>
        <Provider store={store}>
            <PersistGate loading={<Loading/>} persistor={persistor}>
                <RouterPage />
                {/* <DownloadPdf/> */}
            </PersistGate>
        </Provider>
    </>)
}
export default App;