import {useState, useEffect, FC} from 'react'
import {userReply} from './../../../data/User/User'
import {ShowUserReply} from './../../../api/MyPage/ShowUserInfo'
import {useNavigate} from 'react-router-dom'

type MyReplyBoxProps = {
    mno: number
}

export const MyReplyBox: FC<MyReplyBoxProps> = ({mno}) => {
    const [ReplyList, setReplyList] = useState<userReply | null>(null)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userReplyData = await ShowUserReply(mno)
                setReplyList(userReplyData)
                console.log(userReplyData)
            } catch (error) {
                console.error('error', error)
            }
        }
        fetchData()
    }, [])

    return (
        <div>
            <div>
                <table className="w-full table-auto">
                    <thead className="justify-between">
                        <tr className="">
                            <th className="px-20">글번호</th>
                            <th className="px-20">제목</th>
                            <th className="px-20">내용</th>
                            <th className="px-20">작성일자</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(ReplyList) &&
                            ReplyList.map((reply: userReply) => (
                                <tr key={reply.rno}>
                                    <td className="px-4">
                                        <span>{reply.rno}</span>
                                    </td>
                                    <td>
                                        <span
                                            className="cursor-pointer hover:underline"
                                            // 코스 게시글일 경우 코스 포스팅으로
                                            onClick={() => {
                                                if (reply.course) {
                                                    navigate(
                                                        `/board/course/posting?bno=${reply.bno}`
                                                    )
                                                }
                                                // 장솓 게시글일 경우 장소 포스팅으로
                                                else {
                                                    navigate(
                                                        `/board/place/posting?bno=${reply.bno}`
                                                    )
                                                }
                                            }}>
                                            {reply.title}
                                        </span>
                                    </td>
                                    <td>
                                        <span
                                            className="cursor-pointer hover:underline"
                                            onClick={() => {
                                                if (reply.course) {
                                                    navigate(
                                                        `/board/course/posting?bno=${reply.bno}`
                                                    )
                                                } else {
                                                    navigate(
                                                        `/board/place/posting?bno=${reply.bno}`
                                                    )
                                                }
                                            }}>
                                            {reply.text}
                                        </span>
                                    </td>
                                    <td>{reply.regdate}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
