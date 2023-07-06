import axios from 'axios'

export const SaveItem = (data) => {
  return axios.post("http://localhost:1000/saveItem",data)
}
