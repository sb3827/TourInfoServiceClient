import axios from 'axios'

//사업자 확인 axios 기본 셋팅

export const businesAxios = axios.create({
  baseURL: 'https://api.odcloud.kr/api/nts-businessman/v1',
  headers: {
    'Content-Type': 'application/json'
  },
  params: {
    serviceKey: process.env.REACT_APP_BUSINESS_API
  }
})
