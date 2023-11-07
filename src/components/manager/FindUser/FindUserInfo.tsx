import React from 'react'
import UserInfo from '../UserInfo'
import Button from '../Button'

type FindUserInfoProps = {}

const FindUserInfo: React.FC<FindUserInfoProps> = ({}) => {
  return (
    <div className="flex items-center w-full">
      <div className="w-3/4 p-3 m-5 border rounded-lg">
        <div className="flex justify-between w-full ">
          <UserInfo text="이름" />
          <UserInfo text="아이디" />
          <UserInfo text="이메일" />
          <UserInfo text="전화번호" />
          <UserInfo text="사업자 여부" />
        </div>
      </div>
      <div className="flex justify-end w-1/4 p-3 m-5">
        <Button text="탈퇴" bgColor="btn-error" />
      </div>
    </div>
  )
}

export default FindUserInfo
