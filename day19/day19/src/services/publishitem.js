import axios from 'axios'
import React from 'react'

export const PublishItem = (data) => {
  return axios.post("http://localhost:1000/publishItem",{id:data})
}
