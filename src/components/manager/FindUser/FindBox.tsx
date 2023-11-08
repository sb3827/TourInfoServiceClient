import React from 'react'
import {FindUserInfo, SubBox} from '../../index'

type FindBoxProps = {}

//유저 검색 박스

export const FindBox: React.FC<FindBoxProps> = ({}) => {
  return (
    <SubBox>
      <FindUserInfo />
      <FindUserInfo />
      <FindUserInfo />
    </SubBox>
  )
}
