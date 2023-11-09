import React, {FC} from 'react'

//관리자 페이지 버튼 스타일 - 추후 props(아마 대기목록의 회원 아이디) 더 추가해야함

type ButtonProps = {
  text?: string
  bgColor?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export const Button: FC<ButtonProps> = ({text, bgColor, onClick}) => {
  const buttonClass = `btn m-1 p-5 ${bgColor} border rounded-lg text-white`

  return (
    <div className="flex">
      <button className={buttonClass} onClick={onClick}>
        {text}
      </button>
    </div>
  )
}
