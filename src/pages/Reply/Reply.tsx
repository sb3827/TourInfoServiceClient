import {FC, PropsWithChildren} from 'react'

type ReplyProps = {}

export const Reply: FC<PropsWithChildren<ReplyProps>> = () => {
    return (
        <div>
            input 넣고, 버튼 넣고
            <div>reply list</div>
        </div>
    )
}
