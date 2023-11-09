import React, {Children, FC, useState} from 'react'

//토글 버튼 컴포넌트

export const ToggleButton: FC<React.PropsWithChildren> = ({children}) => {
  const [toggle, setToggle] = useState<Boolean>(true)

  //children 배열로 만들어줌
  const result = Children.toArray(children)

  //첫번째 버튼 클릭시 이벤트
  function onChangeFirstButton() {
    setToggle(true)
  }

  //두번째 버튼 클릭시 이벤트
  function onChangeSecondButton() {
    setToggle(false)
  }
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-2/3">
        <div className="items-center ">
          <button
            onClick={onChangeFirstButton}
            className={`border-0 btn ${
              toggle === true ? 'btn-info text-white' : 'btn-ghost'
            }`}>
            {result[0]}
          </button>
          <button
            onClick={onChangeSecondButton}
            className={`border-0 btn ${
              toggle === false ? 'btn-info text-white' : 'btn-ghost'
            } `}>
            {result[1]}
          </button>
        </div>
      </div>
      {result.length > 2 ? (toggle === true ? result[2] : result[3]) : null}
    </div>
  )
}
