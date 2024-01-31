import {useEffect, useRef, useState} from 'react'
import {
    Box,
    SearchInput,
    CourseInfo,
    BoardToggle,
    Subtitle,
    BoardBox,
    Button,
    Title
} from '../../components/index'
import {getSearchCourseInfo} from '../../api/CourseSearch/CourseSearch'
import {CourseBoardListData} from '../../data/Board/BoardData'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {useSearchParams} from 'react-router-dom'
import {faSignsPost} from '@fortawesome/free-solid-svg-icons'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {RootState} from '../../store/rootReducer'

export const CourseSearch = () => {
    const boardInfoRef = useRef(null) // 관찰할 요소에 대한 참조

    const boardInfoAdRef = useRef(null) // 관찰할 요소에 대한 참조
    const [boardInfoRequest, setBoardInfoRequest] = useState<boolean>(true)

    const [boardInfoAdRequest, setBoardInfoAdRequest] = useState<boolean>(true)

    const [page, setPage] = useState<number>(1)
    const [adPage, setAdPage] = useState<number>(1)
    const [searchParams, setSearchParams] = useSearchParams()
    const initialSearch = searchParams.get('search') || ''
    const [loading, setLoading] = useState<Boolean>(false)

    //검색 값
    const [searchValue, setSearchValue] = useState<string>(initialSearch)

    // 검색 결과 데이터 - 유저
    const [boardInfoData, setBoardInfoData] = useState<CourseBoardListData[] | null>(null)
    // 검색 결과 데이터 - 광고
    const [boardInfoAdData, setBoardInfoAdData] = useState<CourseBoardListData[] | null>(
        null
    )

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
            const data = await getSearchCourseInfo(searchValue, 0, false)
            setBoardInfoData(data)
            const data2 = await getSearchCourseInfo(searchValue, 0, true)
            setBoardInfoAdData(data2)

            setPage(1)
            setAdPage(1)
            setBoardInfoRequest(true)
            setBoardInfoAdRequest(true)

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

    const navigate = useNavigate()

    const user = useSelector((state: RootState) => state.login.mno)!

    const handleRegisterClick = () => {
        navigate(`/board/course/posting/register`)
    }

    //스크롤 조회
    async function onInfinityReportList(page: number, isAd: boolean) {
        try {
            const data = await getSearchCourseInfo(searchValue, page, isAd)
            console.log(data, searchValue, page, isAd)
            //데이터를 받는것이 없으면 스크롤 할 시 요청 보내지 못하도록 state 변경
            if (!isAd && data.length <= 0) {
                observer.disconnect()
                boardInfoData !== null && setBoardInfoRequest(false)
                return
            } else if (isAd && data.length <= 0) {
                observer.disconnect()
                boardInfoAdData !== null && setBoardInfoAdRequest(false)
            }

            if (!isAd) {
                boardInfoData !== null && setBoardInfoData([...boardInfoData, ...data])
                setPage(page + 1)
            } else {
                boardInfoAdData !== null &&
                    setBoardInfoAdData([...boardInfoAdData, ...data])
                setAdPage(adPage + 1)
            }
        } catch (err) {
            console.log(err)
        }
    }

    //유저 옵저버
    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            boardInfoRequest === true && onInfinityReportList(page, false)
        }
    })

    //광고 옵저버
    const observer1 = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            boardInfoAdRequest === true && onInfinityReportList(adPage, true)
        }
    })

    //스크롤 설정 - 유저
    useEffect(() => {
        //무한 스크롤
        if (boardInfoRef.current) {
            observer.observe(boardInfoRef.current) // loaderRef를 관찰 대상으로 등록
        }
        return () => {
            if (boardInfoRef.current) {
                observer.unobserve(boardInfoRef.current) // 컴포넌트 언마운트 시 관찰 취소
            }
        }
    }, [boardInfoData, boardInfoRequest, boardInfoRef])

    //스크롤 설정 - 광고
    useEffect(() => {
        //무한 스크롤
        if (boardInfoAdRef.current) {
            observer1.observe(boardInfoAdRef.current) // loaderRef를 관찰 대상으로 등록
        }
        return () => {
            if (boardInfoAdRef.current) {
                observer1.unobserve(boardInfoAdRef.current) // 컴포넌트 언마운트 시 관찰 취소
            }
        }
    }, [boardInfoAdData, boardInfoAdRequest, boardInfoAdRef])

    return (
        <Box>
            <div className="w-1/2">
                <Title className="mb-5 text-darkGreen">코스 게시판</Title>
                <div className="flex w-full mb-5">
                    <div className="flex w-full">
                        <SearchInput
                            className="w-4/5 ml-0"
                            value={searchValue}
                            onChange={onChangeSearch}
                            onKeyDown={onCourseList}
                            placeholder="코스 검색"
                        />
                        <Button
                            onClick={onCourseList}
                            className="text-white shadow-xl bg-darkGreen"
                            value={'검색'}
                        />
                    </div>
                    {user && (
                        <Button
                            onClick={handleRegisterClick}
                            className="text-white shadow-xl bg-lightGreen"
                            value={'게시글 작성'}
                        />
                    )}
                </div>
                <div className="flex justify-end w-4/6 "></div>
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

                    <BoardBox className="flex flex-col">
                        {boardInfoData ? (
                            boardInfoData.map((data: CourseBoardListData, index) => (
                                <CourseInfo key={index} boardData={data} />
                            ))
                        ) : (
                            <div className="flex items-center justify-center w-full h-full">
                                <p className="text-xl font-bold">게시글이 없습니다...</p>
                            </div>
                        )}
                        {boardInfoData?.length !== 0 &&
                            (boardInfoRequest === true ? (
                                <div className="" ref={boardInfoRef}>
                                    로딩중 ...
                                </div>
                            ) : (
                                <div>마지막 입니다.</div>
                            ))}
                    </BoardBox>
                    <BoardBox className="flex flex-col">
                        {boardInfoAdData ? (
                            boardInfoAdData.map((data: CourseBoardListData, index) => (
                                <CourseInfo key={index} boardData={data} />
                            ))
                        ) : (
                            <div className="flex items-center justify-center w-full h-full">
                                <p className="text-xl font-bold">게시글이 없습니다...</p>
                            </div>
                        )}
                        {boardInfoAdData?.length !== 0 &&
                            (boardInfoAdRequest === true ? (
                                <div className="" ref={boardInfoAdRef}>
                                    로딩중 ...
                                </div>
                            ) : (
                                <div>마지막 입니다.</div>
                            ))}
                    </BoardBox>
                </BoardToggle>
            </div>
        </Box>
    )
}
