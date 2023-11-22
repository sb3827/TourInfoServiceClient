import {FC, PropsWithChildren} from 'react'
import {Input, Button, Comment} from '../../components'
import {array} from "../../dummy data/sb's dummy"

type ReplyProps = {}

// 댓글 part 작성+list
export const Reply: FC<PropsWithChildren<ReplyProps>> = () => {
    return (
        <div>
            <div className="flex flex-row justify-center">
                <Input
                    placeholder="댓글을 작성해 주세요"
                    className="mx-2 border-black"
                    size={80}></Input>
                <Button text="작성" styles="" />
            </div>
            <div className="flex justify-center">
                <Comment
                    img={array[0]}
                    user={array[1]}
                    comment={array[2]}
                    date={array[3]}></Comment>
            </div>
        </div>
    )
}
