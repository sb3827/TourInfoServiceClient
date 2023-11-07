import React, {useState} from 'react'
import WaitBox from '../../components/manager/SignupWait/WaitBox'
import SubTitle from '../../components/manager/SubTitle'
import FindUser from '../../components/manager/FindUser/FindBox'
import SearchInput from '../../components/manager/FindUser/SearchInput'
import Box from '../../components/manager/Box'

//회원 대기목록 + 사용자검색 페이지

type SignupWaitProps = {}

const SignupWait: React.FC<SignupWaitProps> = ({}) => {
  //검색 값
  const [searchValue, setSearchValue] = useState('')

  //입력때마다 검색값 업데이트
  const onChangeSearch = (value: string) => {
    setSearchValue(value)
  }

  return (
    <Box>
      <SubTitle>회원 대기 목록</SubTitle>
      <WaitBox />
      <SubTitle>
        사용자 검색
        <SearchInput value={searchValue} onChange={onChangeSearch} />
      </SubTitle>
      <FindUser />
    </Box>
  )
}

export default SignupWait
