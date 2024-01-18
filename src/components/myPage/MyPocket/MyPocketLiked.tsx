import {FC} from 'react'
import {Subtitle} from './../../Texts'
import {CourseLikedList, ToggleButton} from './../../index'

type myPocketLikedProps = {}

export const MyPocketLiked: FC<myPocketLikedProps> = ({}) => {
    return (
        <div>
            <div>
                <ToggleButton size="w-60">
                    <Subtitle value="Place Liked"> </Subtitle>
                    <Subtitle value="Course Liked"> </Subtitle>
                    <CourseLikedList />
                </ToggleButton>
            </div>
        </div>
    )
}
