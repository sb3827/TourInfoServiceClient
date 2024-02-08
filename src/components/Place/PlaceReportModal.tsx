import {FC, useState} from 'react'
import {Button, Modal} from '../Common'
import {useSelector} from 'react-redux'
import {RootState} from '../../store/rootReducer'

type PlaceReportModalProps = {
    onCloseModal: (value: Boolean) => void
}

export const PlaceReportModal: FC<PlaceReportModalProps> = ({onCloseModal}) => {
    const [isModalOpen, setModalOpen] = useState<boolean>(true)
    const [reportReason, setReportReason] = useState<string>('')

    const mno = useSelector((state: RootState) => state.login.mno)

    function closeModal() {
        setModalOpen(false)
        onCloseModal(false)
    }

    function onChangeReportReason(value: string) {
        setReportReason(value)
    }

    //장소 신고
    async function onReportPlace() {}

    return (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
            <p className="flex m-6">유저</p>
            <textarea
                value={reportReason}
                onChange={e => onChangeReportReason(e.target.value)}
                className="flex p-3 m-5 border border-black resize-none h-44"
                placeholder="신고 사유"></textarea>
            <div>
                <Button value={'신고'} onClick={onReportPlace} />
                <Button value={'취소'} onClick={closeModal} />
            </div>
        </Modal>
    )
}
