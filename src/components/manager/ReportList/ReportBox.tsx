import React from 'react'
import {ReportInfo, SubBox} from '../../index'

//신고 박스

type ReportBoxProps = {}

export const ReportBox: React.FC<ReportBoxProps> = ({}) => {
  return (
    <SubBox>
      <ReportInfo />
      <ReportInfo />
      <ReportInfo />
      <ReportInfo />
      <ReportInfo />
    </SubBox>
  )
}
