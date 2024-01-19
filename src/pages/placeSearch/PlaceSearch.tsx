import React, {FC, useEffect, useRef, useState} from 'react'
import {
    Box,
    SearchInput,
    SearchInfo,
    SearchMap,
    Button,
    SearchMapRef
} from '../../components/index'
import {PlaceData} from '../../data/placeSearch'
import {getSearchPlaceInfo} from '../../api'
import {useSearchParams} from 'react-router-dom'

// 장소 검색 페이지

export const PlaceSearch = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    // 새로고침에 필요한 값 불러오기
    const searchMapRef = useRef<SearchMapRef | null>(null)

    // URL 쿼리 파라미터에서 초기 값 설정
    const initialFilter = searchParams.get('filter') || ''
    const initialSearch = searchParams.get('search') || ''

    // 로컬 상태
    const [selectedCategory, setSelectedCategory] = useState<string>(initialFilter)
    const [searchValue, setSearchValue] = useState<string>(initialSearch)
    const [placeInfoData, setPlaceInfoData] = useState<PlaceData[] | null>(null)

    function onMap(index: number) {
        searchMapRef.current?.setLocation(index)
    }

    // 입력때마다 검색값 업데이트
    function onChangeSearch(value: string) {
        setSearchValue(value)
    }

    //장소 검색 Category 값 업데이트
    function handleCategoryChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedCategory(e.target.value)
    }

    // 검색 파라미터 변경 시 URL 업데이트 및 데이터 들고오기
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
            setSearchParams({filter: selectedCategory, search: searchValue})
            const data = await getSearchPlaceInfo(selectedCategory, searchValue)
            setPlaceInfoData(data)
            console.log(data)
        } catch (err) {
            console.log(err)
            alert('서버와 연결이 끊겼습니다.')
        }
    }

    useEffect(() => {
        onPlaceList()
    }, [])

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
                    <div className="w-1/2 overflow-y-auto border rounded-lg border--300">
                        {/* 검색 결과를 보여줄 컴포넌트 */}
                        {placeInfoData &&
                            placeInfoData.map((data: PlaceData, index) => (
                                <SearchInfo
                                    placeInfoData={data}
                                    mapClick={() => onMap(index)}
                                />
                            ))}
                    </div>
                    <div className="w-1/2 border border-gray-300 rounded-lg">
                        {/* MapAPI 컴포넌트 */}
                        {placeInfoData ? (
                            <SearchMap
                                places={placeInfoData}
                                className="w-full h-full"
                                innerRef={searchMapRef}
                            />
                        ) : (
                            <SearchMap
                                places={null}
                                className="w-full h-full"
                                innerRef={searchMapRef}
                            />
                        )}
                    </div>
                </div>
            </div>
        </Box>
    )
}
