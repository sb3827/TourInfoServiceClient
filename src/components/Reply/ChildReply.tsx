import React, {useEffect, useState} from 'react'
import {Button, DropdownIcon} from '../Common/Button'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowTurnUp, faEllipsisVertical} from '@fortawesome/free-solid-svg-icons'
import dummyImage from '../../assets/profileImage.jpeg'
import {deleteReply, updateReply} from '../../api'
import {useSelector} from 'react-redux'
import {RootState} from '../../store/rootReducer'
import ReplyReportModal from './ReplyReportModal'
import {useNavigate} from 'react-router-dom'
import {replyData} from '../../data'
import {Caption, Input} from '../Common'

type ChildReplyProps = {
    viewReply: Boolean
    reReplyData: replyData
    getRereply: () => void
}

export const ChildReply: React.FC<ChildReplyProps> = ({
    viewReply,
    reReplyData,
    getRereply
}) => {
    const mno = useSelector((state: RootState) => state.login.mno)
    const dropdownText = ['댓글 달기', '수정', '삭제', '신고']

    const navigate = useNavigate()

    //댓글 값
    const [replyValue, setReplyValue] = useState<string>(reReplyData.text)
    //...버튼 안의 값 받아오기
    const [dropdownValue, setDropdownValue] = useState<string>('')

    //댓글 수정
    const [updateView, setUpdateVeiw] = useState<Boolean>(false)
    //신고 모달
    const [reportModalView, setReportModalView] = useState<Boolean>(false)

    function onChangeReply(value: string) {
        setReplyValue(value)
    }

    //드롭다운 값 받아오기
    function onGetDropdownValue(value: string) {
        if (value === '수정') {
            setUpdateVeiw(true)
        } else if (value === '삭제') {
            onDeleteReply()
        } else if (value === '신고') {
            onOpenModal()
        }
        setDropdownValue(value)
    }

    async function onDeleteReply() {
        try {
            if (window.confirm('해당 댓글을 삭제하시겠습니까?')) {
                mno && (await deleteReply({rno: reReplyData.rno, mno}))
                setUpdateVeiw(false)
                getRereply()
            }
        } catch (err) {
            console.error(err)
        }
    }

    function onOpenModal() {
        setReportModalView(true)
    }

    function onCloseModal(value: Boolean) {
        setReportModalView(value)
    }

    //수정 취소
    function onUpdateCancel() {
        setReplyValue(reReplyData.text)
        setUpdateVeiw(false)
    }
    //댓글 수정
    async function onUpdateReply() {
        try {
            mno && (await updateReply({rno: reReplyData.rno, mno, text: replyValue}))
            setUpdateVeiw(false)
            alert('수정완료')
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        setReplyValue(reReplyData.text)
    }, [reReplyData.text])

    return (
        <div
            className={`border-b border-lightGreen my-2 flex items-end justify-end w-full ${
                viewReply ? '' : 'hidden '
            }`}>
            <div className="flex justify-center w-11/12 ">
                <div className="flex items-center justify-center mr-5">
                    <FontAwesomeIcon
                        icon={faArrowTurnUp}
                        rotation={90}
                        color="darkGreen"
                    />
                </div>
                <div className="flex flex-col items-center justify-center w-24">
                    <div>
                        <img
                            className="w-10 cursor-pointer"
                            alt="프로필 사진"
                            src={reReplyData.src ? reReplyData.src : dummyImage}
                            onClick={() => {
                                if (reReplyData.mno !== null) {
                                    navigate(`/mypage/${reReplyData.mno}`)
                                } else {
                                    alert('탈퇴한 회원입니다')
                                }
                            }}
                        />
                    </div>
                    <div
                        className="flex items-center cursor-pointer hover:underline"
                        onClick={() => {
                            if (reReplyData.mno !== null) {
                                navigate(`/mypage/${reReplyData.mno}`)
                            } else {
                                alert('탈퇴한 회원입니다')
                            }
                        }}>
                        {reReplyData.name}
                    </div>
                </div>
                <div className="flex flex-col w-5/6">
                    <div className="flex justify-end mx-4 my-2">
                        {mno && reReplyData.mno && (
                            <DropdownIcon
                                texts={dropdownText}
                                replyMno={reReplyData.mno}
                                replyParent={reReplyData.parent_rno}
                                onGetDropdownValue={onGetDropdownValue}>
                                <FontAwesomeIcon
                                    className="hover:cursor-pointer"
                                    icon={faEllipsisVertical}
                                    size="lg"
                                />
                            </DropdownIcon>
                        )}
                    </div>
                    <div className="flex items-center justify-start mx-6">
                        <Input
                            className="w-4/5 text-left border-black cursor-default focus:outline-none read-only:border-none"
                            readOnly={!updateView ? true : false}
                            value={replyValue}
                            onChange={e => onChangeReply(e.target.value)}
                        />
                        {updateView && (
                            <>
                                <Button
                                    value={'수정'}
                                    className="text-white bg-blue-500"
                                    onClick={onUpdateReply}
                                />
                                <Button
                                    value={'취소'}
                                    className="text-white bg-black"
                                    onClick={onUpdateCancel}
                                />
                            </>
                        )}
                    </div>
                    <div className="flex justify-end mx-4 my-2">
                        <Caption>작성일자: {reReplyData.regDate.slice(0, 10)}</Caption>
                    </div>
                </div>
            </div>
            {reportModalView && (
                <ReplyReportModal replyData={reReplyData} onCloseModal={onCloseModal} />
            )}
        </div>
    )
}
