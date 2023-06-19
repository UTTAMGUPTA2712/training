import { Provider } from "react-redux";
import { Store } from "./redux/store/store";
import HomePage from "./pages/homepage";
import "./App.css";
const App = () => {
    return (
        <>
            <Provider store={Store}>
                <HomePage />
            </Provider>
        </>
    );
};
export default App;
