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
                className="flex w-3/6 mb-4"
                value={searchValue}
                onChange={onChangeSearch}
            />

            {/* 검색 결과 하드코딩*/}
            <div className="justify-center w-4/6 h-screen overflow-y-auto ">
                <CourseInfo
                    title="제목"
                    rating="별점"
                    likeCount="좋아요 수"
                    imageUrl="https://ak-d.tripcdn.com/images/0104112000arpecetF935_D_560_420.jpg"></CourseInfo>
                <CourseInfo
                    title="제목"
                    rating="별점"
                    likeCount="좋아요 수"
                    imageUrl="https://ak-d.tripcdn.com/images/0104112000arpecetF935_D_560_420.jpg"></CourseInfo>
            </div>
        </Box>
    )
}
