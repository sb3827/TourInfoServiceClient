import {FC, PropsWithChildren} from 'react'
import {Body, Caption} from './Texts'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEllipsisVertical} from '@fortawesome/free-solid-svg-icons'

type CommentProps = {
    img: string //img src
    user: string // 작성자
    comment: string // 댓글
    date: string // 최종 수정 날짜
}

// 댓글 하나
export const Comment: FC<PropsWithChildren<CommentProps>> = props => {
    return (
        <div className="flex justify-center w-10/12 mx-auto rounded-2xl bg-slate-200">
            <div className="w-1/12 h-full my-4 ml-4">
                <div className="w-11/12 mx-auto my-auto rounded-full h-3/5 bg-slate-300">
                    {props.img}
                </div>
                {props.user}
            </div>
            <div className="flex flex-col w-5/6">
                <div className="flex justify-end mx-4 my-4">
                    <FontAwesomeIcon icon={faEllipsisVertical} size="xl" />
                </div>
                <div className="flex mx-6">
                    <Body className="mx-6 text-ellipsis">{props.comment}</Body>
                </div>
                <div className="flex justify-end mx-4 my-4">
                    <Caption>작성일자: {props.date}</Caption>
                </div>
            </div>
        </div>
    )
}
