import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import {
    Button,
    Box,
    SearchInput,
    SearchInfo,
    SearchMap,
    ChooseMap,
    Input,
    SearchMapRef
} from './../../index'
import {PlaceData} from './../../../data/placeSearch'
import {registerPlace} from './../../../api/index'
import {getSearchPlaceInfo} from './../../../api'
import React, {
    useState,
    FC,
    ChangeEvent,
    useRef,
    forwardRef,
    useImperativeHandle,
    Ref
} from 'react'

// 컴포넌트 className 값
type InputPlaceProps = {
    className?: string
    ref?: Ref<PnoRef>
}

export type PnoRef = {
    getPno: number
}

export const InputPlace: FC<InputPlaceProps> = forwardRef<PnoRef, InputPlaceProps>(
    ({className}, ref) => {
        const [searchValue, setSearchValue] = useState<string>('')
        const [selectedCategory, setSelectedCategory] = useState<string>('') // 장소 검색할때 category
        const [placeInfoData, setPlaceInfoData] = useState<PlaceData[] | null>(null) // 장소 검색 결과
        const searchMapRef = useRef<SearchMapRef | null>(null)
        const [RegisterSpotModal, setRegisterSpotModal] = useState(false)

        // 장소 등록을 위한 값
        const [placeName, setPlaceName] = useState<string>('')
        const [placeRoad, setPlaceRoad] = useState<string>('')
        const [placeLocal, setPlaceLocal] = useState<string>('')
        const [placeEng, setPlaceEng] = useState<string>('')
        const [placeLng, setPlaceLng] = useState<number>(0)
        const [placeLat, setPlaceLat] = useState<number>(0)
        const [selectedSpotCategory, setSelectedSpotCategory] = useState<string>('SIGHT') // 장소 등록할때 category

        const [pno, setPno] = useState<number>(0)

        useImperativeHandle(ref, () => ({
            getPno: pno
        }))

        // 장소 등록 모달
        const openRegisterSpotModal = () => {
            setRegisterSpotModal(true)
        }

        const closeRegisterSpotModal = () => {
            setRegisterSpotModal(false)
            setPlaceLocal('') // 모달창 닫으면 초기화
        }

        function onMap(index: number) {
            searchMapRef.current?.setLocation(index)
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
                    category: selectedSpotCategory
                })
                alert('등록 완료')
            } catch (err) {
                console.log(err)
            }
        }

        //입력때마다 검색값 업데이트
        function onChangeSearch(value: string) {
            setSearchValue(value)
        }

        // 장소 검색 category
        function handleCategoryChange(e: React.ChangeEvent<HTMLSelectElement>) {
            setSelectedCategory(e.target.value)
        }

        // 장소 등록 category
        function handleSpotCategoryChange(e: React.ChangeEvent<HTMLSelectElement>) {
            setSelectedSpotCategory(e.target.value)
        }

        async function onPlaceList(
            e?:
                | React.KeyboardEvent<HTMLInputElement>
                | React.MouseEvent<HTMLButtonElement>
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
            <div className={className}>
                <div className="w-full h-screen p-8 bg-white border rounded">
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
                            onKeyDown={onPlaceList}
                        />
                        {/* 클릭시 들고오도록 수정 */}
                        <Button
                            onClick={onPlaceList}
                            className="text-white bg-darkGreen"
                            value={'검색'}
                        />

                        {/* 장소 등록하기 버튼 -> 모달창 */}
                    </div>
                    <Box className="w-4/5 overflow-hidden bg-white h-4/5">
                        <div className="flex justify-center w-full h-full ">
                            <div className="flex w-full h-full ">
                                {/* <div className="z-0 w-1/3 overflow-y-auto border rounded-lg border--300"> */}
                                <div className="w-1/3 mr-2 overflow-y-auto border rounded-lg border--300">
                                    {/* 검색 결과를 보여줄 컴포넌트 */}
                                    {placeInfoData &&
                                        placeInfoData.map((data: PlaceData, index) => (
                                            <SearchInfo
                                                placeInfoData={data}
                                                mapClick={() => {
                                                    onMap(index)
                                                    setPno(data.pno)
                                                }}
                                            />
                                        ))}

                                    {/* 클릭시 장소등록 모달 열림, 장소등록 버튼 (수정하셔도 됩니다) */}
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
                                                            onChange={onChangePlaceName}
                                                        />
                                                        <select
                                                            className="w-20 border border-gray-300 rounded-xl"
                                                            value={selectedSpotCategory}
                                                            onChange={
                                                                handleSpotCategoryChange
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
                                                        onRoadAddressChange={setPlaceRoad}
                                                        onLocalAddressChange={
                                                            setPlaceLocal
                                                        }
                                                        onEngAddressChange={setPlaceEng}
                                                        onLngChange={setPlaceLng}
                                                        onLatChange={setPlaceLat}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ) : null}
                                </div>
                                <div className="w-4/6 border border-gray-300 rounded-lg">
                                    {!RegisterSpotModal &&
                                        (placeInfoData ? (
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
                                        ))}
                                </div>
                            </div>
                        </div>
                    </Box>
                </div>
            </div>
        )
    }
)
