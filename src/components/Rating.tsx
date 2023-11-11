import {FC, DetailedHTMLProps, InputHTMLAttributes} from 'react'
import {ReactInputProps} from './input'

type RatingProps = ReactInputProps & {}

export const Rating: FC<RatingProps> = () => {
    return (
        <div className="rating rating-md">
            <input
                type="radio"
                name="rating-7"
                className="bg-orange-400 mask mask-star-2"
            />
            <input
                type="radio"
                name="rating-7"
                className="bg-orange-400 mask mask-star-2"
                checked
            />
            <input
                type="radio"
                name="rating-7"
                className="bg-orange-400 mask mask-star-2"
            />
            <input
                type="radio"
                name="rating-7"
                className="bg-orange-400 mask mask-star-2"
            />
            <input
                type="radio"
                name="rating-7"
                className="bg-orange-400 mask mask-star-2"
            />
        </div>
    )
}
