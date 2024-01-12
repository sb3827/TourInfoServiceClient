import {registReplyData, replyData} from '../../data/Reply/Reply'
import {commonAxios} from '../Axios/CommonAxios'

//댓글 들고오기
export const getParentReply = async (bno: number): Promise<replyData[]> => {
    const response = await commonAxios.get(`/reply/board?bno=${bno}`)
    return response.data
}

//대댓글 들고오기
export const getChildreply = async (bno: number, rno: number): Promise<replyData[]> => {
    const response = await commonAxios.get(`/reply/board?bno=${bno}&rno=${rno}`)
    return response.data
}

//댓글 작성
export const createReply = async (
    registReply: registReplyData
): Promise<{bno: number}> => {
    const response = await commonAxios.post('/reply/regist', registReply)
    return response.data
}
