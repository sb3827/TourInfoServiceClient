import {refreshAxios} from '../Axios/RefreshAxios'
import {placeInfo} from './../../data/Place/Place'
import {commonAxios} from './../Axios/CommonAxios'

// 장소 등록
export const registerPlace = async (place: placeInfo): Promise<void> => {
    const response = await commonAxios.post(`/place/register`, place)
    return response.data
}

// 장소 삭제
export const deletePlace = async (pno: number): Promise<void> => {
    const response = await refreshAxios.delete(`/place/delete?pno=${pno}`)
    return response.data
}

export type modiPlace = {
    pno: number
    title: string
}
// 장소명 수정
export const modifyPlace = async (place: modiPlace): Promise<void> => {
    const response = await refreshAxios.put(`/place/modify?pno=${place.pno}`, place.title)
    return response.data
}
