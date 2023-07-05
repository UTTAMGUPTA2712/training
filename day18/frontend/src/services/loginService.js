import axios from "axios"

export const LoginService=(userData)=>{
    return axios.post("http://localhost:1000/form",userData )
}