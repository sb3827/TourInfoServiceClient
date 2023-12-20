import axios from 'axios'

export const reportAxios = axios.create({
    baseURL: process.env.REACT_APP_YAYAUM_ADDRESS,
    headers: {
        'Content-Type': 'application/json'
    }
})
