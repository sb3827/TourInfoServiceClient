import {FC, PropsWithChildren, useEffect, useState} from 'react'
import {Input, Button, Comment} from '../../components'
import {useSearchParams} from 'react-router-dom'
import {replyData} from '../../data/Reply/Reply'
import {getParentReply} from '../../api'

type ReplyProps = {}

//더미 데이터
export const replyDatas = [
    {
        rno: 1,
        mno: 1,
        name: 'test',
        src: null,
        text: 'test',
        regDate: '2023-12-30',
        parent_rno: null
    },
    {
        rno: 2,
        mno: 2,
        name: 'test',
        src: null,
        text: 'test',
        regDate: '2023-12-30',
        parent_rno: null
    },
    {
        mno: 3,
        rno: 3,
        name: 'test',
        src: null,
        text: 'test',
        regDate: '2023-12-30',
        parent_rno: null
    }
]
//

//bno 받아와서 부모댓글 조회 기능 만들어 줘야함

// 댓글 part 작성+list
export const Reply: FC<PropsWithChildren<ReplyProps>> = () => {
    const [replyes, setReplyes] = useState<replyData[] | null>(null)

    const [searchParams] = useSearchParams()
    const bno = searchParams.get('bno')

    async function getReply() {
        if (bno) {
            const data = await getParentReply(parseInt(bno))
            setReplyes(data)
        }
    }

    useEffect(() => {
        getReply()
    }, [])
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
                    {replyes &&
                        replyes.map(reply => (
                            <Comment reply={reply} key={reply.rno}></Comment>
                        ))}
                </div>
            </div>
        </div>
    )
}
