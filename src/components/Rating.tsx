import {FC} from 'react'

// rating component
export const Rating: FC = () => {
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
