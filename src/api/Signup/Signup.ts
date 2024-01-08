import {commonAxios} from '../Axios/CommonAxios'
import {SignupData, EmailCheckResponse, SignupResponse} from '../../data/Signup/Signup'

// 이메일 중복 체크 리퀘스트
export const duplicatedEmailCheckRequest = async (
    email: string
): Promise<EmailCheckResponse> => {
    try {
        const response = await commonAxios.post('/auth/email/check', {
            email
        })
        return response.data
    } catch (error) {
        console.error('Error during duplicated email check request!!! ==> ', error)
        throw error
    }
}

// 회원가입
export const signupRequest = async (data: SignupData): Promise<SignupResponse> => {
    try {
        const {email, password, birth, phone, name, role} = data
        const response = await commonAxios.post('auth/signup', {
            email,
            password,
            birth,
            phone,
            name,
            role
        })
        return response.data
    } catch (error) {
        console.error('Error during signup request!!! ==> ', error)
        throw error
    }
}
