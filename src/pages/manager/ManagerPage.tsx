import {FC, useState} from 'react'
import {
    Box,
    Button,
    DropdownSelect,
    FindBox,
    ReportBox,
    SearchInput,
    Subtitle,
    ToggleButton,
    WaitBox
} from '../../components/index'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBell, faList} from '@fortawesome/free-solid-svg-icons'

//관리자 페이지

type ManagerProps = {}

export const Manager: FC<ManagerProps> = ({}) => {
    //검색 값
    const [selectValue, setSelectValue] = useState<string>('all')
    const [searchValue, setSearchValue] = useState<string>('')

    //입력때마다 검색값 업데이트
    function onChangeSearch(value: string) {
        setSearchValue(value)
    }
    //select 값 업데이트
    function onChangeSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        setSelectValue(e.target.value)
    }

    //검색 버튼 누르기 테스트
    function onSubmitSearch() {
        console.log(selectValue, searchValue)
    }

    return (
        <Box>
            <ToggleButton size="w-48">
                <Subtitle
                    value="회원대기 목록"
                    className="flex flex-row-reverse items-center text-left">
                    <FontAwesomeIcon icon={faList} className="m-1" />
                </Subtitle>
                <Subtitle
                    value="신고 목록"
                    className="flex flex-row-reverse items-center text-left">
                    <FontAwesomeIcon icon={faBell} className="m-1" />
                </Subtitle>
                <WaitBox />
                <ReportBox />
            </ToggleButton>

            <div className="w-2/3 ml-4">
                <Subtitle value="사용자 검색" className="flex items-center m-5">
                    <DropdownSelect>
                        <select
                            onChange={onChangeSelect}
                            value={selectValue}
                            className="block w-full py-3 pl-3 pr-10 leading-tight border border-gray-300 shadow appearance-none rounded-2xl focus:outline-none focus:shadow-outline">
                            <option value="all">전체</option>
                            <option value="nomal">일반 유저</option>
                            <option value="business">사업자</option>
                            <option value="freeze">정지된 유저</option>
                        </select>
                    </DropdownSelect>
                    <SearchInput
                        className="w-1/2"
                        value={searchValue}
                        onChange={onChangeSearch}
                    />
                    <Button
                        onClick={onSubmitSearch}
                        value="검색"
                        className="text-center text-white bg-purple-600"
                    />
                </Subtitle>
            </div>
            <FindBox />
        </Box>
    )
}
