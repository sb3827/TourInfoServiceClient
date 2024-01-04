import React, {FC, useState} from 'react'
import {
    Box,
    SearchMap,
    ToggleButton,
    SubBox,
    Subtitle,
    Board,
    Button,
    Slider,
    BoardToggle
} from '../../components/index'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faList, faStar} from '@fortawesome/free-solid-svg-icons'

// 장소상세 페이지

type PlaceDetailsProps = {}

export const PlaceDetails: FC<PlaceDetailsProps> = ({}) => {
    const dummy = [
        {
            name: '장소1',
            lat: 37.5666805,
            lng: 126.9784147,
            road: 'a',
            local: 'a',
            eng: 'a',
            rating: 1,
            reviewCount: 3,
            imageUrl: 'Image',
            category: 'Attraction'
        }
    ]

    return (
        <Box>
            <div className="flex justify-center w-full h-96">
                <div className="w-2/3">
                    <Slider>
                        <div className="border-gray-300 rounded-lg ">
                            {/* 대표이미지 어디서 가져오죠*/}
                            <div>대표이미지</div>
                        </div>
                        {/* MapAPI 컴포넌트 */}
                        {/* <SearchMap places={dummy} className="w-full h-full" /> */}
                    </Slider>
                </div>
            </div>

            {/* 게시글 작성버튼, 추후에 게시글 작성 페이지로 이동하게 만들어야함 */}
            <div className="flex justify-end w-4/6">
                <Button value="게시글 작성" className="bg-gradient-to-r bg-slate-500" />
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
                <SubBox>
                    {/* 더미 데이터 */}
                    <Board
                        title="제목"
                        rating="별점"
                        likeCount="좋아요 수"
                        imageUrl=""></Board>
                    <Board
                        title="제목"
                        rating="별점"
                        likeCount="좋아요 수"
                        imageUrl=""></Board>
                    <Board
                        title="제목"
                        rating="별점"
                        likeCount="좋아요 수"
                        imageUrl=""></Board>
                    <Board
                        title="제목"
                        rating="별점"
                        likeCount="좋아요 수"
                        imageUrl=""></Board>
                    {/* 더미데이터 (하드코딩)*/}
                </SubBox>
                <SubBox>
                    {/* 더미데이터 (하드코딩)*/}
                    <Board
                        title="제목"
                        rating="별점"
                        likeCount="좋아요"
                        imageUrl="https://ak-d.tripcdn.com/images/0104112000arpecetF935_D_560_420.jpg"></Board>
                    <Board
                        title="제목"
                        rating="별점"
                        likeCount="좋아요"
                        imageUrl="https://ak-d.tripcdn.com/images/0104112000arpecetF935_D_560_420.jpg"></Board>
                    <Board
                        title="제목"
                        rating="별점"
                        likeCount="좋아요"
                        imageUrl="https://ak-d.tripcdn.com/images/0104112000arpecetF935_D_560_420.jpg"></Board>
                </SubBox>
                {/* 더미데이터 (하드코딩)*/}
            </BoardToggle>
        </Box>
    )
}
