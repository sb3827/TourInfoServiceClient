import {FC, PropsWithChildren, useState} from 'react'
import {Box, SearchInput, CourseInfo} from '../../components/index'

type CourseSearchProps = {}

export const CourseSearch: FC<CourseSearchProps> = () => {
    //검색 값
    const [searchValue, setSearchValue] = useState<string>('')

    //입력때마다 검색값 업데이트
    function onChangeSearch(value: string) {
        setSearchValue(value)
    }

    // 더미 검색 결과 데이터 (7개의 더미 데이터 생성, 테스트를 위한 하드코딩) 추후 배열의 길이로 반복해야함
    const CourseInfos = Array.from({length: 7}, (_, index) => ({
        title: `제목`,
        information: '코스정보',
        id: `id`,
        date: `YYYY-MM-DD`,
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
            <div className="flex justify-center w-full h-screen mb-32">
                <div className="flex w-5/6 h-5/6">
                    <div className="w-full p-3 overflow-y-auto border rounded-lg border--300">
                        {/* 검색 결과를 보여줄 컴포넌트 */}
                        {CourseInfos.map((result, index) => (
                            <CourseInfo
                                title={result.title}
                                information={result.information}
                                id={result.id}
                                date={result.date}
                                imageUrl={result.imageUrl}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </Box>
    )
}
