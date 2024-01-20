import {FC} from 'react'
import {Item} from './CourseList'
import {Draggable, Droppable} from 'react-beautiful-dnd'
import {Spot} from '../../Spot'

type CartItemProps = {
    items: Item[]
    dragDisable?: boolean
}

export const CartItem: FC<CartItemProps> = ({items, dragDisable}) => {
    return (
        <div className="flex">
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
                                        <Spot
                                            key={index}
                                            src={item.img}
                                            isRegister={false}>
                                            {item.pname}
                                        </Spot>
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
