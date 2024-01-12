import {Subtitle} from '../../Texts'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleMinus, faMinus, faPlus} from '@fortawesome/free-solid-svg-icons'
import {useDispatch} from 'react-redux'
import {addDayAtPosition, deleteDay, deleteItem} from '../../../store/slices/CourseSlice'
import {Draggable, Droppable} from 'react-beautiful-dnd'
import {Spot} from '../../Spot'
import {useSelector} from 'react-redux'
import {RootState} from '../../../store/rootReducer'
import {Item} from './CourseList'
import {FC} from 'react'

type DayItemProps = {
    day: Item[][]
    create: boolean
}

export const DayItem: FC<DayItemProps> = ({day, create}) => {
    const dispatch = useDispatch()

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
        <div>
            {day.map((dayItem, dayIndex) => (
                <div className="flex flex-col p-5 border rounded-xl">
                    <div className="flex justify-between">
                        <Subtitle className="flex ">{dayIndex + 1}일차</Subtitle>
                        <div className="flex ">
                            <FontAwesomeIcon
                                icon={faPlus}
                                size="1x"
                                className="cursor-pointer"
                                onClick={() => onAddDay(dayIndex)}
                            />
                            <FontAwesomeIcon
                                icon={faMinus}
                                size="1x"
                                className="cursor-pointer"
                                onClick={() => onDeleteDay(dayIndex)}
                            />
                        </div>
                    </div>
                    <Droppable
                        droppableId={`droppable-${dayIndex}`}
                        direction="horizontal">
                        {provided => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="flex w-full h-20 ">
                                {dayItem.map((item, index) => (
                                    <Draggable
                                        key={item.pname + index}
                                        //추후에 pname대신에 pno를 주는게 맞을거 같음
                                        draggableId={
                                            item.pname + '-' + dayIndex + '-' + index
                                        }
                                        index={index}>
                                        {provided => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}>
                                                <div
                                                    className="flex justify-end mt-2 mr-2 cursor-pointer"
                                                    onClick={() =>
                                                        onDeleteItem(dayIndex, index)
                                                    }>
                                                    <FontAwesomeIcon
                                                        icon={faCircleMinus}
                                                        style={{color: '#c2c2c2'}}
                                                    />
                                                </div>
                                                <Spot
                                                    key={item.pname + index}
                                                    src={item.img}
                                                    isRegister={false}>
                                                    {item.pname}
                                                </Spot>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                            </div>
                        )}
                    </Droppable>
                </div>
            ))}
        </div>
    )
}
