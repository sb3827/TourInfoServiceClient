import React, {FC, useState} from 'react'
import {Button} from '../index'

type SearchResultProps = {
    name: string
    address: string
    rating: string
    imageUrl: string
    reviewCount: string
}

export const SearchInfo: FC<SearchResultProps> = ({
    name,
    address,
    rating,
    imageUrl,
    reviewCount
}) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(0)

    const handleAccordion = (index: number) => {
        setActiveIndex(prevIndex => (prevIndex === index ? null : index))
    }
    return (
        <div className="collapse bg-base-200">
            <input
                type="radio"
                name="my-accordion-1"
                checked={activeIndex === 0}
                onChange={() => handleAccordion(0)}
            />
            <div
                className="text-xl font-medium collapse-title"
                onClick={() => handleAccordion(0)}>
                <div className="w-full border-2 h-44">
                    <img src={imageUrl} alt="Image" />
                </div>
                <div>{name}</div>
                <div>{address}</div>
                <div>{rating}</div>
                <div>{reviewCount}</div>
            </div>
            {activeIndex === 0 && (
                <div className="collapse-content">
                    <div className="flex justify-end w-4/6">
                        <Button
                            value="리뷰 보러가기"
                            className="bg-gradient-to-r bg-slate-500"
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
