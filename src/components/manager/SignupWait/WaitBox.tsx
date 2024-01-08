import {FC, useEffect, useState} from 'react'
import {
    LoadingSppinnerSmall,
    SubBox,
    Subtitle,
    UserInfoItemBox,
    WaitUser
} from '../../index'
import {SignupWaitData} from '../../../data/User/User'
import {getSignupWait} from '../../../api/Manager/Manager'
import {useSelector} from 'react-redux'
import {RootState} from '../../../store/rootReducer'

//회원 대기 목록 컴포넌트 합체 - 추후 WaitUser에 props 추가하여야하고 반복문으로 수정해야함

type WaitBoxProps = {}

export const WaitBox: FC<WaitBoxProps> = ({}) => {
    const [waitData, setWaitData] = useState<Array<SignupWaitData>>()
    const userCheck = useSelector((state: RootState) => state.manager.isDone)

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
            setLoading(false)
        }
    }
    useEffect(() => {
        onSignupWaitList()
    }, [userCheck])

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
            {waitData?.length === 0 ? (
                <p className="mt-4 text-lg">검색 결과가 존재하지 않습니다...</p>
            ) : (
                ''
            )}
        </SubBox>
    )
}
