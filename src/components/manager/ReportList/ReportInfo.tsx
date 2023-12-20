import {FC, useState} from 'react'
import {Button, ReportModal, UserInfo, UserInfoItemBox} from '../../index'
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
            <UserInfoItemBox
                widthFull={true}
                pointer={true}
                justifyAround="justify-around"
                onClick={openModal}>
                <div className="flex justify-around w-full">
                    <UserInfo text={reportData.regDate.toString()} />
                    <UserInfo text={reportData.sno.toString()} />
                    <UserInfo text={reportData.complainant} />
                    <UserInfo text={reportData.defendant} />
                </div>
            </UserInfoItemBox>
            <ReportModal isOpen={isModalOpen} onClose={closeModal}>
                <div className="flex flex-row items-center justify-center">
                    <FontAwesomeIcon icon={faBell} className="mr-2" />
                    <h1 className="text-xl font-bold">신고</h1>
                </div>

                <p className="mt-4">날짜 : {reportData.regDate.toString()}</p>
                <p className="mt-4">게시글 번호 : {reportData.sno.toString()}</p>
                <p className="mt-4">아이디 : {reportData.complainant}</p>
                <p className="mt-4">신고 유저 : {reportData.defendant}</p>
                <p className="mt-4 break-all">
                    신고 사유 :<br /> -{reportData.message}
                </p>
                <div className="flex justify-around mt-5">
                    <Button
                        className="w-1/4 btn-info"
                        onClick={closeModal}
                        value="게시글로 이동"
                    />
                    <Button
                        className="w-1/4 btn-primary"
                        onClick={closeModal}
                        value="처리"
                    />
                    <Button
                        className="w-1/4 bg-gradient-to-r from-red-400 via-red-500 to-red-600"
                        onClick={closeModal}
                        value="유저 제재"
                    />
                </div>
            </ReportModal>
        </div>
    )
}
