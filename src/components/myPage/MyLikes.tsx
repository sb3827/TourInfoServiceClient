import React, {FC, useState, CSSProperties} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCartShopping, faCartPlus} from '@fortawesome/free-solid-svg-icons'

type MyLikesProps = {
    className?: string // className prop 추가
    likeSize?: string // likeSize prop 추가
}

export const MyLikes: FC<MyLikesProps> = ({className, likeSize}) => {
    const [myLike, setMyLike] = useState(0)
    const [toggle, setToggle] = useState(false)

    const onToggle = () => {
        setToggle(prevToggle => !prevToggle)
        setMyLike(prevLike => (toggle ? prevLike - 1 : prevLike + 1))
    }

    const spanStyle: CSSProperties = {
        fontSize: likeSize || '8rem' // likeSize prop에 따라 동적으로 크기 지정
    }

    return (
        <div>
            {toggle ? (
                <FontAwesomeIcon
                    icon={faCartPlus}
                    onClick={onToggle}
                    className={`w-20 h-20 cursor-pointer ${className}`}
                />
            ) : (
                <FontAwesomeIcon
                    icon={faCartShopping}
                    onClick={onToggle}
                    className={`w-20 h-20 cursor-pointer ${className}`}
                />
            )}
            <span className="ml-4" style={spanStyle}>
                {myLike}
            </span>
        </div>
    )
}
