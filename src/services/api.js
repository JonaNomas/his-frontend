import axios from 'axios'

const API_URL = 'https://api.medsoft.cl/'

export default () => {
  return axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + sessionStorage.getItem('token')
    }
  })
}
