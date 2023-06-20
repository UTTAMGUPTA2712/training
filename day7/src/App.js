import { Provider } from "react-redux";
import "./App.css";
import HomePage from "./pages/homepage";
import { noteStore } from "./redux/store/store";

function App() {
    return (
        <>
            <Provider store={noteStore}>
                <HomePage />
            </Provider>
        </>
    );
}

export default App;
/* Background */
