import image from './../../../assets/profileImage.jpeg'
import {useState} from 'react'

interface Button {
    id: number
    name: string
    isClicked: boolean
}

export const MyFollowerBox: React.FC = () => {
    const initialButtons: Button[] = [
        {id: 1, name: '김상백', isClicked: true},
        {id: 2, name: 'v_star', isClicked: false},
        {id: 3, name: '홍희범', isClicked: false}
        // 팔로잉 목록 추가
    ]

    const [buttons, setButtons] = useState<Button[]>(initialButtons)

    const handleClick = (id: number) => {
        setButtons(prevButtons =>
            prevButtons.map(button =>
                button.id === id ? {...button, isClicked: !button.isClicked} : button
            )
        )
    }

    return (
        <div className="flex-row w-1/3 pt-4 pb-4 border-2">
            {buttons.map(button => (
                <div
                    key={button.id}
                    className="flex items-center h-20 mb-4 border bg-green-50">
                    <img
                        src={image}
                        alt="프로필 사진"
                        className="inline w-12 h-12 ml-8 mr-8"
                    />
                    <span className="mr-8 text-xl">{button.name}</span>
                    <button
                        className={`w-20 h-10 ml-auto mr-8 rounded-lg  cursor-pointer ${
                            button.isClicked ? 'bg-blue-600 text-black' : 'bg-blue-300'
                        }`}
                        onClick={() => handleClick(button.id)}>
                        팔로우
                    </button>
                </div>
            ))}
        </div>
    )
}
