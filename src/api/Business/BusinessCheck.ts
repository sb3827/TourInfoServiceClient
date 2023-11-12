import {Business} from '../../data/manager/Business'
import {businesAxios} from './axios'

//사업자 확인 post요청
export const postBusinessCheck = async (b_no: string[]): Promise<Business> => {
  const response = await businesAxios.post('/status', {b_no})
  return response.data
}
