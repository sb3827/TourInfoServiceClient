import {CourseBoardListData} from '../../data/Board/BoardData'
import {commonAxios} from '../Axios/CommonAxios'

//코스 보드 검색 결과 불러오기
export const getSearchCourseInfo = async (
    search: string
    ): Promise<CourseBoardListData[]> => {
        const response = await commonAxios.get(`/board/course?search=${search}`)
        return response.data
    
}