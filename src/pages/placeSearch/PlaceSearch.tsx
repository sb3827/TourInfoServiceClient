import React, {useEffect, useRef, useState} from 'react'
import {
    SearchInput,
    SearchInfo,
    SearchMap,
    Button,
    SearchMapRef,
    LoadingSppinnerSmall,
    Title
} from '../../components/index'
import {PlaceData} from '../../data/placeSearch'
import {getSearchPlaceInfo} from '../../api'
import {useNavigate, useSearchParams} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {RootState} from '../../store/rootReducer'

// 장소 검색 페이지

export const PlaceSearch = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [loading, setLoading] = useState<Boolean>(false)

    // 새로고침에 필요한 값 불러오기
    const searchMapRef = useRef<SearchMapRef | null>(null)

    // URL 쿼리 파라미터에서 초기 값 설정
    const initialFilter = searchParams.get('filter') || ''
    const initialSearch = searchParams.get('search') || ''

    // 로컬 상태
    const [selectedCategory, setSelectedCategory] = useState<string>(initialFilter)
    const [searchValue, setSearchValue] = useState<string>(initialSearch)
    const [placeInfoData, setPlaceInfoData] = useState<PlaceData[] | null>(null)

    const navigate = useNavigate()
    const user = useSelector((state: RootState) => state.login.mno)!

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
            setLoading(true)
            setSearchParams({filter: selectedCategory, search: searchValue})
            const data = await getSearchPlaceInfo(selectedCategory, searchValue)
            setPlaceInfoData(data)
            setLoading(false)
        } catch (err) {
            console.error('Error fetching data:', err)
            setLoading(false)
        }
    }

    useEffect(() => {
        onPlaceList()
    }, [])

    const handleRegisterClick = () => {
        navigate(`/board/place/posting/register`)
    }

    return (
        <div className="flex flex-col items-center justify-center w-full py-0 mt-14">
            <Title className="mb-5 text-darkGreen">장소 게시판</Title>

            <div className="flex justify-center w-2/3">
                <div className="flex w-full">
                    <select
                        className="px-2 border-2 shadow-xl outline-none border-lightGreen rounded-2xl"
                        value={selectedCategory}
                        onChange={handleCategoryChange}>
                        <option value="">전체</option>
                        <option value="SIGHT">관광지</option>
                        <option value="RESTAURANT">음식점</option>
                        <option value="LODGMENT">숙소</option>
                        <option value="ETC">기타</option>
                    </select>
                    <SearchInput
                        className="w-4/5 m-0"
                        value={searchValue}
                        onChange={onChangeSearch}
                        onKeyDown={onPlaceList}
                        placeholder="장소 검색"
                    />
                    <Button
                        onClick={onPlaceList}
                        className="text-white shadow-xl bg-darkGreen"
                        value={'검색'}
                    />
                </div>
                {user && (
                    <Button
                        onClick={handleRegisterClick}
                        className="text-white shadow-xl bg-lightGreen"
                        value={'게시글 작성'}
                    />
                )}
            </div>

            <div className="flex justify-center w-full h-screen py-5 mb-12">
                <div className="relative flex w-2/3 h-full ">
                    {loading && <LoadingSppinnerSmall />}
                    <div className="w-1/3 overflow-y-auto border rounded-lg border--300 border-lightGreen">
                        {/* 검색 결과를 보여줄 컴포넌트 */}
                        {placeInfoData && placeInfoData.length > 0 ? (
                            placeInfoData.map((data: PlaceData, index) => (
                                <SearchInfo
                                    key={index}
                                    placeInfoData={data}
                                    mapClick={() => onMap(index)}
                                />
                            ))
                        ) : (
                            <div className="flex items-center justify-center h-full ">
                                <p className="text-lg font-semibold">
                                    검색 결과가 없습니다...
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="w-2/3 border rounded-lg border-lightGreen ">
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
        </div>
    )
}
