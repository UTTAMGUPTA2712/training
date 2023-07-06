import axios from 'axios'
export const UpdateVendorSale = (data) => {
  return axios.post("http://localhost:1000/updateVendorSale",data)
}
