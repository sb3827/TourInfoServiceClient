import {ReportCheckData, ReportResponseData} from '../../data/manager'
import {reportAxios} from './axios'

//신고 들고오기
export const getAllReport = async (
    filter: string,
    search: string
): Promise<ReportResponseData> => {
    const response = await reportAxios.get(`/report?filter=${filter}&search=${search}`)
    return response.data
}

//신고 상태 업데이트 -> 신고 처리 완료
export const checkReport = async (sno: number): Promise<ReportCheckData> => {
    const response = await reportAxios.put(`/report/update/${sno}`)
    return response.data
}

//제재
export const disciplinary = async (
    sno: number,
    mno: number,
    reason: string
): Promise<ReportCheckData> => {
    const response = await reportAxios.post('/report/disciplinary', {
        sno: sno,
        mno: mno,
        reason: reason
    })
    return response.data
}
