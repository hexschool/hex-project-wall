import axios from 'axios'

const http = axios.create({
  baseURL: import.meta.env.MODE === 'production' ? import.meta.env.VITE_APP_PATH : ''
})

export default { axios, http }
