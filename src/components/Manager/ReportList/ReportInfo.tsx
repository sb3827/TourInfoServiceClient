import {FC, useState} from 'react'
import {Button, Modal, TextBox, UserInfo, UserInfoItemBox} from '../../index'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBell} from '@fortawesome/free-solid-svg-icons'
import {useDispatch} from 'react-redux'
import {setIsDone} from '../../../store/slices/ReportSlice'
import {checkReport, deletePlace, disciplinary} from '../../../api'
import {setReportSearch} from '../../../store/slices/SearchSlice'
import {ReportData} from '../../../data'

//신고 정보

type ReportInfoProps = {
    reportData: ReportData
}

export const ReportInfo: FC<ReportInfoProps> = ({reportData}) => {
    const dispatch = useDispatch()

    const [isModalOpen, setModalOpen] = useState<boolean>(false)

    function openModal() {
        setModalOpen(true)
    }
    function closeModal() {
        setModalOpen(false)
    }

    //신고 확인
    async function onCheckReport() {
        dispatch(setReportSearch(true))
        try {
            const data = await checkReport(reportData.sno)
            if (data.data === -1) {
                alert('이미 처리된 신고 입니다.')
                dispatch(setReportSearch(false))
            } else {
                dispatch(setIsDone())
                dispatch(setReportSearch(false))
                closeModal()
            }
        } catch (err) {
            console.error(err)
            dispatch(setReportSearch(false))
        }
    }
    //장소 삭제

    async function onPlaceDelete() {
        dispatch(setReportSearch(true))
        if (reportData.pno) {
            const data = await deletePlace(reportData.pno)
            dispatch(setIsDone())
            alert('장소 삭제 완료')
            closeModal()
        }
        dispatch(setReportSearch(false))
    }

    //유저 제재
    async function onDisiplinary() {
        dispatch(setReportSearch(true))
        if (reportData.defendant_mno) {
            try {
                const data = await disciplinary(
                    reportData.sno,
                    reportData.defendant_mno,
                    reportData.message
                )
                if (data.data === -1 && data.result === false) {
                    dispatch(setReportSearch(false))
                    alert('이미 정지된 유저입니다.')
                } else if (data.data === -2) {
                    dispatch(setReportSearch(false))
                    alert('신고 정보가 이상합니다.')
                } else if (data.data === -3) {
                    dispatch(setReportSearch(false))
                    alert('신고가 존재하지 않습니다.')
                } else if (data.result === true) {
                    dispatch(setIsDone())
                    dispatch(setReportSearch(false))
                    closeModal()
                }
            } catch (err) {
                console.error(err)
                dispatch(setReportSearch(false))
            }
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
                        reportData.isDone === true
                            ? 'bg-lightGreen text-white rounded-lg'
                            : ''
                    }`}>
                    <UserInfo
                        text={reportData.isDone === true ? '처리 완료' : '처리중'}
                    />
                    <UserInfo text={reportData.regDate.toString()} />
                    <UserInfo text={reportData.sno.toString()} />
                    <UserInfo
                        text={reportData.complainant ? reportData.complainant : 'X'}
                    />
                    <UserInfo text={reportData.defendant ? reportData.defendant : 'X'} />
                </div>
            </UserInfoItemBox>
            {/* 모달 창 */}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div className="flex flex-row items-center justify-center">
                    <FontAwesomeIcon icon={faBell} className="mr-2" />
                    <h1 className="text-xl font-bold">신고</h1>
                </div>

                <p className="mt-4">날짜 : {reportData.regDate.toString()}</p>
                <p className="mt-4">신고 번호 : {reportData.sno.toString()}</p>

                <p className="mt-4">
                    아이디 : {reportData.complainant ? reportData.complainant : 'X'}
                </p>
                <p className="mt-4">
                    신고 유저 : {reportData.defendant ? reportData.defendant : 'X'}
                </p>
                <p className="my-4 break-all">
                    신고 사유 :<br /> - {reportData.message}
                </p>
                {reportData.content && (
                    <div className="overflow-auto max-h-52">
                        <TextBox data={reportData.content} />
                    </div>
                )}
                {reportData.isDone === false && (
                    <div className="flex justify-around mt-5">
                        <Button
                            className="w-1/4 btn-primary"
                            onClick={() => {
                                onCheckReport()
                            }}
                            value="처리"
                        />
                        <Button
                            className="w-1/4 text-white bg-red-500"
                            onClick={() => {
                                reportData.pno ? onPlaceDelete() : onDisiplinary()
                            }}
                            value="제재"
                        />
                    </div>
                )}
            </Modal>
        </div>
    )
}
