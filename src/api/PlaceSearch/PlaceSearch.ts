import {PlaceData, PlaceBoardData} from '../../data/placeSearch'
import {commonAxios} from '../Axios/CommonAxios'

//장소 정보 검색 결과 들고오기
export const getSearchPlaceInfo = async (
    filter: string,
    search: string
): Promise<PlaceData[]> => {
    const response = await commonAxios.get(`/place?filter=${filter}&search=${search}`)
    return response.data
}

//장소에 대한 보드 들고오기
export const getPlaceDetailsInfo = async (
    pno: number
): Promise<PlaceBoardData[] | null> => {
    const response = await commonAxios.get(`/board/place?pno=${pno}`)
    return response.data
}
