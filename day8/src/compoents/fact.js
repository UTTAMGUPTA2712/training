import { useDispatch, useSelector } from "react-redux";
import { fetchFact } from "../Redux/Reducers/factreduce";

const Fact = () => {
    const dispatch = useDispatch();
    const ipadd = useSelector((state) => state.Fact.Fact);
    return (
        <>
            <div id="uselessfact">
                <h1>GET A USELESS FACT ON A CLICK</h1>
                <button onClick={() => dispatch(fetchFact())}>CLICK</button>
                <div>{ipadd?.text}</div>
            </div>
        </>
    );
};
export default Fact;
