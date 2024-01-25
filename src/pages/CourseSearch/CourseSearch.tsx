import {useEffect, useState} from 'react'
import {
    Box,
    SearchInput,
    CourseInfo,
    BoardToggle,
    Subtitle,
    BoardBox,
    Button,
    LoadingSppinner
} from '../../components/index'
import {getSearchCourseInfo} from '../../api/CourseSearch/CourseSearch'
import {CourseBoardListData} from '../../data/Board/BoardData'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useSearchParams} from 'react-router-dom'
import {faSignsPost } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';

export const CourseSearch = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const initialSearch = searchParams.get('search') || ''
    const [loading, setLoading] = useState<Boolean>(false)

    //검색 값
    const [searchValue, setSearchValue] = useState<string>(initialSearch)

    // 검색 결과 데이터
    const [boardInfoData, setBoardInfoData] = useState<CourseBoardListData[] | null>(null)

    //입력때마다 검색값 업데이트
    function onChangeSearch(value: string) {
        setSearchValue(value)
    }

    async function onCourseList(
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
            setLoading(true)
            setSearchParams({search: searchValue})
            const data = await getSearchCourseInfo(searchValue)
            setBoardInfoData(data)
            console.log(data)
            setLoading(false)
        } catch (err) {
            console.error('Error fetching data:', err)
            setLoading(false)
        }
    }
    useEffect(() => {
        onCourseList()
    }, [])

    const navigate = useNavigate();

    const user = useSelector((state: RootState) => state.login.mno)!

    const handleRegisterClick = () => {
        navigate(`/board/course/posting/register`);
    }

    return (
        <Box>
            {loading && <LoadingSppinner />}
            <SearchInput
                className="flex w-3/6 mb-4"
                value={searchValue}
                onChange={onChangeSearch}
                onKeyDown={onCourseList}
            />
            <div className='flex justify-end w-4/6 '>
               {user && <Button onClick={handleRegisterClick} className="h-16 text-xl text-white w-36 bg-darkGreen" value={'게시글 작성'}/> } 
            </div>
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
                        boardInfoData.map(
                            (data: CourseBoardListData) =>
                                !data.ad && <CourseInfo boardData={data} />
                        )}
                </BoardBox>
                <BoardBox>
                    {boardInfoData &&
                        boardInfoData.map(
                            (data: CourseBoardListData) =>
                                data.ad && <CourseInfo boardData={data} />
                        )}
                </BoardBox>
            </BoardToggle>
        </Box>
    )
}
