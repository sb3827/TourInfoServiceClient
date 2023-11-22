import React, {FC} from 'react'
import {SubBox, WaitUser} from '../../index'

//회원 대기 목록 컴포넌트 합체 - 추후 WaitUser에 props 추가하여야하고 반복문으로 수정해야함

type WaitBoxProps = {}

export const WaitBox: FC<WaitBoxProps> = ({}) => {
  var i: number = 5 //테스트 - 추후에 필요없음, 배열의 길이로 반복해야함
  return (
    <SubBox>
      {Array.from({length: i}, (_, index) => (
        <WaitUser key={index} /> //유저 정보도 넘겨줘야함
      ))}
      <WaitUser />
    </SubBox>
  )
}
