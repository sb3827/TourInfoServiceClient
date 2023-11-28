import {FC, PropsWithChildren, useState} from 'react'
import {Box, SearchInput, CourseInfo, Slider, Button} from '../../components/index'

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

            {/* 게시글 작성버튼, 추후에 게시글 작성 페이지로 이동하게 만들어야함 */}
            <div className="flex justify-end w-4/6 ">
                <Button value="코스 작성" className="bg-gradient-to-r bg-slate-500" />
            </div>

            {/* 검색 결과 하드코딩*/}
            <div className="justify-center w-4/6 h-screen overflow-y-auto ">
                <CourseInfo
                    title="제목"
                    rating="별점"
                    like="좋아요"
                    imageUrl=" "></CourseInfo>
            </div>
        </Box>
    )
}
