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
import dummyPic from '../../dummy data/dummypic.jpg'
import dummyPic2 from '../../dummy data/dummypic2.jpg'
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
    async function detailView() {
        alert('상세페이지 이동')
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
                    <Subtitle
                        className="mb-5 font-bold text-cyan-600"
                        value='" 많은 이들이 극찬한 명소, 그 인기의 이유를 직접 확인하세요 "'
                    />
                    <div className="container mx-10" onClick={detailView}>
                        <div className="w-full h-full mb-20">
                            {fetchedData && fetchedData.data.mostBoardPlace && (
                                <MostLikedMainItem
                                    title={fetchedData.data.mostBoardPlace[0].name}
                                    image={
                                        fetchedData.data.mostBoardPlace[0].src ?? dummyPic
                                    }
                                />
                            )}
                        </div>
                    </div>
                </div>

                <div className="px-5 py-10 mb-20 rounded-3xl bg-emerald-50">
                    <Subtitle
                        className="flex items-start mb-4 ml-16 font-bold text-cyan-600"
                        value="최근 포스팅"
                    />
                    <MainSlider preView={3}>
                        <SwiperSlide>
                            {fetchedData && fetchedData.data.recentlyBoard && (
                                <MainItem
                                    title={fetchedData.data.recentlyBoard[0].title}
                                    image={
                                        fetchedData.data.recentlyBoard[0].src ?? dummyPic
                                    }
                                    onClick={detailView}
                                />
                            )}
                        </SwiperSlide>
                        <SwiperSlide>
                            <MainItem
                                title="장소명"
                                image={dummyPic2}
                                onClick={detailView}
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <MainItem
                                title="장소명"
                                image={dummyPic2}
                                onClick={detailView}
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <MainItem
                                title="장소명"
                                image={dummyPic2}
                                onClick={detailView}
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <MainItem
                                title="장소명"
                                image={dummyPic2}
                                onClick={detailView}
                            />
                        </SwiperSlide>
                    </MainSlider>
                </div>

                <div className="px-5 py-10 mb-20 rounded-3xl bg-sky-50">
                    <Subtitle
                        className="flex items-start mb-4 ml-16 font-bold text-cyan-600"
                        value="가장 많은 추천을 받은 코스"
                    />

                    <MainSlider preView={1}>
                        <SwiperSlide>
                            <div className="flex">
                                <MostLikedCourseItem
                                    title="제목"
                                    image={dummyPic2}
                                    onClick={detailView}
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
                        <SwiperSlide>
                            <div className="flex">
                                <MostLikedCourseItem
                                    title="제목"
                                    image={dummyPic2}
                                    onClick={detailView}
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
                    </MainSlider>
                </div>

                <div className="px-5 py-10 mb-20 rounded-3xl bg-blue-50">
                    <Subtitle
                        className="flex items-start mb-4 ml-16 font-bold text-cyan-600"
                        value="팔로워들의 게시물"
                    />
                    <MainSlider preView={3}>
                        <SwiperSlide key={1} virtualIndex={1}>
                            <MainItem
                                title="장소명"
                                image={dummyPic2}
                                onClick={detailView}
                            />
                        </SwiperSlide>
                        <SwiperSlide key={2} virtualIndex={2}>
                            <MainItem
                                title="장소명"
                                image={dummyPic2}
                                onClick={detailView}
                            />
                        </SwiperSlide>
                        <SwiperSlide key={3} virtualIndex={3}>
                            <MainItem
                                title="장소명"
                                image={dummyPic2}
                                onClick={detailView}
                            />
                        </SwiperSlide>
                        <SwiperSlide key={4} virtualIndex={4}>
                            <MainItem
                                title="장소명"
                                image={dummyPic2}
                                onClick={detailView}
                            />
                        </SwiperSlide>
                        <SwiperSlide key={5} virtualIndex={5}>
                            <MainItem
                                title="장소명"
                                image={dummyPic2}
                                onClick={detailView}
                            />
                        </SwiperSlide>
                    </MainSlider>
                </div>
                <div className="px-5 py-10 mb-20 rounded-3xl bg-orange-50">
                    <Subtitle
                        className="flex items-start mb-4 ml-16 font-bold "
                        value="광고"
                    />
                    <MainSlider preView={3}>
                        <SwiperSlide key={1} virtualIndex={1}>
                            <MainItem
                                title="장소명"
                                image={dummyPic2}
                                onClick={detailView}
                            />
                        </SwiperSlide>
                        <SwiperSlide key={2} virtualIndex={2}>
                            <MainItem
                                title="장소명"
                                image={dummyPic2}
                                onClick={detailView}
                            />
                        </SwiperSlide>
                        <SwiperSlide key={3} virtualIndex={3}>
                            <MainItem
                                title="장소명"
                                image={dummyPic2}
                                onClick={detailView}
                            />
                        </SwiperSlide>
                        <SwiperSlide key={4} virtualIndex={4}>
                            <MainItem
                                title="장소명"
                                image={dummyPic2}
                                onClick={detailView}
                            />
                        </SwiperSlide>
                        <SwiperSlide key={5} virtualIndex={5}>
                            <MainItem
                                title="장소명"
                                image={dummyPic2}
                                onClick={detailView}
                            />
                        </SwiperSlide>
                    </MainSlider>
                </div>
            </div>
        </div>
    )
}
