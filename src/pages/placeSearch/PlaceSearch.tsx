import React, {FC, useState} from 'react'
import {Box, SearchInput, Map} from '../../components/index'
import { SearchResult } from "./index";

// 장소검색 페이지

type PlaceSearchProps = {}

export const PlaceSearch: FC<PlaceSearchProps> = ({}) => {
    //검색 값
    const [searchValue, setSearchValue] = useState<string>('')

    //입력때마다 검색값 업데이트
    function onChangeSearch(value: string) {
        setSearchValue(value)
    }

    return (
        <Box>
            <SearchInput
                        className="w-5/6 mb-4"
                        value={searchValue}
                        onChange={onChangeSearch}
                    />                  
            <div className="flex justify-center w-full h-screen mb-32">
                <div className="flex w-5/6 h-5/6">
                    <div className="w-2/6 p-3 overflow-y-auto border rounded-lg border--300">
                        {/* 검색 결과를 보여줄 컴포넌트 */}
                        <SearchResult text="장소"/>
                    </div>
                    <div className="w-4/6 p-3 border border-gray-300 rounded-lg">
                        {/* MapAPI 컴포넌트 */}
                        <Map width="100%" height="100%"></Map>
                    </div>
                </div>
            </div>
        </Box>
    )
}
