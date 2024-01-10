import {FC} from 'react'
import {DragDropContext, OnDragEndResponder} from 'react-beautiful-dnd'
import {RootState} from '../../../store/rootReducer'
import {useSelector} from 'react-redux'
import {addItemAtPosition, moveItem} from '../../../store/slices/CourseSlice'
import {useDispatch} from 'react-redux'
import {CartItem, DayItem, Item} from '../../index'

type DndProps = {}

//STUB -  더미
const dummy: Item[] = [
    {pno: 1, src: 'image1.jpg', name: 'Product 1'},
    {pno: 2, src: 'image2.jpg', name: 'Product 2'},
    {pno: 3, src: 'image3.jpg', name: 'Product 3'},
    {pno: 4, src: 'image4.jpg', name: 'Product 4'},
    {pno: 5, src: 'image5.jpg', name: 'Product 5'}
]
//

export const CourseList: FC<DndProps> = ({}) => {
    //이 더미 데이터는 추후에 장바구니 데이터로 바꿔야함
    const items = dummy

    const day = useSelector((state: RootState) => state.course)
    const dispatch = useDispatch()

    const onDragEnd: OnDragEndResponder = result => {
        if (!result.destination) {
            return
        }

        const dropId: number = result.destination.droppableId.includes('-')
            ? Number(result.destination.droppableId.split('-')[1])
            : Number(result.destination.droppableId)

        for (let i = 0; i < day[dropId].length; i++) {
            if (
                day[Number(result.destination.droppableId.split('-')[1])][i].name ==
                    result.draggableId.split('-')[0] &&
                !(result.source.droppableId === result.destination.droppableId)
            ) {
                //이미 존재
                return
            }
        }

        // 같은 드롭 가능 구역 내에서의 이동 처리
        if (result.source.droppableId === result.destination.droppableId) {
            const dayIndex = parseInt(result.source.droppableId.split('-')[1])
            // 같은 날짜 안에서 재정렬 처리
            dispatch(
                moveItem({
                    sourceDayIndex: dayIndex,
                    targetDayIndex: dayIndex,
                    itemIndex: result.source.index,
                    targetIndex: result.destination.index
                })
            )
        } else {
            // 다른 드롭 가능 구역 간의 이동 처리
            const sourceDayIndex = parseInt(result.source.droppableId.split('-')[1])
            const destDayIndex = parseInt(result.destination.droppableId.split('-')[1])

            // 아이템을 원본 위치에서 목표 위치로 이동
            if (result.source.droppableId === 'droppable') {
                // 초기 목록에서 날짜별 목록으로 이동
                const itemToMove = items[result.source.index]
                dispatch(
                    addItemAtPosition({
                        dayIndex: destDayIndex,
                        itemIndex: result.destination.index,
                        item: itemToMove
                    })
                )
            } else {
                // 날짜별 목록 간 이동
                dispatch(
                    moveItem({
                        sourceDayIndex: sourceDayIndex,
                        targetDayIndex: destDayIndex,
                        itemIndex: result.source.index,
                        targetIndex: result.destination.index
                    })
                )
            }
        }
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            {/* 장바구니 데이터 */}
            {items && <CartItem items={items} dragDisable={false} />}

            {/* 요일 데이터 */}
            <DayItem />
        </DragDropContext>
    )
}
