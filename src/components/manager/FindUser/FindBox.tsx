import React from 'react'
import SubBox from '../SubBox'
import FindUserInfo from './FindUserInfo'

type FindBoxProps = {}

//유저 검색 박스

const FindBox: React.FC<FindBoxProps> = ({}) => {
  return (
    <SubBox>
      <FindUserInfo />
      <FindUserInfo />
      <FindUserInfo />
    </SubBox>
  )
}

export default FindBox
