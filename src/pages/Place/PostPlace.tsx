import {FC, PropsWithChildren} from 'react'
import {Title, Map} from '../../components'
import {Reply} from '../Reply'

type PostPlaceProps = {
    title: string
}

export const PostPlace: FC<PropsWithChildren<PostPlaceProps>> = ({title}) => {
    return (
        <div>
            <div className="my-2">
                {/*header*/}
                <div>뒤로가기 버튼 변경 요망</div>
                <Title>{title}</Title>
                <div className="flex flex-row justify-end">
                    <div>별점</div>
                    <div>좋아요</div>
                </div>
            </div>
            <div className="my-2">
                {/*body*/}
                <div className="flex flex-row justify-center">
                    img
                    <Map width="600px" height="400px"></Map>
                </div>
                <div>글....</div>
            </div>
            <div className="my-2">
                {/*footer*/}
                <Reply />
            </div>
        </div>
    )
}
