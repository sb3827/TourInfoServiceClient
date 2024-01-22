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
} from '../../components/index'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { useParams, useNavigate } from "react-router-dom"
import {getPlaceDetailsInfo} from '../../api'
import {PlaceBoardData} from '../../data/placeSearch'
import {faList} from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';


// 장소 상세 페이지


export const PlaceDetails = () => {

    const [boardData, setBoardData] = useState<PlaceBoardData[] | null>(null);
    const { pno } = useParams();
    const navigate = useNavigate();

    const user = useSelector((state: RootState) => state.login.mno)!


    useEffect(() => {
        async function fetchData(pnoParam: string | undefined) {
            const pnoNumber = pnoParam ? Number(pno) : undefined; // pno를 숫자로 변환
            try {
                if (pnoNumber !== undefined) {
                    const data = await getPlaceDetailsInfo(pnoNumber);
                    setBoardData(data);
                    console.log(data);
                }
            } catch (err) {
                console.log(err);
                alert('게시글이 없습니다!');
                // navigate(-1)
            }
        }
        fetchData(pno); // fetchData 함수를 실행하여 초기 데이터를 가져옴


    }, [pno]); // 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때만 실행

    const handleRegisterClick = () => {
            navigate(`/board/place/posting/register`);
        }


    return (
        <Box>
            <div className='flex justify-end w-4/6 '>
               {user && <Button onClick={handleRegisterClick} className="h-16 text-xl text-white w-36 bg-darkGreen" value={'게시글 작성'}/> } 
            </div>
            <div className="flex justify-center w-full">
                <div className="w-2/3">
                    
                        {boardData && (
                            <SearchMap places={boardData} className="w-full h-full" innerRef={null} />
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
