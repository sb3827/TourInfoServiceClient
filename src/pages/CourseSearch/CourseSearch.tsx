import {FC, PropsWithChildren, useState} from 'react'
import {Box, SearchInput, CourseInfo, Slider} from '../../components/index'

type CourseSearchProps = {}

export const CourseSearch: FC<CourseSearchProps> = () => {
    //검색 값
    const [searchValue, setSearchValue] = useState<string>('')

    //입력때마다 검색값 업데이트
    function onChangeSearch(value: string) {
        setSearchValue(value)
    }

    // 더미 검색 결과 데이터 (7개의 더미 데이터 생성, 테스트를 위한 하드코딩) 추후 배열의 길이로 반복해야함
    const CourseImageInfos = Array.from({length: 3}, (_, index) => ({
        imageUrl: `이미지` // 더미 이미지 URL로 대체 가능
    }))
    // 더미 데이터

    return (
        <Box>
            <SearchInput
                className="w-4/6 mb-4"
                value={searchValue}
                onChange={onChangeSearch}
            />
            {/* 검색 결과 하드코딩*/}
            <div className="justify-center w-5/6 h-screen overflow-y-auto ">
                <div className="flex w-full h-64">
                    <div className="w-1/3 h-64 ">
                        <Slider>
                            {CourseImageInfos.map((result, index) => (
                                <CourseInfo imageUrl={result.imageUrl} />
                            ))}
                        </Slider>
                    </div>
                    <div className="w-2/3">
                        <CourseInfo
                            title="제목1"
                            information="정보"
                            id="id"
                            date="YYYY-MM-DD"
                        />
                    </div>
                </div>

                <div className="flex w-full h-64">
                    <div className="w-1/3 h-64 ">
                        <Slider>
                            {CourseImageInfos.map((result, index) => (
                                <CourseInfo imageUrl={result.imageUrl} />
                            ))}
                        </Slider>
                    </div>
                    <div className="w-2/3">
                        <CourseInfo
                            title="제목2"
                            information="정보"
                            id="id"
                            date="YYYY-MM-DD"
                        />
                    </div>
                </div>

                <div className="flex w-full h-64">
                    <div className="w-1/3 h-64 ">
                        <Slider>
                            {CourseImageInfos.map((result, index) => (
                                <CourseInfo imageUrl={result.imageUrl} />
                            ))}
                        </Slider>
                    </div>
                    <div className="w-2/3">
                        <CourseInfo
                            title="제목3"
                            information="정보"
                            id="id"
                            date="YYYY-MM-DD"
                        />
                    </div>
                </div>

                <div className="flex w-full h-64">
                    <div className="w-1/3 h-64 ">
                        <Slider>
                            {CourseImageInfos.map((result, index) => (
                                <CourseInfo imageUrl={result.imageUrl} />
                            ))}
                        </Slider>
                    </div>
                    <div className="w-2/3">
                        <CourseInfo
                            title="제목4"
                            information="정보"
                            id="id"
                            date="YYYY-MM-DD"
                        />
                    </div>
                </div>
                {/* 검색 결과 하드코딩*/}
            </div>
        </Box>
    )
}
