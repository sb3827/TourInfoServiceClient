import {FC, useState} from 'react'
import {Button, Modal} from '../Common'
import {useSelector} from 'react-redux'
import {RootState} from '../../store/rootReducer'
import {reportPlace} from '../../api'

type PlaceReportModalProps = {
    pno: number
    name: string
    onCloseModal: (value: Boolean) => void
}

export const PlaceReportModal: FC<PlaceReportModalProps> = ({...props}) => {
    const [isModalOpen, setModalOpen] = useState<boolean>(true)
    const [reportReason, setReportReason] = useState<string>('')

    const mno = useSelector((state: RootState) => state.login.mno)

    function closeModal() {
        setModalOpen(false)
        props.onCloseModal(false)
    }

    function onChangeReportReason(value: string) {
        setReportReason(value)
    }

    //장소 신고
    async function onReportPlace() {
        try {
            reportPlace({
                complainant: mno as number,
                pno: props.pno,
                content: '장소명: ' + props.name,
                message: reportReason
            })
            props.onCloseModal(false)
            alert('신고 접수 완료')
        } catch (error) {
            alert(error)
        }
    }

    return (
        <Modal className="z-50" isOpen={isModalOpen} onClose={closeModal}>
            <p className="flex m-6 mb-0 text-2xl">
                장소: {props.name} (No.{props.pno})
            </p>
            <textarea
                value={reportReason}
                onChange={e => onChangeReportReason(e.target.value)}
                className="flex p-3 m-5 border border-black rounded-md resize-none h-44"
                placeholder="신고 사유"></textarea>
            <div>
                <Button value={'신고'} onClick={onReportPlace} />
                <Button value={'취소'} onClick={closeModal} />
            </div>
        </Modal>
    )
}
