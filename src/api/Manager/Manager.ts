import {ManagerSearchUserData, MnoData, SignupWaitData} from '../../data/User/User'
import {refreshAxios} from '../Axios/RefreshAxios'

//회원 검색
export const managerSearchUser = async (
    filter: string,
    search: string
): Promise<Array<ManagerSearchUserData>> => {
    const response = await refreshAxios.get(
        `/users/filter-find?filter=${filter}&search=${search}`
    )
    return response.data
}

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
export const userDelete = async (mno: number): Promise<MnoData> => {
    const response = await refreshAxios.put(`/users/delete?mno=${mno}`)
    return response.data
}
