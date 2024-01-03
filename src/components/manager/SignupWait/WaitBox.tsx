import {FC, useEffect, useState} from 'react'
import {
    LoadingSppinnerSmall,
    SubBox,
    Subtitle,
    UserInfoItemBox,
    WaitUser
} from '../../index'
import {SignupWaitData} from '../../../data/User/User'
import {useDispatch} from 'react-redux'
import {getSignupWait} from '../../../api/Manager/Manager'

//회원 대기 목록 컴포넌트 합체 - 추후 WaitUser에 props 추가하여야하고 반복문으로 수정해야함

type WaitBoxProps = {}

export const WaitBox: FC<WaitBoxProps> = ({}) => {
    const dispatch = useDispatch()
    const [waitData, setWaitData] = useState<Array<SignupWaitData>>()
    const [loading, setLoading] = useState<Boolean>(false)

    //회원 대기 조회
    async function onSignupWaitList() {
        setLoading(true)
        try {
            const data = await getSignupWait()
            setWaitData(data)
            setLoading(false)
        } catch (err) {
            console.log(err)
            alert('서버와 연결이 끊겼습니다.')
            setLoading(false)
        }
    }
    useEffect(() => {
        onSignupWaitList()
    }, [])

    return (
        <SubBox className="relative">
            <UserInfoItemBox widthFull={false}>
                <div className="flex">
                    <div>
                        <Subtitle className="w-40 p-3 min-w-fit">회원번호</Subtitle>
                    </div>
                    <div>
                        <Subtitle className="w-40 p-3 min-w-fit">이름</Subtitle>
                    </div>
                    <div>
                        <Subtitle className="w-40 p-3 min-w-fit">이메일</Subtitle>
                    </div>
                    <div>
                        <Subtitle className="w-40 p-3 min-w-fit">사업자 번호</Subtitle>
                    </div>
                </div>
            </UserInfoItemBox>

            {loading && <LoadingSppinnerSmall />}

            {waitData &&
                waitData.map((waitUser, index) => (
                    <WaitUser key={index} waitUser={waitUser} />
                ))}
        </SubBox>
    )
}
