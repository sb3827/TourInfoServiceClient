import {FC, useState, forwardRef, useImperativeHandle, Ref} from 'react'
import {RatingRef} from '../../data'

// rating props 정의
type RatingProps = {
    onChange?: (rating: number) => void
    ref?: Ref<RatingRef>
}

// fowardRef를 사용하여 Rating 참조
export const Rating: FC<RatingProps> = forwardRef<RatingRef, RatingProps>(
    ({onChange}, ref) => {
        const [selectedRating, setSelectedRating] = useState<number>(5) // 초기값 설정 또는 기본값 5 사용

        // onClick method
        function handleRatingChange(rating: number) {
            setSelectedRating(rating) // state 저장
            // onChange(rating)
        }

        // parent component가 조회 할 수 있도록 Ref Method 공개
        useImperativeHandle(ref, () => ({
            getSelectedRating: () => selectedRating,
            setSelectedRating: (score: number) => setSelectedRating(score)
        }))

        return (
            <div className="mb-1 rating rating-md">
                {[1, 2, 3, 4, 5].map(rating => (
                    <input
                        key={rating}
                        type="radio"
                        name="rating-7"
                        checked={rating == selectedRating}
                        className={`bg-orange-400 mask mask-star-2 ${
                            rating <= selectedRating ? 'selected' : ''
                        }`}
                        onClick={() => handleRatingChange(rating)}
                    />
                ))}
            </div>
        )
    }
)
