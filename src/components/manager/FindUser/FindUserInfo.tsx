import {FC, useState} from 'react'
import {Button, ReportModal, UserInfo, UserInfoItemBox} from '../../index'
import {ManagerSearchUserData} from '../../../data/User/User'
import {getUserDisciplinary} from '../../../api'
import {DisciplinaryUserData} from '../../../data/manager'

type FindUserInfoProps = {
    users: ManagerSearchUserData
}

export const FindUserInfo: FC<FindUserInfoProps> = ({users}) => {
    const [isModalOpen, setModalOpen] = useState<boolean>(false)
    const [disciplinaryData, setDisciplinaryData] = useState<DisciplinaryUserData | null>(
        null
    )

    const openModal = () => setModalOpen(true)
    const closeModal = () => setModalOpen(false)

    async function onDisciplinaryAll() {
        try {
            const data = await getUserDisciplinary(users.mno)
            setDisciplinaryData(data)
        } catch (err) {
            console.log(err)
            alert('서버와 연결이 끊겼습니다.')
        }
    }

    return (
        <div>
            <UserInfoItemBox widthFull={false} isButton={true}>
                <div className="flex">
                    <UserInfo text={users.mno.toString()} />
                    <UserInfo text={users.name} />
                    <UserInfo text={users.email} />
                    <UserInfo text={users.phone ? users.phone : '0'} />
                    <UserInfo text={users.regDate} />
                    <UserInfo
                        text={users.role === 'BUSINESSPERSON' ? '사업자' : '일반 회원'}
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

                <p className="mt-4">회원 번호 : {users.mno}</p>
                <p className="mt-4">이름 : {users.name}</p>
                <p className="mt-4">이메일 : {users.email}</p>
                <p className="mt-4">전화번호 : {users.phone ? users.phone : '0'}</p>
                <p className="mt-4">가입일 : {users.regDate}</p>
                <p className="mt-4">
                    사업자여부 :{' '}
                    {users.role === 'BUSINESSPERSON' ? '사업자' : '일반 회원'}
                </p>

                <p className="my-2 font-bold break-all">- 제재 이력 -</p>
                <div className="flex-col">
                    {disciplinaryData?.data.map((data, index) => (
                        <p key={index} className="flex justify-between mb-1">
                            <span>
                                {index + 1}. 정지 시작일 : {data.strDate}
                            </span>{' '}
                            <span>정지 종료일 : {data.expDate}</span>
                            <span> 정지 사유 : {data.reason}</span>
                        </p>
                    ))}
                </div>
            </ReportModal>
        </div>
    )
}
