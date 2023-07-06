import axios from 'axios'

export const SignUpService = (data) => {
    return axios.post("http://localhost:1000/signUpService", data)
}
