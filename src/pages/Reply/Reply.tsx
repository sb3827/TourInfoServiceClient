import {FC, PropsWithChildren, useEffect, useState} from 'react'
import {Input, Button, ParentReply} from '../../components'
import {useSearchParams} from 'react-router-dom'
import {replyData} from '../../data/Reply/Reply'
import {createReply, getParentReply} from '../../api'
import {useSelector} from 'react-redux'
import {RootState} from '../../store/rootReducer'

type ReplyProps = {}

// 댓글 part 작성+list
export const Reply: FC<PropsWithChildren<ReplyProps>> = () => {
    const mno = useSelector((state: RootState) => state.login.mno)

    const [replyes, setReplyes] = useState<replyData[] | null>(null)
    const [replyValue, setReplyValue] = useState<string>('')

    const [searchParams] = useSearchParams()
    const bno = searchParams.get('bno')

    //댓글 값 변경
    function onChangeReply(e: string) {
        setReplyValue(e)
    }

    //댓글 불러오기
    async function getReply() {
        if (bno) {
            const data = await getParentReply(parseInt(bno))
            setReplyes(data)
        }
    }

    //댓글 등록
    async function registReply() {
        if (bno && mno) {
            const data = await createReply({
                text: replyValue,
                bno: parseInt(bno),
                mno,
                parentRno: null
            })
            getReply()
            alert('댓글등록 완료')
            setReplyValue('')
        }
    }

    useEffect(() => {
        getReply()
    }, [])

    return (
        <div>
            {mno && (
                <div className="flex flex-row items-center justify-center my-16">
                    <Input
                        placeholder="댓글을 작성해 주세요"
                        className="mx-2 border-black"
                        size={80}
                        value={replyValue}
                        onChange={e => onChangeReply(e.target.value)}></Input>
                    <Button value="작성" className="" onClick={registReply} />
                </div>
            )}
            <div className="flex flex-col items-center justify-center w-full ">
                <div className="w-4/5 rounded-2xl">
                    {replyes &&
                        replyes.map(reply => (
                            <ParentReply
                                reply={reply}
                                key={reply.rno}
                                getReply={() => getReply()}></ParentReply>
                        ))}
                </div>
            </div>
        </div>
    )
}
