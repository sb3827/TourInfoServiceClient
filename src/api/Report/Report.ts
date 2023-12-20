import {ReportResponseData} from '../../data/manager'
import {reportAxios} from './axios'

export const getAllReport = async (
    filter: string,
    search: string
): Promise<ReportResponseData> => {
    const response = await reportAxios.get(`/report?filter=${filter}&search=${search}`)
    return response.data
}
