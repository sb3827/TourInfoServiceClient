import React, {FC} from 'react'
import {Button, FindUserInfo, SubBox, Subtitle} from '../../index'
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
            <div className="flex items-center w-full border-b-2  min-w-max">
                <div className="w-3/4 p-3 ">
                    <div className="flex w-full ">
                        <div>
                            <Subtitle className="w-40 p-3 min-w-fit">이름</Subtitle>
                        </div>
                        <div>
                            <Subtitle className="w-40 p-3 min-w-fit">아이디</Subtitle>
                        </div>
                        <div>
                            <Subtitle className="w-40 p-3 min-w-fit">이메일</Subtitle>
                        </div>
                        <div>
                            <Subtitle className="w-40 p-3 min-w-fit">전화번호</Subtitle>
                        </div>
                        <div>
                            <Subtitle className="w-40 p-3 min-w-fit">가입일자</Subtitle>
                        </div>
                        <div>
                            <Subtitle className="w-40 p-3 min-w-fit">
                                사업자 여부
                            </Subtitle>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end w-1/4 p-3 mr-16 min-w-fit"></div>
            </div>

            {usersDummy.map((users, index) => (
                <FindUserInfo key={index} users={users} />
            ))}
        </SubBox>
    )
}
