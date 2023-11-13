import React, {FC} from 'react'


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