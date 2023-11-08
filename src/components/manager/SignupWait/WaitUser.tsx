import React from 'react'
import {Button, UserInfo} from '../../index'

// 유저 정보 한줄 - 추후 UserInfo로 prop 추가해줘야함

type WaitUserProps = {}

export const WaitUser: React.FC<WaitUserProps> = ({}) => {
  return (
    <div className="flex items-center w-full ">
      <div className="w-3/4 p-3 m-5 border rounded-lg">
        <div className="flex justify-between w-full ">
          <UserInfo text="이름" />
          <UserInfo text="아이디" />
          <UserInfo text="이메일" />
          <UserInfo text="전화번호" />
          <UserInfo text="사업자 등록번호" />
        </div>
      </div>
      <div className="flex justify-around p-3 m-5 min-w-fit">
        <Button text="조회" bgColor="btn-warning" />
        <Button text="승인" bgColor="btn-primary" />
        <Button text="삭제" bgColor="btn-error" />
      </div>
    </div>
  )
}
