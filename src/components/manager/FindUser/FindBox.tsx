import {FC} from 'react'
import {
    FindUserInfo,
    LoadingSppinnerSmall,
    SubBox,
    Subtitle,
    UserInfoItemBox
} from '../../index'
import {ManagerSearchUserData} from '../../../data/User/User'
import {useSelector} from 'react-redux'
import {RootState} from '../../../store/rootReducer'

type FindBoxProps = {
    userData: ManagerSearchUserData[] | null
}

//유저 검색 박스

export const FindBox: FC<FindBoxProps> = ({userData}) => {
    const searchLoading = useSelector((state: RootState) => state.search.managerSearch)

    return (
        <SubBox className="relative">
            <UserInfoItemBox widthFull={false}>
                <div className="flex">
                    <div>
                        <Subtitle className="w-40 p-3 min-w-fit">번호</Subtitle>
                    </div>
                    <div>
                        <Subtitle className="w-40 p-3 min-w-fit">이름</Subtitle>
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
            {searchLoading && <LoadingSppinnerSmall />}
            {userData?.map((users, index) => (
                <FindUserInfo key={index} users={users} />
            ))}
            {userData?.length === 0 ? (
                <p className="mt-4 text-lg">검색 결과가 존재하지 않습니다...</p>
            ) : (
                ''
            )}
        </SubBox>
    )
}
