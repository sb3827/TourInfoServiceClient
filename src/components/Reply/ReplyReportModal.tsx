import {FC, useState} from 'react'
import {ReportModal} from '../manager/ReportList/ReportModal'
import {replyData} from '../../data/Reply/Reply'
import {Button} from '../Button'
import {useSelector} from 'react-redux'
import {RootState} from '../../store/rootReducer'
import {reportReply} from '../../api'

type ReplyReportModalProps = {
    replyData: replyData
    onCloseModal: (value: Boolean) => void
}

const ReplyReportModal: FC<ReplyReportModalProps> = ({replyData, onCloseModal}) => {
    const mno = useSelector((state: RootState) => state.login.mno)

    const [isModalOpen, setModalOpen] = useState<boolean>(true)
    const [reportReason, setReportReason] = useState<string>('')
    const closeModal = () => {
        setModalOpen(false)
        onCloseModal(false)
    }
    //신고 입력 값 변경
    function onChangeReportReason(value: string) {
        setReportReason(value)
    }

    //댓글 신고
    async function onReportReply() {
        if (mno) {
            const data = await reportReply({
                complainant: mno,
                defendant: replyData.mno,
                rno: replyData.rno,
                content: replyData.text,
                message: reportReason
            })
            alert('댓글 신고 완료')
        }
        closeModal()
    }

    return (
        <ReportModal isOpen={isModalOpen} onClose={closeModal}>
            <p className="flex m-6">유저 : {replyData.name}</p>
            <textarea
                value={reportReason}
                onChange={e => onChangeReportReason(e.target.value)}
                className="flex p-3 m-5 border border-black resize-none h-44"
                placeholder="신고 사유"></textarea>
            <div>
                <Button value={'신고'} onClick={onReportReply} />
                <Button value={'취소'} onClick={closeModal} />
            </div>
        </ReportModal>
    )
}

export default ReplyReportModal
