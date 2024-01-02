import axios from 'axios'

export const commonAxios = axios.create({
    baseURL: process.env.REACT_APP_YAYAUM_ADDRESS,
    headers: {
        'Content-Type': 'application/json'
    }
})
