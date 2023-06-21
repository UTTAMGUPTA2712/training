import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchJoke } from "../Redux/Reducers/jokeslice";

const Joke = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchJoke());
    }, []);
    const joke = useSelector((state) => state.joke.joke);
    return (
        <>
            <div id="joke">
                <h2>JUST A JOKE</h2>
                <p>{joke?.joke}</p>
            </div>
        </>
    );
};
export default Joke;
