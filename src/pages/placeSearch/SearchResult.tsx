import React, {FC} from 'react'

//WaitUser에 사용될 아이템들(이름,아이디 등등) - 추후 props 추가(속성값 추가해줘야함, value 값)

type SearchResultProps = {
  text: string
}

export const SearchResult: FC<SearchResultProps> = ({text}) => {
    var i: number = 7
  return (
    <div>
        {Array.from({length: i}, () => (
            <div className="p-10 m-2 border rounded-lg border--300 bg-sky-200">
                 <span>{text}</span>
                 </div>
        ))}
     </div>

  )
}