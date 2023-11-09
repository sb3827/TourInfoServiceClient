import React, {FC} from 'react'
import {ReportInfo, SubBox} from '../../index'

//신고 박스

type ReportBoxProps = {}

export const ReportBox: FC<ReportBoxProps> = ({}) => {
  var i: number = 5 //테스트 - 추후에 필요없음, 배열의 길이로 반복해야함
  return (
    <SubBox>
      {Array.from({length: i}, (_, index) => (
        <ReportInfo key={index} /> //유저 정보도 넘겨줘야함
      ))}
    </SubBox>
  )
}
