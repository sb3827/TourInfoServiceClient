import React, {FC} from 'react'
import {Button, UserInfo} from '../../index'
import {UserData} from '../../../data/manager/index'

type FindUserInfoProps = {
    users: UserData
}

export const FindUserInfo: FC<FindUserInfoProps> = ({users}) => {
    return (
        <div className="flex items-center w-full border-b-2">
            <div className="w-3/4 p-3 m-5 rounded-lg">
                <div className="flex justify-between w-full ">
                    <UserInfo text={users.userName} />
                    <UserInfo text={users.userId} />
                    <UserInfo text={users.userEmail} />
                    <UserInfo text={users.phoneNum} />
                    <UserInfo text={users.regDate.toDateString()} />
                    <UserInfo
                        text={users.businessCheck === true ? '사업자' : '일반 회원'}
                    />
                </div>
            </div>
            <div className="flex justify-end w-1/4 p-3 m-5">
                <Button
                    value="탈퇴"
                    className="bg-gradient-to-r from-red-400 via-red-500 to-red-600"
                />
            </div>
        </div>
    )
}
