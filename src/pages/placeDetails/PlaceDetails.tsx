import React, {FC, useState} from 'react'
import {
    Box,
    SearchInput,
    SubTitle,
    Map,
    ToggleButton,
    SubBox,
    WaitBox,
    ReportBox,
    Title
} from '../../components/index'
import {ADBoard, UserBoard} from './index'

// 장소상세 페이지

type PlaceDetailsProps = {}

export const PlaceDetails: FC<PlaceDetailsProps> = ({}) => {
    //검색 값
    const [searchValue, setSearchValue] = useState<string>('')

    //입력때마다 검색값 업데이트
    function onChangeSearch(value: string) {
        setSearchValue(value)
    }

    return (
        <Box>
            <div className="flex justify-center w-full mb-4 h-96">
                <div className="flex w-2/3">
                    <div className="w-1/2 p-3 overflow-y-auto border rounded-lg border--300">
                        <h2>장소 대표 사진</h2>
                    </div>
                    <div className="w-1/2 p-3 border border-gray-300 rounded-lg">
                        {/* MapAPI 컴포넌트 */}
                        <Map width="100%" height="100%"></Map>
                    </div>
                </div>
            </div>

            <SubBox>
                <ToggleButton>
                    <SubTitle text="게시글" />
                    <SubTitle text="광고" />
                    {/* <UserBoard/>
                    <ADBoard/> */}
                    <WaitBox />
                    <ReportBox />
                </ToggleButton>
            </SubBox>
        </Box>
    )
}
