import React, {FC} from 'react'
import {Slider, Button} from '../index'
import { useNavigate } from "react-router-dom"
import { CourseBoardListData } from "../../data/Board/BoardData";
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import noImage from '../../assets/smallLogo.png'

type CourseInfoProps = {
    boardData : CourseBoardListData | null

}

export const CourseInfo: FC<CourseInfoProps> = ({boardData}) => {

    const navigate = useNavigate();

    const imageArray = boardData?.srcList && boardData.srcList.length > 0 && (
        boardData.srcList.map((src, index) => (
            <div key={index} className='flex justify-center w-full h-full'>
                <img src={src ?? noImage} alt="Image" className='rounded-lg' />
            </div>
            )))

            const handleReviewClick = () => {
                navigate(`/board/course/posting?bno=${boardData?.bno}`)
            }

            
    return (
        <div className="w-full my-4 shadow-xl cursor-pointer card bg-base-100 border-lightGreen hover:bg-gray-300" onClick={handleReviewClick}>
            <div className='w-full h-80'>
            <Slider>{imageArray}</Slider>
            </div >
            <div className="flex items-center justify-between w-full h-full card-body " >
            <div className="flex">
                <p className="mr-2 card-title"> 제목 :</p>
                <p className="mr-8 card-title">{boardData?.title}</p>
                <p className="mr-2 card-title"> 작성자 :</p>
                <p className="mr-8 card-title">{boardData?.writer}</p>
                <p className="mr-2 card-title"> 작성일 :</p>
                <p className="mr-8 card-title">{boardData?.regDate}</p>
                <p className="mr-2 card-title"> 평가 :</p>
                <p className="mr-8 card-title">{boardData?.score}</p>
                <p className="mr-2 card-title"><FontAwesomeIcon icon={faHeart} className="m-1" /></p>
                <p className="justify-end card-title">{boardData?.likes}</p>
            </div>
        </div>
        </div>
    )
}
