import React, {FC, useState, useEffect} from 'react'
import {Box, SearchInput, SearchInfo, SearchMap, Button} from '../../components/index'
import {PlaceData} from '../../data/placeSearch'
import {getSearchPlaceInfo} from '../../api'
import {useSelector} from 'react-redux'

// 장소 검색 페이지

export const PlaceSearch = () => {
    //검색 값
    const [searchValue, setSearchValue] = useState<string>('')
    const [selectedCategory, setSelectedCategory] = useState<string>('')

    // 검색 결과 데이터
    const [placeInfoData, setPlaceInfoData] = useState<PlaceData[] | null>(null)

    // 입력때마다 검색값 업데이트
    function onChangeSearch(value: string) {
        setSearchValue(value)
    }

    //장소 검색 Category 값 업데이트
    function handleCategoryChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedCategory(e.target.value)
    }

    async function onPlaceList(
        e?: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>
    ) {
        //키보드로 입력이 들어왔는데 Enter가 아닌경우 return
        if (
            e?.type === 'keydown' &&
            (e as React.KeyboardEvent<HTMLInputElement>).key !== 'Enter'
        ) {
            return
        }

        try {
            const data = await getSearchPlaceInfo(selectedCategory, searchValue)
            setPlaceInfoData(data)
            console.log(data)
        } catch (err) {
            console.log(err)
            alert('서버와 연결이 끊겼습니다.')
        }
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
                    onKeyDown={onPlaceList}
                />
                <Button
                    onClick={onPlaceList}
                    className="text-white bg-darkGreen"
                    value={'검색'}
                />
            </div>

            <div className="flex justify-center w-full h-screen ">
                <div className="flex w-5/6 h-5/6">
                    <div className="z-0 w-1/2 overflow-y-auto border rounded-lg border--300">
                        {/* 검색 결과를 보여줄 컴포넌트 */}
                        {placeInfoData &&
                            placeInfoData.map((data: PlaceData) => (
                                <SearchInfo placeInfoData={data} />
                            ))}
                    </div>
                    <div className="w-1/2 border border-gray-300 rounded-lg">
                        {/* MapAPI 컴포넌트 */}
                        {placeInfoData && (
                            <SearchMap places={placeInfoData} className="w-full h-full" />
                        )}
                    </div>
                </div>
            </div>
        </Box>
    )
}
