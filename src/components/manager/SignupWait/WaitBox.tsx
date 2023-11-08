import React from 'react'
import {SubBox, WaitUser} from '../../index'

//회원 대기 목록 컴포넌트 합체 - 추후 WaitUser에 props 추가하여야하고 반복문으로 수정해야함

type WaitBoxProps = {}

export const WaitBox: React.FC<WaitBoxProps> = ({}) => {
  return (
    <SubBox>
      <WaitUser />
      <WaitUser />
      <WaitUser />
    </SubBox>
  )
}
