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
                <Droppable droppableId="droppable" direction="horizontal" isDropDisabled>
                    {provided => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            <Draggable
                                isDragDisabled={false || dragDisable}
                                key={item.pno}
                                draggableId={item.pno + ''}
                                index={index}>
                                {provided => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}>
                                        {item.pno !== null && (
                                            <Spot
                                                key={index}
                                                src={item.img}
                                                isRegister={isRegister || false}
                                                onDelete={() =>
                                                    onDeleteSpot && onDeleteSpot(item.pno)
                                                }>
                                                {item.pname}
                                            </Spot>
                                        )}
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
