import React, {FC, useState} from 'react'
import {Button, ReportModal, UserInfo} from '../../index'
import {RepoartData} from '../../../data/manager/index'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBell} from '@fortawesome/free-solid-svg-icons'

//신고 정보

type ReportInfoProps = {
    //reportData: RepoartData
}

export const ReportInfo: FC<ReportInfoProps> = ({}) => {
    const [isModalOpen, setModalOpen] = useState<boolean>(false)

    const openModal = () => setModalOpen(true)
    const closeModal = () => setModalOpen(false)
    return (
        <div>
            <div className="p-3 m-5 border-b-2 cursor-pointer" onClick={openModal}>
                <div className="flex justify-between w-full ">
                    <UserInfo text="날짜" />
                    <UserInfo text="게시글 번호" />
                    <UserInfo text="아이디" />
                    <UserInfo text="신고유저" />
                </div>
            </div>
            <ReportModal isOpen={isModalOpen} onClose={closeModal}>
                <div className="flex flex-row items-center justify-center">
                    <FontAwesomeIcon icon={faBell} className="mr-2" />
                    <h1 className="text-xl font-bold">신고</h1>
                </div>

                <p className="mt-4">날짜 : {'날짜'}</p>
                <p className="mt-4">게시글 번호 : {'게시글번호'}</p>
                <p className="mt-4">아이디 : {'아이디'}</p>
                <p className="mt-4">신고 유저 : {'신고유저'}</p>
                <p className="mt-4 break-all">
                    신고 사유 :<br /> -{'신고사유'}
                </p>
                <div className="flex justify-around mt-5">
                    <Button
                        styles="w-1/4 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700"
                        onClick={closeModal}
                        text="게시글로 이동"
                    />
                    <Button
                        styles="w-1/4 bg-gradient-to-r from-red-400 via-red-500 to-red-600"
                        onClick={closeModal}
                        text="제재"
                    />
                    <Button styles="w-1/4 btn-neutral" onClick={closeModal} text="닫기" />
                </div>
            </ReportModal>
        </div>
    )
}
