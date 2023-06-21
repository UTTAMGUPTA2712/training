import { useDispatch, useSelector } from "react-redux";
import Card from "../compoents/card";
import Joke from "../compoents/joke";
import { useEffect } from "react";
import Fact from "../compoents/fact";
import { fetchAnimeList } from "../Redux/Reducers/animelistreduce";

const HomePage = () => {
    const dispatch = useDispatch();
    const animedata = useSelector((state) => state.animeList.animeList);
    useEffect(() => {
        if (animedata.length === 0) {
            dispatch(fetchAnimeList());
        }
    }, []);
    return (
        <>
            {!animedata ? (
                "LOADING"
            ) : (
                <>
                    <Fact />
                    <div id="home">
                        {animedata.map((anime) => {
                            return <Card data={anime} />;
                        })}
                    </div>
                    <Joke />
                </>
            )}
        </>
    );
};
export default HomePage;
