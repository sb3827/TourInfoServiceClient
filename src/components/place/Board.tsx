import React, {FC} from 'react'
import {Button, Slider} from '../index'
import {PlaceBoardData} from '../../data/placeSearch'
import { useNavigate } from "react-router-dom"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar, faHeart} from '@fortawesome/free-solid-svg-icons'
type BoardProps = {
    placeBoardData: PlaceBoardData | null
}

export const Board: FC<BoardProps> = ({placeBoardData}) => {

    const navigate = useNavigate();

    const imageArray = placeBoardData?.src && placeBoardData.src.length > 0 ? (
        placeBoardData.src.map((src, index) => (
          <figure key={index}><img src={src} alt="Image" /></figure>
        ))
      ) : (
        <p>이미지가 없어요!</p>
      );


      const handleReviewClick = () => {
        navigate(`/board/place/posting?bno=${placeBoardData?.bno}`)
    }

    

    return (
        <div className="border border-gray-200 shadow-xl card lg:card-side bg-base-100">
            <div className="w-1/2 h-72">
                <Slider>{imageArray}</Slider>
            </div>
            <div className="cursor-pointer card-body" onClick={handleReviewClick}>
                        <div className="flex justify-start">
                            <h2 className="card-title">제목 : {placeBoardData?.title}</h2>
                        </div>
                        <div className="flex justify-end">
                            <h2 className="card-title"><FontAwesomeIcon icon={faHeart} className="m-1" /> : {placeBoardData?.likes}</h2>
                        </div>
                        <div className="flex justify-end">
                            <h2 className="card-title"> <FontAwesomeIcon icon={faStar} className="m-1" />: {placeBoardData?.score}</h2>
                        </div>
                        <div className="flex justify-end">
                            <h2 className="card-title">review : {placeBoardData?.replyCount}</h2>
                        </div>
                        <div className="flex justify-end">
                            <h2 className="card-title">등록일 : {placeBoardData?.regdate}</h2>
                        </div>
                        <div className="flex justify-end">
                            <h2 className="card-title">작성자 : {placeBoardData?.writer}</h2>
                        </div>
            </div>
        </div>
    );
}
