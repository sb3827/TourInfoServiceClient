import React, {FC, useState} from 'react'
import {Spot} from './../../Spot'
import {MyPocketModal} from './../../index'

type MyPocketListProps = {}

export const MyPocketList: FC<MyPocketListProps> = ({}) => {
    const [newPocketListCount, setNewPocketListCount] = useState(1)
    const [selectedComponent, setSelectedComponent] = useState<number | null>(1)
    const [previousComponent, setPreviousComponent] = useState<number | null>(null)

    const onClickNewPocketList = () => {
        if (newPocketListCount < 7) {
            setNewPocketListCount(prevCount => prevCount + 1)
            setSelectedComponent(newPocketListCount + 1)
        }
    }

    const onDeleteButtonClick = (index: number) => {
        if (newPocketListCount > 1) {
            const updatedCount = newPocketListCount - 1

            if (selectedComponent === newPocketListCount) {
                setSelectedComponent(selectedComponent - 1)
            } else if (selectedComponent! > index + 1) {
                setSelectedComponent(selectedComponent! - 1)
            }

            setNewPocketListCount(updatedCount)
            setPreviousComponent(selectedComponent)

            if (selectedComponent !== null && index === selectedComponent - 1) {
                setSelectedComponent(index - 1) // 삭제된 후 첫 번째 버튼을 선택합니다.
                setPreviousComponent(null)
            }
        }
    }
    const onSelectButtonClick = (index: number) => {
        setSelectedComponent(index + 1)
        setPreviousComponent(null)
    }

    return (
        <div className="">
            <div className="flex flex-wrap">
                {[...Array(newPocketListCount)].map((_, index) => (
                    <NewButton
                        key={index}
                        name={`Choiced List ${index + 1}`}
                        onClick={() => onSelectButtonClick(index)}
                        showMinusButton={index === newPocketListCount - 1 && index !== 0}
                        onDeleteButtonClick={() => onDeleteButtonClick(index)}
                        isSelected={selectedComponent === index + 1}
                    />
                ))}
                {/* 7개 생성되면 + 버튼 생성되지 않음 */}
                {newPocketListCount < 7 && (
                    <button
                        onClick={onClickNewPocketList}
                        className="self-end w-10 h-10 rounded-lg bg-slate-600">
                        +
                    </button>
                )}
            </div>
            <div className="w-full max-w-full border h-80 ">
                {[...Array(newPocketListCount)].map((_, index) => (
                    <div
                        key={index}
                        className={`${
                            selectedComponent === index + 1 ? 'block' : 'hidden'
                        }`}>
                        {selectedComponent === index + 1 && (
                            <NewComponent
                                name={`new list${index + 1}`}
                                component={Spot}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

type NewComponentProps = {
    name: string
    component: FC<any> // Spot 컴포넌트를 받기 위함
}

const NewComponent: FC<NewComponentProps> = ({name, component: Spot}) => {
    return (
        <div className="flex w-full h-full">
            <div className="w-full max-w-full">
                <div className="flex justify-center w-full text-2xl text-white">
                    {name}
                </div>
                <div className="flex flex-row h-32">
                    <Spot />
                    <Spot />
                    <Spot />
                    <Spot />
                    <MyPocketModal />
                </div>
            </div>
        </div>
    )
}

type NewButtonProps = {
    name: string
    onClick: () => void
    showMinusButton?: boolean
    onDeleteButtonClick: () => void
    isSelected: boolean
}

const NewButton: FC<NewButtonProps> = ({
    name,
    onClick,
    showMinusButton,
    onDeleteButtonClick,
    isSelected
}) => {
    const onDelete = () => {
        onDeleteButtonClick()
    }

    const buttonClass = `h-10 border w-30 rounded-lg ${
        isSelected ? 'btn-info text-white' : 'btn-ghost'
    }`

    return (
        <button className={buttonClass} onClick={onClick}>
            {name}
            {showMinusButton && (
                <button
                    className="w-8 border rounded-lg cursor-pointer"
                    onClick={onDelete}>
                    -
                </button>
            )}
        </button>
    )
}
