import React, {FC, useState} from 'react'
import {
    Box,
    SearchInput,
    Map,
    SearchInfo,
    Button,
    SearchMap
} from '../../components/index'

// 장소검색 페이지

type PlaceSearchProps = {}

export const PlaceSearch: FC<PlaceSearchProps> = ({}) => {
    const dummy = [
        {
            name: '장소1',
            lat: 37.5666805,
            lng: 126.9784147,
            road: 'a',
            local: 'a',
            eng: 'a'
        },
        {
            name: '장소2',
            lat: 37.3595704,
            lng: 127.105399,
            road: 'b',
            local: 'b',
            eng: 'b'
        },
        {
            name: '장소3',
            lat: 37.2366805,
            lng: 126.1184147,
            road: 'c',
            local: 'c',
            eng: 'c'
        },
        {
            name: '장소4',
            lat: 37.6866805,
            lng: 126.3584147,
            road: 'd',
            local: 'd',
            eng: 'd'
        }
    ]
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
            <div className="flex justify-center w-3/6 h-20 ">
                <Button
                    value="Tourist Attraction"
                    className="bg-gradient-to-r bg-slate-400"
                />
                <Button value="Restaurant" className="bg-gradient-to-r bg-slate-400" />
                <Button value="Accommodation" className="bg-gradient-to-r bg-slate-400" />
            </div>

            <div className="flex justify-center w-full h-screen ">
                <div className="flex w-5/6 h-5/6">
                    <div className="w-2/6 overflow-y-auto border rounded-lg border--300">
                        {/* 검색 결과를 보여줄 컴포넌트 */}
                        <SearchInfo
                            name="장소"
                            address="주소"
                            rating={4}
                            imageUrl="이미지"
                            reviewCount={5}
                        />
                    </div>
                    <div className="w-4/6 border border-gray-300 rounded-lg">
                        {/* MapAPI 컴포넌트 */}
                        <SearchMap places={dummy}></SearchMap>
                    </div>
                </div>
            </div>
        </Box>
    )
}
