import React, {FC, useState, forwardRef, useImperativeHandle, Ref} from 'react'

// rating props 정의
type RatingProps = {
    onChange: (rating: number) => void
    ref: Ref<RatingRef>
}

// ref type 정의 current.getSelectedRating()로 값 도출
export type RatingRef = {
    getSelectedRating: () => number | null
}

// fowardRef를 사용하여 Rating 참조
export const Rating: FC<RatingProps> = forwardRef<RatingRef, RatingProps>(
    ({onChange}, ref) => {
        const [selectedRating, setSelectedRating] = useState<number | null>(null)

        // onClick method
        const handleRatingChange = (rating: number) => {
            setSelectedRating(rating) // state 저장
            onChange(rating)
        }

        // parent component가 조회 할 수 있도록 Ref Method 공개
        useImperativeHandle(ref, () => ({
            getSelectedRating: () => selectedRating
        }))

        return (
            <div className="rating rating-md">
                {[1, 2, 3, 4, 5].map(rating => (
                    <input
                        key={rating}
                        type="radio"
                        name="rating-7"
                        className={`bg-orange-400 mask mask-star-2 ${
                            rating === selectedRating ? 'selected' : ''
                        }`}
                        onClick={() => handleRatingChange(rating)}
                    />
                ))}
            </div>
        )
    }
)
