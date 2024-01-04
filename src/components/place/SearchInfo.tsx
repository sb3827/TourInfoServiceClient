import React, {FC, useState} from 'react'
import {Button} from '../index'
import {PlaceData} from '../../data/placeSearch'

type SearchResultProps = {
    placeInfoData: PlaceData | null
}

export const SearchInfo: FC<SearchResultProps> = ({placeInfoData}) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(0)

    const handleAccordion = (index: number) => {
        setActiveIndex(prevIndex => (prevIndex === index ? null : index))
    }

    if (!placeInfoData) {
        // placeInfoData가 없을 때의 처리
        return <div>No data available</div>
    }

    return (
        <div className="collapse ">
            <input
                type="radio"
                name="my-accordion-1"
                checked={activeIndex === 0}
                onChange={() => handleAccordion(0)}
            />
            <div
                className="text-xl font-medium collapse-title"
                onClick={() => handleAccordion(0)}>
                <div className="w-full border-2 rounded-lg h-44">
                    {/* <img src={imageUrl} alt="Image" /> */}
                </div>
                <div>이름{placeInfoData.name}</div>
                <div>주소{placeInfoData.localAddress}</div>
                <div>장바구니{placeInfoData.cart}</div>
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
