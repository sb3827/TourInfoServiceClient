import {ResponseBoard, ResponseDeleteResult} from '../../data/Board/BoardData'
import {refreshAxios} from '../Axios/RefreshAxios'

export const placePostLoad = async (bno: number): Promise<ResponseBoard> => {
    const response = await refreshAxios.get(`/board/place/posting?bno=${bno}`)
    return response.data
}

export const coursePostLoad = async (bno: number): Promise<ResponseBoard> => {
    const response = await refreshAxios.get(`/board/course/posting?bno=${bno}`)
    return response.data
}

export const deleteBoard = async (bno: number): Promise<ResponseDeleteResult> => {
    const response = await refreshAxios.delete(`/board/place/posting/delete?bno=${bno}`)
    return response.data
}

export const postLike = async (mno: number, bno: number): Promise<void> => {
    const response = await refreshAxios.post(`/like/board`, {
        mno,
        bno
    })
    return response.data
}

export const deleteLike = async (mno: number, bno: number): Promise<void> => {
    const response = await refreshAxios.delete(`/like/board`, {
        data: {
            mno,
            bno
        }
    })
    return response.data
}
