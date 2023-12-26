import {FC, useState} from 'react'
import {Button, ReportModal, TextBox, UserInfo, UserInfoItemBox} from '../../index'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBell} from '@fortawesome/free-solid-svg-icons'
import {ReportData} from '../../../data/manager/index'
import {checkReport, disciplinary} from '../../../api/Report/Report'
import {useDispatch} from 'react-redux'
import {setIsDone} from '../../../store/slices/ReportSlice'

//신고 정보

type ReportInfoProps = {
    reportData: ReportData
}

export const ReportInfo: FC<ReportInfoProps> = ({reportData}) => {
    const dispatch = useDispatch()

    const [isModalOpen, setModalOpen] = useState<boolean>(false)

    const openModal = () => {
        setModalOpen(true)
    }
    const closeModal = () => setModalOpen(false)

    //신고 확인
    async function onCheckReport() {
        try {
            const data = await checkReport(reportData.sno)
            if (data.data === -1) {
                alert('이미 처리된 신고 입니다.')
            } else {
                dispatch(setIsDone(true))
                closeModal()
            }
        } catch (err) {
            console.log(err)
        }
    }
    //제재
    async function onDisiplinary() {
        try {
            const data = await disciplinary(
                reportData.sno,
                reportData.defendant_mno,
                reportData.message
            )
            if (data.data === -1 && data.result === false) {
                alert('이미 정지된 유저입니다.')
            } else if (data.data === -2) {
                alert('신고 정보가 이상합니다.')
            } else if (data.data === -3) {
                alert('신고가 존재하지 않습니다.')
            } else if (data.result === true) {
                dispatch(setIsDone(true))
                closeModal()
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <UserInfoItemBox
                widthFull={true}
                pointer={true}
                justifyAround="justify-around"
                onClick={openModal}>
                <div
                    className={`flex justify-around w-full ${
                        reportData.isDone === true ? 'bg-orange-200 rounded-lg' : ''
                    }`}>
                    <UserInfo
                        text={reportData.isDone === true ? '처리 완료' : '처리중'}
                    />
                    <UserInfo text={reportData.regDate.toString()} />
                    <UserInfo text={reportData.sno.toString()} />
                    <UserInfo text={reportData.complainant} />
                    <UserInfo text={reportData.defendant} />
                </div>
            </UserInfoItemBox>
            {/* 모달 창 */}
            <ReportModal isOpen={isModalOpen} onClose={closeModal}>
                <div className="flex flex-row items-center justify-center">
                    <FontAwesomeIcon icon={faBell} className="mr-2" />
                    <h1 className="text-xl font-bold">신고</h1>
                </div>

                <p className="mt-4">날짜 : {reportData.regDate.toString()}</p>
                <p className="mt-4">게시글 번호 : {reportData.sno.toString()}</p>
                <p className="mt-4">아이디 : {reportData.complainant}</p>
                <p className="mt-4">신고 유저 : {reportData.defendant}</p>
                <p className="my-4 break-all">
                    신고 사유 :<br /> - {reportData.message}
                </p>
                <div className="overflow-auto max-h-52">
                    <TextBox data={reportData.content} />
                </div>
                {reportData.isDone === false ? (
                    <div className="flex justify-around mt-5">
                        <Button
                            className="w-1/4 btn-primary"
                            onClick={() => {
                                onCheckReport()
                            }}
                            value="처리"
                        />
                        <Button
                            className="w-1/4 bg-gradient-to-r from-red-400 via-red-500 to-red-600"
                            onClick={() => {
                                onDisiplinary()
                            }}
                            value="유저 제재"
                        />
                    </div>
                ) : (
                    ''
                )}
            </ReportModal>
        </div>
    )
}
