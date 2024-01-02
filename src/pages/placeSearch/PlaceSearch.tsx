import React, {FC, useState, useEffect} from 'react'
import {Box, SearchInput, SearchInfo, SearchMap, Button} from '../../components/index'

// 장소검색 페이지
//NOTE - dummy값에서 필터링된 배열을 SearchMap에 넘겼는데 지도에는 변화가 없어요.. 검색하기 전과 후로 나눠야될까요??

type PlaceSearchProps = {}

export const PlaceSearch: FC<PlaceSearchProps> = ({}) => {
    // dummy
    const dummy = [
        {
            name: '장소1',
            lat: 37.5666805,
            lng: 126.9784147,
            road: '부산 진구',
            local: '부산 진구',
            eng: 'a',
            rating: 1,
            reviewCount: 3,
            imageUrl: 'Image',
            category: 'SIGHT'
        },
        {
            name: '장소2',
            lat: 37.3595704,
            lng: 127.105399,
            road: 'b',
            local: 'b',
            eng: 'b',
            rating: 3,
            reviewCount: 4,
            imageUrl: 'Image',
            category: 'RESTAURANT'
        },
        {
            name: '장소3',
            lat: 37.2366805,
            lng: 126.1184147,
            road: 'c',
            local: 'c',
            eng: 'c',
            rating: 4,
            reviewCount: 5,
            imageUrl: 'Image',
            category: 'LODGMENT'
        },
        {
            name: '장소4',
            lat: 37.6866805,
            lng: 126.3584147,
            road: 'd',
            local: 'd',
            eng: 'd',
            rating: 2,
            reviewCount: 6,
            imageUrl: 'Image',
            category: 'SIGHT'
        }
    ]
    // dummy
    //검색 값
    const [searchValue, setSearchValue] = useState<string>('')
    const [selectedCategory, setSelectedCategory] = useState<string>('')
    const [matchingPlaces, setMatchingPlaces] = useState<any[]>([])

    // 입력때마다 검색값 업데이트
    function onChangeSearch(value: string) {
        setSearchValue(value)
    }

    function handleCategoryChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedCategory(e.target.value)
    }

    // 더미에서 검색필터 추후 데이터베이스 값으로 바꿔야함
    function filterPlaces(
        e?: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>
    ) {
        //키를 눌렀는데 엔터가 아니면 return
        if (
            e?.type === 'keydown' &&
            (e as React.KeyboardEvent<HTMLInputElement>).key !== 'Enter'
        ) {
            return
        }

        const matches = dummy.filter(
            place =>
                (place.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                    place.road.toLowerCase().includes(searchValue.toLowerCase()) ||
                    place.local.toLowerCase().includes(searchValue.toLowerCase()) ||
                    place.eng.toLowerCase().includes(searchValue.toLowerCase())) &&
                (selectedCategory === '' || place.category === selectedCategory)
        )
        setMatchingPlaces(matches)
    }

    return (
        <Box>
            <div className="flex justify-center w-full mb-10">
                <select
                    className="w-20 border border-gray-300 rounded-xl"
                    value={selectedCategory}
                    onChange={handleCategoryChange}>
                    <option value="">전체</option>
                    <option value="SIGHT">관광지</option>
                    <option value="RESTAURANT">음식점</option>
                    <option value="LODGMENT">숙소</option>
                    <option value="ETC">기타</option>
                </select>
                <SearchInput
                    className="w-2/5 ml-1"
                    value={searchValue}
                    onChange={onChangeSearch}
                    onKeyDown={filterPlaces}
                />
                {/* 클릭시 들고오도록 수정 */}
                <Button
                    onClick={filterPlaces}
                    className="text-white bg-darkGreen"
                    value={'검색'}
                />
            </div>

            <div className="flex justify-center w-full h-screen ">
                <div className="flex w-5/6 h-5/6">
                    <div className="z-0 w-1/2 overflow-y-auto border rounded-lg border--300">
                        {/* 검색 결과를 보여줄 컴포넌트 */}
                        {matchingPlaces.length > 0 &&
                            matchingPlaces.map((place, index) => (
                                <SearchInfo
                                    key={index}
                                    name={place.name}
                                    address={place.local}
                                    rating={place.rating}
                                    imageUrl={place.imageUrl}
                                    reviewCount={place.reviewCount}
                                />
                            ))}
                    </div>
                    <div className="w-1/2 border border-gray-300 rounded-lg">
                        {/* MapAPI 컴포넌트 */}
                        <SearchMap
                            places={matchingPlaces.length > 0 ? matchingPlaces : dummy}
                            className="w-full h-full"
                        />
                    </div>
                </div>
            </div>
        </Box>
    )
}
