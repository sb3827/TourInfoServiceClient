import React, {FC, useState, useEffect} from 'react'
import {Box, SearchInput, SearchInfo, SearchMap} from '../../components/index'

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
            category: 'Attraction'
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
            category: 'Restaurant'
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
            category: 'Accommodation'
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
            category: 'Attraction'
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

    //KeyPress
    function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            if (searchValue.trim() === '') {
                setMatchingPlaces([]) // 검색값이 비어있을 때, 결과를 비웁니다.
                // console.log({matchingPlaces})
            } else {
                filterPlaces(searchValue, selectedCategory)
                // console.log({matchingPlaces})
            }
        }
    }
    //Category
    function handleCategoryChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const selectedValue = e.target.value
        if (searchValue.trim() === '') {
            setMatchingPlaces([]) // 검색값이 비어있을 때, 결과를 비웁니다.
        } else {
            setSelectedCategory(selectedValue)
            filterPlaces(searchValue, selectedValue)
        }
    }

    // 더미에서 검색필터 추후 데이터베이스 값으로 바꿔야함
    function filterPlaces(value: string, category: string) {
        const matches = dummy.filter(
            place =>
                (place.name.toLowerCase().includes(value.toLowerCase()) ||
                    place.road.toLowerCase().includes(value.toLowerCase()) ||
                    place.local.toLowerCase().includes(value.toLowerCase()) ||
                    place.eng.toLowerCase().includes(value.toLowerCase())) &&
                (category === '' || place.category === category)
        )
        setMatchingPlaces(matches)
    }

    return (
        <Box>
            <div className="flex justify-center w-3/6 h-15">
                <SearchInput
                    className="w-full mr-2"
                    value={searchValue}
                    onChange={onChangeSearch}
                    onKeyDown={handleKeyPress}
                />

                <select
                    className="p-2 border border-gray-300 rounded-xl"
                    value={selectedCategory}
                    onChange={handleCategoryChange}>
                    <option value="">All</option>
                    <option value="Attraction">Attraction</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Accommodation">Accommodation</option>
                </select>
            </div>

            <div className="flex justify-center w-full h-screen ">
                <div className="flex w-5/6 h-5/6">
                    <div className="w-2/6 overflow-y-auto border rounded-lg border--300">
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
                    <div className="w-4/6 border border-gray-300 rounded-lg">
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
