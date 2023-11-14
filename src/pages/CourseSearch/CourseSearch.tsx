import {FC, PropsWithChildren, useState} from 'react'
import {Box, SearchInput} from '../../components/index'
import {SearchResult} from '../placeSearch/index'

type CourseSearchProps = {}

export const CourseSearch: FC<CourseSearchProps> = () => {
    //검색 값
    const [searchValue, setSearchValue] = useState<string>('')

    //입력때마다 검색값 업데이트
    function onChangeSearch(value: string) {
        setSearchValue(value)
    }

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
                        <SearchResult text="코스" />
                    </div>
                </div>
            </div>
        </Box>
    )
}
