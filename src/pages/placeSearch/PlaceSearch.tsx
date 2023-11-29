import React, {FC, useState} from 'react'
import {Box, SearchInput, Map, SearchInfo, Button} from '../../components/index'

// 장소검색 페이지

type PlaceSearchProps = {}

export const PlaceSearch: FC<PlaceSearchProps> = ({}) => {
    //검색 값
    const [searchValue, setSearchValue] = useState<string>('')

    //입력때마다 검색값 업데이트
    function onChangeSearch(value: string) {
        setSearchValue(value)
    }

    // 더미 검색 결과 데이터 (7개의 더미 데이터 생성)
    const searchResults = Array.from({length: 7}, (_, index) => ({
        name: `장소 ${index + 1}`,
        address: `주소`,
        rating: `별점`,
        imageUrl: `이미지 URL`, // 더미 이미지 URL로 대체 가능
        reviewCount: `리뷰 수`
    }))
    // 더미 데이터

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
                        {/* 더미 검색 결과에 대해 SearchResult 컴포넌트 여러 번 렌더링 */}
                        {searchResults.map(result => (
                            <SearchInfo
                                name={result.name}
                                address={result.address}
                                rating={result.rating}
                                imageUrl={result.imageUrl}
                                reviewCount={result.reviewCount}
                            />
                        ))}
                    </div>
                    <div className="w-4/6 border border-gray-300 rounded-lg">
                        {/* MapAPI 컴포넌트 */}
                        <Map width="100%" height="100%"></Map>
                    </div>
                </div>
            </div>
        </Box>
    )
}
