import React from 'react'
import SubBox from '../SubBox'
import ReportInfo from './ReportInfo'

//신고 박스

type ReportBoxProps = {}

const ReportBox: React.FC<ReportBoxProps> = ({}) => {
  return (
    <SubBox>
      <ReportInfo />
      <ReportInfo />
      <ReportInfo />
      <ReportInfo />
      <ReportInfo />
      <ReportInfo />
      <ReportInfo />
      <ReportInfo />
      <ReportInfo />
      <ReportInfo />
    </SubBox>
  )
}

export default ReportBox
