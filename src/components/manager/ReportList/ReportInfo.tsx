import React, {FC, useState} from 'react'
import {Button, ReportModal, UserInfo} from '../../index'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBell} from '@fortawesome/free-solid-svg-icons'
import {ReportData} from '../../../data/manager/index'

//신고 정보

type ReportInfoProps = {
    reportData: ReportData
}

export const ReportInfo: FC<ReportInfoProps> = ({reportData}) => {
    const [isModalOpen, setModalOpen] = useState<boolean>(false)

    const openModal = () => setModalOpen(true)
    const closeModal = () => setModalOpen(false)
    return (
        <div>
            <div className="p-3 border-b-2 cursor-pointer min-w-fit" onClick={openModal}>
                <div className="flex justify-between w-full ">
                    <UserInfo text={reportData.reportDate.toDateString()} />
                    <UserInfo text={reportData.listNum.toString()} />
                    <UserInfo text={reportData.userId} />
                    <UserInfo text={reportData.reportedUser} />
                </div>
            </div>
            <ReportModal isOpen={isModalOpen} onClose={closeModal}>
                <div className="flex flex-row items-center justify-center">
                    <FontAwesomeIcon icon={faBell} className="mr-2" />
                    <h1 className="text-xl font-bold">신고</h1>
                </div>

                <p className="mt-4">날짜 : {reportData.reportDate.toDateString()}</p>
                <p className="mt-4">게시글 번호 : {reportData.listNum.toString()}</p>
                <p className="mt-4">아이디 : {reportData.userId}</p>
                <p className="mt-4">신고 유저 : {reportData.reportedUser}</p>
                <p className="mt-4 break-all">
                    신고 사유 :<br /> -{reportData.reportDetail}
                </p>
                <div className="flex justify-around mt-5">
                    <Button
                        className="w-1/4 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700"
                        onClick={closeModal}
                        value="게시글로 이동"
                    />
                    <Button
                        className="w-1/4 bg-gradient-to-r from-red-400 via-red-500 to-red-600"
                        onClick={closeModal}
                        value="제재"
                    />
                    <Button
                        className="w-1/4 btn-neutral"
                        onClick={closeModal}
                        value="닫기"
                    />
                </div>
            </ReportModal>
        </div>
    )
}
