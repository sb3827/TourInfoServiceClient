import React from 'react'
import WaitBox from '../../components/manager/SignupWait/WaitBox'
import SubTitle from '../../components/manager/SubTitle'
import FindUser from '../../components/manager/FindUser/FindBox'
import SearchInput from '../../components/manager/FindUser/SearchInput'

type SignupWaitProps = {}

const SignupWait: React.FC<SignupWaitProps> = ({}) => {
  return (
    <div className="flex flex-col items-center justify-center w-full mt-16">
      <SubTitle>회원 대기 목록</SubTitle>
      <WaitBox />
      <SubTitle>
        사용자 검색
        <SearchInput />
      </SubTitle>
      <FindUser />
    </div>
  )
}

export default SignupWait
