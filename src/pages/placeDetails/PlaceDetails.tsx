import React, {FC, useState} from 'react'
import { useEffect } from "react";
import {
    Box,
    SearchMap,
    Subtitle,
    Board,
    BoardBox,
    BoardToggle,
    Button,
    LoadingSppinner,
} from '../../components/index'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { useParams } from "react-router-dom"
import {getPlaceDetailsInfo} from '../../api'
import {PlaceBoardData} from '../../data/placeSearch'
import {faList} from '@fortawesome/free-solid-svg-icons'

// 장소 상세 페이지
export const PlaceDetails = () => {

    const [boardData, setBoardData] = useState<PlaceBoardData[] | null>(null);
    const { pno } = useParams();
    const [loading, setLoading] = useState<Boolean>(false)
    
    async function fetchData(pnoParam: string | undefined) {
        const pnoNumber = pnoParam ? Number(pno) : undefined; // pno를 숫자로 변환
        try {
            if (pnoNumber !== undefined) {
                setLoading(true)
                const data = await getPlaceDetailsInfo(pnoNumber);
                setBoardData(data);
                setLoading(false)
            }
        } catch (err) {
            alert('게시글이 없습니다!')
            console.error('Error fetching data:', err)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData(pno); // fetchData 함수를 실행하여 초기 데이터를 가져옴
    }, [pno]); // 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때만 실행

    return (
        <Box>
            {loading && <LoadingSppinner />}
            <div className="flex justify-center w-full">
                <div className="w-2/3 m-10">     
                    {boardData && (
                        <SearchMap places={boardData} className="w-full h-full rounded-xl" innerRef={null} />
                    )}
                </div>
            </div>
            <BoardToggle>
                <Subtitle
                    value="유저 게시글"
                    className="flex flex-row-reverse items-center text-left">
                    <FontAwesomeIcon icon={faList} className="m-1" />
                </Subtitle>
                <Subtitle
                    value="광고 게시글"
                    className="flex flex-row-reverse items-center text-left">
                    <FontAwesomeIcon icon={faList} className="m-1" />
                </Subtitle>
                <BoardBox>
                    {boardData &&
                     boardData.map((data: PlaceBoardData) => (
                       !data.ad && <Board placeBoardData = {data}  />
                     ))}
                </BoardBox>
                <BoardBox>
                {boardData &&
                     boardData.map((data: PlaceBoardData) => (
                        data.ad && <Board placeBoardData = {data}  />
                     ))}
                </BoardBox>
            </BoardToggle>
        </Box>
    )
}
