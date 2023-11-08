import React from 'react'
import {Box, FindBox, ReportBox, SubTitle} from '../../components/index'

//신고 + 사용자 검색 페이지

type ReportListProps = {}

export const ReportList: React.FC<ReportListProps> = ({}) => {
  return (
    <Box>
      <SubTitle>신고 목록</SubTitle>
      <ReportBox />
      <SubTitle>사용자 검색</SubTitle>
      <FindBox />
    </Box>
  )
}
