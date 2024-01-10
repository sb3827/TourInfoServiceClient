import {useState, useEffect} from 'react'
import {userBoard} from './../../../data/User/User'
import {ShowUserBoard} from './../../../api/MyPage/ShowUserInfo'

export const MyPostBox = () => {
    const [BoardList, setBoardList] = useState<userBoard>()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userBoardData = await ShowUserBoard(2)
                setBoardList(userBoardData)
                console.log(userBoardData)
            } catch {
                console.error('error')
            }
        }
        fetchData()
    }, [])

    return (
        <div>
            <table className="w-full table-auto">
                <thead className="justify-between">
                    <tr className="">
                        <th className="px-20">글번호</th>
                        <th className="px-20">제목</th>
                        <th className="px-20">작성자</th>
                        <th className="px-20">작성일자</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(BoardList) &&
                        BoardList.map((board: userBoard) => (
                            <tr>
                                <td>
                                    <a href="" className="cursor-pointer hover:underline">
                                        {board.bno}
                                    </a>
                                </td>
                                <td>
                                    <a href="" className="cursor-pointer hover:underline">
                                        {board.title}
                                    </a>
                                </td>
                                <td>{board.writer}</td>
                                <td>{board.regdate}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}
