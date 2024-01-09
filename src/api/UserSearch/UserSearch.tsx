import {UserSearchData} from '../../data/User/User'
import {commonAxios} from '../Axios/CommonAxios'

// 유저 검색 결과 불러오기
export const getSearchUserInfo = async (
    search: string
    ): Promise<UserSearchData[]> => {
        const response = await commonAxios.get(`/users/find?search=${search}`)
        return response.data
    
}