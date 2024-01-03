import {MnoData, SignupWaitData} from '../../data/User/User'
import {refreshAxios} from '../Axios/RefreshAxios'

//대기 회원 들고오기
export const getSignupWait = async (): Promise<Array<SignupWaitData>> => {
    const response = await refreshAxios.get('/users/waiting')
    return response.data
}

//회원가입 승인
export const signupApprove = async (mno: number): Promise<MnoData> => {
    const response = await refreshAxios.put(`/users/approve?mno=${mno}`)
    return response.data
}

//회원가입 거절
export const signupReject = async (mno: number): Promise<MnoData> => {
    const response = await refreshAxios.put(`/users/delete?mno=${mno}`)
    return response.data
}
