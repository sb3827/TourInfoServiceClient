import {FC} from 'react'
import {Item} from './CourseList'
import {Draggable, Droppable} from 'react-beautiful-dnd'
import {Spot} from '../../Spot'

type CartItemProps = {
    items: Item[]
    dragDisable?: boolean
    isRegister?: boolean // MyCart에서 사용하기 위해 추가하였음
    onDeleteSpot?: (pno: number) => void
}

export const CartItem: FC<CartItemProps> = ({
    items,
    dragDisable,
    isRegister,
    onDeleteSpot
}) => {
    return (
        <div className="flex flex-wrap">
            {items.map((item, index) => (
                <Droppable
                    key={index}
                    droppableId="droppable"
                    direction="horizontal"
                    isDropDisabled>
                    {provided => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            <Draggable
                                isDragDisabled={false || dragDisable}
                                key={item.pno}
                                draggableId={item.pno + ''}
                                index={index}>
                                {provided => (
                                    <div
                                        className="relative flex m-2"
                                        key={index}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}>
                                        <div className="relative flex items-center justify-center bg-white border shadow-2xl cursor-pointer hover rounded-2xl">
                                            {item.pno !== null && (
                                                <Spot
                                                    key={index}
                                                    src={item.img}
                                                    isRegister={isRegister || false}
                                                    onDelete={() =>
                                                        onDeleteSpot &&
                                                        onDeleteSpot(item.pno)
                                                    }>
                                                    {item.pname}
                                                </Spot>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        </div>
                    )}
                </Droppable>
            ))}
        </div>
    )
}
