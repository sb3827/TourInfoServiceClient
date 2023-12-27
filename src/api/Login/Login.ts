import {LoginResponseData} from '../../data/User/User'
import {refreshAxios} from '../Refresh/axios'
import {loginAxios} from './axios'

//로그인
export const loginRequest = async (
    email: string,
    password: string
): Promise<LoginResponseData> => {
    const response = await loginAxios.post('/auth/login', {email, password})
    return response.data
}

//로그아웃
export const logoutRequest = async () => {
    const response = await refreshAxios.post('/auth/logout')
    return response.data
}
