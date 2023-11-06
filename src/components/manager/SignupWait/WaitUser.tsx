import React from 'react'
import Button from '../Button'
import WaitInfo from './WaitInfo'

type WaitUserProps = {}

const WaitUser: React.FC<WaitUserProps> = ({}) => {
  return (
    <div className="w-full flex items-center">
      <div className="w-3/4 border rounded-lg m-5 p-3">
        <div className="flex w-full justify-between">
          <WaitInfo text="이름" />
          <WaitInfo text="아이디" />
          <WaitInfo text="이메일" />
          <WaitInfo text="전화번호" />
          <WaitInfo text="사업자 등록번호" />
        </div>
      </div>
      <div className="w-1/4 m-5 p-3 flex justify-center">
        <Button text="조회" bgColor="bg-yellow-300" />
        <Button text="승인" bgColor="bg-blue-500" />
        <Button text="삭제" bgColor="bg-red-500" />
      </div>
    </div>
  )
}

export default WaitUser
