import React, {FC, useState, useEffect} from 'react'
import {MyPocketModal} from './MyPocketModal'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faTrash,
    faArrowLeft,
    faPlus,
    faPenToSquare
} from '@fortawesome/free-solid-svg-icons'
import {
    MyLikes,
    Button,
    Box,
    SearchInput,
    SearchInfo,
    SearchMap,
    ChooseMap
} from './../../index'

type MyPocketListProps = {}

export const MyPocketList: FC<MyPocketListProps> = ({}) => {
    const [listButton, setListButton] = useState<(string | number)[]>(['찜목록'])
    const [isFolderNameModalOpen, setIsFolderNameModalOpen] = useState(false)
    const [spotModalOpen, setSpotModalOpen] = useState(false)
    const [newButtonName, setNewButtonName] = useState('')
    const [selectedComponent, setSelectedComponent] = useState<number | null>(null)
    const [clickedButton, setClickedButton] = useState<number | null>(null) // 클릭된 버튼의 인덱스를 추적
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [editingButtonIndex, setEditingButtonIndex] = useState<number | null>(null)

    useEffect(() => {
        handleButtonClick(0) // 페이지 실행 시, 첫 번째 버튼을 클릭된 상태로 설정
    }, [])

    // 폴더명 모달
    const openFolderNameModal = () => {
        setIsFolderNameModalOpen(true)
    }
    const closeFolderNameModal = () => {
        setIsFolderNameModalOpen(false)
    }

    // 스팟등록 모달
    const openSpotModal = () => {
        setSpotModalOpen(true)
    }

    const closeSpotModal = () => {
        setSpotModalOpen(false)
    }

    // 폴더명 변경 모달
    const openEditModal = (index: number) => {
        setEditingButtonIndex(index)
        setEditModalOpen(true)
    }

    const closeEditModal = () => {
        setEditModalOpen(false)
    }

    const handleEditButtonClick = (index: number) => {
        setEditingButtonIndex(index)
        setNewButtonName(listButton[index].toString())
        openEditModal(index)
    }

    // 폴더 추가 버튼 최대 7개
    const addListButton = () => {
        if (listButton.length < 7) {
            const newButton = listButton.length + 1
            const newButtons = [...listButton, newButton]
            setListButton(newButtons)
        }
    }

    const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewButtonName(e.target.value)
    }

    const handleModalSubmit = () => {
        if (newButtonName.trim() !== '') {
            const newButtons = [...listButton]
            if (editingButtonIndex !== null && editingButtonIndex >= 0) {
                newButtons[editingButtonIndex] = newButtonName
                setListButton(newButtons)
                setSelectedComponent(editingButtonIndex)
                setClickedButton(editingButtonIndex)
                closeFolderNameModal()
                setNewButtonName('')
                setEditingButtonIndex(null)
            } else {
                newButtons.push(newButtonName)
                setListButton(newButtons)
                setSelectedComponent(newButtons.length - 1)
                setClickedButton(newButtons.length - 1)
                closeFolderNameModal()
                setNewButtonName('')
                setEditingButtonIndex(null)
            }
        } else {
            alert('폴더 이름을 입력해주세요.')
        }
    }

    // 폴더 삭제 버튼
    const deleteListButton = (indexToDelete: number) => {
        const updateButtons = listButton.filter((_, index) => index !== indexToDelete)
        setListButton(updateButtons)

        if (clickedButton !== null) {
            if (clickedButton === indexToDelete) {
                // 클릭된 버튼을 삭제할 경우
                if (indexToDelete === updateButtons.length) {
                    setClickedButton(indexToDelete - 1)
                    setSelectedComponent(indexToDelete - 1)
                } else {
                    setClickedButton(0)
                    setSelectedComponent(0)
                }
            } else if (indexToDelete < clickedButton) {
                // 클릭되지 않은 버튼을 삭제할 경우 클릭된 버튼의 상태를 조정하지 않음
                setClickedButton(clickedButton - 1)
            }
        }
    }

    const handleButtonClick = (index: number) => {
        setSelectedComponent(index)
        setClickedButton(index)
    }

    const renderDynamicComponents = () => {
        return listButton.map((button, index) => (
            <div key={index} className="">
                <button
                    className={`w-36 h-12 rounded-tl-xl border ${
                        index >= 7 ? 'hidden' : ''
                    } ${clickedButton === index ? 'bg-gray-200' : ''}`}
                    onClick={() => handleButtonClick(index)}>
                    {button}
                    {index !== 0 && (
                        <FontAwesomeIcon
                            icon={faPenToSquare}
                            onClick={() => {
                                handleEditButtonClick(index)
                            }}
                            className="ml-2 cursor-pointer"
                        />
                    )}
                </button>

                {index !== 0 && (
                    <button
                        onClick={() => deleteListButton(index)}
                        className="w-8 h-12 border rounded-tr-xl text-red">
                        <FontAwesomeIcon icon={faTrash} className="" />
                    </button>
                )}
            </div>
        ))
    }

    const renderSelectedComponent = () => {
        if (selectedComponent !== null) {
            return (
                <div>
                    <h1>{`Component ${selectedComponent + 1}`}</h1>
                    <MyPocketModal />
                </div>
            )
        }
        return null
    }

    return (
        <div>
            <div className="flex flex-row">
                {renderDynamicComponents()}
                <div>
                    {listButton.length < 7 && (
                        <button
                            onClick={openFolderNameModal}
                            className="w-12 h-12 border rounded-tl-lg rounded-tr-lg">
                            +
                        </button>
                    )}
                </div>
            </div>
            <div className="border h-80">{renderSelectedComponent()}</div>

            {/* 폴더 이름 지정하는 모달 */}
            {isFolderNameModalOpen && (
                <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
                    <div className="p-4 bg-white rounded">
                        <input
                            type="text"
                            placeholder="폴더 이름 입력(최대 8자)"
                            value={newButtonName}
                            onChange={handleNameInput}
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
                                handleModalSubmit()
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
