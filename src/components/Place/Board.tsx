import {FC} from 'react'
import {useNavigate} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar, faHeart} from '@fortawesome/free-solid-svg-icons'
import noImage from '../../assets/smallLogo.png'
import {PlaceBoardData} from '../../data'

type BoardProps = {
    placeBoardData: PlaceBoardData | null
}

export const Board: FC<BoardProps> = ({placeBoardData}) => {
    const navigate = useNavigate()

    function handleReviewClick() {
        navigate(`/board/place/posting?bno=${placeBoardData?.bno}`)
    }

    return (
        <div
            className="flex py-3 my-5 duration-150 shadow-2xl cursor-pointer h-52 rounded-2xl hover:-translate-y-1"
            onClick={handleReviewClick}>
            <div className="flex items-center justify-center w-1/2">
                <div className="flex justify-center overflow-hidden h-5/6 xl:h-full rounded-xl">
                    <img
                        src={
                            placeBoardData && placeBoardData.src.length > 0
                                ? placeBoardData.src[0]
                                : noImage
                        }
                        alt="Image"
                        className="h-full duration-150 hover:scale-110"
                    />
                </div>
            </div>
            <div className="w-1/2 ">
                <div className="relative flex flex-col justify-between h-full px-3 text-left py-7 ">
                    <div className="flex">
                        <h2 className="text-xl font-bold">{placeBoardData?.title}</h2>
                    </div>
                    <div>
                        <div>
                            <h2 className="text-base text-gray-500">
                                {placeBoardData?.writer}
                            </h2>
                        </div>

                        <div>
                            <h2 className="text-base text-gray-500">
                                review : {placeBoardData?.replyCount}
                            </h2>
                        </div>
                        <div>
                            <h2 className="text-base text-gray-500">
                                등록일 : {placeBoardData?.regdate.slice(0, 10)}
                            </h2>
                        </div>
                    </div>

                    <div className="absolute flex right-3 top-3">
                        <div className="flex flex-col items-center mr-1">
                            <p>
                                <FontAwesomeIcon icon={faStar} size="lg" color="gold" />
                            </p>
                            <p> {placeBoardData?.score}</p>
                        </div>
                        <div className="flex flex-col items-center ">
                            <p>
                                <FontAwesomeIcon icon={faHeart} size="lg" color="red" />
                            </p>
                            <p>{placeBoardData?.likes}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
