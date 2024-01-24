import React, {FC, useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser, faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import {MyFollowerBox} from './MyFollowerBox'
import {MyFollowingBox} from './MyFollowingBox'
import {Subtitle} from './../../Texts'
import {useParams} from 'react-router-dom'

type ShowFollowModalProps = {
    following: string
    follower: string
}

export const ShowFollowModal: FC<ShowFollowModalProps> = ({following, follower}) => {
    const [showModal, setShowModal] = useState(false)
    const {mno} = useParams()

    // 모달을 열거나 닫는 함수
    const openModal = () => {
        setShowModal(true)
    }
    const closeModal = () => {
        setShowModal(false)
    }

    return (
        <div>
            <div className="inline-block">
                <button onClick={openModal} className="mr-4">
                    <FontAwesomeIcon
                        icon={faUser}
                        className="w-8 h-8 mr-3 cursor-pointer"
                    />
                </button>
                <button onClick={openModal}>
                    <span className="text-4xl cursor-pointer hover:underline">
                        {following}
                    </span>
                </button>
                <button onClick={openModal} className="ml-12 mr-4">
                    <FontAwesomeIcon
                        icon={faUser}
                        className="w-8 h-8 mr-3 cursor-pointer"
                    />
                </button>
                <button onClick={openModal} className="">
                    <span className="text-4xl cursor-pointer hover:underline">
                        {follower}
                    </span>
                </button>
                {showModal ? (
                    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-500 bg-opacity-75">
                        <div className="w-4/5 p-8 bg-white rounded shadow-lg h-5/6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <button onClick={closeModal}>
                                        <FontAwesomeIcon
                                            icon={faArrowLeft}
                                            className="w-12 h-12 cursor-pointer"
                                        />
                                    </button>
                                </div>
                                <div className="flex-grow text-center">
                                    <Subtitle
                                        value="My Following/Follower"
                                        className="pb-4 text-4xl"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-row">
                                <div className="w-1/2 p-4">
                                    <MyFollowingBox
                                        mno={Number(mno)}
                                        closeModal={closeModal}
                                    />
                                </div>
                                <div className="w-1/2 p-4">
                                    <MyFollowerBox
                                        mno={Number(mno)}
                                        closeModal={closeModal}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    )
}
