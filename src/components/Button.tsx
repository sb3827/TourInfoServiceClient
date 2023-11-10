import React, {FC, PropsWithChildren} from 'react'

//관리자 페이지 버튼 스타일 - 추후 props(아마 대기목록의 회원 아이디) 더 추가해야함

type ButtonProps = {
  text?: string | React.ReactNode
  styles?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export const Button: FC<ButtonProps> = ({text, styles, onClick}) => {
  const buttonClass = `btn m-1 p-5 ${styles} border rounded-lg text-white`

  return (
    <button className={buttonClass} onClick={onClick}>
      {text}
    </button>
  )
}
