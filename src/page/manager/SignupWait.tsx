import React, {useState} from 'react'
import {Box, FindBox, SearchInput, SubTitle, WaitBox} from '../../components/index'

//회원 대기목록 + 사용자검색 페이지

type SignupWaitProps = {}

export const SignupWait: React.FC<SignupWaitProps> = ({}) => {
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
      <FindBox />
    </Box>
  )
}
