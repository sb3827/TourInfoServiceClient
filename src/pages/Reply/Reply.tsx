import {FC, PropsWithChildren} from 'react'
import {Input, Button, Comment} from '../../components'

type ReplyProps = {}

//더미 데이터
export const replyData = [
    {
        rno: 1,
        name: 'test',
        src: null,
        text: 'test',
        regDate: '2023-12-30',
        parent_rno: null
    },
    {
        rno: 2,
        name: 'test',
        src: null,
        text: 'test',
        regDate: '2023-12-30',
        parent_rno: null
    },
    {
        rno: 3,
        name: 'test',
        src: null,
        text: 'test',
        regDate: '2023-12-30',
        parent_rno: null
    }
]
///

// 댓글 part 작성+list
export const Reply: FC<PropsWithChildren<ReplyProps>> = () => {
    return (
        <div>
            <div className="flex flex-row items-center justify-center my-5">
                <Input
                    placeholder="댓글을 작성해 주세요"
                    className="mx-2 border-black"
                    size={80}></Input>
                <Button value="작성" className="" />
            </div>
            <div className="flex flex-col items-center justify-center w-full ">
                <div className="w-3/5 rounded-2xl">
                    {replyData.map(reply => (
                        <Comment reply={reply} key={reply.rno}></Comment>
                    ))}
                </div>
            </div>
        </div>
    )
}
