import axios from 'axios';
export const WeatherService=(city="chandigarh")=>{
    const api="6a426d731db2eecec4965b79870e5aa8"
    const api2="b3f08617ea95ee74d6b368cf78cf8a50"
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`)
}
// https://api.openweathermap.org/data/2.5/weather?q=chandigarh&appid=6a426d731db2eecec4965b79870e5aa8