import {FC, PropsWithChildren, useState} from 'react'
import {Title, Map} from '../../components'
import {Reply} from '../Reply'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHeart, faStar, faArrowLeft} from '@fortawesome/free-solid-svg-icons'

type PostPlaceProps = {
    title: string
}

export const PostPlace: FC<PropsWithChildren<PostPlaceProps>> = ({title}) => {
    // heart button state
    const [heart, setHeart] = useState<boolean>(false)
    function clickHeart() {
        setHeart(!heart)
    }
    return (
        <div>
            <div className="my-2">
                {/*header*/}
                <div className="flex justify-start mx-10 my-6">
                    <FontAwesomeIcon icon={faArrowLeft} size="2xl" />
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
                <div>글....</div>
            </div>
            <div className="my-2">
                {/*footer*/}
                <Reply />
            </div>
        </div>
    )
}
