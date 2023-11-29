import React, {FC} from 'react'
import {Slider} from '../index'

type BoardProps = {
    title: string
    imageUrl: string
    rating: string
    likeCount: string
}

export const Board: FC<BoardProps> = ({title, imageUrl, rating, likeCount}) => {
    // 추후 length 값을 배열로 나타내야함
    const imageArray = Array.from({length: 3}, (_, index) => (
        <figure key={index}>
            <img src={imageUrl} alt="Image" />
        </figure>
    ))

    return (
        <div className="flex justify-center">
            <div className="w-5/6 shadow-xl card bg-base-100">
                <Slider>{imageArray}</Slider>
                <div className="flex justify-between card-body">
                    <h2 className="card-title">
                        {title} {rating} {likeCount}
                    </h2>
                </div>
            </div>
        </div>
    )
}
