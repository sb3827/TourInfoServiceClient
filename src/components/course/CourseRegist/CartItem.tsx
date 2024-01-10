import {FC} from 'react'
import {Draggable, Droppable} from 'react-beautiful-dnd'
import {Spot} from '../../Spot'

export type Item = {
    pno: number
    name: string
    src: string
}

type CartItemProps = {
    items: Item[]
    dragDisable: boolean
}

export const CartItem: FC<CartItemProps> = ({items, ...props}) => {
    return (
        <div className="flex">
            {items.map((item, index) => (
                <Droppable droppableId="droppable" direction="horizontal" isDropDisabled>
                    {provided => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            <Draggable
                                key={item.pno}
                                draggableId={item.name}
                                index={index}
                                isDragDisabled={props.dragDisable}>
                                {provided => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}>
                                        <a href={`/board/place/${item.pno}`}>
                                            <Spot
                                                key={index}
                                                src={item.src}
                                                isRegister={false}>
                                                {item.name}
                                            </Spot>
                                        </a>
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
