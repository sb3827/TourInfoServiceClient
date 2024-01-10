import {useState, useEffect} from 'react'
import {userReply} from './../../../data/User/User'
import {ShowUserReply} from './../../../api/MyPage/ShowUserInfo'

export const MyReplyBox = () => {
    const [ReplyList, setReplyList] = useState<userReply | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userReplyData = await ShowUserReply(2)
                setReplyList(userReplyData)
                console.log(userReplyData)
            } catch (error) {
                console.error('error', error)
            }
        }
        fetchData()
    }, [])

    //TODO - 날짜 Invalid Date로 나옴

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
                                        <a
                                            href=""
                                            className="cursor-pointer hover:underline">
                                            {reply.rno}
                                        </a>
                                    </td>
                                    <td>
                                        <a
                                            href=""
                                            className="cursor-pointer hover:underline">
                                            {reply.title}
                                        </a>
                                    </td>
                                    <td>
                                        <a
                                            href=""
                                            className="cursor-pointer hover:underline">
                                            {reply.text}
                                        </a>
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
