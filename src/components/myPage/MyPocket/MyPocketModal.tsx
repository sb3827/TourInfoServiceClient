import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import React, {useState, FC} from 'react'
import {MyLikes, Map, Button} from './../../index'
import {SearchInput} from './../../SearchInput'

type MyPocketModalProps = {}

export const MyPocketModal: FC<MyPocketModalProps> = ({}) => {
    const [showModal, setShowModal] = useState(false)

    const openModal = () => {
        setShowModal(true)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    //검색 값
    const [searchValue, setSearchValue] = useState<string>('')

    //입력때마다 검색값 업데이트
    function onChangeSearch(value: string) {
        setSearchValue(value)
    }

    return (
        <div>
            <button onClick={openModal} className="">
                <FontAwesomeIcon icon={faPlus} className="w-20 h-32 ml-4" />
            </button>

            {showModal ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-500 bg-opacity-75">
                    <div className="w-4/5 p-8 bg-white rounded shadow-lg h-5/6">
                        <button onClick={closeModal}>
                            <FontAwesomeIcon icon={faArrowLeft} className="w-12 h-12" />
                        </button>
                        <div className="flex justify-center">
                            <SearchInput
                                className="w-2/3 mb-4"
                                value={searchValue}
                                onChange={onChangeSearch}
                            />
                        </div>
                        <div className="flex">
                            {/* 더미 데이터 삭제할 예정*/}
                            <div className="w-1/4 mr-4 overflow-y-scroll border h-96">
                                <div className="h-20 bg-yellow-200 border rounded-xl">
                                    장소 1
                                </div>
                                <div className="h-20 bg-yellow-200 border rounded-xl">
                                    장소 1
                                </div>
                                <div className="h-20 bg-yellow-200 border rounded-xl">
                                    장소 1
                                </div>
                                <div className="h-20 bg-yellow-200 border rounded-xl">
                                    장소 1
                                </div>
                                <div className="h-20 bg-yellow-200 border rounded-xl">
                                    장소 1
                                </div>
                                <div className="h-20 bg-yellow-200 border rounded-xl">
                                    장소 1
                                </div>
                            </div>
                            <div className="flex flex-col w-3/4">
                                <div className="flex flex-row mb-4">
                                    <Button
                                        className="w-1/4 h-8"
                                        value="tourist attraction"></Button>
                                    <Button
                                        className="w-1/4 h-8"
                                        value="Restaurant"></Button>
                                    <Button
                                        className="w-1/4 h-8"
                                        value="Accommodation"></Button>
                                </div>
                                <div className="w-5/6 bg-gray-200 border h-80">
                                    <Map width="100%" height="100%"></Map>
                                </div>
                                <div className="flex justify-center">
                                    {/* 별점 조회 컴포넌트 추가 예정 */}
                                    <MyLikes className="w-8 h-8" likeSize="3rem" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    )
}
