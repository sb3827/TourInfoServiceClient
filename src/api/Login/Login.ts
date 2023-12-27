import {LoginResponseData} from '../../data/User/User'
import {loginAxios} from './axios'

//로그인
export const loginRequest = async (
    email: string,
    password: string
): Promise<LoginResponseData> => {
    const response = await loginAxios.post('/auth/login', {email, password})
    return response.data
}
