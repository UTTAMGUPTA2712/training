import { Provider } from "react-redux";
import "./App.css";
import store from "./Redux/Store/store";
import HomePage from "./pages/homepage";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

function App() {
    let persistor = persistStore(store);
    return (
        <>
            <Provider store={store}>
                <PersistGate loading={<h1>LOADING... just a moment</h1>} persistor={persistor}>
                    <div style={{ height: "97vh", width: "99vw" }}>
                        <HomePage />
                    </div>
                </PersistGate>
            </Provider>
        </>
    );
}

export default App;
