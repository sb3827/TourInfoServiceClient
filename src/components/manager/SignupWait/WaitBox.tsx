import {FC} from 'react'
import {SubBox, Subtitle, UserInfoItemBox, WaitUser} from '../../index'
import {WaitUserData} from '../../../data/User/User'

//회원 대기 목록 컴포넌트 합체 - 추후 WaitUser에 props 추가하여야하고 반복문으로 수정해야함

type WaitBoxProps = {}

export const WaitBox: FC<WaitBoxProps> = ({}) => {
    //사업자 회원대기 더미 데이터 ////////////////////////
    const waitDummy: WaitUserData[] = [
        {
            userName: '사업자1',
            userId: '사업자 아이디1',
            userEmail: 'email@test.com',
            phoneNum: '01011112222',
            businessNum: '0000000000'
        },
        {
            userName: '사업자2',
            userId: '사업자 아이디2',
            userEmail: 'email2@test.com',
            phoneNum: '01023456789',
            businessNum: '5691901664'
        },
        {
            userName: '사업자3',
            userId: '사업자 아이디3',
            userEmail: 'liame@test.com',
            phoneNum: '01011110000',
            businessNum: '1111111111'
        }
    ]
    ///////////////////////////////////////////

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
                        <Subtitle className="w-40 p-3 min-w-fit">사업자 번호</Subtitle>
                    </div>
                </div>
            </UserInfoItemBox>
            {waitDummy.map((waitUser, index) => (
                <WaitUser key={index} waitUser={waitUser} />
            ))}
        </SubBox>
    )
}
