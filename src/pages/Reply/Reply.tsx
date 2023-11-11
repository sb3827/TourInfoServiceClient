import {FC, PropsWithChildren} from 'react'
import {Input, Button} from '../../components'

type ReplyProps = {}

export const Reply: FC<PropsWithChildren<ReplyProps>> = () => {
    return (
        <div>
            <div className="flex flex-row justify-center">
                <Input
                    placeholder="댓글을 작성해 주세요"
                    className="mx-2 border-black"
                    size={80}></Input>
                <Button text="작성" className="" />
            </div>
            <div>reply list</div>
        </div>
    )
}
