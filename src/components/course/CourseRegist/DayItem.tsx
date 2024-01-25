import {Subtitle} from '../../Texts'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleMinus, faMinus, faPlus} from '@fortawesome/free-solid-svg-icons'
import {useDispatch} from 'react-redux'
import {addDayAtPosition, deleteDay, deleteItem} from '../../../store/slices/CourseSlice'
import {Draggable, Droppable} from 'react-beautiful-dnd'
import {Spot} from '../../Spot'
import {Item} from './CourseList'
import {FC, useState} from 'react'
import noImage from '../../../assets/smallLogo.png'
import {useNavigate} from 'react-router-dom'
import {Button} from '../../Button'
import {Modal} from '../../Modal'
import {InputPlace} from '../../myPage/MyPocket/InputPlace'

type DayItemProps = {
    day: Item[][]
    create: boolean
}

export const DayItem: FC<DayItemProps> = ({day, create}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    // 각 일자에 대한 모달 상태 관리
    const [modalViews, setModalViews] = useState<Record<number, boolean>>({})

    // 모달 열기
    function onOpenModal(dayIndex: number) {
        setModalViews(prev => ({...prev, [dayIndex]: true}))
    }

    // 모달 닫기
    function onCloseModal(dayIndex: number) {
        setModalViews(prev => ({...prev, [dayIndex]: false}))
    }

    //요일 삭제
    const onDeleteDay = (dayIndex: number) => {
        dispatch(deleteDay(dayIndex))
    }

    //원하는 곳에 요일 추가
    const onAddDay = (dayIndex: number) => {
        dispatch(addDayAtPosition(dayIndex + 1))
    }

    //해당 요일의 아이템 제거
    const onDeleteItem = (dayIndex: number, itemIndex: number) => {
        dispatch(deleteItem({dayIndex, itemIndex}))
    }

    return (
        <div className="mt-2">
            {day.map((dayItem, dayIndex) => (
                <div
                    className="flex flex-col p-5 py-8 my-3 border shadow-xl rounded-xl"
                    key={dayIndex}>
                    <div className="flex justify-between ">
                        <Subtitle className="flex ">{dayIndex + 1}일차</Subtitle>
                        <div className="flex ">
                            {create && (
                                <div className="flex flex-col justify-between h-full">
                                    <div className="w-full  flex items-center justify-around text-sm">
                                        <Button
                                            className="bg-darkGreen text-white"
                                            value={'장소 +'}
                                            onClick={() => onOpenModal(dayIndex)}
                                        />
                                        <Button
                                            className="bg-lightGreen text-white"
                                            value={'day +'}
                                            onClick={() => onAddDay(dayIndex)}
                                        />
                                        <Button
                                            className="bg-red-400 text-white"
                                            value={'day -'}
                                            onClick={() => onDeleteDay(dayIndex)}
                                        />
                                    </div>

                                    {modalViews[dayIndex] && (
                                        <Modal
                                            isOpen
                                            onClose={() => onCloseModal(dayIndex)}
                                            key={dayIndex}>
                                            <InputPlace
                                                dayIndex={dayIndex}
                                                onClose={() => onCloseModal(dayIndex)}
                                                className="border-none bg-white border"
                                            />
                                        </Modal>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex">
                        <Droppable
                            isDropDisabled={!create}
                            droppableId={`droppable-${dayIndex}`}
                            direction="horizontal">
                            {provided => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className="flex flex-wrap w-full h-full ">
                                    {dayItem.map((item, index) => (
                                        <Draggable
                                            isDragDisabled={!create}
                                            key={item.pname + index}
                                            //추후에 pname대신에 pno를 주는게 맞을거 같음
                                            draggableId={
                                                item.pname + '-' + dayIndex + '-' + index
                                            }
                                            index={index}>
                                            {provided => (
                                                <div
                                                    className="flex m-2 relative"
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}>
                                                    <div
                                                        className="cursor-pointer hover  border rounded-2xl shadow-2xl flex justify-center items-center"
                                                        onClick={() => {
                                                            !create &&
                                                                navigate(
                                                                    `/board/place/${item.pno}`
                                                                )
                                                        }}>
                                                        <Spot
                                                            key={item.pname + index}
                                                            src={
                                                                item.img
                                                                    ? item.img
                                                                    : noImage
                                                            }
                                                            isRegister={false}>
                                                            {item.pname}
                                                        </Spot>
                                                        <div
                                                            className="absolute top-1 right-1 flex justify-end cursor-pointer"
                                                            onClick={() =>
                                                                onDeleteItem(
                                                                    dayIndex,
                                                                    index
                                                                )
                                                            }>
                                                            {create && (
                                                                <FontAwesomeIcon
                                                                    icon={faCircleMinus}
                                                                    style={{
                                                                        color: '#c2c2c2'
                                                                    }}
                                                                />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                </div>
                            )}
                        </Droppable>
                    </div>
                </div>
            ))}
        </div>
    )
}
