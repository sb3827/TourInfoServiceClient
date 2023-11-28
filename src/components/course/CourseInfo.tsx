import React, {FC} from 'react'
import {Slider} from '../index'

type CourseInfoProps = {
    title: string
    imageUrl: string
    rating: string
    like: string
}

export const CourseInfo: FC<CourseInfoProps> = ({title, imageUrl, rating, like}) => {
    // 추후 length 값을 배열로 나타내야함
    const imageArray = Array.from({length: 3}, (_, index) => (
        <figure key={index}>
            <img src={imageUrl} alt="Image" />
        </figure>
    ))
    return (
        <div className="w-full shadow-xl card bg-base-100">
            <Slider>{imageArray}</Slider>
            <div className="flex justify-between card-body">
                <h2 className="card-title">
                    {title} {rating} {like}
                </h2>
            </div>
        </div>
    )
}
