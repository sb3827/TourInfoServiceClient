import React, {FC, useState} from 'react'
import { useNavigate } from "react-router-dom";
import {Button, Map, SearchMap} from '../index'
import {PlaceData} from '../../data/placeSearch'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCartShopping } from '@fortawesome/free-solid-svg-icons'

type SearchResultProps = {
    placeInfoData: PlaceData | null
    mapClick: () => void
}

export const SearchInfo: FC<SearchResultProps> = ({placeInfoData, ...props}) => {
    const navigate = useNavigate();

    const handleReviewClick = () => {
        if (placeInfoData && placeInfoData.pno) { // 예상되는 pno 데이터가 있다면
            const { pno } = placeInfoData;
            navigate(`/board/place/${pno}`); // 해당 pno를 사용하여 동적 경로로 이동
        } else {
            console.error("No 'pno' data available");
        }

    }

    if (!placeInfoData) {
        // placeInfoData가 없을 때의 처리
        return <div>No data available</div>
    }

    return (
            <div className="w-full cursor-pointer border-slate-500 card lg:card-side " onClick={props.mapClick}>
                <div className="w-1/2 h-64">
                    {placeInfoData.image ? <img src={placeInfoData.image} alt="Image" /> : <div>이미지가 없어요!</div> }
                        
                </div>
                <div className=" card-body">
                    <div className="flex justify-start">
                        <h2 className="card-title">이름 : {placeInfoData.name}</h2>
                    </div>
                    <div className="flex justify-start">
                        <h2 className="card-title">주소 : {placeInfoData.localAddress}</h2>
                    </div>
                    <div className="flex justify-start">
                        <h2 className="card-title"><FontAwesomeIcon icon={faCartShopping} className="m-1" /> : {placeInfoData.cart}</h2>
                    </div>
                    <div className="justify-end card-actions">
                            <Button onClick={handleReviewClick} className="text-white bg-darkGreen" value={'보러가기'} />
                    </div>
                    
                </div>
            </div>
    )
}
