import {FC, PropsWithChildren, useState} from 'react'
import {Title, Map, TextBox, DropdownIcon} from '../../components'
import {Reply} from '../Reply'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faHeart,
    faStar,
    faArrowLeft,
    faEllipsisVertical
} from '@fortawesome/free-solid-svg-icons'
import {dummyText, postText} from "../../dummy data/sb's dummy"

type PostPlaceProps = {
    title: string
}

export const PostPlace: FC<PropsWithChildren<PostPlaceProps>> = ({title}) => {
    // heart button state
    const [heart, setHeart] = useState<boolean>(false)
    function clickHeart() {
        setHeart(!heart)
    }
    // left arrow button
    function backPage() {
        // 뒤로가기 로직
        alert('뒤로가기 만들어줘')
    }
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
                        <FontAwesomeIcon
                            icon={faStar}
                            size="2xl"
                            style={{color: '#fbfe3e'}}
                        />
                        {' 작성자별점'}
                    </div>
                    <div className="ml-4">
                        {heart && (
                            <FontAwesomeIcon
                                className="hover:cursor-pointer"
                                icon={faHeart}
                                size="2xl"
                                style={{color: '#ff3050'}}
                                onClick={clickHeart}
                            />
                        )}
                        {heart || (
                            <FontAwesomeIcon
                                className="hover:cursor-pointer"
                                icon={faHeart}
                                size="2xl"
                                style={{color: '#c2c2c2'}}
                                onClick={clickHeart}
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
                <TextBox data={dummyText}></TextBox>
            </div>
            <div className="my-2">
                {/*footer*/}
                <Reply />
            </div>
        </div>
    )
}
