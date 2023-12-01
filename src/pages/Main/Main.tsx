import {FC, useState} from 'react'
import {SearchInput, Slider, Title, Subtitle} from '../../components'
import dummyPic from '../../dummy data/dummypic.jpg'
import dummyPic2 from '../../dummy data/dummypic2.jpg'
import {MainItem, MostLikedMainItem, MostLikedCourseItem, Footer} from './index'

type MainProps = {}

export const Main: FC<MainProps> = () => {
    const [searchValue, setSearchValue] = useState('')

    // 검색
    function onSearch(value: string) {
        setSearchValue(value)
        console.log('searchInputValue : ' + value)
    }

    // 상세 페이지 이동
    function detailView() {
        alert('상세페이지 이동')
    }

    return (
        <div>
            <div className="mt-10">
                <Title>야! 먹고놀자</Title>
                <div>
                    <SearchInput
                        value={searchValue}
                        className="m-10"
                        onChange={onSearch}
                    />
                </div>
                <div className="flex flex-col items-center">
                    <Subtitle className="block mx-10 mb-5 font-bold text-left text-cyan-600">
                        "많은 이들이 극찬한 명소, 그 인기의 이유를 직접 확인하세요"
                    </Subtitle>
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

                <div className="flex flex-col mx-10 mb-40 ">
                    <Subtitle className="flex items-start mt-10 mb-4 font-bold text-cyan-600">
                        최근 올라온 장소
                    </Subtitle>
                    <Slider>
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            <MainItem
                                title="장소명"
                                description="장소 설명"
                                image={dummyPic2}
                                onClick={detailView}
                            />
                            <MainItem
                                title="장소명"
                                description="장소 설명"
                                image={dummyPic2}
                                onClick={detailView}
                            />
                            <MainItem
                                title="장소명"
                                description="장소 설명"
                                image={dummyPic2}
                                onClick={detailView}
                            />
                            <MainItem
                                title="장소명"
                                description="장소 설명"
                                image={dummyPic2}
                                onClick={detailView}
                            />
                        </div>
                        <div>content2</div>
                    </Slider>
                </div>

                <div className="flex flex-col mx-10 mb-40">
                    <Subtitle className="flex items-start mt-10 mb-4 font-bold text-cyan-600">
                        가장 많은 추천을 받은 코스
                    </Subtitle>
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        <MostLikedCourseItem
                            title="첫째 날"
                            description="코스 설명"
                            image={dummyPic2}
                            onClick={detailView}
                        />
                        <MostLikedCourseItem
                            title="둘째 날"
                            description="코스 설명"
                            image={dummyPic2}
                            onClick={detailView}
                        />
                        <MostLikedCourseItem
                            title="셋째 날"
                            description="코스 설명"
                            image={dummyPic2}
                            onClick={detailView}
                        />
                    </div>
                </div>

                <div className="flex flex-col mx-10 mb-40 ">
                    <Subtitle className="flex items-start mt-10 mb-4 font-bold text-cyan-600">
                        팔로워들의 게시물
                    </Subtitle>
                    <Slider>
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            <MainItem
                                title="장소명"
                                description="장소 설명"
                                image={dummyPic2}
                                onClick={detailView}
                            />
                            <MainItem
                                title="장소명"
                                description="장소 설명"
                                image={dummyPic2}
                                onClick={detailView}
                            />
                            <MainItem
                                title="장소명"
                                description="장소 설명"
                                image={dummyPic2}
                                onClick={detailView}
                            />
                            <MainItem
                                title="장소명"
                                description="장소 설명"
                                image={dummyPic2}
                                onClick={detailView}
                            />
                        </div>
                        <div>content2</div>
                    </Slider>
                </div>
                <div className="bg-orange-50 h-150">
                    <div className="flex flex-col mx-10 mb-40 ">
                        <Subtitle className="flex items-start mt-10 mb-4 font-bold ">
                            광고
                        </Subtitle>
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            <MainItem
                                title="장소명"
                                description="장소 설명"
                                image={dummyPic2}
                                onClick={detailView}
                            />
                            <MainItem
                                title="장소명"
                                description="장소 설명"
                                image={dummyPic2}
                                onClick={detailView}
                            />
                            <MainItem
                                title="장소명"
                                description="장소 설명"
                                image={dummyPic2}
                                onClick={detailView}
                            />
                            <MainItem
                                title="장소명"
                                description="장소 설명"
                                image={dummyPic2}
                                onClick={detailView}
                            />
                        </div>
                    </div>
                    <Footer></Footer>
                </div>
            </div>
        </div>
    )
}
