import {FC} from 'react'

type BoardProps = {
    no?: number
    name?: string
    id?: string
    date?: string
    imageUrl?: string
}

export const Board: FC<BoardProps> = ({no, name, id, date, imageUrl}) => {
    return (
        <div>
            {/* 게시글 더미데이터 */}
            <div className="flex items-center w-full border-b-2">
                <div className="w-3/4 p-3 m-5 rounded-lg">
                    <div className="flex justify-between w-full ">
                        <div>{no}</div>
                        <div>{name}</div>
                        <div>{id}</div>
                        <div>{date}</div>
                        <div>{imageUrl}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
