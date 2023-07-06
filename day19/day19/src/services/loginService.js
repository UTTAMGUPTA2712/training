import axios from 'axios'

export const LoginService = (data) => {
  return axios.post("http://localhost:1000/loginService",data)
}