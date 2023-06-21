import axios from "axios";

const AnimeListApi = () => {
    console.log("animelist");
    return axios.get("https://api.jikan.moe/v4/anime?q=top&sfw");
};
export default AnimeListApi;
