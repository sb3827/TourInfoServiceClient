import {FC, useState} from 'react'
import {
    Box,
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
    const [searchValue, setSearchValue] = useState<string>('')

    //입력때마다 검색값 업데이트
    function onChangeSearch(value: string) {
        setSearchValue(value)
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
                    <SearchInput
                        className="w-1/2"
                        value={searchValue}
                        onChange={onChangeSearch}
                    />
                </Subtitle>
            </div>
            <FindBox />
        </Box>
    )
}
