import React, {FC, useState, useEffect} from 'react'
import {
    ShowFolderAll,
    registerFolder,
    updateFolder,
    deleteFolder,
    ShowFolderInfo,
    deleteCart
} from './../../../api/Folder/Folder'
import {
    folderAll,
    registerFolderData,
    updateFolderData
} from './../../../data/Folder/Folder'
import {CartItem, Item} from './../../index'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash, faPenToSquare, faPlus} from '@fortawesome/free-solid-svg-icons'
import {RootState} from './../../../store/rootReducer'
import {useSelector} from 'react-redux'

//TODO - spot 추가 후 새로고침해야 나오는 문제

type MyCartProps = {
    onChangeItems?: (itme: Item[]) => void
    className?: string
    dragDisable?: boolean
    onClose?: boolean
    mno: number
}

export const MyCart: FC<MyCartProps> = ({
    onChangeItems,
    className,
    dragDisable,
    onClose,
    mno
}) => {
    const [folder, setFolder] = useState<folderAll>()
    const [selectedFno, setSelectedFno] = useState<number | null>(0)
    const [newButtonName, setNewButtonName] = useState<string>('') // 폴더 이름
    const [isFolderNameModalOpen, setIsFolderNameModalOpen] = useState(false)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [editingButtonIndex, setEditingButtonIndex] = useState<number | null>(null)
    const [isAddButtonVisible, setAddButtonVisible] = useState(true) // 추가 버튼 숨김 여부 상태

    const userMno = useSelector((state: RootState) => state.login.mno) || 0

    const fetchData = async () => {
        try {
            const userFolderData = await ShowFolderAll(mno)
            setFolder(userFolderData)
            console.log(userFolderData) // 추후에 삭제 예정

            console.log(
                userFolderData.data.map(folderInfo => convertFolderInfoToItem(folderInfo))
            )

            const convertedItems: Item[] = userFolderData.data.flatMap(folderInfo =>
                convertFolderInfoToItem(folderInfo)
            )
            setSelectedFno(userFolderData.data[0].fno)

            console.log('convertedItems', convertedItems)
            onChangeItems && onChangeItems(convertedItems)
        } catch (error) {
            console.error('error', error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [onClose])

    const handleButtonClick = (fno: number) => {
        console.log(`${fno} selected`) // 추후에 삭제 예정
        setSelectedFno(prev => (prev === fno ? null : fno))
    }

    // 폴더 생성 시 이름 입력 모달
    const openFolderNameModal = () => {
        setIsFolderNameModalOpen(true)
        setNewButtonName('')
    }

    const closeFolderNameModal = () => {
        setIsFolderNameModalOpen(false)
    }

    // 폴더 생성
    const handleModalSubmit = async () => {
        if (!newButtonName.trim()) {
            return
        }

        const newFolderData: registerFolderData = {
            mno: mno,
            title: newButtonName
        }

        try {
            await registerFolder(newFolderData)

            const folderResponse = await ShowFolderInfo(mno)

            const newFolder = {
                fno:
                    folderResponse.data.length > 0
                        ? folderResponse.data[folderResponse.data.length - 1].fno
                        : 1,
                title: newFolderData.title,
                pno: [],
                name: [],
                src: []
            }
            setFolder((prev: folderAll | undefined) => ({
                ...prev!,
                data: [...(prev?.data || []), newFolder]
            }))
        } catch (error) {
            console.error('Error', error)
        }
        alert('등록 완료')
        closeFolderNameModal()
    }

    // 폴더명 수정 모달
    const openEditModal = (fno: number) => {
        const folderToEdit = folder?.data.find(folder => folder.fno === fno)

        if (folderToEdit) {
            setNewButtonName(folderToEdit.title)
            setEditingButtonIndex(fno)
            setEditModalOpen(true)
        }
    }

    const closeEditModal = () => {
        setNewButtonName('')
        setEditingButtonIndex(null)
        setEditModalOpen(false)
    }

    const handleEditSubmit = async () => {
        if (editingButtonIndex === null || !newButtonName.trim()) {
            return
        }

        const updateFolderData: updateFolderData = {
            fno: editingButtonIndex,
            mno: mno,
            title: newButtonName
        }

        try {
            await updateFolder(updateFolderData)

            setFolder((prev: folderAll | undefined) => {
                const updatedData = (prev?.data || []).map(folder => {
                    if (folder.fno === editingButtonIndex) {
                        return {
                            ...folder,
                            title: newButtonName
                        }
                    }
                    return folder
                })

                return {
                    ...prev!,
                    data: updatedData
                }
            })
        } catch (error) {
            console.error('Error', error)
        }
        alert('수정 완료')
        closeEditModal()
    }

    const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewButtonName(e.target.value)
    }

    // 폴더 삭제
    const handleDeleteFolder = async (fno: number) => {
        if (window.confirm('폴더를 삭제하시겠습니까?')) {
            try {
                await deleteFolder(fno)

                setFolder((prev: folderAll | undefined) => {
                    if (prev) {
                        const updatedData = prev.data.filter(folder => folder.fno !== fno)
                        return {
                            ...prev,
                            data: updatedData
                        }
                    }
                    return prev
                })
                alert('삭제 완료')
            } catch (error) {
                console.error('Error', error)
            }
        }
    }

    // 스팟 삭제
    const deleteSpot = async (mno: number, pno: number, fno: number) => {
        try {
            await deleteCart(mno, pno, fno)
            fetchData()
            alert('스팟 삭제!')
        } catch (error) {
            console.log(error)
        }
    }

    // folderInfo 데이터에서 Item 타입의 데이터로 변환하는 함수
    function convertFolderInfoToItem(folderInfo: any) {
        const items = []
        for (let i = 0; i < folderInfo.pno.length; i++) {
            items.push({
                pno: folderInfo.pno[i],
                img: folderInfo.src[i],
                pname: folderInfo.name[i]
            })
        }
        return items
    }

    return (
        <div className="w-full">
            <div className="flex justify-between items-center w-full overflow-x-auto overflow-y-hidden  ">
                <div className="flex w-full">
                    {folder &&
                        Array.isArray(folder.data) &&
                        folder.data
                            .sort((a, b) => a.fno - b.fno) // fno 순서대로 정렬
                            .map(folderInfo => (
                                <div
                                    key={folderInfo.fno}
                                    className={`h-full relative cursor-pointer justify-center flex items-center p-2 w-full text-black text-sm duration-150 border rounded-t-2xl ${
                                        selectedFno === folderInfo.fno
                                            ? 'bg-gray-400'
                                            : 'bg-white'
                                    }`}
                                    onClick={() => handleButtonClick(folderInfo.fno)}>
                                    <div className="flex items-center basis-2/3 justify-center">
                                        {userMno === mno && (
                                            <FontAwesomeIcon
                                                icon={faPenToSquare}
                                                size="sm"
                                                className="mr-1 text-gray-500 cursor-pointer hover:text-black"
                                                onClick={event => {
                                                    event.stopPropagation()
                                                    openEditModal(folderInfo.fno)
                                                }}
                                            />
                                        )}
                                        <p className="text-ellipsis overflow-hidden">
                                            {folderInfo.title}
                                        </p>
                                    </div>

                                    {userMno === mno && (
                                        <FontAwesomeIcon
                                            icon={faTrash}
                                            size="sm"
                                            onClick={event => {
                                                event.stopPropagation()
                                                handleDeleteFolder(folderInfo.fno)
                                            }}
                                            className="text-gray-500 cursor-pointer basis-1/3 hover:text-black"
                                        />
                                    )}
                                </div>
                            ))}
                </div>

                <div>
                    {folder &&
                        Array.isArray(folder.data) &&
                        folder.data.length < 7 &&
                        userMno === mno && (
                            <button
                                className="w-20 text-xl bg-white border-black"
                                onClick={openFolderNameModal}>
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                        )}
                </div>
            </div>
            <div
                className={`overflow-y-scroll max-w-screen bg-gray-200 border mb-5 h-72 ${className}`}>
                <div className="">
                    {folder &&
                        Array.isArray(folder.data) &&
                        folder.data
                            .filter(folderInfo => folderInfo.fno === selectedFno)
                            .map(folderInfo => (
                                <div key={folderInfo.fno} className="">
                                    <CartItem
                                        items={convertFolderInfoToItem(folderInfo)}
                                        dragDisable={dragDisable}
                                        isRegister={true}
                                        onDeleteSpot={(pno: number) =>
                                            deleteSpot(mno, pno, folderInfo.fno)
                                        }
                                    />
                                    {/* {folderInfo.title && <MyPocketModal />} */}
                                </div>
                            ))}
                </div>
            </div>

            {/* 폴더 이름 지정하는 모달 */}
            {isFolderNameModalOpen && (
                <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
                    <div className="p-4 bg-white rounded">
                        <input
                            type="text"
                            placeholder="폴더 이름 입력(최대 8자)"
                            value={newButtonName}
                            onChange={e => setNewButtonName(e.target.value)}
                            className="p-2 mb-2 border"
                            maxLength={8}
                        />
                        <button onClick={handleModalSubmit} className="p-2 border">
                            추가
                        </button>
                        <button
                            onClick={closeFolderNameModal}
                            className="p-2 ml-2 border">
                            취소
                        </button>
                    </div>
                </div>
            )}

            {/* 폴더명 변경 모달 */}
            {editModalOpen && (
                <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
                    <div className="p-4 bg-white rounded">
                        <input
                            type="text"
                            value={newButtonName}
                            onChange={handleNameInput}
                            className="p-2 mb-2 border"
                            maxLength={8}
                        />
                        <button
                            onClick={() => {
                                handleEditSubmit()
                                closeEditModal()
                            }}
                            className="p-2 border">
                            수정
                        </button>
                        <button onClick={closeEditModal} className="p-2 ml-2 border">
                            취소
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
