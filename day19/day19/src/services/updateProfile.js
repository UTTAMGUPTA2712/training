import axios from 'axios'
export const UpdateProfile = (data) => {
  return axios.post("http://localhost:1000/updateProfile",data)
}
