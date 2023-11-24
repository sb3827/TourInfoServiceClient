import React, {FC} from 'react'
import {FindUserInfo, SubBox} from '../../index'
import {UserData} from '../../../data/manager/index'

type FindBoxProps = {}

//유저 검색 박스

export const FindBox: FC<FindBoxProps> = ({}) => {
    // 유저 검색 더미 데이터 ///////////////////////////////////
    const usersDummy: UserData[] = [
        {
            userName: '사업자1',
            userId: '사업자 아이디1',
            userEmail: 'email@test.com',
            phoneNum: '01011112222',
            regDate: new Date(),
            businessCheck: true
        },
        {
            userName: '일반 유저',
            userId: '아이디',
            userEmail: 'email123@test.com',
            phoneNum: '01098765432',
            regDate: new Date(),
            businessCheck: false
        },
        {
            userName: '일반 유저2',
            userId: '아이디3',
            userEmail: 'test@test.com',
            phoneNum: '01099999999',
            regDate: new Date(),
            businessCheck: false
        }
    ]
    /////////////////////////////////////////////////////////////
    return (
        <SubBox>
            {usersDummy.map((users, index) => (
                <FindUserInfo key={index} users={users} />
            ))}
        </SubBox>
    )
}
