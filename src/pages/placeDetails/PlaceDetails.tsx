import React, {FC, useState} from 'react'
import {
    Box,
    Map,
    ToggleButton,
    SubBox,
    Subtitle,
    Board,
    Button,
    Slider
} from '../../components/index'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faList} from '@fortawesome/free-solid-svg-icons'

// 장소상세 페이지

type PlaceDetailsProps = {}

export const PlaceDetails: FC<PlaceDetailsProps> = ({}) => {
    // 더미 데이터 (7개의 더미 데이터 생성, 테스트를 위한 하드코딩) 추후 배열의 길이로 반복해야함
    const userBoards = Array.from({length: 7}, (_, index) => ({
        no: {index},
        name: `제목`,
        id: `id`,
        date: `YYYY-MM-DD`,
        imageUrl: `이미지` // 더미 이미지 URL로 대체 가능
    }))
    // 더미 데이터

    // 더미 데이터
    const ADBoards = Array.from({length: 7}, (_, index) => ({
        no: {index},
        name: `제목`,
        id: `업체`,
        date: `YYYY-MM-DD`,
        imageUrl: `이미지` // 더미 이미지 URL로 대체 가능
    }))
    // 더미 데이터

    return (
        <Box>
            <div className="flex justify-center w-full mb-4 h-96">
                <div className="flex w-2/3">
                    <Slider>
                        <div className="p-3 overflow-y-auto border border-gray-300 rounded-lg ">
                            {/* 대표이미지, 게시글에서 가져와야함 */}
                            썸네일
                        </div>
                        {/* MapAPI 컴포넌트 */}
                        <Map width="100%" height="100%"></Map>
                    </Slider>
                </div>
            </div>

            {/* 게시글 작성버튼, 추후에 게시글 작성 페이지로 이동하게 만들어야함 */}
            <div className="flex justify-end w-full p-3 m-5">
                <Button value="게시글 작성" className="bg-gradient-to-r bg-slate-500" />
            </div>

            {/* 추후 게시글의 썸네일과 연동시켜야함 */}
            <div className="flex w-4/6 h-64 border rounded-lg border--30">
                <Slider>
                    {userBoards.map((result, index) => (
                        <Board imageUrl={result.imageUrl} />
                    ))}
                </Slider>
            </div>

            <ToggleButton>
                <Subtitle
                    value="유저 게시글"
                    className="flex flex-row-reverse items-center ml-5 text-left">
                    <FontAwesomeIcon icon={faList} className="m-1" />
                </Subtitle>
                <Subtitle
                    value="광고 게시글"
                    className="flex flex-row-reverse items-center ml-5 text-left">
                    <FontAwesomeIcon icon={faList} className="m-1" />
                </Subtitle>
                <SubBox>
                    {userBoards.map((result, index) => (
                        <Board
                            no={index + 1}
                            name={result.name}
                            id={result.id}
                            date={result.date}
                        />
                    ))}
                </SubBox>
                <SubBox>
                    {ADBoards.map((result, index) => (
                        <Board
                            no={index + 1}
                            name={result.name}
                            id={result.id}
                            date={result.date}
                        />
                    ))}
                </SubBox>
            </ToggleButton>
        </Box>
    )
}
