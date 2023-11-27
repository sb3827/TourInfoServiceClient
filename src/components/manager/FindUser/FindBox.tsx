import {FC} from 'react'
import {FindUserInfo, SubBox, Subtitle, UserInfoItemBox} from '../../index'
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
            businessCheck: true,
            suspendDate: '0'
        },
        {
            userName: '일반 유저',
            userId: '아이디',
            userEmail: 'email123@test.com',
            phoneNum: '01098765432',
            regDate: new Date(),
            businessCheck: false,
            suspendDate: new Date()
        },
        {
            userName: '일반 유저2',
            userId: '아이디3',
            userEmail: 'test@test.com',
            phoneNum: '01099999999',
            regDate: new Date(),
            businessCheck: false,
            suspendDate: '0'
        }
    ]
    /////////////////////////////////////////////////////////////
    return (
        <SubBox>
            <UserInfoItemBox widthFull={false}>
                <div className="flex">
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
                        <Subtitle className="w-40 p-3 min-w-fit">사업자 여부</Subtitle>
                    </div>
                </div>
            </UserInfoItemBox>

            {usersDummy.map((users, index) => (
                <FindUserInfo key={index} users={users} />
            ))}
        </SubBox>
    )
}
