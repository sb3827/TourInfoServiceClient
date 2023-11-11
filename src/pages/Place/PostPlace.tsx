import {FC, PropsWithChildren} from 'react'
import {Title} from '../../components'
import {Reply} from '../Reply'

type PostPlaceProps = {
    title: string
}

export const PostPlace: FC<PropsWithChildren<PostPlaceProps>> = ({title}) => {
    return (
        <div>
            <div>
                {/*header*/}
                <div>뒤로가기 버튼 변경 요망</div>
                <Title>{title}</Title>
                <div className="flex flex-row">
                    <div>별점</div>
                    <div>좋아요</div>
                </div>
            </div>
            <div>
                {/*body*/}
                <div>img map</div>
                <div>글....</div>
            </div>
            <div>
                {/*footer*/}
                <Reply />
            </div>
        </div>
    )
}
