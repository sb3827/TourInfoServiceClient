import {ReportCheckData, ReportResponseData} from '../../data/manager'
import {refreshAxios} from '../Refresh/axios'

//신고 들고오기
export const getAllReport = async (
    filter: string,
    search: string
): Promise<ReportResponseData> => {
    const response = await refreshAxios.get(`/report?filter=${filter}&search=${search}`)
    return response.data
}

//신고 상태 업데이트 -> 신고 처리 완료
export const checkReport = async (sno: number): Promise<ReportCheckData> => {
    const response = await refreshAxios.put(`/report/update/${sno}`)
    return response.data
}

//제재
export const disciplinary = async (
    sno: number,
    mno: number,
    reason: string
): Promise<ReportCheckData> => {
    const response = await refreshAxios.post('/report/disciplinary', {
        sno,
        mno,
        reason
    })
    return response.data
}
