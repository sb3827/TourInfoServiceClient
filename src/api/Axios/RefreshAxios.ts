import axios, {AxiosRequestConfig, InternalAxiosRequestConfig} from 'axios'
import {refresh, refreshErrorHandle} from '../refresh'
import {getWithTokenExpire} from '../../util/localStorage'

export const refreshAxios = axios.create({
    baseURL: process.env.REACT_APP_YAYAUM_ADDRESS,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getWithTokenExpire('token')}`
    }
})

//이런식으로 추가만 해주면 refresh 토큰 자동 발행
refreshAxios.interceptors.request.use(
    (config: AxiosRequestConfig) =>
        refresh(config) as unknown as Promise<InternalAxiosRequestConfig>,
    refreshErrorHandle
)
