import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCartShopping, faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import {FC, useState, useEffect} from 'react'
import {MyPocketList, Spot, MyCart} from './../../index'
import {ShowFolderAll} from './../../../api/Folder/Folder'
import {folderAll} from './../../../data/Folder/Folder'

type ShowTotalLikesProps = {
    cart: string
}

export const ShowTotalLikes: FC<ShowTotalLikesProps> = ({cart}) => {
    const [showModal, setShowModal] = useState(false)
    const [folder, setFolder] = useState<folderAll>()

    const fetchData = async () => {
        try {
            const userFolderData = await ShowFolderAll(2)
            setFolder(userFolderData)
            console.log(userFolderData)
        } catch (error) {
            console.error('error', error)
        }
    }

    useEffect(() => {
        fetchData()
        console.log(folder)
    }, [])

    const openModal = () => {
        setShowModal(true)
    }
    const closeModal = () => {
        setShowModal(false)
    }

    return (
        <div className="inline-block">
            {/* 버튼 클릭시 장바구니 페이지로 이동하도록 할 것*/}
            <button className="mr-4" onClick={openModal}>
                <FontAwesomeIcon
                    icon={faCartShopping}
                    className="w-8 h-8 mr-3 cursor-pointer"
                />
            </button>
            <button onClick={openModal}>
                <span className="text-4xl cursor-pointer hover:underline">{cart}</span>
            </button>
            {showModal ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-500 bg-opacity-75">
                    <div className="w-4/5 p-8 bg-white rounded shadow-lg h-5/6">
                        <div className="flex items-center justify-between">
                            <button onClick={closeModal}>
                                <FontAwesomeIcon
                                    icon={faArrowLeft}
                                    className="w-12 h-12"
                                />
                            </button>
                        </div>
                        <div>
                            <h1>My Cart</h1>
                            <MyCart />
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    )
}
