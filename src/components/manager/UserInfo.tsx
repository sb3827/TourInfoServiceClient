import React from 'react'

//WaitUser에 사용될 아이템들(이름,아이디 등등) - 추후 props 추가(속성값 추가해줘야함, value 값)

type UserInfoProps = {
  text: string
}

const UserInfo: React.FC<UserInfoProps> = ({text}) => {
  return (
    <div className="p-3">
      <span>{text}</span>
    </div>
  )
}

export default UserInfo
