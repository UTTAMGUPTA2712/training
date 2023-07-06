import axios from 'axios'

export const GetCartItems = () => {
  return axios.get("http://localhost:1000/getCartItems")
}