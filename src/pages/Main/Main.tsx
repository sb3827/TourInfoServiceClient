import {FC, useState} from 'react'
import {
    SearchInput,
    Subtitle,
    Button,
    MainItem,
    MostLikedCourseItem,
    MostLikedMainItem,
    CoursePostMap,
    MainSlider,
    Logo
} from '../../components'
import dummyPic from '../../dummy data/dummypic.jpg'
import dummyPic2 from '../../dummy data/dummypic2.jpg'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faMapLocationDot, faRoute, faUsers} from '@fortawesome/free-solid-svg-icons'
import MainFilter from '../../components/Main/MainFilter'
import {SwiperSlide} from 'swiper/react'

type MainProps = {}

export const Main: FC<MainProps> = () => {
    const [searchValue, setSearchValue] = useState<string>('')
    const [filterValue, setFilterValue] = useState<string>('place')

    // 검색
    function onSearch(value: string) {
        setSearchValue(value)
        console.log('searchInputValue : ' + filterValue + value)
    }

    // 상세 페이지 이동
    function detailView() {
        alert('상세페이지 이동')
    }

    //filterValue 변경
    function onSetFilterValue(filter: string) {
        setFilterValue(filter)
    }

    return (
        <div className="flex justify-center w-full">
            <div className="w-4/5 mt-10 ">
                <div className="flex flex-col items-center justify-center">
                    <div className="flex justify-around w-1/3 py-2 mb-3 bg-slate-100 rounded-xl">
                        <MainFilter
                            text="장소"
                            filterChange={onSetFilterValue}
                            color={
                                filterValue === 'place' ? 'bg-lightBrown text-white' : ''
                            }>
                            <FontAwesomeIcon
                                icon={faMapLocationDot}
                                color="bg-lightBrown"
                            />
                        </MainFilter>
                        <MainFilter
                            text="코스"
                            filterChange={onSetFilterValue}
                            color={
                                filterValue === 'course' ? 'bg-lightBrown text-white' : ''
                            }>
                            <FontAwesomeIcon icon={faRoute} color="bg-lightBrown" />
                        </MainFilter>
                        <MainFilter
                            text="유저"
                            filterChange={onSetFilterValue}
                            color={
                                filterValue === 'user' ? 'bg-lightBrown text-white' : ''
                            }>
                            <FontAwesomeIcon icon={faUsers} color="bg-lightBrown" />
                        </MainFilter>
                    </div>
                    <div className="flex justify-center w-full mb-12">
                        <SearchInput
                            value={searchValue}
                            className="w-2/3"
                            onChange={onSearch}
                        />
                        <Button className="text-white bg-darkGreen" value={'검색'} />
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <Subtitle
                        className="mb-5 font-bold text-cyan-600"
                        value='" 많은 이들이 극찬한 명소, 그 인기의 이유를 직접 확인하세요 "'
                    />
                    <div className="container mx-10" onClick={detailView}>
                        <div className="w-full h-full mb-20">
                            <MostLikedMainItem
                                title="장소명"
                                description="장소 설명"
                                image={dummyPic}
                            />
                        </div>
                    </div>
                </div>

                <div className="px-5 py-10 mb-20 rounded-3xl bg-emerald-50">
                    <Subtitle
                        className="flex items-start mb-4 ml-16 font-bold text-cyan-600"
                        value="최근 올라온 장소"
                    />
                    <MainSlider preView={3}>
                        <SwiperSlide>
                            <MainItem
                                title="장소명"
                                description="장소 설명"
                                image={dummyPic2}
                                onClick={detailView}
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <MainItem
                                title="장소명"
                                description="장소 설명"
                                image={dummyPic2}
                                onClick={detailView}
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <MainItem
                                title="장소명"
                                description="장소 설명"
                                image={dummyPic2}
                                onClick={detailView}
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <MainItem
                                title="장소명"
                                description="장소 설명"
                                image={dummyPic2}
                                onClick={detailView}
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <MainItem
                                title="장소명"
                                description="장소 설명"
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
                                    description="코스 설명"
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
                                    description="코스 설명"
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
                                description="장소 설명"
                                image={dummyPic2}
                                onClick={detailView}
                            />
                        </SwiperSlide>
                        <SwiperSlide key={2} virtualIndex={2}>
                            <MainItem
                                title="장소명"
                                description="장소 설명"
                                image={dummyPic2}
                                onClick={detailView}
                            />
                        </SwiperSlide>
                        <SwiperSlide key={3} virtualIndex={3}>
                            <MainItem
                                title="장소명"
                                description="장소 설명"
                                image={dummyPic2}
                                onClick={detailView}
                            />
                        </SwiperSlide>
                        <SwiperSlide key={4} virtualIndex={4}>
                            <MainItem
                                title="장소명"
                                description="장소 설명"
                                image={dummyPic2}
                                onClick={detailView}
                            />
                        </SwiperSlide>
                        <SwiperSlide key={5} virtualIndex={5}>
                            <MainItem
                                title="장소명"
                                description="장소 설명"
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
                                description="장소 설명"
                                image={dummyPic2}
                                onClick={detailView}
                            />
                        </SwiperSlide>
                        <SwiperSlide key={2} virtualIndex={2}>
                            <MainItem
                                title="장소명"
                                description="장소 설명"
                                image={dummyPic2}
                                onClick={detailView}
                            />
                        </SwiperSlide>
                        <SwiperSlide key={3} virtualIndex={3}>
                            <MainItem
                                title="장소명"
                                description="장소 설명"
                                image={dummyPic2}
                                onClick={detailView}
                            />
                        </SwiperSlide>
                        <SwiperSlide key={4} virtualIndex={4}>
                            <MainItem
                                title="장소명"
                                description="장소 설명"
                                image={dummyPic2}
                                onClick={detailView}
                            />
                        </SwiperSlide>
                        <SwiperSlide key={5} virtualIndex={5}>
                            <MainItem
                                title="장소명"
                                description="장소 설명"
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
