import image from './../../../assets/profileImage.jpeg'
import {FC, useState, useRef, ChangeEvent} from 'react'

// 프로필 이미지 등록 기능

type UserAvatarProps = {
    src: string
}

export const UserAvatar: FC<UserAvatarProps> = ({src}) => {
    const [imageSrc, setImageSrc] = useState(image)
    const fileInput = useRef<HTMLInputElement | null>(null)

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader()

            reader.onload = () => {
                if (reader.readyState === 2) {
                    const result = reader.result

                    if (typeof result === 'string') {
                        setImageSrc(result)
                    } else {
                        console.error('Unexpected result type:', typeof result)
                    }
                }
            }

            reader.readAsDataURL(e.target.files[0])
        }
    }

    // accept="image/*" 로 확장자 지정 가능 (모든 타입 이미지 파일 허용)
    return (
        <div>
            <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={onChange}
                ref={fileInput}
            />
            <img
                src={imageSrc}
                alt="기본 프로필 이미지"
                className="object-cover rounded-full cursor-pointer w-60 h-60"
                onClick={() => {
                    if (fileInput.current) {
                        fileInput.current.click()
                    }
                }}
            />
        </div>
    )
}
