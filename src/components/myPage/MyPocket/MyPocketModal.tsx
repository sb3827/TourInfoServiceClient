import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import React, {useState, FC, ChangeEvent} from 'react'
import {
    Button,
    Box,
    SearchInput,
    SearchInfo,
    SearchMap,
    ChooseMap,
    Input
} from './../../index'
import {registerPlace} from './../../../api/index'

type MyPocketModalProps = {
    selectedComponent?: number
}

export const MyPocketModal: FC<MyPocketModalProps> = ({selectedComponent}) => {
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
            category: 'LODGMENT'
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
            category: 'SIGHT'
        }
    ]

    //검색 값
    const [searchValue, setSearchValue] = useState<string>('')
    const [selectedCategory, setSelectedCategory] = useState<string>('SIGHT')
    const [matchingPlaces, setMatchingPlaces] = useState<any[]>([])

    const [SpotModal, setSpotModal] = useState(false)
    const [RegisterSpotModal, setRegisterSpotModal] = useState(false)

    // 장소 등록을 위한 값
    const [placeName, setPlaceName] = useState<string>('')
    const [placeRoad, setPlaceRoad] = useState<string>('')
    const [placeLocal, setPlaceLocal] = useState<string>('')
    const [placeEng, setPlaceEng] = useState<string>('')
    const [placeLng, setPlaceLng] = useState<number>(0)
    const [placeLat, setPlaceLat] = useState<number>(0)

    const openSpotModal = () => {
        setSpotModal(true)
    }

    const closeSpotModal = () => {
        setSpotModal(false)
        setSearchValue('')
        setMatchingPlaces([])
    }

    const openRegisterSpotModal = () => {
        setRegisterSpotModal(true)
    }

    const closeRegisterSpotModal = () => {
        setRegisterSpotModal(false)
        setPlaceLocal('') // 모달창 닫으면 초기화
    }

    // 장소 이름
    const onChangePlaceName = (e: ChangeEvent<HTMLInputElement>) => {
        setPlaceName(e.target.value)
    }

    //장소 등록
    async function onRegisterPlace() {
        try {
            await registerPlace({
                name: placeName,
                lng: placeLng,
                lat: placeLat,
                roadAddress: placeRoad,
                localAddress: placeLocal,
                engAddress: placeEng,
                category: selectedCategory
            })
        } catch (err) {
            console.log(err)
        }
    }

    //입력때마다 검색값 업데이트
    function onChangeSearch(value: string) {
        setSearchValue(value)
    }

    function handleCategoryChange(e: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedCategory(e.target.value)
    }

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
        <div>
            <button onClick={openSpotModal} className="">
                <FontAwesomeIcon
                    icon={faPlus}
                    className="w-20 h-32 ml-4 cursor-pointer"
                />
            </button>

            {SpotModal ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-500 bg-opacity-75">
                    <div className="w-4/5 p-8 bg-white rounded shadow-lg h-5/6">
                        <button onClick={closeSpotModal}>
                            <FontAwesomeIcon icon={faArrowLeft} className="w-12 h-12" />
                        </button>
                        <div className="flex justify-center">
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
                            {/* 장소 등록하기 버튼 -> 모달창 */}
                            {/* <RegisterPlace /> */}
                        </div>
                        <Box className="w-4/5 overflow-hidden bg-white h-4/5">
                            <div className="flex justify-center w-full h-full ">
                                <div className="flex w-5/6 h-full">
                                    {/* <div className="z-0 w-1/3 overflow-y-auto border rounded-lg border--300"> */}
                                    <div className="w-1/4 mr-2 overflow-y-auto border rounded-lg border--300">
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

                                        <button
                                            onClick={openRegisterSpotModal}
                                            className="flex justify-center w-full h-40 mt-8 hover:cursor-pointer">
                                            <FontAwesomeIcon
                                                icon={faPlus}
                                                className="w-20 h-40"
                                            />
                                        </button>
                                    </div>
                                    {/* 장소등록 모달 */}
                                    <div>
                                        {RegisterSpotModal ? (
                                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
                                                <div className="w-4/5 p-8 bg-white rounded shadow-lg h-6/7">
                                                    <div className="flex bg-white">
                                                        <div className="flex justify-between w-full mb-8 ">
                                                            <button
                                                                className="mr-12"
                                                                onClick={
                                                                    closeRegisterSpotModal
                                                                }>
                                                                <FontAwesomeIcon
                                                                    icon={faArrowLeft}
                                                                    className="w-12 h-12 cursor-pointer "
                                                                />
                                                            </button>
                                                            <span className="w-24 mr-4 text-3xl">
                                                                주소
                                                            </span>
                                                            <Input
                                                                className="w-1/2 h-12 mr-8"
                                                                value={placeLocal}
                                                            />
                                                            <span className="w-48 mr-4 text-3xl">
                                                                장소 제목
                                                            </span>
                                                            <Input
                                                                className="w-1/3 mr-8"
                                                                onChange={
                                                                    onChangePlaceName
                                                                }
                                                            />
                                                            <select
                                                                className="w-20 border border-gray-300 rounded-xl"
                                                                value={selectedCategory}
                                                                onChange={
                                                                    handleCategoryChange
                                                                }>
                                                                <option value="SIGHT">
                                                                    관광지
                                                                </option>
                                                                <option value="RESTAURANT">
                                                                    음식점
                                                                </option>
                                                                <option value="LODGMENT">
                                                                    숙소
                                                                </option>
                                                                <option value="ETC">
                                                                    기타
                                                                </option>
                                                            </select>

                                                            <Button
                                                                value="등록하기"
                                                                className="h-12 ml-4"
                                                                onClick={() => {
                                                                    onRegisterPlace()
                                                                    closeRegisterSpotModal()
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="">
                                                        <ChooseMap
                                                            onRoadAddressChange={
                                                                setPlaceRoad
                                                            }
                                                            onLocalAddressChange={
                                                                setPlaceLocal
                                                            }
                                                            onEngAddressChange={
                                                                setPlaceEng
                                                            }
                                                            onLngChange={setPlaceLng}
                                                            onLatChange={setPlaceLat}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className="w-4/6 border border-gray-300 rounded-lg">
                                        {!RegisterSpotModal && (
                                            <SearchMap
                                                places={
                                                    matchingPlaces.length > 0
                                                        ? matchingPlaces
                                                        : dummy
                                                }
                                                className="w-full h-full"
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Box>
                    </div>
                </div>
            ) : null}
        </div>
    )
}
