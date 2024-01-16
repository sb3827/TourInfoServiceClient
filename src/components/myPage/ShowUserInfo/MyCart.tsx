import React, {FC, useState, useEffect} from 'react'
import {
    ShowFolderAll,
    registerFolder,
    updateFolder,
    deleteFolder
} from './../../../api/Folder/Folder'
import {
    folderAll,
    registerFolderData,
    updateFolderData,
    deleteFolderData
} from './../../../data/Folder/Folder'
import {Spot, MyPocketModal, MyPocketList} from './../../index'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash, faPenToSquare, faPlus} from '@fortawesome/free-solid-svg-icons'
import {RootState} from './../../../store/rootReducer'
import {useSelector} from 'react-redux'

//TODO - 버튼 크기, spot div 크기

export const MyCart: FC = () => {
    const [folder, setFolder] = useState<folderAll>()
    const [selectedFno, setSelectedFno] = useState<number | null>(1)
    const [newButtonName, setNewButtonName] = useState<string>('')
    const [isFolderNameModalOpen, setIsFolderNameModalOpen] = useState(false)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [editingButtonIndex, setEditingButtonIndex] = useState<number | null>(null)
    const [folderToDelete, setFolderToDelete] = useState<number | null>(null)

    const userMno = useSelector((state: RootState) => state.login.mno) || 0
    // const userMno = 2

    const fetchData = async () => {
        try {
            const userFolderData = await ShowFolderAll(userMno)
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

    const handleButtonClick = (fno: number) => {
        console.log(`${fno} selected`)
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

    const handleModalSubmit = async () => {
        if (!newButtonName.trim()) {
            return
        }

        const newFolderData: registerFolderData = {
            mno: userMno,
            title: newButtonName
        }

        try {
            const response = await registerFolder(newFolderData)

            const newFolder = {
                // fno는 auto-increment인데 이 부분을 값을 어떻게 설정해야할지 ?
                fno: 500,
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
            mno: userMno,
            title: newButtonName
        }

        try {
            await updateFolder(updateFolderData)
            console.log('수정내용 : ' + updateFolderData)

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

        closeEditModal()
    }

    const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewButtonName(e.target.value)
    }

    // 폴더 삭제
    const handleDeleteFolder = async (fno: number) => {
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

    return (
        <div>
            <div className="flex w-full mt-8 bg-gray-200 border h-80 ">
                {folder &&
                    Array.isArray(folder.data) &&
                    folder.data.map(folderInfo => (
                        <div key={folderInfo.fno} className="flex flex-col">
                            <div className="w-40 h-12 ">
                                {folderInfo.fno !== null && (
                                    <div className="flex flex-row bg-blue-200 border rounded-tr-xl">
                                        <button
                                            className={`p-2 h-12 text-white  ${
                                                selectedFno === folderInfo.fno
                                                    ? 'bg-gray-600'
                                                    : 'bg-blue-200'
                                            }`}
                                            onClick={() =>
                                                handleButtonClick(folderInfo.fno)
                                            }>
                                            {folderInfo.title}
                                            <button>
                                                <FontAwesomeIcon
                                                    icon={faPenToSquare}
                                                    className="ml-2 text-gray-500 cursor-pointer"
                                                    onClick={() =>
                                                        openEditModal(folderInfo.fno)
                                                    }
                                                />
                                            </button>
                                        </button>
                                        <button className="w-8 h-12 ">
                                            <FontAwesomeIcon
                                                icon={faTrash}
                                                onClick={() =>
                                                    handleDeleteFolder(folderInfo.fno)
                                                }
                                                className="ml-2 cursor-pointer"
                                            />
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="flex flex-row w-full bg-cyan-400">
                                {Array.isArray(folderInfo.pno) &&
                                    folderInfo.fno === selectedFno &&
                                    folderInfo.pno.map((pno, index) =>
                                        pno !== null ? (
                                            <div key={index} className="w-full">
                                                <Spot
                                                    src={folderInfo.src[index]} // null 값이어도 렌더링
                                                    isRegister={true}>
                                                    {folderInfo.name[index]}
                                                </Spot>
                                            </div>
                                        ) : null
                                    )}
                            </div>
                        </div>
                    ))}

                <button
                    className="w-12 h-12 text-xl bg-white border-black"
                    onClick={openFolderNameModal}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
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
            <MyPocketModal />
        </div>
    )
}
