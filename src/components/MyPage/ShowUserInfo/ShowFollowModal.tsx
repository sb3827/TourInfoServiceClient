import {FC, useState} from 'react'
import {Title} from '../../Common/Texts'
import {useParams} from 'react-router-dom'
import {Modal} from '../../Common/Modal'
import {MyFollowingBox} from './MyFollowingBox'
import {MyFollowerBox} from './MyFollowerBox'

type ShowFollowModalProps = {
    following: string
    follower: string
    userName?: string
}

export const ShowFollowModal: FC<ShowFollowModalProps> = ({
    following,
    follower,
    userName
}) => {
    const [showModal, setShowModal] = useState(false)
    const {mno} = useParams()

    // 모달을 열거나 닫는 함수
    function openModal() {
        setShowModal(true)
    }
    function closeModal() {
        setShowModal(false)
    }

    return (
        <div>
            <div className="inline-block my-2">
                <button onClick={openModal} className="mr-4">
                    <p className="text-lg">팔로잉</p>
                </button>
                <button onClick={openModal}>
                    <span className="cursor-pointer hover:underline">{following}</span>
                </button>
                <button onClick={openModal} className="ml-12 mr-4">
                    <p className="text-lg">팔로워</p>
                </button>
                <button onClick={openModal} className="">
                    <span className="cursor-pointer hover:underline">{follower}</span>
                </button>
                {showModal ? (
                    <Modal isOpen onClose={closeModal}>
                        <div className="bg-white rounded xl:p-8 ">
                            <div className="flex flex-col">
                                <Title className="my-3">{userName}</Title>
                                <div className="flex">
                                    <div className="w-1/2 p-2 xl:p-4">
                                        <MyFollowingBox
                                            mno={Number(mno)}
                                            closeModal={closeModal}
                                        />
                                    </div>
                                    <div className="w-1/2 p-2 xl:p-4">
                                        <MyFollowerBox
                                            mno={Number(mno)}
                                            closeModal={closeModal}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal>
                ) : null}
            </div>
        </div>
    )
}
