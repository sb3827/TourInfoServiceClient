import React, {FC} from 'react'
import {FindUserInfo, SubBox} from '../../index'

type FindBoxProps = {}

//유저 검색 박스

export const FindBox: FC<FindBoxProps> = ({}) => {
    var i: number = 5 //테스트 - 추후에 필요없음, 배열의 길이로 반복해야함
    return (
        <SubBox>
            {Array.from({length: i}, (_, index) => (
                <FindUserInfo key={index} /> //유저 정보도 넘겨줘야함
            ))}
        </SubBox>
    )
}
