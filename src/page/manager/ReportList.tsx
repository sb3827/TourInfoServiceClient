import React from 'react'
import Box from '../../components/manager/Box'
import SubTitle from '../../components/manager/SubTitle'
import ReportBox from '../../components/manager/ReportList/ReportBox'
import FindBox from '../../components/manager/FindUser/FindBox'

//신고 + 사용자 검색 페이지

type ReportListProps = {}

const ReportList: React.FC<ReportListProps> = ({}) => {
  return (
    <Box>
      <SubTitle>신고 목록</SubTitle>
      <ReportBox />
      <SubTitle>사용자 검색</SubTitle>
      <FindBox />
    </Box>
  )
}

export default ReportList
