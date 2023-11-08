import React from 'react'

//관리자 페이지 버튼 스타일 - 추후 props(아마 대기목록의 회원 아이디) 더 추가해야함

type ButtonProps = {
  text?: string
  bgColor?: string
}

export const Button: React.FC<ButtonProps> = ({text, bgColor}) => {
  const buttonClass = `btn m-1 p-5 ${bgColor} border rounded-lg text-white`

  return (
    <div className="flex">
      <button className={buttonClass}>{text}</button>
    </div>
  )
}
