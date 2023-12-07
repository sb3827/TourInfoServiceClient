import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import React, {useState, FC} from 'react'
import {
    MyLikes,
    Map,
    Button,
    Box,
    SearchInput,
    SearchInfo,
    SearchMap,
    ChooseMap,
    Input
} from './../../index'

//TODO - zoomControl 중첩 문제 해결
//FIXME - 상백,영현 zoomControl 중첩되는 문제 해결해주세요

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
        }
    ]

    //검색 값
    const [searchValue, setSearchValue] = useState<string>('')
    const [selectedCategory, setSelectedCategory] = useState<string>('')
    const [matchingPlaces, setMatchingPlaces] = useState<any[]>([])
    // 마커 찍은 주소 값
    const [addressValue, setAddressValue] = useState('')
    const [SpotModal, setSpotModal] = useState(false)
    const [RegisterSpotModal, setRegisterSpotModal] = useState(false)

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
        setAddressValue('') // 모달창 닫으면 초기화
    }

    // 등록 버튼 클릭시 장소 이름, 주소 등 데이터 보내기
    const onRegisterPlace = () => {}

    //입력때마다 검색값 업데이트
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
                                className="p-2 border border-gray-300 rounded-xl"
                                value={selectedCategory}
                                onChange={handleCategoryChange}>
                                <option value="">All</option>s
                                <option value="Attraction">Attraction</option>
                                <option value="Restaurant">Restaurant</option>
                                <option value="Accommodation">Accommodation</option>
                            </select>
                            <SearchInput
                                className="flex w-3/5 mr-4"
                                value={searchValue}
                                onChange={onChangeSearch}
                                onKeyDown={handleKeyPress}
                            />
                            {/* 장소 등록하기 버튼 -> 모달창 */}
                            {/* <RegisterPlace /> */}
                        </div>
                        <Box className="w-4/5 overflow-hidden bg-white h-4/5">
                            <div className="flex justify-center w-full h-full ">
                                <div className="flex w-5/6 h-full">
                                    <div className="w-1/4 mr-2 overflow-y-auto border rounded-lg border--300">
                                        {/* 검색 결과를 보여줄 컴포넌트 */}
                                        {matchingPlaces.length > 0 ? (
                                            matchingPlaces.map((place, index) => (
                                                <SearchInfo
                                                    key={index}
                                                    name={place.name}
                                                    address={place.local}
                                                    rating={place.rating}
                                                    imageUrl={place.imageUrl}
                                                    reviewCount={place.reviewCount}
                                                />
                                            ))
                                        ) : (
                                            // <RegisterPlace />
                                            <div>
                                                <div className="flex">
                                                    <button
                                                        onClick={openRegisterSpotModal}
                                                        className="flex justify-center w-full h-40 mt-8 hover:cursor-pointer">
                                                        <FontAwesomeIcon
                                                            icon={faPlus}
                                                            className="w-full h-40"
                                                        />
                                                    </button>
                                                </div>
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
                                                                            icon={
                                                                                faArrowLeft
                                                                            }
                                                                            className="w-12 h-12 cursor-pointer "
                                                                        />
                                                                    </button>
                                                                    <span className="w-24 mr-4 text-3xl">
                                                                        주소
                                                                    </span>
                                                                    <Input
                                                                        className="w-1/2 h-12 mr-8"
                                                                        value={
                                                                            addressValue
                                                                        }
                                                                    />
                                                                    <span className="w-48 mr-4 text-3xl">
                                                                        장소 제목
                                                                    </span>
                                                                    <Input className="w-1/3 mr-8" />
                                                                    <select
                                                                        className="h-12 border border-gray-300 rounded-xl"
                                                                        value={
                                                                            selectedCategory
                                                                        }
                                                                        onChange={
                                                                            handleCategoryChange
                                                                        }>
                                                                        <option value="">
                                                                            All
                                                                        </option>
                                                                        <option value="Attraction">
                                                                            Attraction
                                                                        </option>
                                                                        <option value="Restaurant">
                                                                            Restaurant
                                                                        </option>
                                                                        <option value="Accommodation">
                                                                            Accommodation
                                                                        </option>
                                                                    </select>

                                                                    <Button
                                                                        value="등록하기"
                                                                        className="h-12 ml-4"
                                                                        onClick={
                                                                            closeRegisterSpotModal
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="">
                                                                <ChooseMap
                                                                    onAddressChange={
                                                                        setAddressValue
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : null}
                                            </div>
                                        )}
                                    </div>
                                    <div className="w-4/6 border border-gray-300 rounded-lg">
                                        {/* MapAPI 컴포넌트 */}
                                        <SearchMap
                                            className="w-100%"
                                            places={dummy}
                                            style={{height: '100%'}}
                                        />
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
