import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCartShopping, faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import {FC, useState, useEffect} from 'react'
import {MyPocketModal, Spot, MyCart} from './../../index'
import {ShowFolderAll} from './../../../api/Folder/Folder'
import {folderAll} from './../../../data/Folder/Folder'
import {DragDropContext, OnDragEndResponder} from 'react-beautiful-dnd'
import {RootState} from './../../../store/rootReducer'
import {useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'

type ShowTotalLikesProps = {
    mno: number
    cart: number
}

export const ShowTotalLikes: FC<ShowTotalLikesProps> = ({cart, mno}) => {
    const [showModal, setShowModal] = useState(false)
    const [folder, setFolder] = useState<folderAll>()
    const [refreshFlag, setRefreshFlag] = useState<boolean>(false)

    const userMno = useSelector((state: RootState) => state.login.mno) || 0

    const fetchData = async () => {
        try {
            const userFolderData = await ShowFolderAll(mno)
            setFolder(userFolderData)
            console.log(userFolderData)
        } catch (error) {
            console.error('error', error)
        }
    }

    useEffect(() => {
        fetchData()
        console.log(folder)
    }, [refreshFlag])

    const openModal = () => {
        setShowModal(true)
    }
    const closeModal = () => {
        setShowModal(false)
    }

    const handleMyPocketModalClose = () => {
        setRefreshFlag(!refreshFlag)
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
                    <div className="w-4/5 p-8 bg-white rounded shadow-lg h-fit">
                        <div className="flex items-center justify-between">
                            <button onClick={closeModal}>
                                <FontAwesomeIcon
                                    icon={faArrowLeft}
                                    className="w-12 h-12"
                                />
                            </button>
                            <MyPocketModal onClose={handleMyPocketModalClose} />
                        </div>
                        <div>
                            <h1>장바구니</h1>
                            <DragDropContext onDragEnd={() => {}}>
                                <MyCart
                                    onClose={refreshFlag}
                                    dragDisable={true}
                                    mno={Number(mno)}
                                />
                            </DragDropContext>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    )
}
