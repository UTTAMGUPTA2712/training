import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import "./App.css";
import store from "./redux/store/store";
import RouterPage from "./pages/router";
const App = () => {
    let persistor = persistStore(store);
    return (<>
        <Provider store={store}>
            <PersistGate loading={<h1>LOADING... just a moment</h1>} persistor={persistor}>
                <RouterPage />
            </PersistGate>
        </Provider>
    </>)
}
export default App;


