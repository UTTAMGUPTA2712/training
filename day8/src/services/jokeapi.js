import axios from "axios";

const JokeApi = () => {
    console.log("jokeapi");
    return axios.get("https://v2.jokeapi.dev/joke/Any?type=single");
};
export default JokeApi;
