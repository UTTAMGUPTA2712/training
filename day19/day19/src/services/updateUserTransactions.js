import axios from 'axios'
export const UpdateUserTransactions = (data) => {
    return axios.post("http://localhost:1000/updateUserTransaction", data)
}
