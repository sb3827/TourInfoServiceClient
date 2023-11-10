import React, {FC, useState} from 'react'
import {Box, SearchInput, SubTitle, SubBox, FindBox} from '../../components/index'

type FindBoxProps = {}

// 장소검색 페이지

type ManagerProps = {}

export const PlaceSearch: FC<ManagerProps> = ({}) => {
    //검색 값
    const [searchValue, setSearchValue] = useState<string>('')

    //입력때마다 검색값 업데이트
    function onChangeSearch(value: string) {
        setSearchValue(value)
    }

    return (
        <Box>
            <div className="w-2/3 ml-4 ">
                <SubTitle text="장소 검색">
                    <SearchInput value={searchValue} onChange={onChangeSearch} />
                </SubTitle>
                <SubBox />
            </div>
        </Box>
    )
}
