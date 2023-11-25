import {FC} from 'react'
import {Button, UserInfo, UserInfoItemBox} from '../../index'
import {postBusinessCheck} from '../../../api/Business/BusinessCheck'
import {WaitUserData} from '../../../data/manager/index'

// 유저 정보 한줄 - 추후 UserInfo로 prop 추가해줘야함

type WaitUserProps = {waitUser: WaitUserData}

export const WaitUser: FC<WaitUserProps> = ({waitUser}) => {
    //사업자 확인 - 조회 버튼 누를시 사업자 번호 넘겨서 확인
    async function onCheck(b_no: string[]) {
        try {
            const data = await postBusinessCheck(b_no)
            if (data.data[0].b_stt === '' || data.data[0].b_stt === '폐업자') {
                alert('사업자 아님')
            } else if (data.data[0].b_stt === '계속사업자') {
                alert('사업자 확인 완료')
            } else if (data.data[0].b_stt === '휴업자') {
                alert('현재 휴업자')
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <UserInfoItemBox widthFull={false} isButton={true}>
            <div className="flex">
                <UserInfo text={waitUser.userName} />
                <UserInfo text={waitUser.userId} />
                <UserInfo text={waitUser.userEmail} />
                <UserInfo text={waitUser.phoneNum} />
                <UserInfo text={waitUser.businessNum} />
            </div>

            <div className="flex justify-around p-3 min-w-fit">
                <Button
                    value="조회"
                    className="bg-white text-green-700 hover:text-white border border-green-700 hover:bg-green-800  focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 "
                    onClick={() => onCheck([waitUser.businessNum])}
                />
                <Button
                    value="승인"
                    className="bg-white text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 "
                />
                <Button
                    value="삭제"
                    className="bg-white text-red-700 hover:text-white border border-red-700 hover:bg-red-800  focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600"
                />
            </div>
        </UserInfoItemBox>
    )
}
