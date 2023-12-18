import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCartShopping} from '@fortawesome/free-solid-svg-icons'
import {FC} from 'react'

type ShowTotalLikesProps = {
    // 찜목록 갯수 데이터 받아올것
}

export const ShowTotalLikes: FC<ShowTotalLikesProps> = ({}) => {
    return (
        <div className="inline-block">
            {/* 버튼 클릭시 장바구니 페이지로 이동하도록 할 것*/}
            <button className="mr-4">
                <FontAwesomeIcon
                    icon={faCartShopping}
                    className="w-8 h-8 mr-3 cursor-pointer"
                />
            </button>
            <button>
                <span className="text-4xl cursor-pointer hover:underline">50</span>
            </button>
        </div>
    )
}
