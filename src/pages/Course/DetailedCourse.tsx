import {FC, PropsWithChildren, useState} from 'react'
import {Title, Map, TextBox, DropdownIcon} from '../../components'
import {Reply} from '../Reply'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faHeart,
    faBagShopping,
    faArrowLeft,
    faEllipsisVertical
} from '@fortawesome/free-solid-svg-icons'
import {DailyCourse} from '../DailyCourse'
import {dummyText, postText} from "../../dummy data/sb's dummy"

type DetailedCourseType = {
    title: string
}

export const DetailedCourse: FC<PropsWithChildren<DetailedCourseType>> = ({title}) => {
    //STUB - dummy
    const days = 3

    // heart button state
    const [heart, setHeart] = useState<boolean>(false)
    function onClickHeart() {
        setHeart(!heart)
    }

    // pick button state
    const [pick, setPick] = useState<boolean>(false)
    function onClickPick() {
        setPick(!pick)
    }

    // left arrow button
    function backPage() {
        // 뒤로가기 로직
        alert('뒤로가기 만들어줘')
    }

    const dailyCourses = Array.from({length: days}).map((_, index) => (
        <DailyCourse key={index} day={index + 1} isRegister={false} />
    ))
    return (
        <div>
            <div className="my-2">
                {/*header*/}
                <div className="flex justify-between mx-10 my-6">
                    <FontAwesomeIcon
                        className="hover:cursor-pointer"
                        icon={faArrowLeft}
                        size="2xl"
                        onClick={backPage}
                    />
                    <DropdownIcon texts={postText}>
                        <FontAwesomeIcon
                            className="hover:cursor-pointer"
                            icon={faEllipsisVertical}
                            size="2xl"
                        />
                    </DropdownIcon>
                </div>
                <Title>{title}</Title>
                <div className="flex flex-row justify-end">
                    <div>
                        {pick && (
                            <FontAwesomeIcon
                                className="hover:cursor-pointer"
                                icon={faBagShopping}
                                size="2xl"
                                style={{color: '#ff8d0a'}}
                                onClick={onClickPick}
                            />
                        )}
                        {pick || (
                            <FontAwesomeIcon
                                className="hover:cursor-pointer"
                                icon={faBagShopping}
                                size="2xl"
                                style={{color: '#ffd29e'}}
                                onClick={onClickPick}
                            />
                        )}
                        {' 찜 횟수'}
                    </div>
                    <div className="ml-4">
                        {heart && (
                            <FontAwesomeIcon
                                className="hover:cursor-pointer"
                                icon={faHeart}
                                size="2xl"
                                style={{color: '#ff3050'}}
                                onClick={onClickHeart}
                            />
                        )}
                        {heart || (
                            <FontAwesomeIcon
                                className="hover:cursor-pointer"
                                icon={faHeart}
                                size="2xl"
                                style={{color: '#c2c2c2'}}
                                onClick={onClickHeart}
                            />
                        )}
                        {' 횟수'}
                    </div>
                </div>
            </div>
            <div className="my-2">
                {/*body*/}
                <div className="flex flex-row justify-center">
                    img
                    <Map width="600px" height="400px"></Map>
                </div>
                <div className="my-2">{dailyCourses}</div>
                <TextBox data={dummyText}></TextBox>
            </div>
            <div className="my-2">
                {/*footer*/}
                <Reply />
            </div>
        </div>
    )
}
