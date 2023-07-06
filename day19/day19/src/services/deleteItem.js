import axios from 'axios'

export const DeleteItem = (data) => {
  return axios.post("http://localhost:1000/deletItem",{id:data})
}
