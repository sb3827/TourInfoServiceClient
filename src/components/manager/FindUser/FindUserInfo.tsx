import React, {FC} from 'react'
import {Button, UserInfo} from '../../index'

type FindUserInfoProps = {}

export const FindUserInfo: FC<FindUserInfoProps> = ({}) => {
  return (
    <div className="flex items-center w-full border-b-2">
      <div className="w-3/4 p-3 m-5 rounded-lg">
        <div className="flex justify-between w-full ">
          <UserInfo text="이름" />
          <UserInfo text="아이디" />
          <UserInfo text="이메일" />
          <UserInfo text="전화번호" />
          <UserInfo text="가입일" />
          <UserInfo text="사업자 여부" />
        </div>
      </div>
      <div className="flex justify-end w-1/4 p-3 m-5">
        <Button
          text="탈퇴"
          styles="bg-gradient-to-r from-red-400 via-red-500 to-red-600"
        />
      </div>
    </div>
  )
}
