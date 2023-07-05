import axios from 'axios';

export const WeatherService=(city="Chandigarh")=>{
    return axios.get(`http://localhost:1000/weather/${city}`)
}