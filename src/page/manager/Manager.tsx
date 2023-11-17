import {FC, useState} from 'react'
import {
  Box,
  FindBox,
  ReportBox,
  SearchInput,
  SubTitle,
  ToggleButton,
  WaitBox
} from '../../components/index'

//관리자 페이지

type ManagerProps = {}

export const Manager: FC<ManagerProps> = ({}) => {
  //검색 값
  const [searchValue, setSearchValue] = useState<string>('')

  //입력때마다 검색값 업데이트
  function onChangeSearch(value: string) {
    setSearchValue(value)
  }

  return (
    <Box>
      <ToggleButton>
        <SubTitle text="회원대기 목록" />
        <SubTitle text="신고 목록" />
        <WaitBox />
        <ReportBox />
      </ToggleButton>

      <div className="w-2/3 ml-4">
        <SubTitle text="사용자 검색">
          <SearchInput value={searchValue} onChange={onChangeSearch} />
        </SubTitle>
      </div>
      <FindBox />
    </Box>
  )
}