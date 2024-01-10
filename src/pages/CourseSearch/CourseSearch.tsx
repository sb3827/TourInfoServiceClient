import {useState} from 'react'
import {Box, SearchInput, CourseInfo, BoardToggle, Subtitle, BoardBox} from '../../components/index'
import { getSearchCourseInfo } from "../../api/CourseSearch/CourseSearch";
import {CourseBoardListData} from '../../data/Board/BoardData'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSignsPost } from '@fortawesome/free-solid-svg-icons'

export const CourseSearch = () => {
    //검색 값
    const [searchValue, setSearchValue] = useState<string>('')

    // 검색 결과 데이터
    const [boardInfoData, setBoardInfoData] = useState<CourseBoardListData[] | null>(null)

    //입력때마다 검색값 업데이트
    function onChangeSearch(value: string) {
        setSearchValue(value)
    }

    async function onPlaceList(
        e?: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>
    ) {
        //키보드로 입력이 들어왔는데 Enter가 아닌경우 return
        if (
            e?.type === 'keydown' &&
            (e as React.KeyboardEvent<HTMLInputElement>).key !== 'Enter'
        ) {
            return
        }

        try {
            const data = await getSearchCourseInfo(searchValue)
            setBoardInfoData(data)
            console.log(data);
        } catch (err) {
            console.log(err);
            alert('서버와 연결이 끊겼습니다.')
        }
    }

    return (
        <Box>
            <SearchInput
                className="flex w-3/6 mb-4"
                value={searchValue}
                onChange={onChangeSearch}
                onKeyDown={onPlaceList}
            />
            <BoardToggle>
            <Subtitle
                    value="유저"
                    className="flex flex-row-reverse items-center text-left">
                    <FontAwesomeIcon icon={faSignsPost} className="m-1" />
                </Subtitle>
                <Subtitle
                    value="광고"
                    className="flex flex-row-reverse items-center text-left">
                    <FontAwesomeIcon icon={faSignsPost} className="m-1" />
                </Subtitle>
                <BoardBox>
                {boardInfoData && 
                    boardInfoData.map((data: CourseBoardListData) => (
                      !data.ad && <CourseInfo boardData = {data}  />
                    ))}
                </BoardBox>
                <BoardBox>
                {boardInfoData && 
                    boardInfoData.map((data: CourseBoardListData) => (
                      data.ad && <CourseInfo boardData = {data}  />
                    ))}
                </BoardBox>

            </BoardToggle>
        </Box>
    )
}
