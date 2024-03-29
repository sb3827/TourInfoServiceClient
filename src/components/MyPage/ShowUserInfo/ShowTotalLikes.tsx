import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCartShopping} from '@fortawesome/free-solid-svg-icons'
import {FC, useState, useEffect} from 'react'
import {DragDropContext} from 'react-beautiful-dnd'
import {folderAll} from '../../../data'
import {ShowFolderAll} from '../../../api'
import {Modal, Title} from '../../Common'
import {MyCart} from './MyCart'

type ShowTotalLikesProps = {
    mno: number
    cart: number
}

export const ShowTotalLikes: FC<ShowTotalLikesProps> = ({cart, mno}) => {
    const [showModal, setShowModal] = useState(false)
    const [folder, setFolder] = useState<folderAll>()
    const [refreshFlag, setRefreshFlag] = useState<boolean>(false)

    async function fetchData() {
        try {
            const userFolderData = await ShowFolderAll(mno)
            setFolder(userFolderData)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchData()
    }, [refreshFlag])

    function openModal() {
        setShowModal(true)
    }
    function closeModal() {
        setShowModal(false)
    }

    return (
        <div className="inline-block my-2">
            {/* 버튼 클릭시 장바구니 페이지로 이동하도록 할 것*/}
            <button className="mr-2" onClick={openModal}>
                <FontAwesomeIcon icon={faCartShopping} className="mr-3 cursor-pointer " />
            </button>
            <button onClick={openModal}>
                <span className="cursor-pointer hover:underline">{cart}</span>
            </button>
            {showModal ? (
                <Modal isOpen onClose={closeModal}>
                    <div>
                        <Title className="my-8">장바구니</Title>
                        <div className="px-10 xl:px-14">
                            <DragDropContext onDragEnd={() => {}}>
                                <MyCart
                                    myCart={true}
                                    onClose={refreshFlag}
                                    dragDisable={true}
                                    mno={Number(mno)}
                                />
                            </DragDropContext>
                        </div>
                    </div>
                </Modal>
            ) : null}
        </div>
    )
}
