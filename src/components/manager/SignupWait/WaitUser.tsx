import React, {FC} from 'react'
import {Button, UserInfo} from '../../index'
import {postBusinessCheck} from '../../../api/Business/BusinessCheck'
import {WaitUserData} from '../../../data/manager'

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
        <div className="flex items-center w-full border-b-2 ">
            <div className="w-3/4 p-3 m-5 rounded-lg">
                <div className="flex justify-between w-full ">
                    <UserInfo text={waitUser.userName} />
                    <UserInfo text={waitUser.userId} />
                    <UserInfo text={waitUser.userEmail} />
                    <UserInfo text={waitUser.phoneNum} />
                    <UserInfo text={waitUser.businessNum} />
                </div>
            </div>
            <div className="flex justify-around p-3 m-5 min-w-fit">
                <Button
                    value="조회"
                    className="text-gray-500 bg-gradient-to-r from-lime-300 via-lime-400 to-lime-500"
                    onClick={() => onCheck([waitUser.businessNum])}
                />
                <Button
                    value="승인"
                    className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700"
                />
                <Button
                    value="삭제"
                    className="bg-gradient-to-r from-red-400 via-red-500 to-red-600"
                />
            </div>
        </div>
    )
}
