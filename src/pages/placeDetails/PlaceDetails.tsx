import React, {FC, useState} from 'react'
import {
    Box,
    Map,
    ToggleButton,
    SubBox,
    Subtitle
} from '../../components/index'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faList} from '@fortawesome/free-solid-svg-icons'
import {ADBoard, UserBoard} from './index'


// 장소상세 페이지

type PlaceDetailsProps = {}

export const PlaceDetails: FC<PlaceDetailsProps> = ({}) => {


    return (
        <Box>
            <div className="flex justify-center w-full mb-4 h-96">
                <div className="flex w-2/3">
                    <div className="w-1/2 p-3 overflow-y-auto border border-gray-300 rounded-lg">
                        {/* 대표이미지, 게시글에서 가져와야함 */}
                        <div>Thumbnail</div>
                    </div>
                    <div className="w-1/2 p-3 border border-gray-300 rounded-lg">
                        {/* MapAPI 컴포넌트 */}
                        <Map width="100%" height="100%"></Map>
                    </div>
                </div>
            </div>

            <SubBox>
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
                    <UserBoard/>
                    <ADBoard />
                </ToggleButton>
            </SubBox>
        </Box>
    )
}
