import {useState, useEffect} from 'react'
import {userCourse} from './../../../data/User/User'
import {ShowUserCourse} from './../../../api/MyPage/ShowUserInfo'

export const MyCourseBox = () => {
    const [CourseList, setCourseList] = useState<userCourse>()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userCourseData = await ShowUserCourse(2)
                setCourseList(userCourseData)
                console.log(userCourseData)
            } catch {
                console.error('error')
            }
        }
        fetchData()
    }, [])

    return (
        <div>
            <table className="table-fixed ">
                <thead className="justify-between">
                    <tr className="border">
                        <th className="px-20 border-r ">글번호</th>
                        <th className="px-20 border-r">제목</th>
                        <th className="px-20 border-r">작성자</th>
                        <th className="px-20 ">작성일자</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(CourseList) &&
                        CourseList.map((course: userCourse) => (
                            <tr className="border-b">
                                <td className="border-x">
                                    <a href="" className="cursor-pointer hover:underline">
                                        {course.bno}
                                    </a>
                                </td>
                                <td className="border-r">
                                    <a
                                        href=""
                                        className="cursor-pointer hover:underline ">
                                        {course.title}
                                    </a>
                                </td>
                                <td className="border-r">{course.writer}</td>
                                <td className="border-r">{course.regdate}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}
