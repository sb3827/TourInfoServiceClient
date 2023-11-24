import {FC} from 'react'

type BoardProps = {
    no?: number
    name?: string
    id?: string
    date?: string
    imageUrl?: string
}

export const Board: FC<BoardProps> = ({no, name, id, date, imageUrl}) => {
    // 썸네일 이미지 렌더링 부분
    const renderImage = imageUrl && <img src={imageUrl} alt="Board Image" />

    // 게시판 내용 렌더링 부분
    const renderBoardContent = (
        <div>
            {/* 게시글 더미데이터 */}
            <div className="flex items-center w-full border-b-2">
                <div className="w-3/4 p-3 m-5 rounded-lg">
                    <div className="flex justify-between w-full">
                        <div>{no}</div>
                        <div>{name}</div>
                        <div>{id}</div>
                        <div>{date}</div>
                    </div>
                </div>
            </div>
        </div>
    )

    // 썸네일 이미지와 게시판 내용을 반환
    if (imageUrl) {
        return <div>{renderImage}</div>
    }

    // 썸네일 이미지가 없는 경우에는 게시판 내용만 반환
    return renderBoardContent
}
