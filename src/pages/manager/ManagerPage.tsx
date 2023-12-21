import {FC, useEffect, useState} from 'react'
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
import {faBell, faList, faUser} from '@fortawesome/free-solid-svg-icons'
import {getAllReport} from '../../api/Report/Report'
import {ReportResponseData} from '../../data/manager'

//관리자 페이지

type ManagerProps = {}

export const Manager: FC<ManagerProps> = ({}) => {
    //검색 값
    const [selectValue, setSelectValue] = useState<string>('all')
    const [searchValue, setSearchValue] = useState<string>('')
    const [reportSelectValue, setReportSelectValue] = useState<string>('all')
    const [reportSearchValue, setReportSearchValue] = useState<string>('')

    //검색 결과 데이터
    const [reportData, setReportData] = useState<ReportResponseData | null>(null)

    //사용자 검색 input 입력때마다 검색값 업데이트
    function onChangeSearch(value: string) {
        setSearchValue(value)
    }
    //사용자 검색 select 값 업데이트
    function onChangeSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        setSelectValue(e.target.value)
    }

    //사용자 검색 버튼 누르기 테스트
    function onSubmitSearch() {
        console.log('사용자 검색 : ', selectValue, searchValue)
    }

    //신고 검색 input 입력때마다 검색값 업데이트
    function onChangeReportSearch(value: string) {
        setReportSearchValue(value)
    }

    //신고 검색 select 값 업데이트
    function onChangeReportSelect(e: React.ChangeEvent<HTMLSelectElement>) {
        setReportSelectValue(e.target.value)
    }

    //신고 조회
    async function onReportList() {
        try {
            const data = await getAllReport(reportSelectValue, reportSearchValue)
            setReportData(data)
        } catch (err) {
            console.log(err)
        }
    }

    function onReportSearch(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            onReportList()
        }
    }

    //추후에 제재나 처리완료를 했을경우 redux를 통해서 랜더링 되도록 수정해야함
    useEffect(() => {
        onReportList()
    }, [])

    return (
        <Box>
            <div className="w-2/3 ml-4">
                <div className="flex items-center m-5">
                    <FontAwesomeIcon icon={faUser} className="m-1" />
                    <Subtitle value="사용자 검색" className="flex items-center w-full">
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
            </div>
            <FindBox />

            <div className="w-2/3 ml-4">
                <div className="flex items-center m-5">
                    <FontAwesomeIcon icon={faList} className="m-1" />
                    <Subtitle
                        value="회원대기 목록"
                        className="flex items-center w-full"
                    />
                </div>
            </div>
            <WaitBox />

            <div className="w-2/3 ml-4">
                <div className="flex items-center m-5">
                    <FontAwesomeIcon icon={faBell} className="m-1" />
                    <Subtitle value="신고 목록" className="flex items-center w-full">
                        <DropdownSelect>
                            <select
                                onChange={onChangeReportSelect}
                                value={reportSelectValue}
                                className="block w-full py-3 pl-3 pr-10 leading-tight border border-gray-300 shadow appearance-none rounded-2xl focus:outline-none focus:shadow-outline">
                                <option value="all">전체</option>
                                <option value="reporting">처리 중</option>
                                <option value="reported">처리 완료</option>
                                <option value="board_reporting">게시글 처리 중</option>
                                <option value="board_reported">게시글 처리 완료</option>
                                <option value="reply_reporting">댓글 처리 중</option>
                                <option value="reply_reported">댓글 처리 완료</option>
                            </select>
                        </DropdownSelect>
                        <SearchInput
                            className="w-1/2"
                            value={reportSearchValue}
                            onChange={onChangeReportSearch}
                            onKeyDown={onReportSearch}
                        />
                        <Button
                            onClick={onReportList}
                            value="검색"
                            className="text-center text-white bg-purple-600"
                        />
                    </Subtitle>
                </div>
            </div>
            <ReportBox reportData={reportData} />
        </Box>
    )
}
