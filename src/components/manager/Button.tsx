import React from 'react'

type ButtonProps = {
  text: string
  bgColor: string
}

const Button: React.FC<ButtonProps> = ({text, bgColor}) => {
  // Template literals를 사용하여 동적으로 클래스 이름을 설정합니다.
  const buttonClass = `m-1 p-3 ${bgColor}`

  return (
    <div>
      <button className={buttonClass}>{text}</button>
    </div>
  )
}

export default Button
