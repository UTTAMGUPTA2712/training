import axios from "axios";

const FactApi = () => {
    console.log("factapi");
    return axios.get("https://uselessfacts.jsph.pl/api/v2/facts/random");
};
export default FactApi;
