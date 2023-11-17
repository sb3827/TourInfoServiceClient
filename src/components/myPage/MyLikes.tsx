import React, {FC, useState} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCartShopping, faCartPlus} from '@fortawesome/free-solid-svg-icons'

// 장바구니 기능
// 좋아요 기능은 FontAwesomeIcon icon만 faThumbsUP으로 바꿔서 사용.

type MyLikesProps = {}

export const MyLikes: FC<MyLikesProps> = ({}) => {
    const [myLike, setMyLike] = useState(0)
    const [toggle, setToggle] = useState(false)

    const onToggle = () => {
        setToggle(prevToggle => !prevToggle)
        setMyLike(prevLike => (toggle ? prevLike - 1 : prevLike + 1))
    }

    return (
        <div>
            {toggle ? (
                <FontAwesomeIcon
                    icon={faCartPlus}
                    onClick={onToggle}
                    className="w-20 h-20 cursor-pointer"
                />
            ) : (
                <FontAwesomeIcon
                    icon={faCartShopping}
                    onClick={onToggle}
                    className="w-20 h-20 cursor-pointer"
                />
            )}
            <span className="ml-12 text-8xl">{myLike}</span>
        </div>
    )
}
