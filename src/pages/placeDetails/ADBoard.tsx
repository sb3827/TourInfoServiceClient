import {FC} from 'react'
import {UserInfo, Button, Slider} from '../../components/index'

type ADBoardProps = {}

export const ADBoard: FC<ADBoardProps> = ({}) => {
    var i: number = 5 //테스트 - 추후에 필요없음, 배열의 길이로 반복해야함
    return (
        <div>
            {/* 게시글 작성버튼, 추후에 게시글 작성 페이지로 이동하게 만들어야함 */}
            <div className="flex justify-end w-full p-3 m-5">
                <Button value="게시글 작성" className="bg-gradient-to-r bg-slate-500" />
            </div>
            {/* 썸네일 더미데이터 */}
            <div className="h-64 border rounded-lg border--300">
                <Slider />
            </div>
            {/* 게시글 더미데이터 */}
            {Array.from({length: i}, (_, index) => (
                <div className="flex items-center w-full border-b-2">
                    <div className="w-3/4 p-3 m-5 rounded-lg ">
                        <div className="flex justify-between w-full ">
                            <UserInfo text="NO" />
                            <UserInfo text="Title" />
                            <UserInfo text="ID" />
                            <UserInfo text="Date" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
