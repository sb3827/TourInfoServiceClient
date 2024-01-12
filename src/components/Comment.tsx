import {FC, PropsWithChildren, useState} from 'react'
import {Body, Caption} from './Texts'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEllipsisVertical} from '@fortawesome/free-solid-svg-icons'
import {DropdownIcon} from './Button'
import {dropdownText} from "../dummy data/sb's dummy"
import dummyImage from '../assets/profileImage.jpeg'
import {replyDatas} from '../pages'
import {Rereply} from './Reply/Rereply'
import {replyData} from '../data/Reply/Reply'
import {useSearchParams} from 'react-router-dom'
import {getChildreply} from '../api'

type CommentProps = {
    reply: replyData
}

// 댓글 하나
export const Comment: FC<PropsWithChildren<CommentProps>> = ({reply}) => {
    const [viewReply, setViewReply] = useState<Boolean>(false)
    const [reReply, setRereply] = useState<replyData[] | null>(null)

    const [searchParams] = useSearchParams()
    const bno = searchParams.get('bno')

    //대댓글 보기
    function onOpenReply() {
        setViewReply(true)
        getRereply()
    }
    //대댓글 닫기
    function onCloseReply() {
        setViewReply(false)
    }

    //대댓글 받아오는 로직 만들어야함
    async function getRereply() {
        if (bno) {
            const data = await getChildreply(parseInt(bno), reply.rno)
        }
    }

    return (
        <div className="flex flex-col">
            <div className="flex justify-center w-full mx-auto border-b border-lightGreen">
                <div className="flex flex-col items-center justify-center ">
                    <div>
                        <img className="w-10" src={reply.src ? reply.src : dummyImage} />
                    </div>
                    <div className="flex items-center">{reply.name}</div>
                </div>
                <div className="flex flex-col w-5/6">
                    <div className="flex justify-end mx-4 my-2">
                        <DropdownIcon texts={dropdownText}>
                            <FontAwesomeIcon
                                className="hover:cursor-pointer"
                                icon={faEllipsisVertical}
                                size="lg"
                            />
                        </DropdownIcon>
                    </div>

                    <div className="flex items-center justify-start mx-6">
                        <Body className="text-left">{reply.text}</Body>
                    </div>
                    <div className="flex justify-end mx-4 my-2">
                        <Caption>작성일자: {reply.regDate}</Caption>
                    </div>
                </div>
            </div>
            {/* 테스트 */}
            {replyDatas && !viewReply && (
                <p
                    className="mb-6 text-sm text-green-800 duration-100 cursor-pointer hover:font-bold "
                    onClick={onOpenReply}>
                    대댓글 보기
                </p>
            )}
            {reReply &&
                reReply.map(reply => (
                    <Rereply viewReply={viewReply} key={reply.rno} reReplyData={reply} />
                ))}

            {viewReply && (
                <p
                    className="mb-6 text-sm duration-100 cursor-pointer hover:font-bold"
                    onClick={onCloseReply}>
                    - 닫기 -
                </p>
            )}
        </div>
    )
}
