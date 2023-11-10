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
            <div className="justify-center w-5/6 ">
                <SubTitle text="장소 검색">
                    <SearchInput value={searchValue} onChange={onChangeSearch} />
                </SubTitle>
            </div>
                <div className="flex justify-center w-full h-screen mb-32">
                    <div className="flex w-5/6">
                        <div className="w-2/6 p-3 overflow-y-auto border rounded-lg border--300">
                                {/* 검색 결과를 보여줄 컴포넌트 */}
                                <h2>검색 결과를 보여줄 컴포넌트</h2>
                        </div>
                        <div className="w-4/6 p-3 bg-green-400 border border-gray-300 rounded-lg">
                             {/* MapAPI 컴포넌트 */}
                             <h2>MapAPI 컴포넌트</h2>
                        </div>
                    </div>
                </div>
        </Box>
    )
}
