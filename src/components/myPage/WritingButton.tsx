import {FC, useState} from 'react'
import {MyCourseBox, MyPostBox, MyReplyBox} from './../index'

// 마이페이지 작성 글 보기 버튼

type WritingButtonProps = {}

export const WritingButton: FC<WritingButtonProps> = ({}) => {
    const [content, setContent] = useState(<MyPostBox />)
    const [toggle, setToggle] = useState('post')
    // 초기 상태는 작성 게시글 보기 형태

    const components: {[key: string]: JSX.Element} = {
        post: <MyPostBox />,
        course: <MyCourseBox />,
        reply: <MyReplyBox />
    }

    const onChangeContent = (type: string) => {
        setContent(components[type])
        setToggle(type)
    }

    return (
        <div className="w-4/5 pt-4 overflow-y-auto border rounded-xl h-80">
            <div className="justify-center inline-block ">
                <button
                    onClick={() => onChangeContent('post')}
                    className={`w-40 h-12 ml-32 mb-8 border-2 rounded-md focus:outline-none focus:shadow-outline ${
                        toggle === 'post' ? 'btn-info text-black' : 'btn-ghost'
                    }`}>
                    작성 게시글
                </button>
                <button
                    onClick={() => onChangeContent('course')}
                    className={`w-40 h-12 border-2 rounded-md focus:outline-none focus:shadow-outline ${
                        toggle === 'course' ? 'btn-info text-black' : 'btn-ghost'
                    }`}>
                    여행 코스
                </button>
                <button
                    onClick={() => onChangeContent('reply')}
                    className={`w-40 h-12 border-2 rounded-md focus:outline-none focus:shadow-outline ${
                        toggle === 'reply' ? 'btn-info text-black' : 'btn-ghost'
                    }`}>
                    댓글 목록
                </button>
            </div>
            <div className="flex justify-center w-full">{content}</div>
        </div>
    )
}
