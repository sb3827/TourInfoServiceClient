import {FC, useState} from 'react'
import {Button, ReportModal, UserInfo, UserInfoItemBox} from '../../index'
import {UserData, suspendDate} from '../../../data/User/User'

type FindUserInfoProps = {
    users: UserData
}

export const FindUserInfo: FC<FindUserInfoProps> = ({users}) => {
    const [isModalOpen, setModalOpen] = useState<boolean>(false)

    const openModal = () => setModalOpen(true)
    const closeModal = () => setModalOpen(false)

    // 정지 이력 더미 데이터
    const dummyData: suspendDate[] = [
        {suspendStartDate: new Date(), suspendEndDate: new Date(), suspendReason: '그냥'},
        {
            suspendStartDate: new Date(-3),
            suspendEndDate: new Date(-1),
            suspendReason: '그냥'
        },
        {
            suspendStartDate: new Date(),
            suspendEndDate: new Date(+1),
            suspendReason: '그냥'
        }
    ]
    //////////////////////////////////////////////////////////

    return (
        <div>
            <UserInfoItemBox widthFull={false} isButton={true}>
                <div className="flex">
                    <UserInfo text={users.userName} />
                    <UserInfo text={users.userId} />
                    <UserInfo text={users.userEmail} />
                    <UserInfo text={users.phoneNum} />
                    <UserInfo text={users.regDate.toDateString()} />
                    <UserInfo
                        text={users.businessCheck === true ? '사업자' : '일반 회원'}
                    />
                </div>
                <div className="flex justify-end p-3 min-w-fit">
                    <Button
                        value="조회"
                        className="bg-white text-green-700 hover:text-white border border-green-700 hover:bg-green-800  focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 "
                        onClick={openModal}
                    />
                    <Button
                        value="탈퇴"
                        className="bg-white text-red-700 hover:text-white border border-red-700 hover:bg-red-800  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 "
                    />
                </div>
            </UserInfoItemBox>
            <ReportModal isOpen={isModalOpen} onClose={closeModal}>
                <div className="flex flex-row items-center justify-center">
                    <h1 className="text-xl font-bold">유저정보</h1>
                </div>

                <p className="mt-4">이름 : {users.userName}</p>
                <p className="mt-4">아이디 : {users.userId}</p>
                <p className="mt-4">이메일 : {users.userEmail}</p>
                <p className="mt-4">전화번호 : {users.phoneNum}</p>
                <p className="mt-4">가입일 : {users.regDate.toDateString()}</p>
                <p className="mt-4">
                    사업자여부 : {users.businessCheck === true ? '사업자' : '일반 회원'}
                </p>

                <p className="my-2 font-bold break-all">- 제재 이력 -</p>
                <div className="flex-col">
                    {dummyData.map((data, index) => (
                        <p key={index} className="flex justify-between mb-1">
                            <span>
                                {index + 1}. 정지 시작일 :{' '}
                                {data.suspendStartDate.toDateString()}
                            </span>{' '}
                            <span>
                                정지 종료일 : {data.suspendEndDate.toDateString()}
                            </span>
                            <span> 정지 사유 : {data.suspendReason}</span>
                        </p>
                    ))}
                </div>
            </ReportModal>
        </div>
    )
}
