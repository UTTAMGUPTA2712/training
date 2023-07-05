import axios from "axios"

export const SignUpService=(form)=>{
    return axios.post("http://localhost:1000/", form)
}