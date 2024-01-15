import {FC, useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {
    SearchInput,
    Subtitle,
    Button,
    MainItem,
    MostLikedCourseItem,
    MostLikedMainItem,
    CoursePostMap,
    MainSlider
} from '../../components'
import {RootState} from '../../store/rootReducer'
import noImage from '../../assets/noImage.png'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMapLocationDot, faRoute, faUsers} from '@fortawesome/free-solid-svg-icons'
import MainFilter from '../../components/Main/MainFilter'
import {SwiperSlide} from 'swiper/react'
import {GetMainitemRequest} from '../../api/Main/Main'
import {setSearchValueFromMain} from '../../store/slices/MainSlice'
import {mainItemData} from '../../data/Main/Main'

type MainProps = {}

export const Main: FC<MainProps> = () => {
    const [searchValue, setSearchValue] = useState<string>('')
    const [filterValue, setFilterValue] = useState<string>('place')
    const [fetchedData, setFetchedData] = useState<mainItemData | null>(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // 상세 페이지 이동
    function mostLikedDetailView(index: number) {
        if (fetchedData && fetchedData.data.mostBoardPlace[index].pno) {
            navigate(`/board/place/${fetchedData.data.mostBoardPlace[index].pno}`)
        }
    }

    function recentlyDetailView(index: number) {
        if (fetchedData && fetchedData.data.recentlyBoard[index].bno) {
            console.log(
                'isCourse ====>>> ' + fetchedData.data.recentlyBoard[index].course
            )
            if (fetchedData.data.recentlyBoard[index].course === true) {
                navigate(
                    `/board/course/posting?bno=${fetchedData.data.recentlyBoard[index].bno}`
                )
            } else {
                navigate(
                    `/board/place/posting?bno=${fetchedData.data.recentlyBoard[index].bno}`
                )
            }
        }
    }

    function followDetailView(index: number) {
        if (fetchedData && fetchedData.data.followBoard[index].bno) {
            if (fetchedData.data.followBoard[index].course === true) {
                navigate(
                    `/board/course/posting?bno=${fetchedData.data.followBoard[index].bno}`
                )
            } else {
                navigate(
                    `/board/place/posting?bno=${fetchedData.data.followBoard[index].bno}`
                )
            }
        }
    }

    function adDetailView(index: number) {
        if (fetchedData && fetchedData.data.adBoard[index].bno) {
            if (fetchedData.data.adBoard[index].course === true) {
                navigate(
                    `/board/course/posting?bno=${fetchedData.data.adBoard[index].bno}`
                )
            } else {
                navigate(
                    `/board/place/posting?bno=${fetchedData.data.adBoard[index].bno}`
                )
            }
        }
    }

    //searchValue state 변경
    function onSetSearchValue(value: string) {
        setSearchValue(value)
    }

    // filter value state 변경
    function onSetFilterValue(filter: string) {
        setFilterValue(filter)
    }

    // 검색
    async function onSearch(
        e?: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLButtonElement>
    ) {
        if (
            e?.type === 'keydown' &&
            (e as React.KeyboardEvent<HTMLInputElement>).key !== 'Enter'
        ) {
            return
        }
        if (filterValue === 'place') {
            //각 페이지에서 useEffect -> useSelector로 메인페이지 에서 넘어오는 검색값 받아들이는 로직 추가필요 @@희범
            dispatch(setSearchValueFromMain(searchValue))
            navigate(`/board/place`)
        }
        if (filterValue === 'course') {
            dispatch(setSearchValueFromMain(searchValue))
            navigate(`/board/course`)
        }
        if (filterValue === 'user') {
            dispatch(setSearchValueFromMain(searchValue))
            navigate(`/search-user`)
        }
    }

    // 메인 아이템 로딩 useEffect
    const mno = useSelector((state: RootState) => state.login.mno)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await GetMainitemRequest(mno)
                console.log('Fetched data:', data)
                setFetchedData(data)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData()
    }, [mno])

    return (
        <div className="flex justify-center w-full">
            <div className="w-4/5 mt-10 ">
                <div className="flex flex-col items-center justify-center">
                    <div className="flex justify-around w-1/3 py-2 mb-3 bg-green-50 rounded-xl">
                        <MainFilter
                            text="장소"
                            filterChange={onSetFilterValue}
                            color={
                                filterValue === 'place' ? 'bg-lightGreen text-white' : ''
                            }>
                            <FontAwesomeIcon icon={faMapLocationDot} />
                        </MainFilter>
                        <MainFilter
                            text="코스"
                            filterChange={onSetFilterValue}
                            color={
                                filterValue === 'course' ? 'bg-lightGreen text-white' : ''
                            }>
                            <FontAwesomeIcon icon={faRoute} />
                        </MainFilter>
                        <MainFilter
                            text="유저"
                            filterChange={onSetFilterValue}
                            color={
                                filterValue === 'user' ? 'bg-lightGreen text-white' : ''
                            }>
                            <FontAwesomeIcon icon={faUsers} />
                        </MainFilter>
                    </div>
                    <div className="flex justify-center w-full mb-12">
                        <SearchInput
                            value={searchValue}
                            className="w-2/3"
                            onChange={onSetSearchValue}
                            onKeyDown={e => {
                                if (e.key === 'Enter') {
                                    onSearch(e)
                                }
                            }}
                        />
                        <Button
                            className="text-white bg-darkGreen"
                            value={'검색'}
                            onClick={onSearch}
                        />
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="container px-5 py-10 mb-20 rounded-3xl bg-gray-50">
                        <Subtitle
                            className="mb-5 font-bold text-darkGreen"
                            value='" 많은 이들이 극찬한 명소, 그 인기의 이유를 직접 확인하세요 "'
                        />
                        <MainSlider preView={1}>
                            {fetchedData &&
                                fetchedData.data.mostBoardPlace &&
                                fetchedData.data.mostBoardPlace.map(
                                    (mostLiked, index) => (
                                        <SwiperSlide
                                            key={index}
                                            onClick={() => mostLikedDetailView(index)}>
                                            <MostLikedMainItem
                                                title={mostLiked.name}
                                                image={mostLiked.src ?? noImage}
                                            />
                                        </SwiperSlide>
                                    )
                                )}
                        </MainSlider>
                    </div>
                </div>

                <div className="px-5 py-10 mb-20 rounded-3xl bg-emerald-50">
                    <Subtitle
                        className="flex items-start mb-4 ml-16 font-bold text-cyan-600"
                        value="최근 포스팅"
                    />
                    <MainSlider preView={3}>
                        {fetchedData &&
                            fetchedData.data.recentlyBoard &&
                            fetchedData.data.recentlyBoard.map((recently, index) => (
                                <SwiperSlide
                                    key={index}
                                    onClick={() => recentlyDetailView(index)}>
                                    <MainItem
                                        title={recently.title}
                                        image={recently.src ?? noImage}
                                    />
                                </SwiperSlide>
                            ))}
                    </MainSlider>
                </div>

                <div className="px-5 py-10 mb-20 rounded-3xl bg-sky-50">
                    <Subtitle
                        className="flex items-start mb-4 ml-16 font-bold text-cyan-600"
                        value="가장 많은 추천을 받은 코스"
                    />

                    <MainSlider preView={1}>
                        {fetchedData &&
                            fetchedData.data.mostLikeCourse &&
                            fetchedData.data.mostLikeCourse.map((course, index) => (
                                <SwiperSlide key={index}>
                                    <div className="flex">
                                        <MostLikedCourseItem
                                            title={course.title}
                                            image={course.src ?? noImage}
                                        />
                                        <CoursePostMap
                                            className="flex-1 rounded-lg shadow-md"
                                            places={[
                                                {
                                                    name: 'abcd',
                                                    lat: 37.74913611,
                                                    lng: 128.8784972,
                                                    local: 'test',
                                                    eng: 'test',
                                                    road: 'test'
                                                },
                                                {
                                                    name: 'test',
                                                    lat: 38.37796111,
                                                    lng: 128.4701639,
                                                    local: 'aaaa',
                                                    eng: 'aaaa',
                                                    road: 'aaaa'
                                                }
                                            ]}
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                    </MainSlider>
                </div>
                {mno !== null &&
                    fetchedData &&
                    fetchedData.data.followBoard &&
                    fetchedData.data.followBoard.length > 1 && (
                        <div className="px-5 py-10 mb-20 rounded-3xl bg-blue-50">
                            <Subtitle
                                className="flex items-start mb-4 ml-16 font-bold text-cyan-600"
                                value="팔로워들의 게시물"
                            />
                            <MainSlider preView={3}>
                                {fetchedData.data.followBoard.map((follow, index) => (
                                    <SwiperSlide
                                        key={index}
                                        onClick={() => followDetailView(index)}>
                                        <MainItem
                                            title={follow.title}
                                            image={follow.src ?? noImage}
                                        />
                                    </SwiperSlide>
                                ))}
                            </MainSlider>
                        </div>
                    )}
                {mno !== null &&
                    fetchedData &&
                    fetchedData.data.followBoard.length === 0 && (
                        <div className="px-5 py-10 mb-20 rounded-3xl bg-blue-50">
                            <Subtitle
                                className="flex items-start mb-4 ml-16 font-bold text-cyan-600"
                                value="팔로워들의 게시물"
                            />
                            <Subtitle
                                className="mb-5 font-bold text-darkGreen"
                                value='" 팔로잉중인 유저가 없습니다 "'
                            />
                        </div>
                    )}

                {mno === null && (
                    <div className="px-5 py-10 mb-20 rounded-3xl bg-blue-50">
                        <Subtitle
                            className="flex items-start mb-4 ml-16 font-bold text-cyan-600"
                            value="팔로워들의 게시물"
                        />
                        <Subtitle
                            className="mb-5 font-bold text-darkGreen"
                            value='" 로그인을 하여 팔로워들의 게시물을 확인하세요 "'
                        />
                    </div>
                )}

                {fetchedData &&
                    fetchedData.data.adBoard &&
                    fetchedData.data.adBoard.length > 0 && (
                        <div className="px-5 py-10 mb-20 rounded-3xl bg-orange-50">
                            <Subtitle
                                className="flex items-start mb-4 ml-16 font-bold "
                                value="광고"
                            />
                            <MainSlider preView={3}>
                                {fetchedData.data.adBoard.map((ad, index) => (
                                    <SwiperSlide
                                        key={index}
                                        onClick={() => adDetailView(index)}>
                                        <MainItem
                                            title={ad.title}
                                            image={ad.src ?? noImage}
                                        />
                                    </SwiperSlide>
                                ))}
                            </MainSlider>
                        </div>
                    )}
            </div>
        </div>
    )
}
