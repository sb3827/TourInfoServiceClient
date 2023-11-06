import React from 'react'
import WaitBox from '../../components/manager/SignupWait/WaitBox'
import FindUser from '../../components/manager/FindUser'
import SubTitle from '../../components/manager/SubTitle'

type SignupWaitProps = {}

const SignupWait: React.FC<SignupWaitProps> = ({}) => {
  return (
    <div className="flex flex-col items-center mt-16">
      <SubTitle>회원 대기 목록</SubTitle>
      <WaitBox />
      <SubTitle>사용자 검색</SubTitle>
      <FindUser />
    </div>
  )
}

export default SignupWait
